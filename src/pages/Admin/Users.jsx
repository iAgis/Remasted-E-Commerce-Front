import { useEffect, useState } from "react";
import axios from "axios";
import "../../components/Admin/Admin.css";
import Loader from "../../components/Loader/Loader";
import { useSelector } from "react-redux";
import ServerError from "./ServerError";
import BtnDeleteAxios from "../../components/Admin/BtnDeleteAxios";
import BtnUpdateUser from "../../components/Admin/BtnUpdateUser";

function Users() {
  const user = useSelector((state) => state.user);
  const [users, setUsers] = useState(undefined);
  const [strToFilter, setStrToFilter] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios({
          method: "get",
          url: process.env.REACT_APP_DOMAIN + "/users",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        setUsers(null);
      }
    };
    getUsers();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="d-flex flex-column w-100 p-4">
      <span className="d-flex titles-commerce fw-bold fs-4">Users</span>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control mt-4"
          placeholder="Search some user..."
          aria-label="Example text with button addon"
          aria-describedby="button-addon1"
          value={strToFilter}
          onChange={(ev) => setStrToFilter(ev.target.value)}
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Firstname</th>
            <th scope="col">Lastname</th>
            <th scope="col">Email</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users
              .filter((item) => filterUser(item, strToFilter))
              .map((item, index) => (
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>{item.firstname}</td>
                  <td>{item.lastname}</td>
                  <td>{item.email}</td>
                  <td>
                    <div className="d-flex py-1">
                      <BtnUpdateUser
                        item={item}
                        items={users}
                        setArray={setUsers}
                        path={"/users"}
                      />
                      <BtnDeleteAxios
                        item={item}
                        items={users}
                        setArray={setUsers}
                        path={"/users"}
                        title="Delete User"
                      />
                    </div>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
      {users === undefined && <Loader color="#000" />}
      {users === null && <ServerError />}
    </div>
  );
}

export default Users;

function filterUser(user, strToFilter) {
  if (strToFilter === "") {
    return true;
  } else {
    let res = false;
    const keyWord = strToFilter.toLowerCase();
    res = user.firstname.toLowerCase().includes(keyWord);
    if (!res) res = user.lastname.toLowerCase().includes(keyWord);
    if (!res) res = user.email.toLowerCase().includes(keyWord);
    if (!res) res = user.id === Number(strToFilter);
    return res;
  }
}
