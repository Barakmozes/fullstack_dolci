import Container from 'react-bootstrap/Container';

function AppTestimonials() {
  return (
    <section id="testimonials" className='testimonials-block' >
      <Container fluid>
        <div className="title-holder">
          <h2>אומנות אפיית עוגה מושלמת</h2>
        </div>
        <div className="video-holder">
          <video autoPlay muted loop>
            <source src="/mp4/pexels-anna-shvets-5930369 (1080p).mp4" type="video/mp4" />
          </video>

        </div>
      </Container>
    </section>
  );
}

export default AppTestimonials;
