import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiUrl } from "../api";

function ViewProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(apiUrl("/api/project"));

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();

      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setError("Unable to load projects. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        apiUrl(`https://project-collector-app.onrender.com/api/project/${id}`),
        {
          method: "DELETE"
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert(data.message || "Project deleted successfully");

        // Remove deleted project from the page
        setProjects((previousProjects) =>
          previousProjects.filter((project) => project._id !== id)
        );
      } else {
        alert(data.message || "Failed to delete project");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Unable to connect to the backend");
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h4>Loading projects...</h4>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error}</div>

        <button className="btn btn-primary" onClick={fetchProjects}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-4">
        <div>
          <h2 className="fw-bold">All Projects</h2>
          <p className="text-muted">
            Explore projects submitted by students.
          </p>
        </div>

        <Link to="/add-project" className="btn btn-primary">
          + Add Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="alert alert-info text-center">
          No projects available. Add your first project!
        </div>
      ) : (
        <div className="row">
          {projects.map((project) => (
            <div className="col-md-6 col-lg-4 mb-4" key={project._id}>
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">
                    {project.title}
                  </h5>

                  <p className="card-text text-muted">
                    {project.description}
                  </p>

                  <p className="mb-2">
                    <strong>Student:</strong> {project.studentName}
                  </p>

                  <p className="mb-2">
                    <strong>Category:</strong> {project.category}
                  </p>

                  <p className="mb-2">
                    <strong>Technologies:</strong>{" "}
                    {project.technologies?.join(", ")}
                  </p>

                  <p className="mb-3">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`badge ${
                        project.status === "Approved"
                          ? "bg-success"
                          : project.status === "Rejected"
                          ? "bg-danger"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {project.status}
                    </span>
                  </p>

                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="mb-3"
                    >
                      View GitHub Repository
                    </a>
                  )}

                  <div className="mt-auto d-flex gap-2">
                    <Link
                      to={`/project/${project._id}`}
                      className="btn btn-outline-primary btn-sm"
                    >
                      View Details
                    </Link>

                    <Link
  to={`/edit-project/${project._id}`}
  className="btn btn-outline-success btn-sm"
>
  Edit
</Link>

                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDelete(project._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewProjects;