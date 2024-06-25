// This directive indicates that this file is a client component in Next.js.
"use client";

// Importing necessary hooks and components from React, Flowbite, and react-icons.
import { useState, ChangeEvent, FormEvent } from "react";
import { Button, Label, TextInput, Tooltip } from "flowbite-react";
import { HiInformationCircle } from "react-icons/hi";

// Define TypeScript interfaces for form values and errors.
interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  address: string;
  phoneN: string;
  password: string;
  confPass: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  dateOfBirth?: string;
  address?: string;
  phoneN?: string;
  password?: string;
  confPass?: string;
}

// Initialize form values with empty strings.
const initialFormValues: FormValues = {
  firstName: "",
  lastName: "",
  email: "",
  dateOfBirth: "",
  address: "",
  phoneN: "",
  password: "",
  confPass: "",
};

// The main component of the page.
export default function Home() {
  // State to hold form values and errors.
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues);
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  // Function to handle input changes.
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    // Format phone number if the input field is for phone numbers.
    if (id === "phoneN") {
      const formattedPhoneNumber = formatPhoneNumber(value);
      setFormValues({ ...formValues, [id]: formattedPhoneNumber });
    } else {
      setFormValues({ ...formValues, [id]: value });
    }
  };

  // Function to format phone number.
  const formatPhoneNumber = (value: string) => {
    const numericValue = value.replace(/\D/g, ""); // Remove non-numeric characters.

    let formattedValue = numericValue;

    // Format the phone number based on its length.
    if (numericValue.length > 3 && numericValue.length <= 6) {
      formattedValue = `(${numericValue.slice(0, 3)}) ${numericValue.slice(3)}`;
    } else if (numericValue.length > 6) {
      formattedValue = `(${numericValue.slice(0, 3)}) ${numericValue.slice(3, 6)}-${numericValue.slice(6, 10)}`;
    } else if (numericValue.length > 10) {
      formattedValue = `(${numericValue.slice(0, 3)}) ${numericValue.slice(3, 6)}-${numericValue.slice(6, 10)}`;
    }

    return formattedValue;
  };

  // Function to validate form inputs.
  const validate = (): boolean => {
    const errors: FormErrors = {};

    // Validation for first name.
    if (!formValues.firstName) {
      errors.firstName = "First Name is required";
    } else if (formValues.firstName.length > 100) {
      errors.firstName = "First Name must be less than 100 characters";
    }

    // Validation for last name.
    if (!formValues.lastName) {
      errors.lastName = "Last Name is required";
    } else if (formValues.lastName.length > 100) {
      errors.lastName = "Last Name must be less than 100 characters";
    }

    // Validation for email.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formValues.email) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formValues.email)) {
      errors.email = "Email is not valid";
    }

    // Validation for date of birth.
    const today = new Date().toISOString().split("T")[0];
    if (!formValues.dateOfBirth) {
      errors.dateOfBirth = "Date of Birth is required";
    } else if (formValues.dateOfBirth > today) {
      errors.dateOfBirth = "Date of Birth cannot be in the future";
    }

    // Validation for address length.
    if (formValues.address.length > 100) {
      errors.address = "Address must be less than 100 characters";
    }

    // Validation for phone number format.
    const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
    if (formValues.phoneN && !phoneRegex.test(formValues.phoneN)) {
      errors.phoneN = "Phone number must match the format (123) 456-7890";
    }

    // Validation for password.
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[?@!#$%^&*])[A-Za-z\d?@!#$%^&*]{15,}$/;
    if (!formValues.password) {
      errors.password = "Password is required";
    } else if (!passwordRegex.test(formValues.password)) {
      errors.password = "Password must be at least 15 characters, include 1 uppercase, 1 number, and 1 special character from (?@!#$%^&*)";
    }

    // Validation for confirm password.
    if (!formValues.confPass) {
      errors.confPass = "Confirm Password is required";
    } else if (formValues.password !== formValues.confPass) {
      errors.confPass = "Passwords must match";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0; // Return true if there are no errors.
  };

  // Function to handle form submission.
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission.
    if (validate()) {
      // If the form is valid, log form values and reset the form.
      console.log("Form submitted", formValues);
      setFormValues(initialFormValues);
      alert("Form submitted successfully!");
    } else {
      // If the form has errors, log errors and show an alert.
      console.log("Form has errors", formErrors);
      alert("Form errors, please check the form inputs.");
    }
  };

  return (
    // Main container with styling.
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="z-10 w-full items-center justify-center font-mono text-sm lg:flex">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-slate-400 p-6 rounded-sm">
          <div className="flex">
            <div className="flex w-full flex-col gap-2">

              {/* First and Last Name Fields */}
              <div className="flex flex-col md:flex-row w-full gap-2">
                <div className="w-full">
                  <div className="flex items-center">
                    <Label htmlFor="firstName" value="First Name" />
                    <Tooltip content="Enter your first name. Max 100 characters." placement="top">
                      <HiInformationCircle className="ml-2 text-gray-500 cursor-pointer" />
                    </Tooltip>
                  </div>
                  <TextInput id="firstName" type="text" placeholder="First Name" required onChange={handleChange} value={formValues.firstName} />
                  {formErrors.firstName && <p className="text-red-600">{formErrors.firstName}</p>}
                </div>

                <div className="w-full">
                  <div className="flex items-center">
                    <Label htmlFor="lastName" value="Last Name" />
                    <Tooltip content="Enter your last name. Max 100 characters." placement="top">
                      <HiInformationCircle className="ml-2 text-gray-500 cursor-pointer" />
                    </Tooltip>
                  </div>
                  <TextInput id="lastName" type="text" placeholder="Last Name" required onChange={handleChange} value={formValues.lastName} />
                  {formErrors.lastName && <p className="text-red-600">{formErrors.lastName}</p>}
                </div>
              </div>

              {/* Email and Date of Birth Fields */}
              <div className="flex flex-col w-full md:flex-row gap-2">
                <div className="w-full">
                  <div className="flex items-center">
                    <Label htmlFor="email" value="Your email" />
                    <Tooltip content="Enter a valid email address." placement="top">
                      <HiInformationCircle className="ml-2 text-gray-500 cursor-pointer" />
                    </Tooltip>
                  </div>
                  <TextInput id="email" type="email" placeholder="name@flowbite.com" required onChange={handleChange} value={formValues.email} />
                  {formErrors.email && <p className="text-red-600">{formErrors.email}</p>}
                </div>

                <div className="w-full">
                  <div className="flex items-center">
                    <Label htmlFor="dateOfBirth" value="Date of Birth" />
                    <Tooltip content="Select your date of birth. Future dates are not allowed." placement="top">
                      <HiInformationCircle className="ml-2 text-gray-500 cursor-pointer" />
                    </Tooltip>
                  </div>
                  <TextInput id="dateOfBirth" type="date" placeholder="Date of Birth" required onChange={handleChange} value={formValues.dateOfBirth} />
                  {formErrors.dateOfBirth && <p className="text-red-600">{formErrors.dateOfBirth}</p>}
                </div>
              </div>

              {/* Address and Phone Number Fields */}
              <div className="flex flex-col w-full md:flex-row gap-2">
                <div className="w-full">
                  <div className="flex items-center">
                    <Label htmlFor="address" value="Address" />
                    <Tooltip content="Enter your address. Max 100 characters." placement="top">
                      <HiInformationCircle className="ml-2 text-gray-500 cursor-pointer" />
                    </Tooltip>
                  </div>
                  <TextInput id="address" type="text" placeholder="Address" onChange={handleChange} value={formValues.address} />
                  {formErrors.address && <p className="text-red-600">{formErrors.address}</p>}
                </div>

                <div className="w-full">
                  <div className="flex items-center">
                    <Label htmlFor="phoneN" value="Phone number" />
                    <Tooltip content="Enter your phone number in the format (123) 456-7890." placement="top">
                      <HiInformationCircle className="ml-2 text-gray-500 cursor-pointer" />
                    </Tooltip>
                  </div>
                  <TextInput id="phoneN" type="text" placeholder="Phone number" onChange={handleChange} value={formValues.phoneN} />
                  {formErrors.phoneN && <p className="text-red-600">{formErrors.phoneN}</p>}
                </div>
              </div>

              {/* Password and Confirm Password Fields */}
              <div className="flex flex-col w-full md:flex-row gap-2">
                <div className="w-full">
                  <div className="flex items-center">
                    <Label htmlFor="password" value="Password" />
                    <Tooltip content="Password must be at least 15 characters, include 1 uppercase, 1 number, and 1 special character from (?@!#$%^&*)." placement="top">
                      <HiInformationCircle className="ml-2 text-gray-500 cursor-pointer" />
                    </Tooltip>
                  </div>
                  <TextInput id="password" type="password" placeholder="Password" required onChange={handleChange} value={formValues.password} />
                  {formErrors.password && <p className="text-red-600">{formErrors.password}</p>}
                </div>

                <div className="w-full">
                  <div className="flex items-center">
                    <Label htmlFor="confPass" value="Confirm Password" />
                    <Tooltip content="Enter the same password as above." placement="top">
                      <HiInformationCircle className="ml-2 text-gray-500 cursor-pointer" />
                    </Tooltip>
                  </div>
                  <TextInput id="confPass" type="password" placeholder="Confirm Password" required onChange={handleChange} value={formValues.confPass} />
                  {formErrors.confPass && <p className="text-red-600">{formErrors.confPass}</p>}
                </div>
              </div>

            </div>
          </div>

          {/* Submit button */}
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </main>
  );
}
