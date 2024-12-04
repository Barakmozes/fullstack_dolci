import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
const pricingData = [
  {
    "id": 1,
    "plan": "חבילת בסיס",
    "price": "150 ש״ח",
    "features": ["3 עוגות חתימה מיניאטוריות", "מבחר מאפים מתוקים", "אפשרות להתאמה אישית", "אריזה מעוצבת", "תמיכה ושירות לקוחות"],
    "link": "https://www.google.com"
  },
  {
    "id": 2,
    "plan": "פרימיום",
    "price": "300 ש״ח",
    "features": ["עוגת טירה מעוצבת", "מבחר קינוחים גורמה", "ייעוץ אישי עם הקונדיטור", "משלוח חינם", "תמיכה ושירות לקוחות VIP"],
    "link": "https://www.facebook.com"
  },
  {
    "id": 3,
    "plan": "אולטימטיבי",
    "price": "500 ש״ח",
    "features": ["עוגה מותאמת אישית לאירוע", "מבחר קינוחים פרימיום", "סדנת אפייה פרטית", "משלוח מהיר", "תמיכה וייעוץ אישי 24/7"],
    "link": "https://www.twitter.com"
  }
]


function AppPricing() {
  return (
    <section id="pricing" className="block pricing-block ">
      <Container fluid>
        <div className="title-holder">
          <h2> מבצעים  &amp;חבילת </h2>
          <div className="subtitle">מציעים תמחור ייחודי</div>
        </div>
        <Row>
          {
            pricingData.map(pricing => {
              return (
                <Col sm={4} key={pricing.id}>
                  <div className='heading'>
                    <h3>{pricing.plan}</h3>
                    <span className='price'>{pricing.price}</span>
                  </div>
                  <div className='content '>
                    <ListGroup>
                      {
                        pricing.features.map((feature, index) => {
                          return (
                            <ListGroup.Item key={index}>{feature}</ListGroup.Item>    
                          );
                        })
                      }
                    </ListGroup>
                  </div>
                  <div className='btn-holder'>
                    <a href={pricing.link} className='btn btn-primary text-primary-emphasis'>הזמן עכשיו</a>
                  </div>
                </Col>
              )
            })
          }
        </Row>
      </Container>
    </section>
  )
}

export default AppPricing;