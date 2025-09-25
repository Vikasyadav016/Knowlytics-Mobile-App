// components/Registration/StepForm.tsx
import React from 'react';
import Step1Role from './steps/Step1Role';
import Step2Personal from './steps/Step2Personal';
import Step3Guardian from './steps/Step3Guardian';
import Step4Address from './steps/Step4Address';
import Step5Other from './steps/Step5Other';
import Step6Password from './steps/Step6Password';
import Step7Terms from './steps/Step7Terms';
import Step8Preview from './steps/Step8Preview';

// ... import other step components

interface Props {
  step: number;
  onNext: (data: any) => void;
  onSave: (data: any) => void;
  formData: any;
}

const StepForm: React.FC<Props> = ({ step, onNext, onSave, formData }) => {
  const props = { onNext, onSave, formData };

  switch (step) {
    case 0: return <Step1Role {...props} />;
    case 1: return <Step2Personal {...props} />;
    case 2: return <Step3Guardian {...props} />;
    case 3: return <Step4Address {...props} />;
    case 4: return <Step5Other {...props} />;
    case 5: return <Step6Password {...props} />;
    case 6: return <Step7Terms {...props} />;
    case 7: return <Step8Preview onEditStep={function (stepIndex: number): void {
          throw new Error('Function not implemented.');
      } } onSubmit={function (): void {
          throw new Error('Function not implemented.');
      } } {...props} />;
    // continue cases up to Step7Terms
    default: return <div>Invalid Step</div>;
  }
};

export default StepForm;
