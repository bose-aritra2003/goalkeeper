'use client';

import { Toaster } from "react-hot-toast";

const ToasterContext = () => {
  return (
    <Toaster
      toastOptions={{
        className: '',
        style: {
          backgroundColor: "rgba(107, 114, 128, 0.1)",
          boxShadow: "none",
        },
      }}
    />
  );
}
export default ToasterContext;