import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "../store/toastSlice";

export default function Toast() {
  const dispatch = useDispatch();
  const toast = useSelector((state) => state.toast);

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        dispatch(hideToast());
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toast.visible]);

  if (!toast.visible) return null;

  const styles =
    toast.type === "success"
      ? "bg-green-600"
      : "bg-red-600";

  return (
    <div
      className={`
        fixed top-6 right-6 z-50
        px-4 py-3 rounded-lg text-white shadow-lg
        transition-all duration-300
        ${styles}
        animate-slide-in
      `}
    >
      {toast.message}
    </div>
  );
}