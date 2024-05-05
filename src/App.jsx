import { useState, useEffect } from "react";
import Form from "./Components/Form";
import ListItem from "./Components/ListItem";
import ListItemEdited from "./Components/ListItemEdited";
import Pagination from "./Components/Pagination";

function App() {
  const [shoppingList, setShoppingList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // LOCALSTORAGE
  useEffect(() => {
    const storedShoppingList = JSON.parse(localStorage.getItem("shoppingList"));
    if (storedShoppingList && storedShoppingList.length > 0) {
      setShoppingList(storedShoppingList);
    }
    console.log(shoppingList);
  }, []);

  useEffect(() => {
    localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
  }, [shoppingList]);

  // PAGINATION
  const itemsPerPage = 5;
  const totalPages = Math.ceil(shoppingList.length / itemsPerPage);

  const getCurrentItems = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return shoppingList.slice(startIndex, endIndex);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };
  
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // FORM HANDLE
  const handleAddItem = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const newShoppingList = {
      id: Date.now(),
      name: formData.get("item-name"),
      quantity: formData.get("item-quantity"),
      price: formData.get("item-price"),
      isEditing: false,
    };

    setShoppingList((prevShoppingList) => [
      ...prevShoppingList,
      newShoppingList,
    ]);

    event.currentTarget.reset();
  };

  const handleDelete = (itemID) => {
    setShoppingList((prevShoppingList) =>
      prevShoppingList.filter((item) => item.id !== itemID)
    );
  };

  const handleEdit = (itemID) => {
    setShoppingList((prevShoppingList) =>
      prevShoppingList.map((list) =>
        list.id === itemID ? { ...list, isEditing: !list.isEdit } : list
      )
    );
  };

  const handleSave = (item, newItem) => {
    const index = shoppingList.findIndex((list) => list.id === item.id);
    if (index !== -1) {
      const updatedShoppingList = [...shoppingList];
      updatedShoppingList[index] = {
        id: item.id,
        ...newItem,
        isEditing: false,
      };
      setShoppingList(updatedShoppingList);
    }
  };

  const calculateTotal = (items) => {
    return items.reduce((total, item) => {
      return total + item.quantity * item.price;
    }, 0);
  };

  return (
    <>
      <h1>Shopping List</h1>
      <Form onSubmit={handleAddItem} />

      <hr />

      <div className="displayShoppingList">
        {shoppingList.length === 0 ? (
          <h3>Shopping List Empty</h3>
        ) : (
          <>
            <Pagination
              onPrev={handlePrevPage}
              onNext={handleNextPage}
              currentPage={currentPage}
              totalPages={totalPages}
            />

            <h3>Total Price (All Item): ${calculateTotal(shoppingList)}</h3>

            <div className="displayListItem">
              {getCurrentItems().map((item) =>
                item.isEditing ? (
                  <ListItemEdited
                    key={item.id}
                    item={item}
                    onSave={handleSave}
                    onDelete={handleDelete}
                  />
                ) : (
                  <ListItem
                    key={item.id}
                    item={item}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                )
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
