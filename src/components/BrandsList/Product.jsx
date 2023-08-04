import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

function Product({ image, name, price, prod, brand }) {
  return (
    <div
      id="TeslaBrand"
      className="flex-grow-1 d-flex flex-column align-items-center pb-5"
      style={{
        background: `linear-gradient(0deg, rgba(255,255,255,0) 75%, rgba(255,255,255,0.7) 100%), url(${image})`,
        backgroundPosition: `center, center`,
        backgroundSize: `cover, cover`,
        width: `100%`,
        height: `100vh`,
      }}
    >
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeOut", duration: 0.5 }}
        className="titles-commerce d-block flex-grow-1 mt-5 pt-5 fw-bolder"
      >
        {name}
      </motion.h1>
      <Link
      to={`/brands/${brand}/${prod.slug}`}
        className="btn btn-dark rounded-0 titles-commerce mb-5 border-white px-4"
      >
        BUY NOW
      </Link>
      
    </div>
  );
}

export default Product;
