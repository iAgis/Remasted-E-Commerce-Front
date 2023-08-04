import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function BtnUpdateBrand({ item, path, setArray = undefined }) {
  const user = useSelector((state) => state.user);
  const notify = () => toast.error("Server Error to try Update User!");

  const [formData, setFormData] = useState({
    name: item.name,
    description: item.description,
  });

  const handleUpdate = async (ev) => {
    ev.preventDefault();
    const prevData = item;
    reactUpdateItem(formData);
    const data = await axiosUpdateItem();
    if (data) {
      reactUpdateItem(data);
    } else {
      reactUpdateItem(prevData);
      notify();
    }
  };

  const reactUpdateItem = (data) =>
    setArray((prev) =>
      prev.map((it) => (it.id !== item.id ? it : { ...it, ...data }))
    );

  const axiosUpdateItem = async () => {
    try {
      const response = await axios({
        method: "patch",
        url: process.env.REACT_APP_DOMAIN + path + "/" + item.id,
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
        data-bs-target={`#staticBackdropBtnUpdateBrand${item.id}`}
      >
        <i className={"far fa-edit"}></i>
      </button>

      <div
        id={`staticBackdropBtnUpdateBrand${item.id}`}
        className="modal fade"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Update Brand</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleUpdate}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control rounded-0"
                    name="name"
                    value={formData.name}
                    placeholder="Name"
                    onChange={(ev) =>
                      setFormData((prev) => ({
                        ...prev,
                        name: ev.target.value,
                      }))
                    }
                  />
                  <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                  <textarea
                    type="text"
                    style={{ minHeight: "30vh" }}
                    className="form-control rounded-0"
                    name="description"
                    value={formData.description}
                    placeholder="Telephone"
                    onChange={(ev) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: ev.target.value,
                      }))
                    }
                  />
                  <label htmlFor="description">Description</label>
                </div>
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

export default BtnUpdateBrand;
