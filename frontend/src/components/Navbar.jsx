function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        padding: "15px 20px",
        background: "#111827",
        color: "white",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        gap: "10px",
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: "1.5rem",
          whiteSpace: "nowrap",
        }}
      >
        🚀 TransGuard AI
      </h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <a
          href="#hero-section"
          style={{ color: "white", textDecoration: "none" }}
        >
          Home
        </a>

        <a
          href="#features-section"
          style={{ color: "white", textDecoration: "none" }}
        >
          Features
        </a>

        <a
          href="#about-section"
          style={{ color: "white", textDecoration: "none" }}
        >
          About
        </a>
      </div>
    </nav>
  );
}

export default Navbar;