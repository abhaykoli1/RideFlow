import React from "react";

function HoverOverlay() {
  return (
    <div style={styles.container}>
      <img
        src="https://via.placeholder.com/300x200"
        alt="Sample"
        style={styles.image}
      />
      <div style={styles.overlay}>Overlay Text</div>
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    width: "300px",
    height: "200px",
    overflow: "hidden",
    margin: "20px auto",
  },
  image: {
    width: "100%",
    height: "100%",
    display: "block",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    opacity: 0,
    transform: "translateY(100%)", // Start from below
    transition: "opacity 0.3s ease, transform 0.3s ease",
  },
  overlayVisible: {
    opacity: 1,
    transform: "translateY(0)", // Slide up to visible position
  },
};

function HoverOverlayWithAnimation() {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      style={styles.container}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src="https://via.placeholder.com/300x200"
        alt="Sample"
        style={styles.image}
      />
      <div
        style={{
          ...styles.overlay,
          ...(isHovered ? styles.overlayVisible : {}),
        }}
      >
        Overlay Text
      </div>
    </div>
  );
}

export default HoverOverlayWithAnimation;
