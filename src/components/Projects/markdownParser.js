// utils/markdownParser.js

/**
 * Custom markdown parser with styling options
 * @param {string} text - The markdown text to parse
 * @param {object} styles - Custom styles for different elements
 * @returns {Array} Array of React elements
 */
export const parseMarkdown = (text, styles = {}) => {
    const lines = text.split('\n');
    const elements = [];
    
    // Default styles
    const defaultStyles = {
        header: { color: '#00FFFF', textAlign: 'left' },
        paragraph: { color: 'white', textAlign: 'left', marginBottom: '1rem', lineHeight: '1.6' },
        bold: { fontWeight: 'bold' },
        italic: { fontStyle: 'italic' },
        boldItalic: { fontWeight: 'bold', fontStyle: 'italic' },
        listItem: { color: 'white', textAlign: 'left', marginLeft: '2rem' },
        code: { backgroundColor: '#2d2d2d', color: 'white', padding: '1rem', borderRadius: '5px', overflow: 'auto' },
        inlineCode: { backgroundColor: '#2d2d2d', color: '#ff6b6b', padding: '0.2rem 0.4rem', borderRadius: '3px' },
        blockquote: { borderLeft: '4px solid #00FFFF', paddingLeft: '1rem', color: '#ddd', fontStyle: 'italic', margin: '1rem 0' },
        link: { color: '#00FFFF', textDecoration: 'none' },
        hr: { borderColor: '#00FFFF', margin: '2rem 0' },
        ...styles
    };

    // Helper function to parse inline formatting (bold, italic, links, etc.)
    const parseInlineFormatting = (text, keyPrefix = '') => {
        if (!text) return text;
        
        const elements = [];
        let remaining = text;
        let index = 0;

        // Combined patterns for all inline elements
        const patterns = [
            { regex: /(\*\*\*.*?\*\*\*)/g, type: 'boldItalic', process: (content) => content.slice(3, -3) },
            { regex: /(\*\*.*?\*\*)/g, type: 'bold', process: (content) => content.slice(2, -2) },
            { regex: /(\*.*?\*)/g, type: 'italic', process: (content) => content.slice(1, -1) },
            { regex: /(`.*?`)/g, type: 'inlineCode', process: (content) => content.slice(1, -1) },
            { regex: /(\[.*?\]\(.*?\))/g, type: 'link', process: (content) => {
                const match = content.match(/\[(.*?)\]\((.*?)\)/);
                return { text: match[1], url: match[2] };
            }}
        ];

        while (remaining.length > 0) {
            let earliestMatch = null;
            let earliestPattern = null;
            let earliestIndex = -1;

            // Find the earliest match
            for (const pattern of patterns) {
                pattern.regex.lastIndex = 0;
                const match = pattern.regex.exec(remaining);
                if (match && (earliestIndex === -1 || match.index < earliestIndex)) {
                    earliestIndex = match.index;
                    earliestMatch = match;
                    earliestPattern = pattern;
                }
            }

            if (earliestMatch && earliestIndex > -1) {
                // Add text before the match
                if (earliestIndex > 0) {
                    elements.push(remaining.substring(0, earliestIndex));
                }

                // Process the matched element
                const matchText = earliestMatch[0];
                const processed = earliestPattern.process(matchText);
                
                switch (earliestPattern.type) {
                    case 'boldItalic':
                        elements.push(
                            <strong key={`${keyPrefix}-bi-${index}`} style={defaultStyles.boldItalic}>
                                {processed}
                            </strong>
                        );
                        break;
                    case 'bold':
                        elements.push(
                            <strong key={`${keyPrefix}-b-${index}`} style={defaultStyles.bold}>
                                {processed}
                            </strong>
                        );
                        break;
                    case 'italic':
                        elements.push(
                            <em key={`${keyPrefix}-i-${index}`} style={defaultStyles.italic}>
                                {processed}
                            </em>
                        );
                        break;
                    case 'inlineCode':
                        elements.push(
                            <code key={`${keyPrefix}-c-${index}`} style={defaultStyles.inlineCode}>
                                {processed}
                            </code>
                        );
                        break;
                    case 'link':
                        elements.push(
                            <a key={`${keyPrefix}-l-${index}`} href={processed.url} style={defaultStyles.link}>
                                {processed.text}
                            </a>
                        );
                        break;
                    default:
                        break;
                }

                // Update remaining text
                remaining = remaining.substring(earliestIndex + matchText.length);
                index++;
            } else {
                // No more matches, add remaining text
                if (remaining) {
                    elements.push(remaining);
                }
                break;
            }
        }

        return elements.length === 1 && typeof elements[0] === 'string' ? elements[0] : elements;
    };

    // Main parsing loop
    let inCodeBlock = false;
    let codeBlockContent = [];
    let listItems = [];
    let inList = false;
    let listType = null;

    lines.forEach((line, lineIndex) => {
        const trimmedLine = line.trim();
        
        // Handle code blocks
        if (trimmedLine.startsWith('```')) {
            if (!inCodeBlock) {
                inCodeBlock = true;
                codeBlockContent = [];
            } else {
                inCodeBlock = false;
                elements.push(
                    <pre key={`code-${lineIndex}`} style={defaultStyles.code}>
                        <code>{codeBlockContent.join('\n')}</code>
                    </pre>
                );
            }
            return;
        }

        if (inCodeBlock) {
            codeBlockContent.push(line);
            return;
        }

        // Handle empty lines
        if (!trimmedLine) {
            if (inList) {
                // End current list
                elements.push(
                    listType === 'ol' ? 
                        <ol key={`list-${lineIndex}`} style={{ marginBottom: '1rem' }}>{listItems}</ol> :
                        <ul key={`list-${lineIndex}`} style={{ marginBottom: '1rem' }}>{listItems}</ul>
                );
                listItems = [];
                inList = false;
                listType = null;
            } else {
                elements.push(<br key={`br-${lineIndex}`} />);
            }
            return;
        }

        // Check for headers
        const headerMatch = trimmedLine.match(/^(#{1,6})\s+(.+)$/);
        if (headerMatch) {
            if (inList) {
                elements.push(
                    listType === 'ol' ? 
                        <ol key={`list-${lineIndex}`} style={{ marginBottom: '1rem' }}>{listItems}</ol> :
                        <ul key={`list-${lineIndex}`} style={{ marginBottom: '1rem' }}>{listItems}</ul>
                );
                listItems = [];
                inList = false;
            }
            
            const level = headerMatch[1].length;
            const content = headerMatch[2];
            const HeaderTag = `h${level}`;
            
            elements.push(
                <HeaderTag 
                    key={`h-${lineIndex}`}
                    style={{
                        ...defaultStyles.header,
                        marginTop: level === 1 ? '2rem' : '1.5rem',
                        marginBottom: '1rem',
                        fontSize: level === 1 ? '2.5rem' : level === 2 ? '2rem' : '1.5rem'
                    }}
                >
                    {parseInlineFormatting(content, `h-${lineIndex}`)}
                </HeaderTag>
            );
            return;
        }

        // Check for list items
        const listMatch = trimmedLine.match(/^([*+-]|\d+\.)\s+(.+)$/);
        if (listMatch) {
            const marker = listMatch[1];
            const content = listMatch[2];
            const isOrdered = /^\d+\.$/.test(marker);
            
            if (!inList || (isOrdered && listType !== 'ol') || (!isOrdered && listType !== 'ul')) {
                if (inList) {
                    elements.push(
                        listType === 'ol' ? 
                            <ol key={`list-${lineIndex}`} style={{ marginBottom: '1rem' }}>{listItems}</ol> :
                            <ul key={`list-${lineIndex}`} style={{ marginBottom: '1rem' }}>{listItems}</ul>
                    );
                }
                listItems = [];
                inList = true;
                listType = isOrdered ? 'ol' : 'ul';
            }
            
            listItems.push(
                <li key={`li-${lineIndex}`} style={defaultStyles.listItem}>
                    {parseInlineFormatting(content, `li-${lineIndex}`)}
                </li>
            );
            return;
        }

        // Check for blockquotes
        if (trimmedLine.startsWith('>')) {
            if (inList) {
                elements.push(
                    listType === 'ol' ? 
                        <ol key={`list-${lineIndex}`} style={{ marginBottom: '1rem' }}>{listItems}</ol> :
                        <ul key={`list-${lineIndex}`} style={{ marginBottom: '1rem' }}>{listItems}</ul>
                );
                listItems = [];
                inList = false;
            }
            
            const content = trimmedLine.slice(1).trim();
            elements.push(
                <blockquote key={`quote-${lineIndex}`} style={defaultStyles.blockquote}>
                    {parseInlineFormatting(content, `quote-${lineIndex}`)}
                </blockquote>
            );
            return;
        }

        // Check for horizontal rules
        if (trimmedLine.match(/^[-*_]{3,}$/)) {
            if (inList) {
                elements.push(
                    listType === 'ol' ? 
                        <ol key={`list-${lineIndex}`} style={{ marginBottom: '1rem' }}>{listItems}</ol> :
                        <ul key={`list-${lineIndex}`} style={{ marginBottom: '1rem' }}>{listItems}</ul>
                );
                listItems = [];
                inList = false;
            }
            
            elements.push(<hr key={`hr-${lineIndex}`} style={defaultStyles.hr} />);
            return;
        }

        // Regular paragraph
        if (inList) {
            elements.push(
                listType === 'ol' ? 
                    <ol key={`list-${lineIndex}`} style={{ marginBottom: '1rem' }}>{listItems}</ol> :
                    <ul key={`list-${lineIndex}`} style={{ marginBottom: '1rem' }}>{listItems}</ul>
            );
            listItems = [];
            inList = false;
        }
        
        elements.push(
            <p key={`p-${lineIndex}`} style={defaultStyles.paragraph}>
                {parseInlineFormatting(trimmedLine, `p-${lineIndex}`)}
            </p>
        );
    });

    // Handle any remaining list items
    if (inList && listItems.length > 0) {
        elements.push(
            listType === 'ol' ? 
                <ol key="list-final" style={{ marginBottom: '1rem' }}>{listItems}</ol> :
                <ul key="list-final" style={{ marginBottom: '1rem' }}>{listItems}</ul>
        );
    }

    return elements;
};

/**
 * Simple function to fetch and parse markdown from a URL
 * @param {string} url - The URL to fetch markdown from
 * @param {object} styles - Custom styles for markdown elements
 * @param {function} setContent - State setter for parsed content
 */
export const fetchAndParseMarkdown = async (url, styles = {}, setContent) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        const parsed = parseMarkdown(text, styles);
        setContent(parsed);
    } catch (err) {
        console.error('Error fetching markdown:', err);
        setContent([<p key="error" style={{ color: 'red' }}>Failed to load content: {err.message}</p>]);
    }
};