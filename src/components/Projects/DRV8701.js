import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Particle from "../Particle";
import { fetchAndParseMarkdown } from "./markdownParser";

function DRV8701() {
    const [content, setContent] = useState([]);

    useEffect(() => {
        fetchAndParseMarkdown(
            'https://raw.githubusercontent.com/MBrahim/Portfolio/main/src/Assets/Projects/DRV8701/Readme.md',
            {
                header: { color: '#00FFFF', textAlign: 'left' },
                paragraph: { color: 'white', textAlign: 'left' },
            },
            setContent
        );
    }, []);

    return (
        <Container fluid className="project-section">
            <Particle />
            <Container>
                <div style={{position: 'relative', width: '100%', textAlign: 'center'}}>
                    <h1 style={{ margin: 0, padding: 0 }}>
                        <strong className="main-name">DRV8701</strong>
                    </h1>
                </div>
                <div className="markdown-content">
                {content}
                </div>
            </Container>
        </Container>
    );
}

export default DRV8701;
