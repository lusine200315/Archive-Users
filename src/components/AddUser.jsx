import axios from "axios";
import { useForm } from "react-hook-form";
import Types from "prop-types";
import { toast } from "react-toastify";

export const AddUser = ({ onAdd }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleAdd = (data) => {
    if (isNaN(+data.salary)) {
      return toast.error("Salary must be a number");
    }
    axios.post("http://localhost:3004/users", data).then((res) => {
      onAdd(res.data);
      reset();
    });
  };

  return (
    <div>
      <h1>Add User</h1>
      <form onSubmit={handleSubmit(handleAdd)}>
        <label>name</label>
        <input {...register("name", { required: true, minLength: 3 })} />
        {errors.name && <p style={{ color: "red" }}>Please fill your name</p>}

        <label>surname</label>
        <input {...register("surname", { required: true })} />
        {errors.surname && (
          <p style={{ color: "red" }}>Please fill your surname</p>
        )}

        <label>salary</label>
        <input {...register("salary", { required: true })} />
        {errors.salary && (
          <p style={{ color: "red" }}>Please fill your salary</p>
        )}

        <button>Save</button>
      </form>
    </div>
  );
};

AddUser.propTypes = {
  onAdd: Types.func,
};
