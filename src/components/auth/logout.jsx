import React from "react";
import { Modal } from "antd";
import { Severty, ShowToast } from "../../helpers/toast.jsx";

const Logout = ({ isVisible, onCancel, onLogout }) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
    ShowToast("User Logout successfully", Severty.SUCCESS);
  };

  return (
    <Modal
      title="Logout Confirmation"
      visible={isVisible}
      onCancel={onCancel}
      onOk={handleLogout}
    >
      <p>Are you sure you want to log out?</p>
    </Modal>
  );
};

export default Logout;
