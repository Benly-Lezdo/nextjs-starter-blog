export default function Footer() {
  return (
    <>
      <footer
        style={{
          backgroundColor: "#f8f9fa",
          padding: "1rem",
          textAlign: "center",
          bottom: 0,
          width: "100%",
          boxShadow: "0 -1px 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <p style={{ margin: 0 }}>© 2024 BenLY</p>
        <p style={{ margin: 0 }}>
          <a
            href="/privacy"
            style={{ textDecoration: "none", color: "#007bff" }}
          >
            Privacy Policy
          </a>{" "}
          |
          <a href="/terms" style={{ textDecoration: "none", color: "#007bff" }}>
            Terms of Service
          </a>
        </p>
      </footer>
    </>
  );
}
