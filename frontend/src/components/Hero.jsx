import "../styles/home.css";

function Hero() {
  return (
    <section className="hero" id="hero-section">
      <h1>🚀 TransGuard AI</h1>

      <h2>AI-Powered CSV Validation & Data Cleaning</h2>

      <p>
        Validate transaction data, detect errors, clean CSV files,
        split large datasets, and generate production-ready outputs
        in seconds.
      </p>

      <div className="hero-buttons">
        <a href="#upload-section">
          <button className="primary-btn">Get Started</button>
        </a>

        <a href="#upload-section">
  <button className="secondary-btn">Upload CSV</button>
</a>
      </div>
    </section>
  );
}

export default Hero;