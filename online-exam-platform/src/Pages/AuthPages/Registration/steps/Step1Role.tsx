// components/Registration/steps/Step1Role.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import "../styles/Step1Role.css"

interface Props {
  onNext: (data: any) => void;
  onSave: (data: any) => void;
  formData: any;
}

const Step1Role: React.FC<Props> = ({ onNext, onSave, formData }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { role: formData.role || '' }
  });

  const onSubmit = (data: any) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Select Your Role</h3>
      <select {...register("role", { required: "Role is required" })}>
        <option value="">Select Role</option>
        <option value="Student">Student</option>
        <option value="Examiner">Examiner</option>
        <option value="Examee">Examee</option>
        <option value="Admin">Admin</option>
      </select>
      {errors.role && <p className="error">Role is required</p>}

      <div className="form-buttons">
        <button type="button" onClick={handleSubmit(onSave)}>Save</button>
        <button type="submit">Next</button>
      </div>
    </form>
  );
};

export default Step1Role;
