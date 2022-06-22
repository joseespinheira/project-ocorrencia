
const Input = ({ label, name, register, required }) => (
    <div className="d-flex justify-content-between m-4">
      <label>{label}</label>
      <input {...register(name, { required })} />
    </div>
  );

  export default Input;