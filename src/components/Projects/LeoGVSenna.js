import { useEffect, useState } from "react";
import Particle from "../Particle";
import { fetchAndParseMarkdown } from "./markdownParser";
import { Container, Row } from "react-bootstrap";
function LeoGVSenna() {
    const [content, setContent] = useState([]);

    useEffect(() => {
        fetchAndParseMarkdown(
            'https://raw.githubusercontent.com/MBrahim/Portfolio/main/src/Assets/Projects/LeoGV/Senna/Readme.md',
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
                <Row style={{position: 'relative', width: '100%', textAlign: 'center'}}>
                    <h1 style={{ margin: 0, padding: 0 }}>
                        <strong className="main-name">LeoGV – Project Senna</strong>
                    </h1>
                </Row>

                <div className="markdown-content">
                    {content}
                </div>
                
            </Container>
        </Container>
    );
}

export default LeoGVSenna;