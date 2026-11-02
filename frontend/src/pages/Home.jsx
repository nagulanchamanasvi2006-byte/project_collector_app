import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="home-hero">
        <div className="container">
          <div className="row align-items-center">
            {/* Left Content */}
            <div className="col-lg-7">
              <h1 className="hero-title">
                Discover, Share and Collect Projects
              </h1>

              <p className="hero-description">
                A platform for students to submit their projects,
                explore innovative ideas, and learn from others.
              </p>

              <div className="hero-buttons">
                <Link to="/view-projects" className="btn btn-primary btn-lg">
                  Explore Projects
                </Link>

                <Link
                  to="/add-project"
                  className="btn btn-outline-primary btn-lg"
                >
                  Submit Project
                </Link>
              </div>
            </div>

            {/* Right Card */}
            <div className="col-lg-5">
              <div className="idea-card">
                <div className="idea-icon">💡</div>

                <h2>Ideas into Projects</h2>

                <p>
                  Share your creativity with the community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="home-features">
        <div className="container">
          <h2 className="features-title">What You Can Do</h2>

          <div className="row g-4">
            {/* Feature 1 */}
            <div className="col-md-4">
              <div className="feature-card">
                <h3>
                  <span className="feature-icon">📤</span>
                  Submit Projects
                </h3>

                <p>
                  Share your project details and technologies.
                </p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="col-md-4">
              <div className="feature-card">
                <h3>
                  <span className="feature-icon">🔎</span>
                  Explore Projects
                </h3>

                <p>
                  Discover projects submitted by other students.
                </p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="col-md-4">
              <div className="feature-card">
                <h3>
                  <span className="feature-icon">🌱</span>
                  Learn Together
                </h3>

                <p>
                  Get inspiration from innovative project ideas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;