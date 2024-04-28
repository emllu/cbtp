import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

const Sidebar = ({ cart, total, delElement }) => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const custId = params.get('cust_id'); // Extract `cust_id` from query params

  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (cart.length === 0) {
      setErrorMessage('Your cart is empty.');
    } else {
      setErrorMessage(null);
    }
  }, [cart]);

  const handleBuy = async () => {
    try {
      const total = cart.reduce((sum, item) => sum + item.price, 0); // Calculate total based on cart
      const response = await axios.post('http://localhost:5525/api/users/purchase',{ cust_id: custId,cart, total }  );

      if (response.status === 200) {
        setErrorMessage('Purchase successful');
      } else if(response.status==400) {
        setErrorMessage('An error occurred');
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('Purchase failed:', error);
      setErrorMessage('An error occurred during purchase.');
    }
  };

  return (
    <div className="sidebar">
      <div className="head">
        <p>My Cart</p>
      </div>

      {errorMessage && (
        <div
          style={{
            backgroundColor: '#1d2634',
            color: 'white',
            padding: '10px',
          }}
        >
          {errorMessage}
        </div>
      )}

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((item, index) => (
          <div key={index} className="cart-item">
            <div className="row-img">
              <img src={item.image} alt={item.title} />
            </div>
            <p>{item.title}</p>
            <h2>${item.price.toFixed(2)}</h2>
            <h2>{item.name}</h2> {/* Ensure correct decimal format */}
            <FaTrash className="fa-trash" onClick={() => delElement(index)} />
          </div>
        ))
      )}

      <div className="foot">
        <h3>Total</h3>
        <h2 id="total">${total.toFixed(2)}</h2> {/* Ensure consistent decimal format */}
      </div>

      <div className="cart-item">
        <button onClick={handleBuy}>Buy</button> {/* Trigger buy action */}
      </div>
    </div>
  );
};

export default Sidebar;







//   return (
//     <div className='sidebar'>
//       <div className='head'>
//         <p>My Cart</p>
//       </div>
//       <div id='cartItem'>
//         {cart.map((item, index) => (
//           <div key={index} className='cart-item'>
//             <div className='row-img'>
//               <img src={item.image} alt={item.title} />
//             </div>
//             <p>{item.title}</p>
//             <h2>${item.price}.00</h2>
//             <h2>{item.name}</h2>
//             <i
//               className='fa-solid fa-trash'
//               onClick={() => delElement(index)} // Delete item
//             ></i>
//           </div>
//         ))}
//       </div>
//       <div className='foot'>
//         <h3>Total</h3>
//         <h2 id='total'>$ {total}.00</h2>
//       </div>
//       <button onClick={handleBuy}>Buy</button> {/* Trigger buy action */}
//     </div>
//   );
// };

// export default Sidebar;





//  //   return (
// // //     <div className="sidebar">
// // //       <div className="head"><p>My Cart</p></div>
    
// // //         {cart.length === 0 ? (
// // //           <p>Your cart is empty</p>
// // //         ) : (
// // //           cart.map((item, index) => (
// // //             <div key={index} className="cart-item">
// // //                <div className="row-img">
// // //               <img src={item.image} alt={item.title} />
// // //               </div>
// // //               <p>{item.title}</p>
// // //               <h2>${item.price}</h2>
// // //               <FaTrash className="fa-trash" onClick={() => delElement(index)} />
// // //             </div>
// // //           ))

// // //         )}
         
      
// // //       <div className="foot">
// // //         <h3>Total</h3>
// // //         <h2 id="total">$ {total}.00</h2>
// // //       </div>
// // //       <div className="cart-item">
// // //             <button type="button" onClick={()=>{buyproduct}}>buy</button>
// // //           </div>
// // //     </div>
// // //   );
// // // };

// // // export default Sidebar;









































// import React from 'react';
// import axios from 'axios';

// // Function to handle the "Buy" button click
// const handleBuy = async (userId, cart) => {
//   try {
//     const total = cart.reduce((sum, item) => sum + item.price, 0); // Calculate total
//     const response = await axios.post('http://localhost:5525/api/users/purchase', {
//       userId,
//       cart,
//       total,
//     });

