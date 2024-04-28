import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./components/login/AxiosInstance";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "animate.css/animate.min.css"; // Animate.css for animations

const Signup = () => {
  const navigate = useNavigate();
  const [serverMsg, setServerMsg] = useState("");

  const [custName, setCustName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nationality, setNationality] = useState("");
  const [custBdate, setCustBdate] = useState("");
  const [custSexo, setCustSexo] = useState("");
  const [custJob, setCustJob] = useState("");
  const [kebName, setKebName] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [city, setCity] = useState("");
  const [phone1, setPhone1] = useState("");
  const [phone2, setPhone2] = useState("");
  const [custAge, setCustAge] = useState("");
  const [username, setusername] = useState("");
  // Validation functions
  const validateName = (name) => /^[a-zA-Z]+$/.test(name); // Only letters
  const validateHouseNo = (houseNo) => /^[0-9]{4}$/.test(houseNo) && (houseNo >= 1000 && 2000); // 4-digit number between 1000 and 2000
  const validatePhone = (phone) => /^[0-9]{12}$/.test(phone); // 12 digits only
  const validateAge = (age) => parseInt(age, 10) > 18; // Age > 18

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !validateName(custName) ||
      !validateName(lastName) ||
      nationality.toLowerCase() !== "ethiopian" ||
      (custSexo.toLowerCase() !== "male" && custSexo.toLowerCase() !== "female") ||
      !validateHouseNo(houseNo) ||
      !validatePhone(phone1) ||
      !validatePhone(phone2) ||
      !validateAge(custAge)
    ) {
      setServerMsg("Please correct the errors and try again.");
      return;
    }

    const requestBody = {
      cust_name: {
        F_name: custName,
        L_name: lastName,
      },
      cust_bdate: custBdate,
      custSexo,
      nationality,
      custJob,
      cust_address: {
        keb_name: kebName,
        houseNo,
        city,
      },
      cust_phone: {
        phone1,
        phone2,
      },
      custAge,
      cust_detail: {
       email,
        email,
        password,
      },
    };

    try {
      const response = await axiosInstance.post("http://localhost:5525/api/users/register", requestBody);

      if (response.status === 201) {
        setServerMsg("User registered successfully!");
        navigate("/hello");
      } else {
        console.error("Unexpected response:", response.data.msg);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        setServerMsg("Error from server: " + error.response.data.errors[0].msg);
      } else {
        setServerMsg("An unexpected error occurred.",);
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div className="col-md-8 bg-white p-4 rounded shadow animate__animated animate__fadeIn"> {/* Animation */}
        <h2 className="text-center animate__animated animate__bounce">Signup</h2> {/* Animation */}

        {serverMsg && (
          <div className="alert alert-danger animate__animated animate__shakeX">{serverMsg}</div> 
        )}

        <form onSubmit={handleSubmit}>
          {/* First row with four input fields */}
          <div className="row">
            <div className="col-md-3">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  className={`form-control ${validateName(custName) ? "" : "is-invalid"}`}
                  value={custName}
                  onChange={(e) => setCustName(e.target.value)}
                  required
                />
                {!validateName(custName) && <div className="invalid-feedback">Must be only letters.</div>}
              </div>
            </div>

            <div className="col-md-3">
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  className={`form-control ${validateName(lastName) ? "" : "is-invalid"}`}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                {!validateName(lastName) && <div className="invalid-feedback">Must be only letters.</div>}
              </div>
            </div>

            <div className="col-md-3">
              <div className="form-group">
                <label>Nationality</label>
                <input
                  type="text"
                  className={`form-control ${nationality.toLowerCase() === "ethiopian" ? "" : "is-invalid"}`}
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  required
                />
                {nationality.toLowerCase() !== "ethiopian" && (
                  <div className="invalid-feedback">Must be "Ethiopian".</div>
                )}
              </div>
            </div>

            <div className="col-md-3">
              <div className="form-group">
                <label>Gender</label>
                <input
                  type="text"
                  className={`form-control ${(custSexo.toLowerCase() === "male" || custSexo.toLowerCase() === "female") ? "" : "is-invalid"}`}
                  value={custSexo}
                  onChange={(e) => setCustSexo(e.target.value)}
                  required
                />
                {(custSexo.toLowerCase() !== "male" && custSexo.toLowerCase() !== "female") && (
                  <div className="invalid-feedback">Must be "male" or "female".</div>
                )}
              </div>
            </div>
          </div>

          {/* Second row with four input fields */}
          <div className="row">
            <div className="col-md-3">
              <div className="form-group">
                <label>House Number</label>
                <input
                  type="text"
                  className={`form-control ${validateHouseNo(houseNo) ? "" : "is-invalid"}`}
                  value={houseNo}
                  onChange={(e) => setHouseNo(e.target.value)}
                  required
                />
                {!validateHouseNo(houseNo) && <div className="invalid-feedback">Must be a 4-digit number .</div>}
              </div>
            </div>

            <div className="col-md-3">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  className="form-control"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="col-md-3">
              <div className="form-group">
                <label>Phone 1</label>
                <input
                  type="text"
                  className={`form-control ${validatePhone(phone1) ? "" : "is-invalid"}`}
                  value={phone1}
                  onChange={(e) => setPhone1(e.target.value)}
                />
                {!validatePhone(phone1) && (
                  <div className="invalid-feedback">Must be exactly 12 digits.</div>
                )}
              </div>
            </div>

            <div className="col-md-3">
              <div classname="form-group">
                <label>Phone 2</label>
                <input
                  type="text"
                  className={`form-control ${validatePhone(phone2) ? "" : "is-invalid"}`}
                  value={phone2}
                  onChange={(e) => setPhone2(e.target.value)}
                  required
                />
                {!validatePhone(phone2) && (
                  <div className="invalid-feedback">Must be exactly 12 digits.</div>
                )}
              </div>
            </div>
          </div>

          {/* Third row with four input fields */}
          <div className="row">
            <div className="col-md-3">
              <div classname="form-group">
                <label>Birthday</label>
                <input
                  type="date"
                  className="form-control"
                  value={custBdate}
                  onChange={(e) => setCustBdate(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="col-md-3">
              <div classname="form-group">
                <label>Job</label>
                <input
                  type="text"
                  className="form-control"
                  value={custJob}
                  onChange={(e) => setCustJob(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="col-md-3">
              <div classname="form-group">
                <label>Age</label>
                <input
                  type="text"
                  className={`form-control ${validateAge(custAge) ? "" : "is-invalid"}`}
                  value={custAge}
                  onChange={(e) => setCustAge(e.target.value)}
                  required
                />
                {!validateAge(custAge) && (
                  <div className="invalid-feedback">Must be greater than 18.</div>
                )}
              </div>
            </div>

            <div className="col-md-3">
              <div classname="form-group">
                <label>Kebele Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={kebName}
                  onChange={(e) => setKebName(e.target.value)}
                  required
                />
              </div>
              </div>
            </div>
            <div className="row">
            <div className="col-md-3">
              <div classname="form-group">
                <label>Usename</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) =>setusername(e.target.value)}
                  required
                />
              </div>
              
            </div>
            <div className="col-md-3">
              <div classname="form-group">
             
                <label>password</label>
                <input
                  type="email"
                  className="form-control"
                  value={password}
                  onChange={(e) =>setEmail(e.target.value)}
                  required
                />
               
            </div>
            <div className="col-md-3">
            <div classname="form-group">
                <label>password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
            </div>
            <div className="col-md-3">
              <div classname="form-group">  </div>
            </div>
          </div>
          </div>n
         


          {/* Submit button */}
          <button type="submit" className="btn btn-primary btn-block">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
