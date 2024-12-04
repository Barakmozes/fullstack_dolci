import Carousel from "react-bootstrap/Carousel";
import React from "react";
import { TfiShoppingCart } from "react-icons/tfi";
import { Link } from "react-router-dom";

function AppHero() {

  let arr =[
    {
      "_id": {
        "$oid": "6565045b815f282388c0bd43"
      },
        "Name": "עוגת יער שחור",
        "Description": "עוגה עשירה בטעמי שוקולד ודובדבנים",
        "ImageURL": "/img/big/326390468_173061852101510_8733321482910305452_n.webp"
    },
    {
      "_id": {
        "$oid": "655a0453b55671f10609a495"
      },
        "Name": "עוגת רד ולווט",
        "Description": "עוגה מרהיבה בצבע אדום עם קרם גבינה עדין",
        "ImageURL": "/img/big/325460251_3083779028594630_7768461179754871406_n.webp"
    },
    {
      "_id": {
        "$oid": "655a0451b55671f10609a494"
      },
        "Name": "עוגת בומב מוס",
        "Description": "עוגה מרהיבה עם קרם אגוזי לוז וציפוי שוקלד בלגי",
        "ImageURL": "/img/big/336947827_740220224228139_5822508374678524526_n.webp"
    },
    {
      "_id": {
        "$oid": "655a044fb55671f10609a493"
      },
        "Name": "עוגת גבינת פרורים",
        "Description": "עוגה מגבינה צרפתית עם קרמבל מפתיע",
        "ImageURL": "/img/big/327778382_5903229193066716_5234002798289153398_n.webp"
    }
]
const fastInterval = 3000; 
  return (
    <section  className="hero-block mt-0 ">
      <Carousel >
        {arr.map((hero) => {
          return (
            <Carousel.Item key={hero._id.$oid} interval={fastInterval}>
              <div
                style={{
                  backgroundImage: `url(${hero.ImageURL})`,
                  backgroundSize: "cover", // Example additional style
                  backgroundPosition: "center", // Example additional style
                  
                }}
                className="d-block w-100 hero-img"
              >
                {/* Content of the carousel item goes here */}
              </div>
              <Carousel.Caption>
                <h2>{hero.Name}</h2>
                <p >{hero.Description}</p>
                <Link className="btn btn-primary text-light btn-primart" to={"/PurchasePage/" + hero._id.$oid}>
                  קנה עכשיו <TfiShoppingCart  />
                  </Link>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </section>
  );
}

export default AppHero;
