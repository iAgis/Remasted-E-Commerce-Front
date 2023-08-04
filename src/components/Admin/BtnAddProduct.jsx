import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import supabase from "../../supabase";
import { toast } from "react-toastify";

function BtnAddProduct({ products, setProducts }) {
  const [name, setName] = useState("");
  const [description, setDescripion] = useState("");
  const [price, setPrice] = useState("");
  const [featured, setFeatured] = useState(false);
  const [brands, setBrands] = useState(null);
  const [brand, setBrand] = useState(0);
  const [upload, setUpload] = useState(null);
  const user = useSelector((state) => state.user);
  const notify = (message) => toast.error("[Error] " + message);

  useEffect(() => {
    const getBrands = async () => {
      const response = await axios({
        method: "get",
        url: process.env.REACT_APP_DOMAIN + "/brands",
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      });
      setBrands(response.data);
    };
    getBrands();
  }, []);

  async function handleSubmit(ev) {
    ev.preventDefault();
    closeModal();
    setProducts([
      { id: "...", name, price, featured, image: "..." },
      ...products,
    ]);

    // eslint-disable-next-line no-unused-vars
    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(`${upload.name}`, upload, {
        cacheControl: "3600",
        upsert: false,
      });
    if (error) {
      setProducts((prev) => prev.filter((product) => product.id !== "..."));
      notify(
        "Image already Exist, try Other Image, or Change Name. Usualy Image have Same Name that Product."
      );
    } else {
      // eslint-disable-next-line no-unused-vars
      const { publicURL, error } = supabase.storage
        .from("uploads")
        .getPublicUrl(`${upload.name}`);
      if (publicURL) {
        updateProd("...", { name, price, featured, image: publicURL });
        const product = await addProduct(publicURL);
        if (product) {
          updateProd("...", product);
        } else {
          setProducts((prev) => prev.filter((product) => product.id !== "..."));
          // eslint-disable-next-line no-unused-vars
          const { data, error } = await supabase.storage
            .from("uploads")
            .remove([`${upload.name}`]);

          notify("[Server] Product already exist.");
        }
      }
    }
  }

  function updateProd(prodId, newProd) {
    setProducts((prev) =>
      prev.map((product) =>
        product.id !== prodId ? product : { ...product, ...newProd }
      )
    );
  }

  async function addProduct(publicURL) {
    try {
      const response = await axios({
        method: "post",
        //url: `${process.env.REACT_APP_DOMAIN}/products`,
        url: `http://localhost:8000/api/products`,
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${user.token}`,
        },
        data: {
          name,
          price,
          image: publicURL,
          description,
          brandId: brand,
          featured,
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
        <i className="fas fa-truck-loading mx-2"> +</i>
        Add Product
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
              <h5 className="modal-title titles-commerce">Add Product</h5>
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
                  <label htmlFor="brands">Brand</label>
                  {brands && (
                    <select
                      required
                      className="form-control"
                      name="brands"
                      id="brands"
                      defaultValue={brand}
                      onChange={(ev) => setBrand(ev.target.value)}
                    >
                      <option value={0} disabled>
                        Select a Brand
                      </option>
                      {brands.map((brand, index) => (
                        <option key={index} value={brand.id}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
                <div className="my-1">
                  <label htmlFor="name">Name</label>
                  <input
                    required
                    className="form-control"
                    type="text"
                    value={name}
                    onChange={(ev) => setName(ev.target.value)}
                  />
                </div>
                <div className="my-1">
                  <label htmlFor="price">Price</label>
                  <input
                    className="form-control"
                    type="number"
                    value={price}
                    onChange={(ev) => setPrice(ev.target.value)}
                  />
                </div>
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  Featured
                </label>
                <div className="form-check form-switch mb-1">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={featured}
                    onChange={(ev) => setFeatured((prev) => !prev)}
                  />
                </div>
                <div className="my-1">
                  <label htmlFor="image">Image</label>
                  <input
                    required
                    className="form-control"
                    type="file"
                    multiple={false}
                    onChange={(ev) => setUpload(ev.target.files[0])}
                  />
                </div>
                <div className="my-1">
                  <label htmlFor="description"> Description</label>
                  <textarea
                    required
                    type="text"
                    style={{ minHeight: "20vh" }}
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

export default BtnAddProduct;

function closeModal() {
  const backdrop = document.getElementsByClassName("modal-backdrop");
  const modalTarget = document.getElementById("BtnAddProduct");
  modalTarget.classList.remove("show");
  modalTarget.style = "";
  document.body.classList.remove("modal-open");
  document.body.style = "";
  backdrop[0].remove();
}
