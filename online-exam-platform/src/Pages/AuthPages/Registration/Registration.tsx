// components/Registration/Registration.tsx
import React, { useState } from "react";
import "../Registration/styles/Registration.css";
import { steps } from "./stepsConfig";
import StepIndicator from "./StepIndicator";
import StepForm from "./StepForm";
import Step8Preview from "./steps/Step8Preview";

const Registration: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({});
  const [completedSteps, setCompletedSteps] = useState<boolean[]>(
    Array(steps.length).fill(false)
  );
  const [step, setStep] = useState(0);

  const handleNext = (data: any) => {
    const newFormData = { ...formData, ...data };
    const updatedSteps = [...completedSteps];
    updatedSteps[currentStep] = true;

    setFormData(newFormData);
    // setFormData((prev: any) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
    setCompletedSteps(updatedSteps);

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSave = (data: any) => {
    setFormData({ ...formData, ...data });
  };

  const handleEditStep = (stepIndex: any) => {
    setStep(stepIndex);
  };

  const handleSubmit = () => {
    // Here send formData to backend or show success message
    alert("Registration submitted successfully!");
    console.log("Submitted data:", formData);
  };

  return (
    <>
      <div className="registration-bg">
        <div className="registration-container">
          <div className="step-card">
            <StepIndicator
              steps={steps}
              currentStep={currentStep}
              completed={completedSteps}
            />
          </div>
          <div className="form-card">
            {step < 7 && (
              <StepForm
                step={currentStep}
                onNext={handleNext}
                onSave={handleSave}
                formData={formData}
              />
            )}
          </div>
          <div>
            {step === 7 && (
              <Step8Preview
                formData={formData}
                onEditStep={handleEditStep}
                onSubmit={handleSubmit}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
