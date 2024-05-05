export default function ListItem({ item, onEdit, onDelete }) {
  return (
    <div className="ListItem" key={item.id}>
      <div className="_Info">
        <div className="_Id">
          <span>{item.id}</span>
        </div>
        <div className="_Data">
          <span className="_Title">Name: </span>
          <span className="_Value">{item.name}</span>
        </div>
        <div className="_Data">
          <span className="_Title">Quantity: </span>
          <span className="_Value">{item.quantity}</span>
        </div>
        <div className="_Data">
          <span className="_Title">Price: </span>
          <span className="_Value">${item.price}</span>
        </div>
        <div className="_Data">
          <span className="_Title">Total Price: </span>
          <span className="_Value">${item.quantity * item.price}</span>
        </div>
      </div>
      <div className="_Action">
        <button onClick={() => onEdit(item.id)} className="_Edit">
          Edit
        </button>
        <button onClick={() => onDelete(item.id)} className="_Delete">
          Delete
        </button>
      </div>
    </div>
  );
}
