// components/Registration/steps/Step6Password.tsx
import React from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  onNext: (data: any) => void;
  onSave: (data: any) => void;
  formData: any;
}

const Step6Password: React.FC<Props> = ({ onNext, onSave, formData }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: ''
    }
  });

  const password = watch("password");

  const onSubmit = (data: any) => {
    onNext({ password: data.password });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='password-details-main'>
      <h3>Create Password</h3>

      <input className='input-field' type="password" placeholder="Password" {...register("password", {
        required: "Password is required",
        minLength: { value: 6, message: "Min 6 characters" }
      })} />
      {errors.password && <p className="error">{errors.password.message}</p>}

      <input className='input-field' type="password" placeholder="Confirm Password" {...register("confirmPassword", {
        required: "Confirm your password",
        validate: (value) => value === password || "Passwords do not match"
      })} />
      {errors.confirmPassword && <p className="error">{errors.confirmPassword.message}</p>}

      <div className="form-buttons">
        <button type="button" onClick={handleSubmit(onSave)}>Save</button>
        <button type="submit">Next</button>
      </div>
    </form>
  );
};

export default Step6Password;
