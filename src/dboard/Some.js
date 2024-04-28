// import React, { useState } from 'react';
// // import axiosInstance from '../components/login/axiosInstance'; // Your Axios instance for sending requests
// import { Form, Button, Alert } from 'react-bootstrap';

// const FileUpload = () => {
//   const [selectedFile, setSelectedFile] = useState(null); // State for storing the selected file
//   const [uploadStatus, setUploadStatus] = useState(''); // State for upload status messages

//   const handleFileChange = (e) => {
//     setSelectedFile(e.target.files[0]); // Store the selected file
//   };

//   const handleUpload = async () => {
//     if (!selectedFile) {
//       setUploadStatus('Please select a file to upload.');
//       return;
//     }

//     const formData = new FormData(); // Create a FormData object to hold the file
//     formData.append('file', selectedFile); // Append the selected file

//     try {
//       const response = await axiosInstance.post('/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data', // Required for file uploads
//         },
//       });

//       if (response.status === 200) {
//         setUploadStatus('File uploaded successfully.');
//       } else {
//         setUploadStatus('Unexpected response from server.');
//       }
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       setUploadStatus('Failed to upload file. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <h2>File Upload</h2>
//       {uploadStatus && <Alert variant="info">{uploadStatus}</Alert>}
//       <Form>
//         <Form.Group>
//           <Form.Label>Choose a file to upload</Form.Label>
//           <Form.Control type="file" onChange={handleFileChange} /> // File input
//         </Form.Group>
//         <Button onClick={handleUpload}>Upload</Button> // Upload button
//       </Form>
//     </div>
//   );
// };

// export default FileUpload;
