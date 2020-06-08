import React from "react"
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal' 
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoFormForm from "./TodoFormForm"
import TodoList from "./TodoList"


function MyVerticallyCenteredModal(props) {

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <TodoFormForm onSubmit={props.onSubmit} onClick={props.onHide} />
          </p>
        </Modal.Body>
      </Modal>
    );
  }

  function ToDoFormModal (props) {
    const [modalShow, setModalShow] = React.useState(false);

    return (
      <>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Add Task!
        </Button>
  
        <MyVerticallyCenteredModal 
          onSubmit= {props.onSubmit}
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  }


export default ToDoFormModal;