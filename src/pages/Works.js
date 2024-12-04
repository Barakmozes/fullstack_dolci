import { Link, useSearchParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useEffect, useState } from "react";
import { API_URL, doApiGet } from "../services/apiService";
import PagesBtns from "../components/general/pagesBtns";
import { TfiShoppingCart } from "react-icons/tfi";

function AppWorks() {
  const [ar, setAr] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);
  const [query] = useSearchParams();
  const [select_ar, setSelectAr] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState('');
  let currentPage = Number(query.get("page"));
 

  useEffect(() => {
    doApi();
    doApiPage();
  }, [query]);

  useEffect(() => {
    doApi_companies();
  }, []);

  useEffect(() => {
    if (selectedCompany>0) {
      filterAndSortData(selectedCompany);
    }
  }, [selectedCompany]);

  const doApi = async () => {
    const page = query.get("page") || 1;
    const url = API_URL + "/devices?page=" + page;

    try {
      const data = await doApiGet(url);
      setAr(data.slice(0, 9));
    } catch (error) {
      console.log(error);
    }
  };

  const doApiPage = async () => {
    try {
      const url = API_URL + "/devices/count";
      const response = await doApiGet(url);
      setTotalPages(response.pages);
      setTotalProduct(response.count)
    } catch (err) {
      console.log(err);
    }
  };

  const doApi_companies = async () => {
    try {
      const url = API_URL + "/companies";
      const data = await doApiGet(url);
      // console.log(data);
      setSelectAr(data);
    } catch (error) {
      console.log(error);
    }
  };

  



  const handleSelectChange = (e) => {
    setSelectedCompany(e.target.value);
  };

  const filterAndSortData = async (companyId) => {
    try {
      const page = totalProduct;
    const url = API_URL + "/devices?perPage="+page;
      const data = await doApiGet(url);
      const companyIdStr = companyId.toString();
      // console.log(companyIdStr);
      // console.log(data);
      
      let ar_flter=[...data.filter(item => item.company_id ===companyIdStr )];
      // console.log(ar_flter);
      setAr(ar_flter);
    } catch (error) {
      console.log(error);
    }
  };

  
  
  
  

  return (
    <section id="works" className="block works-block">
      <Container fluid>
        <div className="title-holder">
          <h2>קטלוג מוצרים</h2>
          <div className="subtitle">הקולקציה המשובחת DOLCI</div>
        </div>
        <div className="d-flex align-items-center">
          {/* "Previous" button - disabled if on the first page */}
          {select_ar.length > 0 ? (
           <select onChange={handleSelectChange}
              className="form-checkbox select_comp ms-4 me-2 mb-2 btn btn-primary shadow"
              type="checkbox"
            >
              <option className="btn btn-primary" key={0} value={1}>
                     קטגוריות
                  </option>
              {select_ar.map((item) => {
                return (
                  <option className="btn btn-primary" key={item._id} value={item.company_id}>
                    {item.name}
                  </option>
                );
              })}
            </select> 
             ) : (
              <h2>Loading...</h2>
              )}
          <Link
            to={"/works/?page=" + Math.max(currentPage - 1, 1)}
            className={`ms-2 btn btn-outline-danger btn-primary p-0 shadow ${
              currentPage === 1 ? "disabled" : ""
            }`}
          >
            חזרה
          </Link>

          {/* Page buttons */}

          <PagesBtns
            linkTo={"/works/?page="}
            cssClass="btn btn-primary p-1 shadow ms-2"
            apiUrl={API_URL + "/devices/count"}
          />

          {/* "Next" button - disabled if on the last page */}
          <Link
            to={"/works/?page=" + Math.min(currentPage + 2, totalPages)}
            className={`ms-2 btn btn-outline-danger btn-primary p-0 shadow  ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            הבא
          </Link>
        
        </div>
        {ar.length > 0 ? (
        <Row className="portfoliolist">
          {ar.map((works) => {
            return (
              <Col className="hit" sm={4} key={works._id}>
                <Link  className="sd btn-primary" to={"/PurchasePage/" + works._id}>
                  <div className="portfolio-wrapper shadow rounded">
                    <div
                      style={{
                        backgroundImage: `url(${works.ImageURL})`,
                        backgroundSize: "cover", // Example additional style
                        backgroundPosition: "center", // Example additional style
                      }}
                      className="d-block w-100 hero-img"
                    ></div>
                    <div className="label text-center">
                    <h4>קנה עכשיו<TfiShoppingCart  /></h4>
                      <h3>{works.Name}</h3>
                      <p>{works.Description}</p>
                    </div>
                  </div>
                </Link>
              </Col>
            );
          })}
        </Row>
         ) : (
          <h2>Loading...</h2>
          )}
      </Container>
    </section>
  );
}

export default AppWorks;
