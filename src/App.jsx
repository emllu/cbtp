
import './scss/index.scss';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './login';
import ProductList from './components/addcart/ProductList';
import Signups from './Signups'
import Dashboard from './dboard/Dashboard'
import UserInfoComponent from './components/operations/UserInFoComponent';
import Forms from './components/login/Forms'
import ItemManager from './components/operations/ItemManager'

import VerifyAndNavigate from './components/login/VerifyAndNavigate'
import Come from './dboard/Come'
import Lands from './Lands/Lands'
const App = () => (
  <Router>
    <Routes>
      <Route path='/' element={<Lands/>}/>
      <Route path="/come" element={< Come />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/userinfo" element={<UserInfoComponent />} />
      <Route path="/verify" element={< VerifyAndNavigate />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/forms" element={<Forms />} />
      <Route path="/register" element={<Signups />} />
      <Route path="/additems" element={<ItemManager />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </Router>
);

export default App;
