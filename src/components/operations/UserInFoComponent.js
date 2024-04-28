import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from '../login/AxiosInstance';
import { Card, Col, Row, Container, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './userinfo.css';
import profile from '../../pictures/pro.jpg'
const UserInfoComponent = () => {
  const location = useLocation();
  const [userInfo, setUserInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cust_id = params.get('cust_id');

    if (cust_id) {
      const fetchUserInfo = async () => {
        try {
          const response = await axios.post(
            'http://localhost:5525/api/users/userinfo',
            { cust_id }
          );

          if (response.status === 200) {
            setUserInfo(response.data);
          } else {
            setErrorMessage('Unexpected response from server.');
          }
        } catch (error) {
          console.error('Error fetching user information:', error);
          setErrorMessage('An error occurred while fetching user information.');
        }
      };

      fetchUserInfo();
    } else {
      setErrorMessage('Invalid request: cust_id is missing.');
    }
  }, [location.search]);

  if (!userInfo && !errorMessage) {
    return <div>Loading...</div>; // Indicate loading state
  }

  return (
   
    <Container className="user-info-container mt-4 ">
      {/* <Row>
        {errorMessage && ( // Display error message in a dedicated div
          <div className="error-message">{errorMessage}</div>
        )}
      </Row> */}

      {userInfo && ( // Only display user info if it's available
        <Row className='wrapper'>
          <Col md={3}>
            <Card className="profile-picture-card">
              <Card.Body>
                <Image
                  src={profile} // Placeholder image source
                  roundedCircle
                  className="profile-picture"
                  alt="User Profile"
                />
              </Card.Body>
            </Card>
          </Col>

          <Col md={9}>
            <Card className="user-info-card">
              <Card.Body>
                <Card.Title>User Information</Card.Title>
                <hr />
                <p>Customer ID: {userInfo.cust_name?.cust_id || 'N/A'}</p>
                <p>Name: {userInfo.cust_name?.F_name || ''} {userInfo.cust_name?.L_name || ''}</p>
                <p>Email: {userInfo.cust_detail.email || 'N/A'}</p>
                <p>Phone 1: {userInfo.cust_phone.phone1 || 'N/A'}</p>
                <p>Phone 2: {userInfo.cust_phone.phone2 || 'N/A'}</p>
                <p>City: {userInfo.cust_address.city || 'N/A'}</p>
                <p>Kebele: {userInfo.cust_address.keb_name || 'N/A'}</p>
                <p>Age: {userInfo.cust_age.cust_age || 'N/A'}</p>
                <p>Job: {userInfo.cust_info.cust_job || 'N/A'}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
   
  );
};

export default UserInfoComponent;















































// import React, { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';
// import axios from '../login/AxiosInstance';
// import { Card, Col, Row, Container, Image } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const UserInfoComponent = () => {
//   const location = useLocation();
//   const [custId, setCustId] = useState(null);
//   const [userInfo, setUserInfo] = useState(null);
//   const [errorMessage, setErrorMessage] = useState(null);

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const cust_id = params.get('cust_id');

//     if (cust_id) {
//       setCustId(cust_id);

//       const fetchUserInfo = async () => {
//         try {
//           const response = await axios.post(
//             'http://localhost:5525/api/users/userinfo',
//             { cust_id: cust_id }
//           );

//           if (response.status === 200) {
//             setUserInfo(response.data); // Ensure this is set correctly
//             console.log("User info received:", response.data); // Log received data for debugging
//           } else {
//             setErrorMessage('Unexpected response from server.');
//           }
//         } catch (error) {
//           console.error('Error fetching user information:', error); // Log the error
//           setErrorMessage('An error occurred while fetching user information.');
//         }
//       };

//       fetchUserInfo();
//     } else {
//       setErrorMessage('Invalid request: cust_id is missing.');
//     }
//   }, [location.search]);
  
//   const { cust_info, cust_address,cust_phone,cust_age, cust_name, cust_detail,} = userInfo;

//   return (
//     <div>
//       {errorMessage ? (
//         <div>{errorMessage}</div>
//       ) : (
//         <div>
//           {userInfo ? (
//             <>
             
//     <Container className="user-info-container mt-4">
//       <Row>
//         <Col md={3}>
//           {/* Container for user's profile picture */}
//           <Card className="profile-picture-card">
//             <Card.Body>
//               <Image
//                 src={`https://example.com/profile/${cust_name.cust_id}.jpg`} // Replace with actual image source
//                 roundedCircle
//                 className="profile-picture"
//                 alt="User Profile"
//               />
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col md={9}>
//           {/* Card to display user information */}
//           <Card className="user-info-card">
//             <Card.Body>
//               <Card.Title>User Information</Card.Title>
//               <hr />
//               <p>Customer ID: {cust_name.cust_id}</p>
//               <p>Name: {cust_name.F_name} {cust_name.L_name}</p>
//               <p>Email: {cust_detail.email}</p>
//               <p>Username: {cust_detail.username}</p>
//               <p>Phone 1: {cust_phone.phone1}</p>
//               <p>Phone 2: {cust_phone.phone2}</p>
//               <p>City: {cust_address.city}</p>
//               <p>Kebele: {cust_address.keb_name}</p>
//               <p>Age: {cust_age.cust_age}</p>
//               <p>Job: {cust_info.cust_job}</p>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
  
//             </>
//           ) : (
//             'Loading...' // Indicate loading state
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserInfoComponent;
