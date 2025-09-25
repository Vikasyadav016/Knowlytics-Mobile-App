import React, { useContext, useState } from "react";
import "../AuthStyling/Registration.css";
import { AuthContext } from "../../../Auth/AuthProvider";
import NavBar from "../../../CommonComponents/NavigationBar";
import "../../../CommonComponents/NavBar.css"

const DEFAULT_USER_ICON =
  "https://cdn-icons-png.flaticon.com/512/847/847969.png";

type UserRole =
  | "examiner"
  | "examinee"
  | "question-setter"
  | "verifier"
  | "admin";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole | "";
  aadhar: string;
  mobile: string;
  image: File | null;
  fathername: string;
  mothername: string;
  gardianemail: string;
  gardianmobile: string;
  gardianaadhar: string;
  acceptTerms: boolean;
}

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
  aadhar?: string;
  mobile?: string;
  image?: string;
  fathername: string;
  mothername: string;
  gardianemail: string;
  gardianmobile: string;
  gardianaadhar: string;
  acceptTerms?: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const aadharRegex = /^\d{12}$/;
const mobileRegex = /^\d{10}$/;

const Registration: React.FC = () => {
 const { isAuthenticated } = useContext(AuthContext);
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    aadhar: "",
    mobile: "",
    image: null,
    fathername: "",
    mothername: "",
    gardianemail: "",
    gardianmobile: "",
    gardianaadhar: "",
    acceptTerms: false,
  });
console.log("isAuthenticated",isAuthenticated)
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const validateField = (
    name: string,
    value: string | File | null
  ): string | undefined => {
    switch (name) {
      case "username":
        if (!value || (typeof value === "string" && value.trim().length < 3)) {
          return "Username must be at least 3 characters";
        }
        break;
      case "email":
        if (!value || (typeof value === "string" && !emailRegex.test(value))) {
          return "Invalid email address";
        }
        break;
      case "fathername":
        if (!value || (typeof value === "string" && value.trim().length < 3)) {
          return "Father name must be at least 3 characters";
        }
        break;
      case "mothername":
        if (!value || (typeof value === "string" && value.trim().length < 3)) {
          return "Mother name must be at least 3 characters";
        }
        break;
      case "gardianemail":
        if (!value || (typeof value === "string" && !emailRegex.test(value))) {
          return "Invalid gardian email address";
        }
        break;
      case "password":
        if (!value || (typeof value === "string" && value.length < 6)) {
          return "Password must be at least 6 characters";
        }
        break;
      case "confirmPassword":
        if (value !== formData.password) {
          return "Passwords don't match";
        }
        break;
      case "role":
        if (!value) {
          return "Please select a role";
        }
        break;
      case "aadhar":
        if (!value || (typeof value === "string" && !aadharRegex.test(value))) {
          return "Aadhar number must be exactly 12 digits";
        }
        break;
      case "mobile":
        if (!value || (typeof value === "string" && !mobileRegex.test(value))) {
          return "Mobile number must be exactly 10 digits";
        }
        break;
      case "gardianaadhar":
        if (!value || (typeof value === "string" && !aadharRegex.test(value))) {
          return "Gardian Aadhar number must be exactly 12 digits";
        }
        break;
      case "gardianmobile":
        if (!value || (typeof value === "string" && !mobileRegex.test(value))) {
          return "Gardian Mobile number must be exactly 10 digits";
        }
        break;
      case "image":
        if (!value) {
          return "Please upload an image";
        }
        if (value instanceof File) {
          const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
          if (!allowedTypes.includes(value.type)) {
            return "Only JPG, JPEG, and PNG images are allowed";
          }
          if (value.size > 2 * 1024 * 1024) {
            return "Image size must be less than 2MB";
          }
        }
        break;
      case "acceptTerms":
        if (!value) {
          return "You must accept the terms and conditions";
        }
        break;
      default:
        break;
    }
    return undefined;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && e.target.files) {
      const file = e.target.files[0];
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setImagePreview(null);
      }

      const error = validateField(name, file);
      setFormErrors((prev) => ({ ...prev, [name]: error }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    const error = validateField(name, value);
    setFormErrors((prev) => ({ ...prev, [name]: error }));

    if (name === "password" && formData.confirmPassword) {
      const confirmError = validateField(
        "confirmPassword",
        formData.confirmPassword
      );
      setFormErrors((prev) => ({ ...prev, confirmPassword: confirmError }));
    }
    if (name === "confirmPassword") {
      const confirmError = validateField("confirmPassword", value);
      setFormErrors((prev) => ({ ...prev, confirmPassword: confirmError }));
    }
  };

  const validateAll = (): boolean => {
    const errors: FormErrors = {};

    (Object.keys(formData) as (keyof FormData)[]).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) errors[field] = error;
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAll()) return;

    alert(`Registered successfully as ${formData.role}!`);
  };

