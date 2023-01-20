import { Container } from "@mui/material";
import Modal from "react-modal";

function DeleteModal(props) {
  const {
    userDelete,
    clickDelete,
    clickMyDelete,
    editModalIsOpen,
    setEditModalIsOpen,
    isAdmin,
    mypost,
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
        <p class="text-center m-5">本当に削除しますか？</p>
        <ul class="flex justify-around m-5">
          {isAdmin ? (
            <li>
              <button
                onClick={clickDelete}
                class="px-5 py-1 ml-5 bg-mygray font-semibold text-sm text-white rounded-full hover:opacity-80"
              >
                はい
              </button>
            </li>
          ) : (
            <li>
              <button
                onClick={userDelete}
                class="px-5 py-1 ml-5 bg-mygray font-semibold text-sm text-white rounded-full hover:opacity-80"
              >
                はい
              </button>
            </li>
          )}
          <li>
            <button
              onClick={cancel}
              class="px-5 py-1 bg-mygray font-semibold text-sm text-white rounded-full hover:opacity-80 "
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
