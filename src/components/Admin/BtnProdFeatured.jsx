import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function BtnProdFeatured({ item }) {
  const user = useSelector((state) => state.user);
  const [featured, setFeatured] = useState(item.featured);
  const notify = () =>
    toast.error("Server Error to try Update Product(Featured)!");

  async function updateProductAxios() {
    const prevFeatured = featured;
    try {
      await axios({
        method: "patch",
        url: `${process.env.REACT_APP_DOMAIN}/products/${item.id}`,
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${user.token}`,
        },
        data: { ...item, featured: !featured },
      });
    } catch (error) {
      setFeatured(prevFeatured);
      notify();
    }
  }

  return (
    <div className="form-check form-switch mb-1">
      <input
        className="form-check-input"
        type="checkbox"
        checked={featured}
        onChange={() => {
          setFeatured((prev) => !prev);
          updateProductAxios();
        }}
      />
    </div>
  );
}

export default BtnProdFeatured;
