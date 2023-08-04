import { useEffect, useState } from "react";
import axios from "axios";
import "../../components/Admin/Admin.css";
import Loader from "../../components/Loader/Loader";
import ServerError from "./ServerError";
import BtnDeleteAxios from "../../components/Admin/BtnDeleteAxios";
import BtnUpdateBrand from "../../components/Admin/BtnUpdateBrand";
import BtnAddBrand from "../../components/Admin/BtnAddBrand";

function Brands() {
  const [brands, setBrands] = useState(undefined);
  const [strToFilter, setStrToFilter] = useState("");

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
    // eslint-disable-next-line
  }, []);

  return (
    <div className="d-flex flex-column w-100 p-4">
      <div className="d-flex">
        <span className="d-flex titles-commerce fw-bold fs-4">Brand</span>
        <BtnAddBrand setBrands={setBrands} />
      </div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control mt-4"
          placeholder="Search some brand..."
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
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {brands &&
            brands
              .filter((item) => filterBrand(item, strToFilter))
              .map((item) => (
                <tr key={"Brands" + item.id}>
                  <th scope="row">{item.id}</th>
                  <td>{item.name}</td>
                  <td>
                    <div className="d-flex py-1">
                      <BtnUpdateBrand
                        item={item}
                        items={brands}
                        setArray={setBrands}
                        path={"/brands"}
                      />
                      <BtnDeleteAxios
                        item={item}
                        items={brands}
                        setArray={setBrands}
                        path={"/brands"}
                        title="Delete Brand"
                      />
                    </div>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
      {brands === undefined && <Loader color="#000" />}
      {brands === null && <ServerError />}
    </div>
  );
}

export default Brands;

function filterBrand(brand, strToFilter) {
  if (strToFilter === "") {
    return true;
  } else {
    let res = false;
    const keyWord = strToFilter.toLowerCase();
    res = brand.name.toLowerCase().includes(keyWord);
    if (!res) res = brand.id === Number(strToFilter);
    if (!res) res = brand.description.toLowerCase().includes(keyWord);
    return res;
  }
}
