import React from "react";
import { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function BtnUpdateProd({ item, setProducts }) {
  const user = useSelector((state) => state.user);
  const notify = () => toast.error("Server Error to try Update Product!");
  const [name, setName] = useState(item.name);
  const [description, setDescription] = useState(item.description);
  const [price, setPrice] = useState(item.price);

  async function handleSubmit(ev) {
    ev.preventDefault();
    const prevProduct = item;

    updateProd({ name, description, price });

    const prod = await updateProductAxios();
    if (!prod) {
      updateProd(prevProduct);
      notify();
    }
  }

  function updateProd(newProd) {
    setProducts((prev) =>
      prev.map((product) =>
        product.id !== item.id ? product : { ...product, ...newProd }
      )
    );
  }

  async function updateProductAxios() {
    try {
      const response = await axios({
        method: "patch",
        url: `${process.env.REACT_APP_DOMAIN}/products/${item.id}`,
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${user.token}`,
        },
        data: { name, description, price, featured: item.featured },
      });
      return response.data;
    } catch (error) {
      return null;
    }
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-success py-0 px-2 rounded-0 mx-1"
        data-bs-toggle="modal"
        data-bs-target={`#BtnUpdateProd${item.id}`}
      >
        <i className="far fa-edit"></i>
      </button>
      <div
        id={`BtnUpdateProd${item.id}`}
        className="modal fade"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5>Update Product</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control rounded-0"
                    name="name"
                    value={name}
                    placeholder="Name"
                    onChange={(ev) => setName(ev.target.value)}
                  />
                  <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                  <textarea
                    type="text"
                    style={{ minHeight: "30vh" }}
                    className="form-control rounded-0"
                    name="description"
                    value={description}
                    placeholder="Description"
                    onChange={(ev) => setDescription(ev.target.value)}
                  />
                  <label htmlFor="description">Description</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="number"
                    className="form-control rounded-0"
                    name="price"
                    value={price}
                    placeholder="Price"
                    onChange={(ev) => setPrice(ev.target.value)}
                  />
                  <label htmlFor="price">Price</label>
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

export default BtnUpdateProd;
