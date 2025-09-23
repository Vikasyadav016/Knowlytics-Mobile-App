import React from "react";
import "../AuthStyling/Login.css";

const LoginPage: React.FC = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  // Simple email regex for basic validation
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Validate fields on change
  React.useEffect(() => {
    if (email === "") {
      setEmailError("");
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  }, [email]);

  React.useEffect(() => {
    if (password === "") {
      setPasswordError("");
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
    } else {
      setPasswordError("");
    }
  }, [password]);

  const isFormValid = () => {
    return validateEmail(email) && password.length >= 6;
  };
  const onBack = () => {};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid()) {
      //   onLogin(email, password);
    }
  };

  return (
    <div className="login-page">
      <div className="left-section">
        <div className="project-name">ExamPro</div>
        <p className="project-subtitle">Seamless Online Exam Platform</p>
      </div>

      <div className="right-section">
        <div className="login-card">
          <button className="back-button" onClick={onBack} aria-label="Go back">
            &larr; Back
          </button>

          <form className="login-form" onSubmit={handleSubmit} noValidate>
            <h2 className="login-title">Login</h2>

            <label htmlFor="email" className="input-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              className={`input-field ${emailError ? "input-error" : ""}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
            {emailError && <div className="error-text">{emailError}</div>}

            <label htmlFor="password" className="input-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              className={`input-field ${passwordError ? "input-error" : ""}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
            {passwordError && <div className="error-text">{passwordError}</div>}

            <button
              type="submit"
              className="login-button"
              disabled={!isFormValid()}
              aria-disabled={!isFormValid()}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
