import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


function Page1() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [existingUsers, setExistingUsers] = useState([]);
  const history = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let response = await axios.get("https://663b06c1fee6744a6ea00a43.mockapi.io/crud");
      setExistingUsers(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSubmit = async (e) => {
    debugger;
    e.preventDefault();

    if (!name.trim()) {
      setErrors({ name: "Name is required" });
      return;
    }

    if (!email.trim()) {
      setErrors({ email: "Email is required" });
      return;
    }

    const isDuplicate = existingUsers.some(
      (user) =>
        user.name.toLowerCase() === name.toLowerCase() ||
        user.email.toLowerCase() === email.toLowerCase()
    );

    if (isDuplicate) {
      Swal.fire("Error", "Name or email already exists", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors({ email: "Invalid email format" });
      return;
    }

    try {
      const response = await axios.post("https://663b06c1fee6744a6ea00a43.mockapi.io/crud", {
        name: name,
        email: email,
        course : "",
      })    ;
      console.log("Form submitted successfully:", response.data);
      Swal.fire("Success!", "Form submitted successfully!", "success");
      history("/read");
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire("Error", "Failed to submit form", "error");
    }
  };

  return (
    <div>
      <div className="container my-4"></div>
      <h1>
        <i>Crud project</i>
      </h1>
      <div className="container my-4"></div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            type="name"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <p style={{ color: "red" }}> {errors.name}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputPassword1"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p style={{ color: "red" }}> {errors.email}</p>}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Page1;
