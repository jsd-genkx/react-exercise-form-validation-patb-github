// start with code from 02_FormInputValidationNoStyling.jsx and apply your own tailwind styling

import { useEffect, useState } from "react";
export default function FormInputValidationNoStyling() {
  // TODO: create state variables for email, password, hidePassword, emailError, passwordError
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submittedData, setSubmittedData] = useState([]);

  // TODO: use useEffect hook to run functions to validate the input email and password
  // TODO: provide a button to show or hide the password
  // TODO: ensure the button is correctly set up in the the form element
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // from solution
  const isValidEmail = (email) => emailRegex.test(email);
  const isValidPassword = (password) => password.length >= 6;

  useEffect(() => {
    const validateEmail = () => {
      // code here:
      if (email === "")               setEmailError("");
      else if (!isValidEmail(email))  setEmailError("Invalid email. Please fix the error.");
      else                            setEmailError("");
    };
    const validatePassword = () => {
      // code here:
      if (password === "")                 setPasswordError("");
      else if (!isValidPassword(password)) setPasswordError("Invalid password. Please fix the error.");
      else                                 setPasswordError("");
    };

    validateEmail();
    validatePassword();
  }, [email, password]);

  function handleSubmit(e) {
    e.preventDefault();
    // code here:
    if (email === "" || password === "") {
      alert("Please complete all fields");
    }
    else if (emailError !== "" && passwordError !== "") {
      alert("Please fix invalid email and password");
    }
    else if (emailError !== "") {
      alert("Please fix invalid email");
    }
    else if (passwordError !== "") {
      alert("Please fix invalid password");
    }
    else {
      setSubmittedData((prev) => [...submittedData, {email: email, password: password}]);
      alert("Your email and password has been successfully registered.")
    }
  }

  function handleHidePassword(e) {
    e.preventDefault();
    // code here:
    setHidePassword(!hidePassword);
  }

  return (
    <div className="bg-yellow-100 min-h-screen flex flex-col justify-center items-center gap-2">
      <h1 className="text-2xl font-bold">Registration Form</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between gap-5 p-2">
          <label >Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && email !== "" && <p>{emailError}</p>}
        </div>
        <div >
          <label>Password:</label>
          <input
            type={hidePassword ? "password" : "text"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center mt-2 justify-center">
            <button onClick={handleHidePassword}>
              {hidePassword ? "Show Password" : "Hide Password"}
            </button>
          </div>
          {passwordError && password !== "" && <p>{passwordError}</p>}
        </div>
        <div className="flex justify-center">
          <button type="submit" className="bg-green-300">Submit</button>
        </div>
      </form>
      <div>
        <h2>Submitted Data</h2>
        <ul>
          {submittedData.map((entry, index) => (
            <li key={index}>
              Email: {entry.email}, Password: {entry.password}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
