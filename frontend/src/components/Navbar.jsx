function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 40px",
        background: "#111827",
        color: "white",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      <h2>🚀 TransGuard AI</h2>

      <div style={{ display: "flex", gap: "20px" }}>
        <a href="#hero-section" style={{ color: "white", textDecoration: "none" }}>
          Home
        </a>

        <a href="#features-section" style={{ color: "white", textDecoration: "none" }}>
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