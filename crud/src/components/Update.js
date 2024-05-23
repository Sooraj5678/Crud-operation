import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Update() {
  const [id, setid] = useState(0);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [Course, setCourse] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setid(localStorage.getItem("id"));
    setname(localStorage.getItem("name"));
    setemail(localStorage.getItem("email"));
    setCourse(localStorage.getItem("Course"));
  }, []);
  

  const handlesubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:4000/api/users/${id}`, {
        name: name,
        email: email,
        Course: Course,
      })
      .then(() => {
        navigate("/read");
      });
  };

  return (
    <div>
      <div className="container  my-4 "></div>
      <h1>
        <i>Update project</i>
      </h1>
      <div className="container  my-4 "></div>
      <form>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            type="name"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputPassword1"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <select
          className="form-select"
          aria-label="Default select example"
          onClick={(e) => setCourse(e.target.value)}
        >
          <option selected value="">
            Course
          </option>
          <option onClick={(e) => setCourse(e.target.value)}>BCA</option>
          <option onClick={(e) => setCourse(e.target.value)}>MCA</option>
          <option onClick={(e) => setCourse(e.target.value)}>Btech</option>
        </select>
        <div className="container mx-1 my-2">
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handlesubmit}
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default Update;
