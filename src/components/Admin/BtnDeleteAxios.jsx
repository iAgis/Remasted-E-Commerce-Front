import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Modal from "./Modal";

function BtnDeleteAxios({
  item,
  items,
  setArray,
  path,
  title = "Delete",
  doThis = () => {},
}) {
  const user = useSelector((state) => state.user);
  const notify = () => toast.error(`Server Error to try ${title}!`);

  const handleDelete = async () => {
    const prevItems = items;
    reactDeleteItem();
    if (!(await axiosDeleteItem())) {
      setArray([...prevItems]);
      notify();
    } else if (doThis) {
      doThis();
    }
  };

  const reactDeleteItem = () =>
    setArray(items.filter((it) => it.id !== item.id));

  const axiosDeleteItem = async () => {
    try {
      await axios({
        method: "delete",
        //url: process.env.REACT_APP_DOMAIN + path + "/" + item.id,
        url: "http://localhost:8000/api" + path + "/" + item.id,
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${user.token}`,
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <Modal
      title={title}
      mKey={item.id}
      doThis={handleDelete}
      btnClass="btn btn-outline-danger py-0 px-2 rounded-0 mx-1"
      iconClass="far fa-trash-alt"
    />
  );
}

export default BtnDeleteAxios;
