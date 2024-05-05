import FormInput from "./FormInput";

export default function Form({onSubmit}) {
  return (
    <form className="Form" onSubmit={onSubmit}>
      <FormInput
        label="Name"
        name="item-name"
        type="text"
        placeholder="Insert Item Name"
      />
      <FormInput
        label="Quantity"
        name="item-quantity"
        type="number"
        placeholder="Insert Item Quantity"
        min={1}
      />
      <FormInput
        label="Price"
        name="item-price"
        type="number"
        placeholder="Insert Item price"
        min={0}
      />
      <button type="submit">Add Item</button>
    </form>
  );
}
