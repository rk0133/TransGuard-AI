function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 20px",
        background: "#111827",
        color: "white",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        flexWrap: "wrap",
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
          gap: "15px",
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
          href="#upload-section"
          style={{ color: "white", textDecoration: "none" }}
        >
          Upload
        </a>
      </div>
    </nav>
  );
}

export default Navbar;