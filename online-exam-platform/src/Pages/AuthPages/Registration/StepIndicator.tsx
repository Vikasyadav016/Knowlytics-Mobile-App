// // components/Registration/StepIndicator.tsx
// import React from "react";
// // import './styles/StepIndicator.css';
// import "../Registration/styles/StepIndicator.css";

// interface Props {
//   steps: string[];
//   currentStep: number;
//   completed: boolean[];
// }

// const StepIndicator: React.FC<Props> = ({ steps, currentStep, completed }) => {

  
//   return (
//     <div
//       className="step-indicator"
//       style={{
//         "--progress-line-height": `${
//           (completedSteps.filter(Boolean).length / steps.length) * 100
//         }%`,
//       }}
//     >
//       {steps.map((step, index) => (
//         <div
//           key={index}
//           className={`step-item ${completed[index] ? "completed" : ""} ${
//             index === currentStep ? "active" : ""
//           }`}
//         >
//           <div className="step-number">
//             {completed[index] ? "✓" : index + 1}
//           </div>
//           <div className="step-title">{step}</div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default StepIndicator;


// components/Registration/StepIndicator.tsx
import React from "react";
import "../Registration/styles/StepIndicator.css";

interface Props {
  steps: string[];
  currentStep: number;
  completed: boolean[];
}

const StepIndicator: React.FC<Props> = ({ steps, currentStep, completed }) => {
  // Calculate the progress height % for vertical line
  const progressHeight = `${(completed.filter(Boolean).length / steps.length) * 100}%`;

  // We need to cast style to allow CSS variable
  const style = {
    // TS requires this cast to allow CSS custom properties
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

