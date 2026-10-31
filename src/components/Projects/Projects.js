import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import { Link } from 'react-router-dom';
import ICM20948img from "../../Assets/Projects/ICM-20948/Photo.png";
import DRV8701img from "../../Assets/Projects/DRV8701/Photo.png";
import SupercapacitorsBackupControllerimg from "../../Assets/Projects/SupCap/Sup.png";
import DRV8243 from "../../Assets/Projects/DRV8243/DRV8243.png"
import Octopus from "../../Assets/Projects/Octopus/Octopus.png"
import LeoFront from "../../Assets/Projects/LeoGV/Front.png"
import LeoBack from "../../Assets/Projects/LeoGV/Back.png"


function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          
          <Col xs={12} className="project-card" style={{ width: "100%", maxWidth: "100%" }}>
            <Link to="/project/LeoGV" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
              <ProjectCard
                imgPath={[LeoFront, LeoBack]}
                isBlog={false}
                title="LeoGV – WareHouse Robot (Graduation Project)"
                width="100%"
                description="LeoGV is an autonomous mobile warehouse robot with differential drive powered by two BLDC hub motors controlled via custom ESC (based on Odrive). It uses STM32G4 microcontroller with embedded C drivers, Raspberry Pi 4 as the main brain running ROS2 for abstraction, and features wireless WiFi control via PyQt5 GUI. The robot includes a lifting mechanism with four stepper motors, USB Lidar and camera for environment awareness, all built with custom-designed PCBs including USB Hub and USB-to-CAN controller."
              />
            </Link>
          </Col>

          <Col md={4} className="project-card">
            <Link to="/project/SupercapacitorsBackupController" style={{ textDecoration: "none", color: "inherit" }}>
              <ProjectCard
                imgPath={SupercapacitorsBackupControllerimg}
                isBlog={false}
                title="Supercapacitors Backup Controller"
                width="100%"
                description="A high-reliability energy backup controller designed to manage supercapacitor-based power systems, ensuring uninterrupted supply during main power loss while providing controlled charging, voltage balancing, and system protection for embedded and industrial applications."
              />
            </Link>
          </Col>

          <Col md={4} className="project-card">
            <Link to="/project/Octopus" style={{ textDecoration: "none", color: "inherit" }}>
              <ProjectCard
                imgPath={Octopus}
                isBlog={false}
                title="Project Octopus"
                width="100%"
                description="A multi-functional embedded control system integrating centralized processing, distributed communication, power regulation, and multi-channel actuator control to support complex robotics and automation applications."
              />
            </Link>
          </Col>

          <Col md={4} className="project-card">
            <Link to="/project/ICM20948" style={{ textDecoration: "none", color: "inherit" }}>
              <ProjectCard
                imgPath={ICM20948img}
                isBlog={false}
                title="ICM-20948 Breakout Board"
                width="100%"
                description="A breakout board for the ICM-20948 9-axis motion sensor (gyro, acc., mag.) featuring I²C interfacing, selectable addresses via solder jumper, and wide 1.8V-5V power compatibility for easy integration with various microcontrollers and SBCs."
              />  
            </Link>
          </Col>  

          <Col md={4} className="project-card">
            <Link to="/project/DRV8701" style={{ textDecoration: "none", color: "inherit" }}>
              <ProjectCard
                imgPath={DRV8701img}
                isBlog={false}
                title="DRV8701 Motor Driver"
                width="100%"
                description="A high-power brushed DC motor driver based on Texas Instruments DRV8701, implemented as a full H-Bridge using four external High Power N-channel MOSFETs, supporting high voltage operation and precise current control for industrial and automotive motor applications."
              />  
            </Link>
          </Col>
       
          <Col md={4} className="project-card">
            <Link to="/project/DRV8243" style={{ textDecoration: "none", color: "inherit" }}>
              <ProjectCard
                imgPath={DRV8243}
                isBlog={false}
                title="DRV8243 Motor Driver"
                width="100%"
                description="Automotive-grade 40V, 12A H-Bridge motor driver based on Texas Instruments DRV8243HQRXYRQ1, with integrated current sensing, protection features, and configurable control modes for robust motor control applications."
              />
            </Link>
          </Col>

          

        </Row>
      </Container>
    </Container>
  );
}

export default Projects;