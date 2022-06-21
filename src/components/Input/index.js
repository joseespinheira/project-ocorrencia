
const Input = ({ label, name, register, required }) => (
    <div>
      <label>{label}</label>
      <input {...register(name, { required })} />
    </div>
  );

  export default Input;