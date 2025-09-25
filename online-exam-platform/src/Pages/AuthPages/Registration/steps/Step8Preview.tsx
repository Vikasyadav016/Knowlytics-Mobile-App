// components/Registration/steps/Step8Preview.tsx
import React from 'react';

interface Props {
  formData: any;
  onEditStep: (stepIndex: number) => void;
  onSubmit: () => void;
}

const Step8Preview: React.FC<Props> = ({ formData, onEditStep, onSubmit }) => {
  return (
    <div className="preview-container">
      <h2>Preview Your Details</h2>

      <div className="preview-cards">

        {/* Step 1 */}
        <div className="preview-card">
          <h3>Step 1: Register As</h3>
          <p><strong>Role:</strong> {formData.role || '-'}</p>
          <button onClick={() => onEditStep(0)}>Edit</button>
        </div>

        {/* Step 2 */}
        <div className="preview-card">
          <h3>Step 2: Personal Details</h3>
          {formData.image && (
            <img
              src={formData.image}
              alt="Profile"
              style={{ width: '100px', borderRadius: '8px', marginBottom: '8px' }}
            />
          )}
          <p><strong>Name:</strong> {formData.name || '-'}</p>
          <p><strong>Email:</strong> {formData.email || '-'}</p>
          <p><strong>Contact No:</strong> {formData.contactNo || '-'}</p>
          <p><strong>Aadhaar No:</strong> {formData.aadhaarNo || '-'}</p>
          <button onClick={() => onEditStep(1)}>Edit</button>
        </div>

        {/* Step 3 */}
        <div className="preview-card">
          <h3>Step 3: Guardian Details</h3>
          <p><strong>Father Name:</strong> {formData.fatherName || '-'}</p>
          <p><strong>Mother Name:</strong> {formData.motherName || '-'}</p>
          <p><strong>Guardian Contact:</strong> {formData.guardianContact || '-'}</p>
          <p><strong>Guardian Aadhaar:</strong> {formData.guardianAadhaar || '-'}</p>
          <p><strong>Guardian Email:</strong> {formData.guardianEmail || '-'}</p>
          <button onClick={() => onEditStep(2)}>Edit</button>
        </div>

        {/* Step 4 */}
        <div className="preview-card">
          <h3>Step 4: Address Details</h3>
          <p><strong>State:</strong> {formData.state || '-'}</p>
          <p><strong>District:</strong> {formData.district || '-'}</p>
          <p><strong>Village:</strong> {formData.village || '-'}</p>
          <p><strong>Post Office:</strong> {formData.postOffice || '-'}</p>
          <p><strong>Ward No:</strong> {formData.wardNo || '-'}</p>
          <p><strong>Pincode:</strong> {formData.pincode || '-'}</p>
          <button onClick={() => onEditStep(3)}>Edit</button>
        </div>

        {/* Step 5 */}
        <div className="preview-card">
          <h3>Step 5: Other Details</h3>
          <p>{formData.otherDetails || '-'}</p>
          <button onClick={() => onEditStep(4)}>Edit</button>
        </div>

        {/* Step 6 */}
        <div className="preview-card">
          <h3>Step 6: Password</h3>
          <p>Password: *******</p>
          <button onClick={() => onEditStep(5)}>Edit</button>
        </div>

        {/* Step 7 */}
        <div className="preview-card">
          <h3>Step 7: Terms & Conditions</h3>
          <p>{formData.acceptedTerms ? 'Accepted' : 'Not Accepted'}</p>
          <button onClick={() => onEditStep(6)}>Edit</button>
        </div>
      </div>

      <button className="submit-btn" onClick={onSubmit}>Submit Registration</button>

      <style jsx>{`
        .preview-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 20px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
          text-align: center;
          color: #333;
        }
        .preview-cards {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          justify-content: center;
          margin: 20px 0;
        }
        .preview-card {
          background: #f8f9fa;
          border-radius: 10px;
          padding: 20px;
          flex: 1 1 250px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          text-align: left;
          position: relative;
          transition: transform 0.3s ease;
        }
        .preview-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        }
        .preview-card h3 {
          margin-bottom: 12px;
          color: #1e40af; /* gradient-like color */
        }
        .preview-card button {
          position: absolute;
          top: 20px;
          right: 20px;
          background: transparent;
          border: none;
          color: #2563eb;
          cursor: pointer;
          font-weight: 600;
          transition: color 0.2s ease;
        }
        .preview-card button:hover {
          color: #1d4ed8;
        }
        .submit-btn {
          background: linear-gradient(45deg, #4f46e5, #3b82f6);
          color: white;
          border: none;
          padding: 14px 40px;
          border-radius: 30px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background 0.3s ease;
          margin-top: 20px;
        }
        .submit-btn:hover {
          background: linear-gradient(45deg, #4338ca, #2563eb);
        }

        @media (max-width: 768px) {
          .preview-cards {
            flex-direction: column;
          }
          .preview-card {
            width: 100%;
            position: relative;
          }
          .preview-card button {
            position: static;
            margin-top: 10px;
            display: inline-block;
          }
        }
      `}</style>
    </div>
  );
};

export default Step8Preview;
