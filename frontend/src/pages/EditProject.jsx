import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiUrl } from "../api";

function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    category: "",
    studentName: "",
    githubLink: ""
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const response = await fetch(
        apiUrl(`/api/project/${id}`)
      );

      const project = await response.json();

      if (response.ok) {
        setFormData({
          title: project.title || "",
          description: project.description || "",
          technologies: project.technologies?.join(", ") || "",
          category: project.category || "",
          studentName: project.studentName || "",
          githubLink: project.githubLink || ""
        });
      } else {
        alert(project.message || "Project not found");
        navigate("/view-projects");
      }
    } catch (error) {
      console.error("Error fetching project:", error);
      alert("Unable to load project");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const projectData = {
      ...formData,
      technologies: formData.technologies
        .split(",")
        .map((tech) => tech.trim())
        .filter((tech) => tech !== "")
    };

    try {
      const response = await fetch(
        apiUrl(`/api/project/${id}`),
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(projectData)
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Project updated successfully!");
        navigate("/view-projects");
      } else {
        alert(data.message || "Failed to update project");
      }
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Unable to connect to the backend");
    }
  };

  if (loading) {
  return (
    <div className="container mt-5 text-center">
      <h4>Loading project...</h4>
    </div>
  );
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">Edit Project</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Project Title</label>
                <input
                  type="text"
                  name="title"
                  className="form-control"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-control"
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Technologies</label>
                <input
                  type="text"
                  name="technologies"
                  className="form-control"
                  placeholder="React, Node.js, MongoDB"
                  value={formData.technologies}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Category</label>
                <input
                  type="text"
                  name="category"
                  className="form-control"
                  value={formData.category}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Student Name</label>
                <input
                  type="text"
                  name="studentName"
                  className="form-control"
                  value={formData.studentName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">GitHub Link</label>
                <input
                  type="url"
                  name="githubLink"
                  className="form-control"
                  value={formData.githubLink}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-success w-100">
                Update Project
              </button>

              <button
                type="button"
                className="btn btn-secondary w-100 mt-2"
                onClick={() => navigate("/view-projects")}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProject;