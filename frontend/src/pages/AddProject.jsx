import { useState } from "react";

function AddProject() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    category: "",
    studentName: "",
    githubLink: ""
  });

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
      const response = await fetch("https://project-collector-app.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(projectData)
      });

      const data = await response.json();

      if (response.ok) {
        alert("Project added successfully!");

        setFormData({
          title: "",
          description: "",
          technologies: "",
          category: "",
          studentName: "",
          githubLink: ""
        });
      } else {
        alert(data.message || "Failed to add project");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Unable to connect to the backend");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4">Add New Project</h2>

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
                <label className="form-label">
                  Technologies (comma-separated)
                </label>
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
                  placeholder="Web Development"
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
                <label className="form-label">GitHub Link (optional)</label>
                <input
                  type="url"
                  name="githubLink"
                  className="form-control"
                  placeholder="https://github.com/username/project"
                  value={formData.githubLink}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Submit Project
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProject;