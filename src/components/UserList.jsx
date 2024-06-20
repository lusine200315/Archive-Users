import Types from "prop-types";

export const UserList = ({ users, onDelete, onUpdateSalary }) => {
    console.log(users[0]?.salary > 5, 1);
  return (
    <div>
      <h1>User List</h1>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>surname</th>
            <th>salary</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr
                key={user.id}
                style={{
                  backgroundColor:
                    user.salary > 800000 ? '#6F6F6F' : '#8C5A96' 
                }}
              >
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.surname}</td>
                <td>{user.salary}</td>
                <td style={{ display: "flex", gap: "10px" }}>
                  <button onClick={() => onUpdateSalary(user)}>
                    Salary Up
                  </button>
                  <button onClick={() => onDelete(user.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

UserList.propTypes = {
  users: Types.arrayOf(
    Types.exact({
      id: Types.string,
      name: Types.string,
      surname: Types.string,
      salary: Types.string,
    })
  ),
  onDelete: Types.func,
  onUpdateSalary: Types.func,
};
