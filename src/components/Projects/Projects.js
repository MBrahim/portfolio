import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import { Link } from "react-router-dom";
import ICM20948img from "../../Assets/Projects/ICM-20948/Photo.png";
import DRV8701img from "../../Assets/Projects/DRV8701/Photo.png";
import SupercapacitorsBackupControllerimg from "../../Assets/Projects/SupCap/Sup.png";
import DRV8243 from "../../Assets/Projects/DRV8243/DRV8243.png";
import Octopus from "../../Assets/Projects/Octopus/Octopus.png";
import LeoFront from "../../Assets/Projects/LeoGV/Front.png";
import LeoBack from "../../Assets/Projects/LeoGV/Back.png";

const categories = [
  "All",
  "IoT",
  "High-Speed",
  "Power",
  "Consumer Electronics",
  "OEMs",
  "Modules",
];

const projects = [
  {
    order: 1,
    path: "/project/LeoGV",
    imgPath: [LeoFront, LeoBack],
    title: "LeoGV – WareHouse Robot (Graduation Project)",
    description:
      "LeoGV is an autonomous mobile warehouse robot with differential drive powered by two BLDC hub motors controlled via custom ESC (based on Odrive). It uses STM32G4 microcontroller with embedded C drivers, Raspberry Pi 4 as the main brain running ROS2 for abstraction, and features wireless WiFi control via PyQt5 GUI. The robot includes a lifting mechanism with four stepper motors, USB Lidar and camera for environment awareness, all built with custom-designed PCBs including USB Hub and USB-to-CAN controller.",
    categories: ["IoT", "Modules"],
    featured: true,
  },
  {
    order: 2,
    path: "/project/SupercapacitorsBackupController",
    imgPath: SupercapacitorsBackupControllerimg,
    title: "Supercapacitors Backup Controller",
    description:
      "A high-reliability energy backup controller designed to manage supercapacitor-based power systems, ensuring uninterrupted supply during main power loss while providing controlled charging, voltage balancing, and system protection for embedded and industrial applications.",
    categories: ["Power", "OEMs"],
  },
  {
    order: 3,
    path: "/project/Octopus",
    imgPath: Octopus,
    title: "Project Octopus",
    description:
      "A multi-functional embedded control system integrating centralized processing, distributed communication, power regulation, and multi-channel actuator control to support complex robotics and automation applications.",
    categories: ["Power", "Modules"],
  },
  {
    order: 4,
    path: "/project/ICM20948",
    imgPath: ICM20948img,
    title: "ICM-20948 Breakout Board",
    description:
      "A breakout board for the ICM-20948 9-axis motion sensor (gyro, acc., mag.) featuring I²C interfacing, selectable addresses via solder jumper, and wide 1.8V-5V power compatibility for easy integration with various microcontrollers and SBCs.",
    categories: ["IoT", "Modules"],
  },
  {
    order: 5,
    path: "/project/DRV8701",
    imgPath: DRV8701img,
    title: "DRV8701 Motor Driver",
    description:
      "A high-power brushed DC motor driver based on Texas Instruments DRV8701, implemented as a full H-Bridge using four external High Power N-channel MOSFETs, supporting high voltage operation and precise current control for industrial and automotive motor applications.",
    categories: ["Power", "OEMs", "Modules"],
  },
  {
    order: 6,
    path: "/project/DRV8243",
    imgPath: DRV8243,
    title: "DRV8243 Motor Driver",
    description:
      "Automotive-grade 40V, 12A H-Bridge motor driver based on Texas Instruments DRV8243HQRXYRQ1, with integrated current sensing, protection features, and configurable control modes for robust motor control applications.",
    categories: ["Power", "OEMs", "Modules"],
  },
];

function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((project) => project.categories.includes(activeCategory));
  const visibleProjects = [...filteredProjects].sort((a, b) =>
    sortOrder === "newest" ? b.order - a.order : a.order - b.order
  );

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
        <section className="project-filters" aria-label="Filter projects">
          <h2 className="project-filter-heading">Browse by category</h2>
          <div className="project-sort-control">
            <label htmlFor="project-sort">Sort by</label>
            <select
              id="project-sort"
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
          <div className="project-filter-buttons" role="group" aria-label="Project categories">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                className={`project-filter-button${activeCategory === category ? " active" : ""}`}
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
          <p className="project-filter-count" aria-live="polite">
            Showing {visibleProjects.length} of {projects.length} projects
          </p>
        </section>
        {visibleProjects.length > 0 ? (
          <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
            {visibleProjects.map((project) => (
              <Col
                key={project.path}
                xs={12}
                md={project.featured ? 12 : 4}
                className="project-card"
              >
                <Link
                  to={project.path}
                  className="project-card-link"
                >
                  <ProjectCard
                    imgPath={project.imgPath}
                    isBlog={false}
                    title={project.title}
                    width="100%"
                    description={project.description}
                    categories={project.categories}
                  />
                </Link>
              </Col>
            ))}
          </Row>
        ) : (
          <p className="project-filter-empty" role="status">
            No projects are listed in this category yet.
          </p>
        )}
      </Container>
    </Container>
  );
}

export default Projects;
