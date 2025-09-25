// components/Registration/steps/Step7Terms.tsx
import React from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  onNext: (data: any) => void;
  onSave: (data: any) => void;
  formData: any;
}

const Step7Terms: React.FC<Props> = ({ onNext, onSave, formData }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      accept: false
    }
  });

  const onSubmit = (data: any) => {
    onNext({ acceptedTerms: data.accept });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3>Terms and Conditions</h3>

      <div className="terms-box">
        <p>
          By proceeding, you agree to our terms and conditions. You acknowledge that all the details entered are true and correct.
        </p>
      </div>

      <label>
        <input type="checkbox" {...register("accept", { required: "You must accept terms" })} />
        I accept the terms and conditions
      </label>
      {errors.accept && <p className="error">{errors.accept.message}</p>}

      <div className="form-buttons">
        <button type="button" onClick={handleSubmit(onSave)}>Save</button>
        <button type="submit">Preview</button>
      </div>
    </form>
  );
};

export default Step7Terms;
