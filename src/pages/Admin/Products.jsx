import { useEffect, useState } from "react";
import axios from "axios";
import "../../components/Admin/Admin.css";
import Loader from "../../components/Loader/Loader";
import ServerError from "./ServerError";
import BtnDeleteAxios from "../../components/Admin/BtnDeleteAxios";
import BtnUpdateProd from "../../components/Admin/BtnUpdateProd";
import BtnAddProduct from "../../components/Admin/BtnAddProduct";
import BtnProdFeatured from "../../components/Admin/BtnProdFeatured";
import supabase from "../../supabase";

function Products() {
  const [products, setProducts] = useState(undefined);
  const [strToFilter, setStrToFilter] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios({
          method: "get",
          url: process.env.REACT_APP_DOMAIN + "/products",
        });
        setProducts(response.data);
      } catch (error) {
        setProducts(null);
      }
    };
    // eslint-disable-next-line
    getProducts();
  }, []);

  async function deleteImageSupabase(product) {
    if (product.image !== "") {
      let imageName = "";
      let i = product.image.length - 1;
      while (i > -1 && product.image[i] !== "/") {
        imageName = product.image[i] + imageName;
        i--;
      }
      // eslint-disable-next-line no-unused-vars
      const { data, error } = await supabase.storage
        .from("uploads")
        .remove([`${imageName}`]);
    }
  }

  return (
    <div className="d-flex flex-column w-100 p-4">
      <div className="d-flex">
        <span className="d-flex titles-commerce fw-bold fs-4">Products</span>
        <BtnAddProduct products={products} setProducts={setProducts} />
      </div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control mt-4"
          placeholder="Search some product..."
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
            <th scope="col">Name</th>
            <th scope="col">Featured</th>
            <th scope="col">Price</th>
            <th scope="col">Image</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products &&
            products
              .filter((item) => filterProd(item, strToFilter))
              .map((item) => (
                <tr key={item.id}>
                  <th scope="row">{item.id}</th>
                  <td>{item.name}</td>
                  <td>
                    <BtnProdFeatured item={item} />
                  </td>
                  <td>{item.price}</td>
                  <td>
                    <div
                      style={{
                        backgroundImage: `url(${item.image})`,
                        backgroundPosition: `center`,
                        backgroundSize: `cover`,
                        minWidth: `4rem`,
                        minHeight: `2rem`,
                      }}
                    ></div>
                  </td>
                  <td>
                    <div className="d-flex py-1">
                      <BtnUpdateProd item={item} setProducts={setProducts} />
                      <BtnDeleteAxios
                        item={item}
                        items={products}
                        setArray={setProducts}
                        path={"/products"}
                        title="Delete Product"
                        doThis={() => deleteImageSupabase(item)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
      {products === undefined && <Loader color="#000" />}
      {products === null && <ServerError />}
    </div>
  );
}

export default Products;

function filterProd(prod, strToFilter) {
  if (strToFilter === "") {
    return true;
  } else if (strToFilter.toLowerCase() === "featured") {
    return prod.featured;
  } else {
    let res = false;
    res = prod.name.toLowerCase().includes(strToFilter.toLowerCase());
    if (!res) res = prod.id === Number(strToFilter);
    return res;
  }
}
