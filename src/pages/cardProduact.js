import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL, doApiGet, TOKEN_KEY } from "../services/apiService";
import { sortBy } from "lodash";
import { FaShekelSign } from "react-icons/fa6";

const PurchasePage = () => {
  const [device, setDevice] = useState(null);
  const [tasks, setTasks] = useState([]);

  const params = useParams();
  const KEY_LOCAL = "todo_local";

  useEffect(() => {
    doApi();
    const storedTasks = localStorage[KEY_LOCAL];
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const doApi = async () => {
    try {
      const urlDevice = `${API_URL}/devices/single/${params.id}`;
      const dataDevice = await doApiGet(urlDevice);
      setDevice(dataDevice);
    } catch (error) {
      console.error(error);
      // Handle the error appropriately here
    }
  };

  const addTask = (itemTask) => {
    let newTasks = Array.isArray(tasks) ? [...tasks] : [];

    const existingItemIndex = newTasks.findIndex(
      (item) => item._id === itemTask._id
    );
    if (existingItemIndex > -1) {
      // Increment AvailabilityStatus (quantity)
      newTasks[existingItemIndex].AvailabilityStatus += 1;
      // Update the total price for this item
      newTasks[existingItemIndex].Price = calculateNewPrice(
        newTasks[existingItemIndex].initialPrice,
        newTasks[existingItemIndex].AvailabilityStatus
      );
    } else {
      // Add new item with AvailabilityStatus 1 and store the initial price
      newTasks.push({
        ...itemTask,
        AvailabilityStatus: 1,
        initialPrice: itemTask.Price,
      });
    }

    const sortedTasks = sortBy(newTasks, "Price");
    saveLocal(sortedTasks);
  };

  const calculateNewPrice = (initialPrice, quantity) => {
    // Calculate the total price based on the initial price and quantity
    return initialPrice * quantity;
  };

  const removeAllTasks = () => {
    saveLocal([]);
  };

  const onAddTaskClick = () => {
    if (device) {
      addTask(device);
    }
  };

  const removeSingleTask = (delId) => {
    const filteredTasks = tasks.filter((item) => item._id !== delId);
    saveLocal(filteredTasks);
  };

  const saveLocal = (tasksArray) => {
    localStorage.setItem(KEY_LOCAL, JSON.stringify(tasksArray));
    setTasks(tasksArray);
  };

  if (!device) {
    return <div>Loading...</div>; // Or any other loading state representation
  }
  return (
    
    <sda
      
      style={{
        height: "auto",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        backgroundImage: 'url("/img/any/pexels-eddson-lens-19100919.jpg")', // Update this path
        backgroundSize: "cover", // Cover the entire space
        backgroundPosition: "center",
      }}
    >
      <Container className="p-5 mx-auto  fw-bold d-flex justify-content-center align-items-center flex-column">
      <DeviceCard
        device={device}
        onAddTaskClick={onAddTaskClick}
        removeAllTasks={removeAllTasks}
      />
      <Cart tasks={tasks} removeSingleTask={removeSingleTask} />
      <CheckoutForm />
      </Container>
    </sda>
  );
};

const DeviceCard = ({ device, onAddTaskClick, removeAllTasks }) => {
  const nav = useNavigate();
  return (
    <div
      key={device._id}
      className="col-md-7 col-lg-8  ms-3 p-3  shadow card"
      style={{ width: "18rem" }}
    >
      <img src={device.ImageURL} alt={device.Name} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title fw-bold">{device.Name}</h5>
        <p className="card-text">{device.Description}</p>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item   ">
          מחיר: {device.Price} <FaShekelSign />
        </li>
        <li className="list-group-item    ">{device.Size}</li>
        <li className="list-group-item   ">{device.Weight}</li>
      </ul>
      <div className="card-body row text-center">
        <button
          onClick={onAddTaskClick}
          className=" btn btn-outline-info  col-5   ms-3 shadow border border-primary-subtle fw-bold text-dark"
        >
          הוסף לעגלה
        </button>
        <button
          onClick={() => {
            nav("/works");
          }}
          className=" btn btn-outline-info col-5 shadow border border-primary-subtle fw-bold text-dark" 
        >
          חזור לקטלוג
        </button>
        <div className="text-center">
        <button
          onClick={removeAllTasks}
          className="btn btn-sm btn-danger  mt-2 shadow border border-primary-subtle"
        >
          מחק הכל
        </button>
        </div>
      </div>
    </div>
  );
};

const Cart = ({ tasks, removeSingleTask }) => {
  const [tokenDiscount, setTokenDiscount] = useState(0);

  const safeTasks = Array.isArray(tasks) ? tasks : [];

  useEffect(() => {
    const discount = calculateDiscount();
    setTokenDiscount(discount);
  }, [tasks]); // Recalculate discount when tasks change

  const calculateTotalQuantity = () => {
    return safeTasks.reduce((acc, item) => acc + item.AvailabilityStatus, 0);
  };

  const calculateDiscount = () => {
    if (localStorage[TOKEN_KEY]) {
      const totalBeforeDiscount = safeTasks.reduce((acc, item) => {
        return (
          acc + (item.initialPrice || item.Price) * item.AvailabilityStatus
        );
      }, 0);
      return totalBeforeDiscount * 0.05; // 5% discount
    }
    return 0;
  };

  const calculateTotal = () => {
    const totalBeforeDiscount = safeTasks.reduce((acc, item) => {
      return acc + (item.initialPrice || item.Price) * item.AvailabilityStatus;
    }, 0);

    return totalBeforeDiscount - tokenDiscount;
  };

  return (
    <div className="col-md-7 col-lg-8 mt-2  mb-2 ms-3 p-3 card shadow ">
      <h4 className="d-flex justify-content-between align-items-center mb-3">
        <span className="mt-1 fw-bold">העגלה שלך</span>
        <span className="badge bg-primary rounded-pill">
          {calculateTotalQuantity()}
        </span>
      </h4>

      {safeTasks.length === 0 ? (
        <p>העגלה ריקה</p>
      ) : (
        safeTasks.map((item) => (
          <div key={item._id} className="shadow my-2 p-2">
            <button
              onClick={() => removeSingleTask(item._id)}
              className="btn btn-danger btn-sm shadow border border-primary-subtle float-start"
            >
              X
            </button>
            <li className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0 text-primary fw-bold">{item.Name}</h6>
                <small className="text-muted">{item.Description}</small>
              </div>
            </li>
            <div>
              <span className="text-muted">
                מחיר: {item.Price} <FaShekelSign />,{" "}
              </span>
              <span className="text-muted">
                כמות: {item.AvailabilityStatus}
              </span>
            </div>
          </div>
        ))
      )}

      {localStorage[TOKEN_KEY] && (
        <li className="list-group-item d-flex justify-content-between bg-body-tertiary">
          <div className="text-muted">
            <h6 className="my-0 text-primary fw-bold">הנחת מועדן</h6>
            <small>ניתן 5% הנחה</small>
          </div>
          <span className="text-muted">
            {calculateDiscount().toFixed(2)}
            <FaShekelSign />
          </span>
        </li>
      )}
      <li className="list-group-item d-flex justify-content-between">
        <span>

          סה"כ
        </span>
        <strong>
          {calculateTotal().toFixed(2)}
          <FaShekelSign />
        </strong>
      </li>
      {/* ... Additional UI elements ... */}
    </div>
  );
};

const CheckoutForm = () => {
  return (
    <div className="col-md-7 col-lg-8   ms-3 p-3 btn btn-primary border border-primary-subtle shadow">
      <h2 className="mb-3 fs-2 fw-bold ">כתובת לחיוב</h2>
      <form className="needs-validation" noValidate>
        <div className="row g-3">
          <div className="col-sm-6">
            <label htmlFor="firstName" className="form-label">
              שם פרטי
            </label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="שם"
            />
            <div className="invalid-feedback">נדרש שם פרטי תקף.</div>
          </div>
          <div className="col-sm-6">
            <label htmlFor="lastName" className="form-label">
              שם משפחה
            </label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder="שם משפחה"
            />
            <div className="invalid-feedback">נדרש שם משפחה .</div>
          </div>
          <div className="col-12">
            <label htmlFor="email" className="form-label">
              דוא"ל <span className="text-body-secondary">(אופציונלי)</span>
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="you@example.com"
            />
            <div className="invalid-feedback">
              נא להזין כתובת דוא"ל תקפה לעדכוני משלוח.
            </div>
          </div>
          <div className="col-12">
            <label htmlFor="address" className="form-label">
              כתובת
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              placeholder="רחוב ראשי 1234"
              required
            />
            <div className="invalid-feedback">
              נא להזין את כתובת המשלוח שלך.
            </div>
          </div>
          <div className="col-12">
            <label htmlFor="address2" className="form-label">
              כתובת 2 <span className="text-body-secondary">(אופציונלי)</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="address2"
              placeholder="דירה או סוויטה"
            />
          </div>
          <div className="col-md-5">
            <label htmlFor="country" className="form-label">
              עיר{" "}
            </label>
            <select className="form-select" id="country" required>
              <option value>בחר...</option>
              <option>בת ים</option>
              <option>רשלצ</option>
              <option></option>
            </select>
            <div className="invalid-feedback">נא לבחור מדינה תקפה.</div>
          </div>
          <div className="col-md-4">
            <label htmlFor="state" className="form-label">
              מדינה
            </label>
            <select className="form-select" id="state" required>
              <option value>בחר...</option>
              <option>קליפורניה</option>
            </select>
            <div className="invalid-feedback">נא לספק מדינה תקפה.</div>
          </div>
          <div className="col-md-3">
            <label htmlFor="zip" className="form-label">
              מיקוד
            </label>
            <input
              type="text"
              className="form-control"
              id="zip"
              placeholder
              required
            />
            <div className="invalid-feedback">נדרש מיקוד.</div>
          </div>
        </div>
        <hr className="my-4" />
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="same-address"
          />
          <label className="form-check-label" htmlFor="same-address">
            כתובת המשלוח זהה לכתובת החיוב
          </label>
        </div>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="save-info" />
          <label className="form-check-label" htmlFor="save-info">
            שמור את המידע הזה לפעם הבאה
          </label>
        </div>
        <hr className="my-4" />
        <h4 className="mb-3">תשלום</h4>
        <div className="my-3">
          <div className="form-check">
            <input
              id="credit"
              name="paymentMethod"
              type="radio"
              className="form-check-input"
              defaultChecked
              required
            />
            <label className="form-check-label" htmlFor="credit">
              כרטיס אשראי
            </label>
          </div>
          <div className="form-check">
            <input
              id="debit"
              name="paymentMethod"
              type="radio"
              className="form-check-input"
              required
            />
            <label className="form-check-label" htmlFor="debit">
              כרטיס חיוב
            </label>
          </div>
          <div className="form-check">
            <input
              id="paypal"
              name="paymentMethod"
              type="radio"
              className="form-check-input"
              required
            />
            <label className="form-check-label" htmlFor="paypal">
              PayPal
            </label>
          </div>
        </div>
        <div className="row gy-3">
          <div className="col-md-6">
            <label htmlFor="cc-name" className="form-label">
              שם על הכרטיס
            </label>
            <input
              type="text"
              className="form-control"
              id="cc-name"
              placeholder
              required
            />
            <small className="text-body-secondary">
              השם המלא כפי שמופיע על הכרטיס
            </small>
            <div className="invalid-feedback">נדרש שם על הכרטיס</div>
          </div>
          <div className="col-md-6">
            <label htmlFor="cc-number" className="form-label">
              מספר כרטיס אשראי
            </label>
            <input
              type="text"
              className="form-control"
              id="cc-number"
              placeholder
              required
            />
            <div className="invalid-feedback">נדרש מספר כרטיס אשראי</div>
          </div>
          <div className="col-md-3">
            <label htmlFor="cc-expiration" className="form-label">
              תוקף
            </label>
            <input
              type="text"
              className="form-control"
              id="cc-expiration"
              placeholder
              required
            />
            <div className="invalid-feedback">
              נדרש תאר card number is required
            </div>
          </div>

          <div className="col-md-3">
            <label htmlFor="cc-cvv" className="form-label">
              CVV
            </label>
            <input
              type="text"
              className="form-control"
              id="cc-cvv"
              placeholder
              required
            />
            <div className="invalid-feedback">Security code required</div>
          </div>
        </div>
        <hr className="my-4" />
        <button className="w-50 btn btn-primary btn-lg mb-4" type="submit">
          שלם
        </button>
      </form>
    </div>
  );
};

export default PurchasePage;
