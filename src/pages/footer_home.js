import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
function AppFooter() {
  const [showTopBtn, setShowTopBtn] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            setShowTopBtn(true);
        } else {
            setShowTopBtn(false);
        }
        
    });
}, []);


  function goTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
  
    <Container fluid >
      
      <div className="socials">
        <ul>
          <li><a href="tel:+9720533380740"><i className="fa fa-phone"></i></a></li>
          <li><a href="https://wa.me/9720533380740/?text=היי רציתי לבצע הזמנה"><i className="fab fa-whatsapp"></i></a></li>
          <li><a href="https://www.instagram.com/dolcidessert_il/"><i className="fab fa-instagram"></i></a></li>
        </ul>
      </div>
      
      {
        showTopBtn && (
          
          <div className="go-top" onClick={goTop}></div>
        )
      }
    </Container>
  )
}

export default AppFooter;