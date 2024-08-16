import React, { useState } from 'react';
import { Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Modal from '../Model';
import Cart from '../screen/Cart';
import { useCart, useDispatchCart } from '../component/contextreducer';

export default function NavBar() {
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  let data = useCart();

  const handleLogout = () => {
    localStorage.removeItem("authtoken");
    navigate("/login");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <img src="Black_and_White_Minimalist_Fashion_Store_Logo-removebg-preview.png" className='logo' alt="Burger" />
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="#">Home</Link>
              </li>
              {localStorage.getItem("authtoken") ?
                <li className="nav-item">
                  <Link className="nav-link active fs-5" aria-current="page" to="/">My orders</Link>
                </li>
                : ""}
            </ul>
            {!localStorage.getItem("authtoken") ?
              <div className='d-flex'>
                <Link className="btn bg-black text-success mx-1" to="/login">Login</Link>
                <Link className="btn bg-black text-success mx-1" to="/createuser">SignUp</Link>
              </div>
              :
              <div>
                <div className='btn bg-black text-success mx-2' onClick={() => { setCartView(true) }}>My Cart  
                  <Badge pill bg="danger">{data.length}</Badge>
                </div>
                {cartView ? <Modal onClose={() => { setCartView(false) }}><Cart /></Modal> : null}
                <div className='btn bg-black text-success mx-2' onClick={handleLogout}>Logout</div>
              </div>
            }
          </div>
        </div>
      </nav>
    </div>
  );
}
