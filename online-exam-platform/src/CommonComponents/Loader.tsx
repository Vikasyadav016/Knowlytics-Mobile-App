import React from "react";

interface LoaderProps {
  loading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ loading }) => {
  if (!loading) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.spinner} />
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
  },
  spinner: {
    width: 60,
    height: 60,
    border: "8px solid #ccc",
    borderTop: "8px solid #007bff",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

// Add keyframes for spin animation globally
const styleSheet = document.styleSheets[0];
const keyframes = 
`@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;

styleSheet.insertRule(keyframes, styleSheet.cssRules.length);

export default Loader;
