import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
const servicesData = [
  {
    id: 1,
    icon: 'fas fa-trophy',
    title: 'הזמנה ומשלוח עוגות מקוונות',
    description: 'חווה את הנוחות שבהזמנת העוגות האהובות עליך באינטרנט עם DOLCI. האתר שלנו מיועד לגלישה והזמנה קלים, ומבטיח שהפינוקים האהובים עליכם נמצאים במרחק של מספר קליקים בלבד. אנו מציעים שירותי משלוחים המבטיחים שהעוגה שלכם תגיע טרייה ויפה, מוכנה לאירוע המיוחד שלכם.'
  },
  {
    id: 2,
    icon: "fas fa-desktop",
    title: 'שירות לקוחות יוצא דופן',
    description: 'ב-DOLCI, אנו מחויבים לספק שירות לקוחות יוצא דופן. הצוות שלנו כאן כדי לסייע לך בכל פניה, הזמנה או בקשות מיוחדות. אנו מאמינים בבניית קשרים מתמשכים עם הלקוחות שלנו, ומבטיחים שכל אינטראקציה איתנו תהיה מענגת כמו העוגות שלנו.'
  },
  {
    id: 3,
    icon: 'fas fa-plug',
    title: 'קייטרינג וייעוץ לאירועים ומסעדות',
    description: 'מתכננים אירוע? שירותי הקייטרינג והייעוץ שלנו נועדו להפוך את האירוע שלכם להצלחה טעימה. אנו מציעים ייעוץ מומחה בבחירת תפריט, גודל מנות והתאמה לעוגה, כדי להבטיח שהאירוע שלכם יהיה בלתי נשכח ומענג.'
  },
  {
    id: 4,
    icon: 'fas fa-clone',
    title: 'עיצוב עוגה בהתאמה אישית',
    description: 'שירות עיצוב העוגות בהתאמה אישית שלנו הוא המקום שבו עוגת החלומות שלך מתעצבת. בין אם זו עוגת חתונה, עוגת יום הולדת או יצירה ייחודית לכל אירוע אחר, הצוות שלנו עובד איתך כדי להגשים את החזון שלך. אנו משלבים אומנות עם טעם, ומבטיחים שכל עוגה תהיה לא רק חגיגה לעיניים אלא גם לחיך.'
  }
 
]

function AppServices() {
  return (
    <section id="services" className="block services-block mb-sm-5">
      <Container fluid>
        <div className="title-holder">
          <h2>השירותים שלנו - DOLCI</h2>
          <div className="subtitle">הנה הצצה למה שאנו מציעים</div>
        </div>
        <Row>
          {
            servicesData.map(services => {
              return (
                <Col sm={4} md={6} className='holder' key={services.id}>
                  <div className="icon">
                    <i className={services.icon}></i>
                  </div>
                  <h3>{services.title}</h3>
                  <p>{services.description}</p>
                </Col>
              );
            })
          }
        </Row>
      </Container>
    </section>
  );
}

export default AppServices;