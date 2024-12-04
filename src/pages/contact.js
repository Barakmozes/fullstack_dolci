import Container from 'react-bootstrap/Container';

import React from 'react';
import WhatsAppForm from './contact_from'


function AppContact() {


  return (
    <section id="contact" className="block contact-block mt-5 " >
      <Container fluid>
        <div className="title-holder">
          <h2>צור קשר</h2>
          <div className="subtitle">זמינים כעט</div>
        </div>
        <WhatsAppForm />
      </Container>
      <div className='google-map'>
<iframe  title="Description of content" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3383.1207294630394!2d34.74099612532671!3d32.01184322269777!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1502b3f90d327f1b%3A0x3cb6a44859b19078!2z15PXqNeaINeR158g15LXldeo15nXldefIDEzNiwg15HXqiDXmded!5e0!3m2!1siw!2sil!4v1700144532762!5m2!1siw!2sil" width={600} height={450} style={{border: 0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />

      </div>
      <Container fluid className='footer_contact'>
        <div className='contact-info '>
          <ul>
            <li>
              <i className="fas fa-envelope"></i>
              hello@domain.com
            </li>
            <li>
              <i className="fas fa-phone "></i>
             052-250-2141
            </li>
            <li>
              <i className="fas fa-map-marker-alt"></i>
              בת ים המסר 5
            </li>
          </ul>
        </div>
      </Container>
    </section>
  );
}

export default AppContact;