import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { CgWebsite } from "react-icons/cg";
import { BsGithub } from "react-icons/bs";

function ProjectCards({ imgPath, title, description, ghLink, isBlog, demoLink, width, categories = [] }) {
  const renderImages = () => {
    if (Array.isArray(imgPath)) {
      return imgPath.map((src, index) => (
        <Card.Img
          key={index}
          variant="top"
          src={src}
          alt={`card-img-${index}`}
        />
      ));
    }

    return <Card.Img variant="top" src={imgPath} alt="card-img" />;
  };

  return (
    <Card className="project-card-view" style={{ width: width || "100%" }}>
      <div className={`card-img-wrapper${Array.isArray(imgPath) ? " multiple" : ""}`}>
        {renderImages()}
      </div>
      <Card.Body>
        <Card.Title className="project-title">{title}</Card.Title>
        {categories.length > 0 && (
          <div className="project-card-categories" aria-label="Project categories">
            {categories.map((category) => (
              <span className="project-category-tag" key={category}>
                {category}
              </span>
            ))}
          </div>
        )}
        <Card.Text style={{ textAlign: "justify" }}>
          {description}
        </Card.Text>
        {!isBlog && demoLink && (
        <Button variant="primary" href={demoLink} target="_blank">
          <CgWebsite /> &nbsp;
          {"Demo"}
        </Button>
        )}
        {"\n"}
        {"\n"}

        {!isBlog && ghLink && (
          <Button
            variant="primary"
            href={ghLink}
            target="_blank"
            style={{ marginLeft: "10px" }}
          >
          <BsGithub /> &nbsp;
          {"GitHub"}
          </Button>
      )}
      </Card.Body>
    </Card>
  );
}
export default ProjectCards;