//     if (response.status === 200) {
//       alert('Purchase successful'); // Success message
//     }
//   } catch (error) {
//     if (error.response?.status === 400) {
//       alert("You've already bought oil or sugar this month."); // Error handling
//     } else {
//       alert('An error occurred during purchase.'); // General error handling
//       console.log(error.response?.data?.error);
//        // Log error details for debugging
//     }
//   }
// };

// // Sidebar component with "Buy" functionality
// const Sidebar = ({ cart, total, delElement }) => {
//   const userId = 1; // This would typically come from the logged-in user's data

//   return (
//     <div className='sidebar'>
//       <div className='head'>
//         <p>My Cart</p>
//       </div>
//       <div id='cartItem'>
//         {cart.length > 0
//           ? cart.map((item, index) => (
//               <div key={index} className='cart-item'>
//                 <div className='row-img'>
//                   <img src={item.image} alt={item.title} />
//                 </div>
//                 <p>{item.title}</p>
//                 <h2>${item.price}.00</h2>
//                 <i
//                   className='fa-solid fa-trash'
//                   onClick={() => delElement(index)} // Deletion function for items
//                 ></i>
//               </div>
//             ))
//           : 'Your cart is empty'}
//       </div>
//       <div className='foot'>
//         <h3>Total</h3>
//         <h2 id='total'>$ {total}.00</h2>
//       </div>
//       <button onClick={() => handleBuy(userId, cart)}>Buy</button> // "Buy" button triggers purchase
//     </div>
//   );
// };

// export default Sidebar;














































// import axios from 'axios';

// // Function to handle the "Buy" button click
// const handleBuy = async (userId, cart) => {
//   try {
//     const response = await axios.post('http://localhost:5525/api/purchase', {
//       userId,
//       cart,
//       total: cart.reduce((sum, item) => sum + item.price, 0),
//     });

//     if (response.status === 200) {
//       alert('Purchase successful');
//     }
//   } catch (error) {
//     if (error.response?.status === 400) {
//       alert("You've already bought oil or sugar this month.");
//     } else {
//       alert('An error occurred during purchase.');
//       console.log(error.response.data.msg)
//     }
//   }
// };

// // In the sidebar component
// const Sidebar = ({ cart, total, delElement }) => {
//   const userId = 1; // This would normally come from the logged-in user's data

//   return (
//     <div className='sidebar'>
//       <div className='head'>
//         <p>My Cart</p>
//       </div>
//       <div id='cartItem'>
//         {cart.length > 0
//           ? cart.map((item, index) => (
//               <div key={index} className='cart-item'>
//                 <div className='row-img'>
//                   <img src={item.image} alt={item.title} />
//                 </div>
//                 <p>{item.title}</p>
//                 <h2>${item.price}.00</h2>
//                 <i className='fa-solid fa-trash' onClick={() => delElement(index)}></i>
//               </div>
//             ))
//           : 'Your cart is empty'}
//       </div>
//       <div className='foot'>
//         <h3>Total</h3>
//         <h2 id='total'>$ {total}.00</h2>
//       </div>
//       <button onClick={() => handleBuy(userId, cart)}>Buy</button>
//     </div>
//   );
// };

// export default Sidebar;
















































// // import React from 'react';
// // import { FaTrash } from 'react-icons/fa';
// // const Sidebar = ({ cart, total, delElement }) => {

// // buyproduct(){

// // }

// //   return (
// //     <div className="sidebar">
// //       <div className="head"><p>My Cart</p></div>
    
// //         {cart.length === 0 ? (
// //           <p>Your cart is empty</p>
// //         ) : (
// //           cart.map((item, index) => (
// //             <div key={index} className="cart-item">
// //                <div className="row-img">
// //               <img src={item.image} alt={item.title} />
// //               </div>
// //               <p>{item.title}</p>
// //               <h2>${item.price}</h2>
// //               <FaTrash className="fa-trash" onClick={() => delElement(index)} />
// //             </div>
// //           ))

// //         )}
         
      
// //       <div className="foot">
// //         <h3>Total</h3>
// //         <h2 id="total">$ {total}.00</h2>
// //       </div>
// //       <div className="cart-item">
// //             <button type="button" onClick={()=>{buyproduct}}>buy</button>
// //           </div>
// //     </div>
// //   );
// // };

// // export default Sidebar;
