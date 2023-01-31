import { Container } from "@mui/material";
import React, { useState, useRef } from "react";
import Modal from "react-modal";
import { NewPost } from "../../types/Types";
import axios, { AxiosResponse } from "axios";
import Share from "./Share";

const PostModal = (props: any) => {
  const { editModalIsOpen, setEditModalIsOpen, userData } = props;

  const customStyles = {
    content: {
      top: "20%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      minWidth: "40%",
    },
  };

  const close = () => {
    setEditModalIsOpen(false);
  };

  console.log(editModalIsOpen,74)

  return (
    <Container maxWidth="sm">
      <Modal isOpen={editModalIsOpen} style={customStyles}>
        <div>
          <button onClick={close}>×</button>
          <Share userData={userData.userData} />
        </div>
      </Modal>
    </Container>
  );
};

export default PostModal;
