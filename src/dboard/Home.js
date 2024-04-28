import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill,
} from 'react-icons/bs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported
import './db.css'; // Custom styles
import './modal.css'; // Custom styles for the modal

function Home() {
  const [showModal, setShowModal] = useState(false); // Toggle for modal visibility
  const [targetPage, setTargetPage] = useState(''); // Page to navigate to
  const [custId, setCustId] = useState(''); // Customer ID input
  const [errorMessage, setErrorMessage] = useState(''); // Error message
  const navigate = useNavigate(); // For navigation

  const openModal = (target) => {
    setTargetPage(target); // Set the target page
    setShowModal(true); // Show the modal
    setErrorMessage(''); // Reset error message when opening modal
  };

  const closeModal = () => {
    setShowModal(false); // Hide the modal
  };

  const handleSubmit = () => {
    if (!/^\d{6}$/.test(custId)) { // Check for 6-digit number
      setErrorMessage('Customer ID must be a 6-digit number.'); // Set error message
      return;
    }

    // Navigate to the verification page with the given customer ID and target
    navigate(`/verify?cust_id=${custId}&target=${targetPage}`);
    setShowModal(false); // Close the modal after submission
  };

  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    // More data here...
  ];

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      <div className="main-cards">
        <div
          className="carde"
          onClick={() => openModal('/products')} // Open modal for products
        >
          <div className="carde-inner">
            <h3>PRODUCTS</h3>
            <BsFillArchiveFill className="card_icon" />
          </div>
          <h1>300</h1>
        </div>

        <div
          className="carde"
          onClick={() => openModal('/userinfo')} // Open modal for customers
        >
          <div className="carde-inner">
            <h3>CUSTOMERS</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>33</h1>
        </div>

        <div
          className="carde"
          onClick={() => navigate('/additems')} // Navigate to add items
        >
          <div className="carde-inner">
            <h3>Add New Item</h3>
            <BsFillBellFill className="card_icon" />
          </div>
          <h1>42</h1>
        </div>
        <div
          className="carde"
          onClick={() => navigate('/come')} // Navigate to add items
        >
      <div className="carde-inner">
                <h3>send message</h3>
                <BsFillGrid3X3GapFill className="card_icon" />
              </div>
              <h1>42</h1>
            </div>
            </div>
      {showModal && (
        <div className="modal-overlay"> {/* Background overlay */}
          <div className="modal-content"> {/* Modal content */}
            <h4 id="text1">Enter Customer ID</h4>
            <input
              type="text"
              value={custId}
              onChange={(e) => setCustId(e.target.value)} // Update customer ID
              placeholder="Customer ID"
              className="modal-input"
            />
            {/* Display error message below input */}
            {errorMessage && <div className="error-message">{errorMessage}</div>}

            <div className="modal-buttons"> {/* Button container */}
              <button id="submit-button" onClick={handleSubmit}>Submit</button> 
              <button id="close-button" onClick={closeModal}>Close</button> 
            </div>
          </div>
        </div>
      )}

      <div className="charts">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
    </main>
  );
}

export default Home;















  // const data = [
   
  //   {
  //           name: 'Page A',
  //           uv: 4000,
  //           pv: 2400,
  //           amt: 2400,
  //         },
  //         {
  //           name: 'Page B',
  //           uv: 3000,
  //           pv: 1398,
  //           amt: 2210,
  //         },
  //         {
  //           name: 'Page C',
  //           uv: 2000,
  //           pv: 9800,
  //           amt: 2290,
  //         },
  //         {
  //           name: 'Page D',
  //           uv: 2780,
  //           pv: 3908,
  //           amt: 2000,
  //         },
  //         {
  //           name: 'Page E',
  //           uv: 1890,
  //           pv: 4800,
  //           amt: 2181,
  //         },
  //         {
  //           name: 'Page F',
  //           uv: 2390,
  //           pv: 3800,
  //           amt: 2500,
  //         },
  //         {
  //           name: 'Page G',
  //           uv: 3490,
  //           pv: 4300,
  //           amt: 2100,
  //         },
  // ];

        /* <div className="carde-inner">
            <h3>CUSTOMERS</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>33</h1>
        </div>
        <div
              className="carde"
              onClick={() => navigate('/additems')} // Navigate to alerts
            >
              <div className="carde-inner">
                <h3>Add New Item</h3>
                <BsFillBellFill className="card_icon" />
              </div>
              <h1>42</h1>
            </div>

            <div
              className="carde"
              onClick={() => navigate('/additems')} 
            >
              <div className="carde-inner">
                <h3>send message</h3>
                <BsFillGrid3X3GapFill className="card_icon" />
              </div>
              <h1>42</h1>
            </div>
       
    //   </div> */
    //   {showModal && (
    //    <div className="modal-overlay"> {/* Background overlay */}
    //    <div className="modal-content"> {/* Modal content */}
    //      <h3>Enter Customer ID</h3>
    //      <input
    //        type="text"
    //        value={custId}
    //        onChange={(e) => setCustId(e.target.value)}
    //        placeholder="Customer ID"
    //        className="modal-input" 
    //      />
    //      <div className="modal-buttons"> {/* Button container */}
    //        <button id="submit-button" onClick={handleSubmit}>Submit</button> {/* Submit button */}
    //        <button id="close-button" onClick={closeModal}>Close</button> {/* Close button */}
    //      </div>
    //    </div>
    //  </div>
        
    //   )}

      {/* <div className="charts">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" fill="#8884d8" />
            <Bar dataKey="uv" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div> */}
    













































































