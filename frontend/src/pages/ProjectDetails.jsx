
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ProjectDetails() {
  const { id } = useParams();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProject() {
      try {
        const response = await fetch(
          `http://localhost:3000/api/project/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error("Unable to fetch project details");
        }

        setProject(data.project || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [id]);

  if (loading) {
    return <div className="container py-5">Loading project...</div>;
  }

  if (error || !project) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          {error || "Project not found"}
        </div>
        <Link to="/view-projects" className="btn btn-primary">
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="details-card">
        <span className="badge bg-primary mb-3">
          {project.category || "Project"}
        </span>

        <h1>{project.title || project.projectname}</h1>

        <p className="text-muted mt-3">
          {project.description}
        </p>

        <hr />

        <h5>Technologies</h5>
        <p>
          {project.technology || project.techstack || "Not specified"}
        </p>

        {project.githubLink && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline-dark me-2"
          >
            View GitHub
          </a>
        )}

        <Link to="/view-projects" className="btn btn-primary">
          Back to Projects
        </Link>
      </div>
    </div>
  );
}

export default ProjectDetails;
