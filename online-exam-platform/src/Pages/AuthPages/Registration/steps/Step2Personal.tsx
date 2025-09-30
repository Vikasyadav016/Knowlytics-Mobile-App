// components/Registration/steps/Step2Personal.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import "../styles/Step2Personal.css"

interface Props {
  onNext: (data: any) => void;
  onSave: (data: any) => void;
  formData: any;
}

const Step2Personal: React.FC<Props> = ({ onNext, onSave, formData }) => {
  const [preview, setPreview] = useState<string | null>(formData.image || null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      image: formData.image || null,
      name: formData.name || '',
      email: formData.email || '',
      contactNo: formData.contactNo || '',
      aadhaarNo: formData.aadhaarNo || '',
    },
  });

  const imageWatch = watch('image');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: any) => {
    onNext({
      ...data,
      image: preview,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='personal-details-main'>
      <h3 className='personal-details-heading'>Personal Details</h3>

      <div className='section'>
        <label className='label-text'>Upload Image:</label>
        <input placeholder='Upload Image' className='input' type="file" accept="image/*" onChange={handleImageChange} />
        {preview && <img src={preview} alt="preview" style={{ width: '80px', marginTop: '10px', borderRadius: '5px' }} />}
      </div>

      <div className='section'>
        <label className='label-text'>Full Name:</label>
        <input placeholder='Full Name' className='input' {...register("name", { required: "Name is required" })} />
        {errors.name && <p className="error">Name is required</p>}
      </div>

      <div className='section'>
        <label className='label-text'>Email:</label>
        <input placeholder='Email' className='input' type="email" {...register("email", { required: "Email is required" })} />
        {errors.email && <p className="error">"Email is required"</p>}
      </div>

      <div className='section'>
        <label className='label-text'>Contact No:</label>
        <input placeholder='Contact No' className='input' {...register("contactNo", {
          required: "Contact is required",
          pattern: { value: /^[0-9]{10}$/, message: "Enter 10-digit contact number" }
        })} />
        {errors.contactNo && <p className="error">Contact no is required</p>}
      </div>

      <div className='section'>
        <label className='label-text'>Aadhaar No:</label>
        <input placeholder='Aadhaar No' className='input' {...register("aadhaarNo", {
          required: "Aadhaar is required",
          pattern: { value: /^[0-9]{12}$/, message: "Enter 12-digit Aadhaar number" }
        })} />
        {errors.aadhaarNo && <p className="error">"Aadhaar number is required"</p>}
      </div>

      <div className="form-buttons">
        <button type="button" onClick={handleSubmit(onSave)}>Save</button>
        <button type="submit">Next</button>
      </div>
    </form>
  );
};

export default Step2Personal;
