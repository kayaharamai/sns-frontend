import { Container } from "@mui/material";
import React from "react";
import Modal from "react-modal";
import { PropsDeleteModal } from "../types/Types";

const DeleteModal= (props:any) => {
  const {
    userDelete,
    clickDelete,
    editModalIsOpen,
    setEditModalIsOpen,
    isAdmin,
  } = props;

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

  const cancel = () => {
    setEditModalIsOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Modal isOpen={editModalIsOpen} style={customStyles}>
        <p className="text-center m-4">本当に削除しますか？</p>
        <p className="text-center m-2 text-sm">この操作は取り消せません。</p>
        <ul className="flex justify-around m-5">
          {isAdmin ? (
            <li>
              <button
                onClick={clickDelete}
                className="px-5 py-1 ml-5 bg-mygray font-semibold text-sm text-white rounded-full hover:opacity-80"
              >
                はい
              </button>
            </li>
          ) : (
            <li>
              <button
                onClick={userDelete}
                className="px-5 py-1 ml-5 bg-mygray font-semibold text-sm text-white rounded-full hover:opacity-80"
              >
                はい
              </button>
            </li>
          )}
          <li>
            <button
              onClick={cancel}
              className="px-5 py-1 bg-mygray font-semibold text-sm text-white rounded-full hover:opacity-80 "
            >
              いいえ
            </button>
          </li>
        </ul>
      </Modal>
    </Container>
  );
}

export default DeleteModal;
