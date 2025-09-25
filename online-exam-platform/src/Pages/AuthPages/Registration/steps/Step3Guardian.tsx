// components/Registration/steps/Step3Guardian.tsx
import React from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  onNext: (data: any) => void;
  onSave: (data: any) => void;
  formData: any;
}

const Step3Guardian: React.FC<Props> = ({ onNext, onSave, formData }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      fatherName: formData.fatherName || '',
      motherName: formData.motherName || '',
      guardianContact: formData.guardianContact || '',
      guardianAadhaar: formData.guardianAadhaar || '',
      guardianEmail: formData.guardianEmail || '',
    }
  });

  const onSubmit = (data: any) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Guardian Details</h3>

      <input placeholder="Father Name" {...register("fatherName", { required: true })} />
      {errors.fatherName && <p className="error">Father name is required</p>}

      <input placeholder="Mother Name" {...register("motherName", { required: true })} />
      {errors.motherName && <p className="error">Mother name is required</p>}

      <input placeholder="Guardian Contact" {...register("guardianContact", {
        required: true,
        pattern: { value: /^[0-9]{10}$/, message: "Enter valid 10-digit contact" }
      })} />
      {errors.guardianContact && <p className="error">{errors.guardianContact.message}</p>}

      <input placeholder="Guardian Aadhaar" {...register("guardianAadhaar", {
        required: true,
        pattern: { value: /^[0-9]{12}$/, message: "Enter 12-digit Aadhaar" }
      })} />
      {errors.guardianAadhaar && <p className="error">{errors.guardianAadhaar.message}</p>}

      <input placeholder="Guardian Email" {...register("guardianEmail", { required: true })} />
      {errors.guardianEmail && <p className="error">Email is required</p>}

      <div className="form-buttons">
        <button type="button" onClick={handleSubmit(onSave)}>Save</button>
        <button type="submit">Next</button>
      </div>
    </form>
  );
};

export default Step3Guardian;
