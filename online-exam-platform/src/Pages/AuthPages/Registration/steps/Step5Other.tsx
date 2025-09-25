// components/Registration/steps/Step5Other.tsx
import React from 'react';

interface Props {
  onNext: (data: any) => void;
  onSave: (data: any) => void;
  formData: any;
}

const Step5Other: React.FC<Props> = ({ onNext, onSave, formData }) => {
  const handleNext = () => {
    // Add role-based logic later if needed
    onNext({ otherDetails: 'N/A' });
  };

  return (
    <div>
      <h3>Other Details</h3>
      <p>This section can be customized dynamically based on the selected role: <strong>{formData.role}</strong>.</p>
      <div className="form-buttons">
        <button type="button" onClick={() => onSave({ otherDetails: 'N/A' })}>Save</button>
        <button type="button" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Step5Other;
