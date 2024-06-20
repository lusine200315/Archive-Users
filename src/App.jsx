import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { AddUser } from "./components/AddUser";
import { UserList } from "./components/UserList";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);

  const addItem = (obj) => {
    setUsers([...users, obj]);
  };

  useEffect(() => {
    axios.get("http://localhost:3004/users").then((res) => {
      setUsers(res.data);
    });
    // toast.success("Send successfuly!")
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3004/users/${id}`).then((res) => {
      setUsers(users.filter((user) => user.id !== res.data.id));
      toast.success("Deleted successfully!", {
        autoClose: 2500,
      });
    });
  };

  const handleUpSalary = (user) => {
    let salary = parseInt(user.salary) + 50000;

    axios
      .put(`http://localhost:3004/users/${user.id}`, { salary })
      .then((res) => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === res.data.id
              ? { ...user, salary: res.data.salary }
              : user
          )
        );
        toast.success("Change has been successfully!");
      });
  };

  return (
    <div className="row">
      <ToastContainer />
      <AddUser onAdd={addItem} />
      <UserList
        users={users}
        onDelete={handleDelete}
        onUpdateSalary={handleUpSalary}
      />
    </div>
  );
}

export default App;
