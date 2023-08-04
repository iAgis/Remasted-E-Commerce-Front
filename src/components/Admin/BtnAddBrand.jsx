import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function BtnAddBrand({ setBrands }) {
  const user = useSelector((state) => state.user);
  const [name, setName] = useState("");
  const [description, setDescripion] = useState("");
  const notify = () => toast.error("Server Error to try Create Brand!");

  async function handleSubmit(ev) {
    ev.preventDefault();
    closeModal();
    setBrands((prev) => [
      ...prev,
      {
        name,
        description,
      },
    ]);
    const data = await addBrand();
    if (data) {
      setBrands((prev) =>
        prev.map((brand) => (name !== brand.name ? brand : data))
      );
    } else {
      setBrands((prev) => prev.filter((brand) => name !== brand.name));
      notify();
    }
  }

  async function addBrand() {
    try {
      const response = await axios({
        method: "post",
        url: `${process.env.REACT_APP_DOMAIN}/brands`,
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${user.token}`,
        },
        data: {
          name,
          description,
        },
      });
      return response.data;
    } catch (error) {
      return null;
    }
  }

  return (
    <>
      <button
        className="ms-auto btn btn-outline-success"
        data-bs-toggle="modal"
        data-bs-target={`#BtnAddProduct`}
      >
        <i className="fas fa-copyright mx-2"> +</i>
        Add Brand
      </button>

      <div
        className="modal fade"
        id="BtnAddProduct"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content rounded-0 border-0">
            <div className="modal-header">
              <h5 className="modal-title titles-commerce">Add Brand</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form onSubmit={(ev) => handleSubmit(ev)}>
                <div className="my-1">
                  <label htmlFor="name">Name</label>
                  <input
                    required
                    className="form-control"
                    type="text"
                    id="name"
                    value={name}
                    onChange={(ev) => setName(ev.target.value)}
                  />
                </div>
                <div className="my-1">
                  <label htmlFor="description"> Description</label>
                  <textarea
                    required
                    type="text"
                    style={{ minHeight: "25vh" }}
                    className="form-control rounded-0"
                    name="description"
                    value={description}
                    placeholder="Description"
                    onChange={(ev) => setDescripion(ev.target.value)}
                  />
                </div>
                <button className="btn btn-dark mt-2 w-100 titles-commerce rounded-0">
                  <i className="fas fa-check"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BtnAddBrand;

function closeModal() {
  const backdrop = document.getElementsByClassName("modal-backdrop");
  const modalTarget = document.getElementById("BtnAddProduct");
  modalTarget.classList.remove("show");
  modalTarget.style = "";
  document.body.classList.remove("modal-open");
  document.body.style = "";
  backdrop[0].remove();
}
