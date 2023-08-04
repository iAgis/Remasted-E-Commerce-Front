import { useState } from "react";

function Dropdown({ name = "Button", icon = undefined, component = null }) {
  const [collapse, setCollapse] = useState(true);
  return (
    <div>
      <button
        onClick={() => setCollapse((prev) => !prev)}
        style={{ backgroundColor: collapse ? "#0c0c0c" : "#0c0c0cCC" }}
        className="collapsed btn text-white w-100 h-100"
      >
        {icon && <i className={`${icon} me-1`}></i>}
        <span>{name}</span>
      </button>
      <div
        id="collapseTwo"
        className={collapse ? "collapse" : ""}
        aria-labelledby="headingTwo"
        data-parent="#accordionSidebar"
      >
        <div className="bg-white py-2 collapse-inner rounded">
          <h6 className="collapse-header">Custom Components:</h6>
          <a className="collapse-item" href="buttons.html">
            Buttons
          </a>
          <a className="collapse-item" href="cards.html">
            Cards
          </a>
        </div>
      </div>
    </div>
  );
}

export default Dropdown;
