import { Close } from "@mui/icons-material";
import { Container } from "@mui/material";
import React from "react";
import Modal from "react-modal";
import { PropsPostModal } from "../../types/Types";
import Share from "./Share";

const PostModal: React.FC<PropsPostModal> = (props) => {
  const { editModalIsOpen, setEditModalIsOpen, userData } = props;

  const customStyles = {
    content: {
      top: "25%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      minWidth: "40%",
    },
  };

  const close = () => {
    localStorage.removeItem("post");
    setEditModalIsOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Modal isOpen={editModalIsOpen} style={customStyles}>
        <div>
          <button onClick={close}><Close /></button>
          <Share userData={userData.userData} />
        </div>
      </Modal>
    </Container>
  );
};

export default PostModal;
