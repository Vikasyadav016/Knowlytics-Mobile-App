// components/Registration/steps/Step4Address.tsx
import React from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  onNext: (data: any) => void;
  onSave: (data: any) => void;
  formData: any;
}

const Step4Address: React.FC<Props> = ({ onNext, onSave, formData }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      state: formData.state || '',
      district: formData.district || '',
      village: formData.village || '',
      postOffice: formData.postOffice || '',
      wardNo: formData.wardNo || '',
      pincode: formData.pincode || '',
    }
  });

  const onSubmit = (data: any) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='address-details-main'>
      <h3 className='address-details-heading'>Address Details</h3>

      <label>State:</label>
      <select {...register("state", { required: "State is required" })}>
        <option value="">Select State</option>
        <option value="State1">State 1</option>
        <option value="State2">State 2</option>
      </select>
      {errors.state && <p className="error">State is required</p>}

      <label>District:</label>
      <select {...register("district", { required: "District is required" })}>
        <option value="">Select District</option>
        <option value="District1">District 1</option>
        <option value="District2">District 2</option>
      </select>
      {errors.district && <p className="error">District is required</p>}

      <input className='input-field' placeholder="Village" {...register("village", { required: "Village is required" })} />
      {errors.village && <p className="error">Village is required</p>}

      <input className='input-field' placeholder="Post Office" {...register("postOffice", { required: "Post Office is required" })} />
      {errors.postOffice && <p className="error">Post office is required</p>}

      <input className='input-field' placeholder="Ward No" {...register("wardNo", { required: "Ward No is required" })} />
      {errors.wardNo && <p className="error">Ward no is required</p>}

      <input className='input-field'
        placeholder="Pincode"
        {...register("pincode", {
          required: "Pincode is required",
          pattern: { value: /^[0-9]{6}$/, message: "Enter 6-digit pincode" }
        })}
      />
      {errors.pincode && <p className="error">Pincode is required</p>}

      <div className="form-buttons">
        <button type="button" onClick={handleSubmit(onSave)}>Save</button>
        <button type="submit">Next</button>
      </div>
    </form>
  );
};

export default Step4Address;
