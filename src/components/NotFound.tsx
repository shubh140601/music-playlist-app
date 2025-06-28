const NotFound = () => {
  return (
    <>
      <div
        style={{
          height: "100vh",
          backgroundColor: "#121212",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "2rem",
        }}
      >
        <h1 style={{ color: "#1DB954", fontSize: "3rem" }}>
          404 - Page Not Found
        </h1>
        <p style={{ color: "#aaa" }}>
          The page you're looking for doesn't exist.
        </p>
      </div>
    </>
  );
};

export default NotFound;
