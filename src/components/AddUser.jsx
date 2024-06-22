import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Types from "prop-types";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  name: yup.string().required("Please fill your name").min(3, "Name must be at least 3 characters"),
  surname: yup.string().required("Please fill your surname"),
  salary: yup
    .number()
    .typeError("Salary must be a number")
    .required("Please fill your salary"),
});

export const AddUser = ({ onAdd }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleAdd = (data) => {
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
        <input {...register("name")} />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}

        <label>surname</label>
        <input {...register("surname")} />
        {errors.surname && <p style={{ color: "red" }}>{errors.surname.message}</p>}

        <label>salary</label>
        <input {...register("salary")} />
        {errors.salary && <p style={{ color: "red" }}>{errors.salary.message}</p>}

        <button>Save</button>
      </form>
    </div>
  );
};

AddUser.propTypes = {
  onAdd: Types.func,
};
