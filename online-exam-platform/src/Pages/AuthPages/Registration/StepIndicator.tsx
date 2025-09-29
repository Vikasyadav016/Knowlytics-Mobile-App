import React from "react";
import "../Registration/styles/StepIndicator.css";

interface Props {
  steps: string[];
  currentStep: number;
  completed: boolean[];
}

const StepIndicator: React.FC<Props> = ({ steps, currentStep, completed }) => {
  const progressHeight = `${
    (completed.filter(Boolean).length / steps.length) * 100
  }%`;

  const style = {
    ["--progress-line-height" as any]: progressHeight,
  } as React.CSSProperties;

  return (
    <div className="step-indicator" style={style}>
      {steps.map((step, index) => (
        <div
          key={index}
          className={`step-item ${completed[index] ? "completed" : ""} ${
            index === currentStep ? "active" : ""
          }`}
        >
          <div className="step-number">
            {completed[index] ? "✓" : index + 1}
          </div>
          <div className="step-title">{step}</div>
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
