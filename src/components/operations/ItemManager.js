import React, { useState } from 'react';
import axios from '../login/AxiosInstance';
import { Container, Row, Col, Form, Card, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import './itemManager.css'; // Additional styling if needed

const ItemManager = () => {
  const [itemData, setItemData] = useState({
    name: '',
    price: '',
    quantity: '',
  });

  const [selectedFile, setSelectedFile] = useState(null); // To store the selected file
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemData({
      ...itemData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // Store the selected file
  };

  const handleAddItem = async () => {
    const formData = new FormData(); // Use FormData to send file and other data
    formData.append('file', selectedFile); // Append the file
    formData.append('name', itemData.name);
    formData.append('price', itemData.price);
    formData.append('quantity', itemData.quantity);

    try {
      const response = await axios.post('http://localhost:5525/api/users/upload-and-insert', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Required for file uploads
        },
      });

      if (response.status === 200) {
        setSuccessMessage('Item added successfully');
        setErrorMessage('');
        setItemData({ name: '', price: '', quantity: '' }); // Reset form data
        setSelectedFile(null); // Clear the selected file
      } else {
        setErrorMessage('Error adding item');
      }
    } catch (error) {
      console.error('Error adding item:', error);
      setErrorMessage('Failed to add item');
    }
  };

  return (
    <Container className="item-manager-container">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2>Item Manager</h2>
          {successMessage && <Alert variant="success">{successMessage}</Alert>}
          {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

          <Card className="item-form-card">
            <Card.Body>
              <Form>
                <Form.Group>
                  <Form.Label>Item Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={itemData.name}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price"
                    value={itemData.price}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantity"
                    value={itemData.quantity}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Image Upload</Form.Label>
                  <Form.Control type="file" onChange={handleFileChange} /> {/* File input */}
                </Form.Group>

                <Button variant="primary" onClick={handleAddItem}>Add Item</Button> {/* Submit button */}
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ItemManager;



































// import React, { useState } from 'react';
// import axios from 'axios';
// import { Container, Row, Col, Form, Card, Button, Alert } from 'react-bootstrap'; // Bootstrap components
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './itemManager.css';

// const ItemManager = () => {
//   const [itemData, setItemData] = useState({
//     id: '',
//     name: '',
//     price: '',
//     quantity: '',
//     img_url: '',
//   });

//   const [successMessage, setSuccessMessage] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [showForm, setShowForm] = useState(true);
// const  [file,setFiles]=useState();
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setItemData({
//       ...itemData,
//       [name]: value,
//     });
//   };

//   const handleAddItem = async () => {
//     try {
//       await axios.post('http://localhost:5525/api/users/insert', itemData, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       setSuccessMessage('Item added successfully');
//       setErrorMessage('');
//       setShowForm(false);
//     } catch (error) {
//       setErrorMessage('Error adding item');
//     }
//   };

//   const handleEditItem = async () => {
//     try {
//       await axios.put(`http://localhost:5525/api/users/items/${itemData.id}`, itemData, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       setSuccessMessage('Item updated successfully');
//       setErrorMessage('');
//       setShowForm(false);
//     } catch (error) {
//       setErrorMessage('Error updating item');
//     }
//   };

//   const handleDeleteItem = async () => {
//     try {
//       await axios.delete(`http://localhost:5525/api/users/items/${itemData.id}`);
//       setSuccessMessage('Item deleted successfully');
//       setErrorMessage('');
//       setShowForm(false);
//     } catch (error) {
//       setErrorMessage('Error deleting item');
//     }
//   };
//   const handleUpload=(e)=>{
//     console.log(file)
//   }

//   return (
//     <Container className="item-manager-container"> {/* Container for centering */}
//       <Row className="justify-content-center"> {/* Center content */}
//         <Col md={6}> {/* 60% width */}
//           <h2>Item Manager</h2>
//           {successMessage && <Alert variant="success">{successMessage}</Alert>}
//           {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

//           {showForm && (
//             <Card className="item-form-card"> {/* Using Card to contain form */}
//               <Card.Body>
//                 <Form>
//                   <Form.Group>
//                     <Form.Label>ID (for edit/delete)</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="id"
//                       value={itemData.id}
//                       onChange={handleInputChange}
//                     />
//                   </Form.Group>
//                   <Form.Group>
//                     <Form.Label>Item Name</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="name"
//                       value={itemData.name}
//                       onChange={handleInputChange}
//                     />
//                   </Form.Group>
//                   <Form.Group>
//                     <Form.Label>Price</Form.Label>
//                     <Form.Control
//                       type="number"
//                       name="price"
//                       value={itemData.price}
//                       onChange={handleInputChange}
//                     />
//                   </Form.Group>
//                   <Form.Group>
//                     <Form.Label>Quantity</Form.Label>
//                     <Form.Control
//                       type="number"
//                       name="quantity"
//                       value={itemData.quantity}
//                       onChange={handleInputChange}
//                     />
//                   </Form.Group>
//                   <Form.Group>
//                     <Form.Label>Image URL</Form.Label>
//                     <Form.Control
//                       type="text"
//                       name="img_url"
//                       value={itemData.img_url}
//                       onChange={e=>setFiles(e.target.files[0])}
                     
//                     />
//                      <Button variant="primary" onClick={handleUpload}>upload</Button>
//                   </Form.Group>

//                   <div className="item-buttons"> {/* Align buttons */}
                  
//                     <Button variant="primary" onClick={handleAddItem}>Add</Button>
//                     <Button variant="warning" onClick={handleEditItem}>Edit</Button>
//                     <Button variant="primary" onClick={handleDeleteItem}>Delete</Button>
//                   </div>
//                 </Form>
//               </Card.Body>
//             </Card>
//           )}
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default ItemManager;
