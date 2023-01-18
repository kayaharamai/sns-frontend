import { useState } from "react";
// import "./App.css";
import { Button, Container } from "@mui/material";
import Modal from "react-modal";
import { useNavigate,useParams } from "react-router-dom";


function Modals(props) {
    const {remove,editModalIsOpen, setEditModalIsOpen} = props;
//   const [editModalIsOpen, setEditModalIsOpen] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

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

  const openModal = () => {
    setEditModalIsOpen(true);
}

// const remove = () => {
//     alert("解除します")
// }

const cancel = () => {
    setEditModalIsOpen(false);
}

  return (
    <Container maxWidth="sm">
      {/* <Button
        variant="contained"
        color="primary"
        onClick={openModal}
      >
        モーダル開く
      </Button> */}
      <Modal isOpen={editModalIsOpen} style={customStyles}>
        本当にフォローを解除しますか？
        <button onClick={remove}>はい</button>
        <button onClick={cancel}>いいえ</button>
      </Modal>
    </Container>
  );
}

export default Modals;
