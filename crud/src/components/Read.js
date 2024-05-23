import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Read() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("ASC");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const [modal, setmodal] = useState(false);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [Course, setCourse] = useState("");
  const [inputPage, setInputPage] = useState("");
  const [errors, setErrors] = useState({});
  const [value, setvalue] = useState("");

  const [limit, setLimit] = useState(5);
  const [existingUsers, setExistingUsers] = useState([]);

  function handleDelete(id) {
    axios.delete(`https://663b06c1fee6744a6ea00a43.mockapi.io/crud/f${id}`).then(() => {
      getData();
    });
  }

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    axios
      .get("https://663b06c1fee6744a6ea00a43.mockapi.io/crud")
      .then((res) => {
        setData(res.data);
        setExistingUsers(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  const handleSubmit = async (e) => {
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
      const response = await axios.post(
        "https://663b06c1fee6744a6ea00a43.mockapi.io/crud",

        {
          name: name,
          email: email,
          course: Course,
        }
      );
      console.log("Form submitted successfully:", response.data);
      Swal.fire("Success!", "Form submitted successfully!", "success");
      history("/read");
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire("Error", "Failed to submit form", "error");
    }
  };

  const setToLocalStorage = (id, name, email) => {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("Course", Course);
  };

  const sorting = (col) => {
    if (order === "ASC") {
      const sorting = [...data].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setData(sorting);
      setOrder("DSC");
      console.log(col);
    }

    if (order === "DSC") {
      const sorting = [...data].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setData(sorting);
      setOrder("ASC");
    }
  };

  // const sorted = (col) => {
  //   alert(col)
  //   if (order === "ASC") {
  //     const sorted = [...data].sort((a, b) => (a[col].id > b[col].id ? 1 : -1));
  //     setData(sorted);
  //     setOrder("DSC");
  //   }
  //   if (order === "DSC") {
  //     const sorted = [...data].sort((a, b) => (a[col].id > b[col].id ? 1 : -1));
  //     setData(sorted);
  //     setOrder("ASC");
  //   }
  // };

  const filteredData = data.filter((eachData) => {
    return (
      searchTerm === "",
      eachData.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        eachData.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        eachData.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const history = useNavigate();

  const handleInputChange = (e) => {
    setInputPage(e.target.value);
  };

  const handleGoToPage = (e) => {
    e.preventDefault();
    const pageNumber = parseInt(inputPage, 10);
    if (!isNaN(pageNumber) && pageNumber >= 1 && pageNumber <= npage) {
      setCurrentPage(pageNumber);
    } else {
      alert(`Please enter a valid page number between 1 and ${npage}`);
    }
  };

  return (
    <div>
      <label htmlFor="exampleDataList" className="form-label">
        <div className="container">
          <h1>
            <i>
              Read
              <Modal size="lg" isOpen={modal} toggle={() => setmodal(!modal)}>
                <ModalHeader toggle={() => setmodal(!modal)}>
                  Add Records
                </ModalHeader>
                <ModalBody>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label for="exampleInputEmail1" className="form-label">
                        Name
                      </label>
                      <input
                        type="name"
                        className="form-control"
                        id="name"
                        aria-describedby="namehelp"
                        onChange={(e) => setname(e.target.value)}
                      />
                      {errors.name && (
                        <p style={{ color: "red" }}> {errors.name}</p>
                      )}
                    </div>
                    <div className="mb-3">
                      <label for="exampleInputPassword1" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        onChange={(e) => setemail(e.target.value)}
                      />
                      {errors.email && (
                        <p style={{ color: "red" }}> {errors.email}</p>
                      )}
                    </div>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      onClick={(e) => setCourse(e.target.value)}
                    >
                      <option selected value="">
                        Course
                      </option>
                      <option onClick={(e) => setCourse(e.target.value)}>
                        BCA
                      </option>
                      <option onClick={(e) => setCourse(e.target.value)}>
                        MCA
                      </option>
                      <option onClick={(e) => setCourse(e.target.value)}>
                        Btech
                      </option>
                    </select>

                    <div className="container my-2">
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </div>
                  </form>
                </ModalBody>
              </Modal>
              <pre>
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() => setmodal(true)}
                >
                  ADD
                </button>
              </pre>
            </i>
          </h1>
        </div>
        <div className="container"></div>
      </label>
      <input
        className="form-control"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        list="datalistOptions"
        id="exampleDataList"
        placeholder="Type to search..."
      />

      <table className="table">
        <thead>
          <tr>
            <th scope="col">id</th>
            <th scope="col" onClick={() => sorting("email")}>
              Email
            </th>
            <th scope="col" onClick={() => sorting("name")}>
              Name
            </th>
            <th scope="col">Course</th>

            <th scope="col">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredData
            .slice(firstIndex, firstIndex + limit)
            .map((eachData) => (
              <tr key={eachData.id}>
                <th scope="row">{eachData.id}</th>
                <td>{eachData.name}</td>
                <td>{eachData.email}</td>
                <td>{eachData.Course}</td>

                <td>
                  <Link to="/update">
                    <button
                      className="btn-success"
                      onClick={() =>
                        setToLocalStorage(
                          eachData.id,
                          eachData.name,
                          eachData.email,
                          eachData.Course
                        )
                      }
                    >
                      Edit
                    </button>
                  </Link>
                  <button
                    className="btn-danger"
                    onClick={() => handleDelete(eachData.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <nav>
        <ul className="pagination">
          <li className="page-link">
            <a href="#" className="prev-item" onClick={prepage}>
              Prev
            </a>
          </li>

          {numbers.map((n, i) => (
            <li
              className={`page-item ${currentPage === n ? "active" : ""}`}
              key={i}
            >
              <a href="#" className="page-link" onClick={() => changeCPage(n)}>
                {n}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a href="#" className="page-link" onClick={nextPage}>
              Next
            </a>
          </li>
          <li className="page-item">
            <form className="input-group" onSubmit={handleGoToPage}>
              <input
                type="number"
                className="form-control"
                value={inputPage}
                onChange={handleInputChange}
                min={1}
                max={npage}
                placeholder={`Go to page (1 - ${npage})`}
              />
              <button type="submit" className="btn btn-outline-secondary">
                Go
              </button>

              <select
                className="form-select"
                onChange={(e) => setLimit(parseInt(e.target.value))}
                value={limit}
              >
                <option selected>Record</option>
                <option value="5">5</option>
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="30">50</option>
              </select>
            </form>
          </li>
        </ul>
      </nav>
    </div>
  );
  function prepage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function changeCPage(id) {
    setCurrentPage(id);
  }
  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }
}

export default Read;
