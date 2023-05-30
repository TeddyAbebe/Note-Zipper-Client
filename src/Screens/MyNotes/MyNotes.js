import React, { useEffect } from "react";
import MainScreen from "../../Component/MainScreen";
import { Link, useHistory } from "react-router-dom";
import { Badge, Button, Card, useAccordionButton } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { useDispatch, useSelector } from "react-redux";
import { deleteNoteAction, listNotes } from "../../Actions/notesAction";
import Loading from "../../Component/Loading";
import ErrorMessage from "../../Component/ErrorMessage";

const MyNotes = ({ search }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const noteList = useSelector((state) => state.noteList);
  const { loading, notes, error } = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  function Toggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log("totally custom!")
    );

    return (
      <button
        className="border rounded p-1 hover:bg-cyan-950 "
        type="button"
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  // console.log(notes);

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      history.push("/");
    }
  }, [
    dispatch,
    successCreate,
    history,
    userInfo,
    successUpdate,
    successDelete,
  ]);

  return (
    <div>
      <MainScreen title={`Welcome Back ${userInfo.name}.. `}>
        <Link to="createnote">
          <Button className="ml-2.5 mb-1.5">Create New Note</Button>
        </Link>

        {errorDelete && (
          <ErrorMessage variant="danger">{errorDelete}</ErrorMessage>
        )}
        {loadingDelete && <Loading />}

        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {loading && <Loading />}

        {notes
          ?.reverse()
          .filter((filteredNote) =>
            filteredNote.title.toLowerCase().includes(search.toLowerCase())
          )
          .map((note) => (
            <Accordion key={note._id}>
              <Card className="m-2.5">
                <Card.Header className="flex">
                  <span className="text-white font-serif no-underline flex-1 cursor-pointer text-lg self-center ">
                    <Toggle as={Card.Text} eventKey="0">
                      {note.title}
                    </Toggle>
                  </span>
                  <div>
                    <Button href={`/note/${note._id}`}>Edit</Button>
                    <Button
                      variant="danger"
                      className="mx-2"
                      onClick={() => deleteHandler(note._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Header>

                <Accordion.Collapse eventKey="0">
                  <Card.Body>
                    <h4>
                      <Badge bg="dark">Category - {note.category}</Badge>
                    </h4>
                    <blockquote className="blockquote mb-0">
                      <p>{note.content}</p>
                      <footer className="blockquote-footer">
                        Created on{" "}
                        <cite title="Source Title">
                          {note.createdAt.substring(0, 10)}
                        </cite>
                      </footer>
                    </blockquote>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
          ))}
      </MainScreen>
    </div>
  );
};

export default MyNotes;
