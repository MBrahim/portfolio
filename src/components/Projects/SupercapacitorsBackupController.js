import { useEffect, useState } from "react";
import Particle from "../Particle";
import { fetchAndParseMarkdown } from "./markdownParser";
import ModelViewer from "../ModelViewer";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { FaFilePdf } from "react-icons/fa6";

function SupercapacitorsBackupController() {
    const [content, setContent] = useState([]);

    useEffect(() => {
        fetchAndParseMarkdown(
            'https://raw.githubusercontent.com/MBrahim/Portfolio/main/src/Assets/Projects/SupCap/Readme.md',
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
                        <strong className="main-name">Supercapacitors Backup Controller</strong>
                    </h1>
                    <h3 style={{ margin: 0, padding: 0 }}>
                        <strong style={{ color: 'white', textDecoration: 'underline' }}>3D Model</strong>
                    </h3>
                </Row>

                <Row>
                <ModelViewer modelUrl={require("../../Assets/Projects/SupCap/PCB.glb")} />
                </Row>

                <Row style={{ justifyContent: "center", position: "relative", marginTop: "20px"}}>
                        <Button
                            variant="primary"
                            href={"https://raw.githubusercontent.com/MBrahim/Portfolio/main/src/Assets/Projects/SupCap/Schematic.pdf"}
                            target="_blank"
                            style={{ maxWidth: "250px" }}
                        >
                            <FaFilePdf/>
                            &nbsp;The Schematic
                        </Button>

                </Row>

                <Row className="markdown-content">
                    {content}
                </Row>

            </Container>
        </Container>
    );
}

export default SupercapacitorsBackupController;