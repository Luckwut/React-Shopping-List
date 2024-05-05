import { useState } from "react";

export default function ListItemEdited({ item, onSave, onDelete }) {
  const [newItem, setNewItem] = useState({
    name: item.name,
    quantity: item.quantity,
    price: item.price,
  });

  const [errors, setErrors] = useState({
    name: false,
    quantity: false,
    price: false,
  });

  const handleChange = (fieldName) => (e) => {
    const inputValue = e.target.value;
    setNewItem({ ...newItem, [fieldName]: inputValue });

    // ERROR HANDLING
    let fieldError = false;

    switch (fieldName) {
      case "name":
        fieldError = inputValue.trim() === "";
        break;
      case "quantity":
        fieldError = inputValue === "" || parseFloat(inputValue) <= 0;
        break;
      case "price":
        fieldError = inputValue === "" || parseFloat(inputValue) <= 0;
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: fieldError }));
  };

  const handleSave = () => {
    const isValid = Object.values(errors).every((value) => value === false);

    if (isValid) {
      onSave(item, newItem);
    }
  };

  return (
    <div className="ListItem" key={item.id}>
      <div className="_Info">
        <div className="_Id">
          <span>{item.id}</span>
        </div>
        <div className="_Data">
          <span className="_Title">Name: </span>
          <span className="_Value">
            <input
              type="text"
              value={newItem.name}
              onChange={handleChange("name")}
              className={errors.name ? "inputError" : ""}
            />
          </span>
        </div>
        <div className="_Data">
          <span className="_Title">Quantity: </span>
          <span className="_Value">
            <input
              type="number"
              value={newItem.quantity}
              onChange={handleChange("quantity")}
              className={errors.quantity ? "inputError" : ""}
            />
          </span>
        </div>
        <div className="_Data">
          <span className="_Title">Price: </span>
          <span className="_Value">
            <input
              type="number"
              value={newItem.price}
              onChange={handleChange("price")}
              className={errors.price ? "inputError" : ""}
            />
          </span>
        </div>
        <div className="_Data">
          <span className="_Title">Total Price: </span>
          <span className="_Value">${newItem.quantity * newItem.price}</span>
        </div>
      </div>
      <div className="_Action">
        <button onClick={handleSave} className="_Save">
          Save
        </button>
        <button onClick={() => onDelete(item.id)} className="_Delete">
          Delete
        </button>
      </div>
    </div>
  );
}
