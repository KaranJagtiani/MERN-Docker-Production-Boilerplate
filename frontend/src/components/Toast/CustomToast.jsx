import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./CustomToast.scss";

const toastOptions = {
  position: "top-left",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
};

const ColoredToast = (message) => {
  return toast(message, toastOptions);
};

export { ColoredToast };
