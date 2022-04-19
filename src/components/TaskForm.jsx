import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { useNavigate, useParams } from "react-router-dom";
import { DataContext } from "./DataContext";

function TaskForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const params = useParams();

  const [editing, setEditing] = useState(false);
  const { loading, setLoading } = useContext(DataContext);

  const submit = (e) => {
    e.preventDefault();
    setLoading(true);

    const task = {
      title,
      description,
    };

    if (editing) {
      axios
        .patch(
          `https://tasks-list-node.herokuapp.com/api/v1/tasks/${params.id}`,
          task
        )
        .then(() => navigate("/"))
        .finally(() => setLoading(false));
    } else {
      axios
        .post("https://tasks-list-node.herokuapp.com/api/v1/tasks", task)
        .then(() => navigate("/"))
        .finally(() => setLoading(false));
    }
  };

  const loadTask = async (id) => {
    await axios
      .get(`https://tasks-list-node.herokuapp.com/api/v1/tasks/${id}`)
      .then(
        (res) => (
          setTitle(res.data.data.task.title),
          setDescription(res.data.data.task.description),
          setEditing(true)
        )
      );
  };

  useEffect(() => {
    if (params.id) {
      loadTask(params.id);
    }
  }, [params.id]);

  return (
    <Overlay>
      <TaskFormStyled>
        <form onSubmit={submit}>
          <h1> {editing ? "Edit Task" : "Add Task"}</h1>
          <label htmlFor="title">
            Title:
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label htmlFor="description">
            Description:
            <textarea
              type="text"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <div>
            <Button
              title={editing ? "Edit" : "Add Task"}
              type="submit"
              isLoading={loading}
            />
            <Button
              title={"Cancel"}
              type={editing ? "submit" : "button"}
              onClick={() => navigate("/")}
            />
          </div>
        </form>
      </TaskFormStyled>
    </Overlay>
  );
}

const Overlay = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0,
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0, .5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TaskFormStyled = styled.div`
  width: 400px;
  background-color: var(--bg-3);
  border-radius: 5px;
  padding: 30px 20px;
  form {
    h1 {
      text-align: center;
      color: var(--black);
      font-weight: 700;
      font-size: 1.3rem;
      margin-bottom: 10px;
      opacity: 0.8;
    }
    label {
      display: block;
      margin-top: 10px;
      color: var(--black);
      opacity: 0.9;
      input,
      select,
      textarea {
        display: block;
        width: 100%;
        border: none;
        outline: none;
        padding: 5px;
        font-size: 1rem;
        color: var(--black);
      }
    }
    div {
      margin-top: 20px;
      button {
        margin-right: 20px;
        cursor: pointer;
      }
      button:nth-child(2) {
        background-color: var(--red);
      }
    }
  }
`;

export default TaskForm;
