import { useEffect, useState } from "react";
import Particle from "../Particle";
import { fetchAndParseMarkdown } from "./markdownParser";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProjectCard from "./ProjectCards";
import Senna from "../../Assets/Projects/LeoGV/Senna/Senna.png"
import Cannon from "../../Assets/Projects/LeoGV/Cannon/Cannon.png"

function LeoGV() {
    const [sennaContent, setSennaContent] = useState([]);

    useEffect(() => {
        fetchAndParseMarkdown(
            'https://raw.githubusercontent.com/MBrahim/Portfolio/main/src/Assets/Projects/LeoGV/Senna/Readme.md',
            {
                header: { color: '#00FFFF', textAlign: 'left' },
                paragraph: { color: 'white', textAlign: 'left' },
            },
            setSennaContent
        );
    }, []);

    return (
        <Container fluid className="project-section">
            <Particle />
            <Container>
                <div style={{position: 'relative', width: '100%', textAlign: 'center', marginBottom: '30px'}}>
                    <h1 style={{ margin: 0, padding: 0 }}>
                        <strong className="main-name">LeoGV – Graduation Project</strong>
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.7)', marginTop: '10px' }}>
                        An advanced vehicle control and communication system for autonomous ground vehicles
                    </p>
                </div>

                <Row style={{ justifyContent: "center", paddingBottom: "30px" }}>
                    <Col md={6} className="project-card">
                        <Link to="/project/LeoGV/Senna" style={{ textDecoration: "none", color: "inherit" }}>
                            <ProjectCard
                                imgPath={Senna}
                                isBlog={false}
                                title="Project Senna - Control Board"
                                width="100%"
                                description="Central vehicle control and communication board integrating processing, power management, motor control, and CAN Bus interfaces for autonomous vehicle subsystems."
                            />
                        </Link>
                    </Col>
                    <Col md={6} className="project-card">
                        <Link to="/project/LeoGV/Cannon" style={{ textDecoration: "none", color: "inherit" }}>
                            <ProjectCard
                                imgPath={Cannon}
                                isBlog={false}
                                title="Project Cannon - Stepper Motor Driver (DRV8818)"
                                width="100%"
                                description="Compact dual H-Bridge stepper motor driver based on TI DRV8818 with integrated current regulation, microstepping capability, and built-in protection features."
                            />
                        </Link>
                    </Col>
                </Row>

                <div className="markdown-content">
                    {sennaContent}
                </div>
            </Container>
        </Container>
    );
}
export default LeoGV;