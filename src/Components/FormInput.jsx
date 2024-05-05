export default function FormInput({ label, name, type, placeholder, min }) {
  return (
    <div className="FormInput">
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        type={type}
        id={name}
        placeholder={placeholder}
        {...(type === "number" ? { min: min || 0 } : {})}
        required
      />
    </div>
  );
}