const navItems = [
  { label: 'Home', route: '/' },
];

/*

i need a registration page.
what actually i want and how i want i am write here.
create a component of Registration.tsx
when we land on this page i want to fallow user the registration process.
in left side the steps will show and on that step completion that step will ticked and colur of that step shoul dbe changed.
and in right side according to step wise the UI will be showing to user to fiill mandatory details step by step.
This all should be responsive.
in desktop the step should be shown in left side of screen and the UI in right side of screen.
and in any mobile devices screen the step will shown in above UI horizontally. and the UI will be below step indicator.
All should be wrapped in card.
step indicator should be in other card and UI shoul dbe in other and each step UI have two buttons in below that should be save and next.
In registartion page background should be linear radiant of two colur.
  on each step according to field the validation function should be there and if validation error there should be shown on below of that field.
  Create as much possible as maintainable component based and adaptable.
  dont make much complex.
  All should be responsive 
  Ui an dpage should be attratcive as user perspective looks good and feel like Something gradiant ui is infront of eye.
  Here is the steps
  Step-1 as Register as(role)
  UI field will be a dropdown select role(Student, Examer, examee, Admin,etc)
  Step-2 as Personal Details
  UI fields on this step
  image,name,email,contactNo,aadhaarNo,
  Step-3 as gardian details
  UI fields on this step
  Father name, mother name, gardian contact, gardian aadhar, gardian email,
  step-4 as address details
  UI field on this step
  State(dropdown),district(dropdown),village(text),post office(text),wardno(text),pincode(only number)
  Step-5 Other details according to selected role.
  step-6 Password creation
  UI field should be as password, confirm password
  step-7 Terms and conditions
  UI field on this step should be
a checkbox and content of terms and condition mentioned.
on final step the next button should be preview button
*/


  return (
    <>
    <NavBar items={navItems} className="my-navbar" activeClassName="my-active-link" />
    <div className="registration-container">
      <form onSubmit={handleSubmit} className="registration-form" noValidate>
        <h2>Create Account</h2>
        <div className="image-upload-wrapper" style={{ display: "flex", gap: "20px" }}>
          <div
            className="upload-field"
            style={{ flex: 1, display: "flex", flexDirection: "column" }}
          >
            <label htmlFor="image">Upload User Image *</label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleChange}
              className={formErrors.image ? "input-error" : ""}
            />
            {formData.image && (
              <small className="file-name">{formData.image.name}</small>
            )}
            {formErrors.image && (
              <small className="error">{formErrors.image}</small>
            )}
          </div>

          <div
            className="image-preview-wrapper"
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              maxHeight: "200px",
            }}
          >
            <img
              src={imagePreview || DEFAULT_USER_ICON}
              alt="User preview"
              className="image-preview"
              style={{ maxWidth: "100%", maxHeight: "180px", borderRadius: "50%" }}
            />
          </div>
        </div>

        <div className="fields-wrapper">
          <div className="form-group">
            <label htmlFor="username">Name *</label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              className={formErrors.username ? "input-error" : ""}
            />
            {formErrors.username && (
              <small className="error">{formErrors.username}</small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">User Email *</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              className={formErrors.email ? "input-error" : ""}
            />
            {formErrors.email && (
              <small className="error">{formErrors.email}</small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="mobile">User Mobile Number *</label>
            <input
              id="mobile"
              name="mobile"
              type="text"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="10 digit mobile number"
              maxLength={10}
              className={formErrors.mobile ? "input-error" : ""}
            />
            {formErrors.mobile && (
              <small className="error">{formErrors.mobile}</small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="aadhar">User Aadhaar Number *</label>
            <input
              id="aadhar"
              name="aadhar"
              type="text"
              value={formData.aadhar}
              onChange={handleChange}
              placeholder="Enter 12 digit Aadhar number"
              maxLength={12}
              className={formErrors.aadhar ? "input-error" : ""}
            />
            {formErrors.aadhar && (
              <small className="error">{formErrors.aadhar}</small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="username">Father Name *</label>
            <input
              id="fathername"
              name="fathername"
              type="text"
              value={formData.fathername}
              onChange={handleChange}
              placeholder="Enter father name"
              className={formErrors.fathername ? "input-error" : ""}
            />
            {formErrors.fathername && (
              <small className="error">{formErrors.fathername}</small>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="username">Mother Name *</label>
            <input
              id="mothername"
              name="mothername"
              type="text"
              value={formData.mothername}
              onChange={handleChange}
              placeholder="Enter mother name"
              className={formErrors.mothername ? "input-error" : ""}
            />
            {formErrors.mothername && (
              <small className="error">{formErrors.mothername}</small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Gardian Email *</label>
            <input
              id="gardianemail"
              name="gardianemail"
              type="gardianemail"
              value={formData.gardianemail}
              onChange={handleChange}
              placeholder="Enter gardian email"
              className={formErrors.gardianemail ? "input-error" : ""}
            />
            {formErrors.gardianemail && (
              <small className="error">{formErrors.gardianemail}</small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="mobile">Gardian Mobile Number *</label>
            <input
              id="gardianmobile"
              name="gardianmobile"
              type="text"
              value={formData.gardianmobile}
              onChange={handleChange}
              placeholder="10 digit mobile number"
              maxLength={10}
              className={formErrors.gardianmobile ? "input-error" : ""}
            />
            {formErrors.gardianmobile && (
              <small className="error">{formErrors.gardianmobile}</small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="aadhar">Gardian Aadhaar Number *</label>
            <input
              id="gardianaadhar"
              name="gardianaadhar"
              type="text"
              value={formData.gardianaadhar}
              onChange={handleChange}
              placeholder="Enter 12 digit Aadhar number"
              maxLength={12}
              className={formErrors.gardianaadhar ? "input-error" : ""}
            />
            {formErrors.gardianaadhar && (
              <small className="error">{formErrors.gardianaadhar}</small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              className={formErrors.password ? "input-error" : ""}
            />
            {formErrors.password && (
              <small className="error">{formErrors.password}</small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password *</label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
              className={formErrors.confirmPassword ? "input-error" : ""}
            />
            {formErrors.confirmPassword && (
              <small className="error">{formErrors.confirmPassword}</small>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="role">Select Role *</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={formErrors.role ? "input-error" : ""}
            >
              <option value="">-- Select Role --</option>
              <option value="examiner">Examiner</option>
              <option value="examinee">Examinee</option>
              <option value="question-setter">Question Setter</option>
              <option value="verifier">Verifier</option>
              <option value="admin">Admin</option>
            </select>
            {formErrors.role && (
              <small className="error">{formErrors.role}</small>
            )}
          </div>

          <div className="form-group" style={{ marginTop: "15px" }}>
            <label>
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                className={formErrors.acceptTerms ? "input-error" : ""}
              />{" "}
              I accept the{" "}
              <a href="/terms" target="_blank" rel="noopener noreferrer">
                Terms and Conditions
              </a>{" "}
              *
            </label>
            {formErrors.acceptTerms && (
              <small className="error">{formErrors.acceptTerms}</small>
            )}
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Register
        </button>
      </form>
    </div>
    </>
  );
};

export default Registration;
