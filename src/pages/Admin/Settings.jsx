import { useState } from "react";
import axios from "axios";
import "../../components/Admin/Admin.css";
import { useSelector } from "react-redux";
import Modal from "../../components/Admin/Modal";
import { toast } from "react-toastify";
import supabase from "../../supabase";

function Settings() {
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const notify = (state, place = "Server") =>
    state
      ? toast.success(`${place} Reset DB Success!`)
      : toast.error(`${place} Reset DB Error!`);

  const handleResetDb = async () => {
    setLoading(true);

    try {
      await axios({
        method: "patch",
        url: `${process.env.REACT_APP_DOMAIN}/db`,
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${user.token}`,
        },
      });
      notify(true, "[1/2] Server");

      // eslint-disable-next-line
      const { data, error } = await supabase.storage.emptyBucket("uploads");
      if (error) {
        notify(false, "[2/2] Supabase");
      } else {
        notify(true, "[2/2] Supabase");
      }
    } catch (error) {
      notify(false, "[1/2] Server");
    }
    setLoading(false);
  };
  return (
    <div className="d-flex flex-column w-100 p-4 h-100">
      <span className="d-flex titles-commerce fw-bold fs-4">Settings</span>
      <div className="mt-4">
        <p>
          <i className="fas fa-exclamation-triangle mx-2 text-danger"></i>
          After click to reset database,
          <strong> takes around 10 seconds.</strong>
        </p>
        <div className="d-flex align-items-center">
          <Modal
            doThis={handleResetDb}
            btnClass={`btn btn-outline-danger ${loading ? "disabled" : ""}`}
            btnTitle="Reset Database"
            iconClass="fa fa-database mx-2"
            title="Reset Database"
          />
          {loading && (
            <div
              style={{ minWidth: "2Rem", minHeight: "2Rem" }}
              className="spinner-border mx-2 p-0"
              role="status"
            ></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;
