import React, { useEffect, useState } from 'react';
import axios from '../login/AxiosInstance';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import './styles.css';
const ProductList = () => {
  const [products, setProducts] = useState([]); // Store products fetched from backend
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const cust_id = params.get('cust_id');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post(
          `http://localhost:5525/api/users/items?cust_id=${cust_id}`
        );

        if (response.status === 200 && response.data.items) {
          setProducts(response.data.items);
          console.log(response.data)
        } else {
          setErrorMessage('Unexpected response from server.');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setErrorMessage('Failed to fetch products. Please try again later.');
      }
    };

    if (cust_id) {
      fetchProducts();
    } else {
      setErrorMessage('Invalid request: cust_id is missing.');
    }
  }, [cust_id]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setTotal(total + product.price);
  };

  const delElement = (index) => {
    const removedItem = cart[index];
    const newCart = cart.filter((_, i) => i !== index);
    setCart(newCart);
    setTotal(total - removedItem.price);
  };

  return (
    <div className='wraps'>
      {errorMessage ? (
        <div className="error-message">{errorMessage}</div>
      ) : products.length > 0 ? (
        <div>
          <Header cartCount={cart.length} />
        <  p className="head">Products</p>
       
          <div className="container"> 
          

            <div className="product-grid" id="root">
             
              {products.map((product) => (
                <div key={product.id} className="box">
                  <div className="img-box">
                    <img src={product.image} alt={product.title} />
                  </div>
                  <div className="bottom">
                    <h3>{product.name}</h3>
                    <p>${product.price}</p>
                    <button onClick={() => addToCart(product)}>Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>

            <Sidebar cart={cart} total={total} delElement={delElement} />
          </div>
        </div>
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default ProductList;
