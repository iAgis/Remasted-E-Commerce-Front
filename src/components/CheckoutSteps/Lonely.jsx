import { Link } from "react-router-dom";

function Lonely() {
  return (
    <div
      className="container my-5 pt-5 d-flex align-items-center justify-content-center flex-column"
      style={{ height: `70vh` }}
    >
      <img
        src="https://static.thenounproject.com/png/2162306-200.png"
        alt="Loneless"
      />
      <span className="titles-commerce fs-4 mt-3 text-center">
        This place feels so lonely
      </span>
      <Link to="/" className="btn btn-dark rounded-0 mt-3 titles-commerce px-3">
        Buy a car
      </Link>
    </div>
  );
}

export default Lonely;
