import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { TOKEN_KEY } from "../services/apiService";
import { TfiShoppingCart } from "react-icons/tfi";

function AppHeader() {
  const nav = useNavigate();
  const [expanded, setExpanded] = useState(false); // State to track navbar expansion

  const handleNavItemClick = () => {
    // Collapse the navbar when a nav item is clicked
    setExpanded(false);
  };
  const getLastProductId = () => {
    const tasks = localStorage.getItem("todo_local");
    if (tasks) {
      const tasksArray = JSON.parse(tasks);
      if (tasksArray.length > 0) {
        return tasksArray[tasksArray.length - 1]._id;
      }
    }
    return null;
  };
  
  const lastProductId = getLastProductId();
  return (
    <Container id="had">
      <Navbar bg="light" expand="lg" expanded={expanded} className="mt-2">
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          className="p-1 m-1 shadow" 
          onClick={() => setExpanded(expanded => !expanded)} // Toggle expanded state
        />
   <Link 
    to={lastProductId ? `/PurchasePage/${lastProductId}` : "/works"} 
    onClick={handleNavItemClick}
  >
    <TfiShoppingCart className="fs-5 text-dark" />
  </Link>
       
        <Navbar.Brand  className="ms-4 d-flex">
    {!localStorage.getItem(TOKEN_KEY) ?
        <>
          <button id="btn_had" onClick={() => nav("/sign-in")} className='btn btn-outline-info p-1 shadow'>כניסה</button>
          <button id="btn_had" onClick={() => nav("/sign-up")} className='btn btn-outline-secondary m-1 p-1 shadow ms-lg-2'>הרשמה</button>
        </>
        :
        <button onClick={() => {
          localStorage.removeItem(TOKEN_KEY);
          nav("/");
        }} className='btn btn-sm btn-outline-danger p-1 m-3 shadow'>יצאה</button>
      }
<div onClick={() => {

          nav("/");
        }}>
      DOLCI
      </div>
     
          {/* <img src="/docs/5.3/assets/brand/bootstrap-logo.svg" alt="Bootstrap" width="30" height="24"></img> */}
        </Navbar.Brand>
       
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" onClick={handleNavItemClick}>בית</Link>
            <Link to="/about" onClick={handleNavItemClick}>עלינו</Link>
            <Link to="/services" onClick={handleNavItemClick}>שירות</Link>
            <Link to="/works" onClick={handleNavItemClick}>קטלוג מוצרים</Link>
            <Link to="/pricing" onClick={handleNavItemClick}>מבצעים</Link>
            <Link to="/contact" onClick={handleNavItemClick}>צור קשר</Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}

export default AppHeader;
