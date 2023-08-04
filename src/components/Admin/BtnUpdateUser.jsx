import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BtnUpdateUser({
  item,
  path,
  setArray = undefined,
  setItem = undefined,
}) {
  const user = useSelector((state) => state.user);
  const notify = () => toast.error("Server Error to try Update User!");

  const [formData, setFormData] = useState({
    firstname: item.firstname,
    lastname: item.lastname,
    email: item.email,
    address: item.address,
    telephone: item.telephone,
    roleId: item.roleId,
  });

  const handleUpdate = async (ev) => {
    ev.preventDefault();

    const user = item;

    if (setArray) {
      reactUpdateItem(formData);
    } else if (setItem) {
      setItem((prev) => ({ ...prev, ...formData }));
    }

    const data = await axiosUpdateItem();
    if (!data) {
      notify();
      if (setArray) {
        reactUpdateItem(user);
      } else if (setItem) {
        setItem(user);
      }
    }
  };

  const reactUpdateItem = (newUser) =>
    setArray((prev) =>
      prev.map((user) =>
        user.email !== item.email ? user : { ...user, ...newUser }
      )
    );

  const axiosUpdateItem = async () => {
    let url = process.env.REACT_APP_DOMAIN + path + "/";
    if (setArray) url += item.id;
    try {
      const response = await axios({
        method: "patch",
        url,
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${user.token}`,
        },
        data: formData,
      });
      return response.data;
    } catch (error) {
      return null;
    }
  };

  return (
    <>
      <button
        type="button"
        className={"btn btn-outline-success py-0 px-2 rounded-0 mx-1"}
        data-bs-toggle="modal"
        data-bs-target={`#staticBackdropBtnUpdateUser${item.id}`}
      >
        <i className={"far fa-edit"}></i>
      </button>

      <div
        id={`staticBackdropBtnUpdateUser${item.id}`}
        className="modal fade"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Update User</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleUpdate}>
                {!setItem && (
                  <>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control rounded-0"
                        value={formData.firstname}
                        placeholder="Firstname"
                        onChange={(ev) =>
                          setFormData((prev) => ({
                            ...prev,
                            firstname: ev.target.value,
                          }))
                        }
                      />
                      <label htmlFor="firstname">Firstname</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control rounded-0"
                        value={formData.lastname}
                        placeholder="Lastname"
                        onChange={(ev) =>
                          setFormData((prev) => ({
                            ...prev,
                            lastname: ev.target.value,
                          }))
                        }
                      />
                      <label htmlFor="lastname">Lastname</label>
                    </div>
                    <div className="form-floating mb-3">
                      <input
                        type="email"
                        className="form-control rounded-0"
                        value={formData.email}
                        placeholder="Email"
                        onChange={(ev) =>
                          setFormData((prev) => ({
                            ...prev,
                            email: ev.target.value,
                          }))
                        }
                      />
                      <label htmlFor="email">Email</label>
                    </div>
                  </>
                )}
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control rounded-0"
                    value={formData.address}
                    placeholder="Address"
                    onChange={(ev) =>
                      setFormData((prev) => ({
                        ...prev,
                        address: ev.target.value,
                      }))
                    }
                  />
                  <label htmlFor="address">Address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control rounded-0"
                    value={formData.telephone}
                    placeholder="Telephone"
                    onChange={(ev) =>
                      setFormData((prev) => ({
                        ...prev,
                        telephone: ev.target.value,
                      }))
                    }
                  />
                  <label htmlFor="telephone">Telephone</label>
                </div>
                {!setItem && (
                  <>
                    <div className="form-floating mb-3">
                      <select
                        className="form-control"
                        name="role"
                        defaultValue={formData.roleId}
                        onChange={(ev) =>
                          setFormData((prev) => ({
                            ...prev,
                            roleId: ev.target.value,
                          }))
                        }
                      >
                        <option key={2} value={2}>
                          User
                        </option>
                        <option key={4} value={4}>
                          Admin
                        </option>
                      </select>
                      <label htmlFor="role">Role</label>
                    </div>
                  </>
                )}
                <button
                  className="btn btn-dark mt-2 w-100 titles-commerce rounded-0"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BtnUpdateUser;
