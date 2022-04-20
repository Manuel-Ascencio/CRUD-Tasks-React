import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";
import { DataContext } from "./DataContext";
import Spinner from "./Spinner";

function TasksList() {
  const { tasks, setTasks, loading, setLoading } = useContext(DataContext);

  const [completed, setCompleted] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://tasks-list-node.herokuapp.com/api/v1/tasks")
      .then((res) => setTasks(res.data?.data.tasks))
      .finally(() => setLoading(false));
  }, []);

  const getTasks = async () => {
    await axios
      .get("https://tasks-list-node.herokuapp.com/api/v1/tasks")
      .then((res) => setTasks(res.data?.data.tasks));
  };

  tasks.sort((task, task2) => {
    if (task.id < task2.id) {
      return -1;
    } else if (task.id > task2.id) {
      return 1;
    } else {
      return 0;
    }
  });

  const handleDelete = async (id) => {
    await axios
      .delete(`https://tasks-list-node.herokuapp.com/api/v1/tasks/${id}`)
      .then(() => getTasks());
  };

  const toggleCompletion = async (id) => {
    await axios
      .patch(`https://tasks-list-node.herokuapp.com/api/v1/tasks/${id}`, {
        completed: !completed,
      })
      .then(() => getTasks());
  };

  return (
    <TasksListStyled>
      {loading && <Spinner />}
      {tasks.length === 0 ? (
        <p className="noTodos">No todos</p>
      ) : (
        tasks.map((task) => (
          <section key={task.id}>
            <div>
              <div>
                <form onSubmit={(e) => toggleCompletion(e)}>
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onClick={() => toggleCompletion(task.id)}
                    onChange={() => setCompleted(task.completed)}
                  />
                </form>
              </div>
              <div>
                <Title completed={task.completed}>{task.title}</Title>
                <p>{task.description}</p>
              </div>
            </div>
            <div className="buttoms">
              <Button
                title={"Edit"}
                type="buttom"
                onClick={() => navigate(`/tasks/${task.id}/edit`)}
                disabled={task.completed}
              />
              <Button
                title={"Delete"}
                type="buttom"
                onClick={() => handleDelete(task.id)}
              />
            </div>
          </section>
        ))
      )}
    </TasksListStyled>
  );
}

const Title = styled.h3`
  font-size: 0.9rem;
  color: var(--bg-2);
  text-decoration: ${(props) => (props.completed ? "line-through" : "none")};
  transition: 2s;
  text-align: start;
`;

const TasksListStyled = styled.div`
  .noTodos {
    background-color: var(--bg-3);
    border-radius: 5px;
  }

  text-align: center;

  max-width: 750px;
  margin: 10px auto;
  background-color: var(--bg-1);
  padding: 10px;
  border-radius: 5px;
  section {
    max-width: 750px;
    margin: auto;
    background-color: var(--bg-3);
    margin: 10px;
    border-radius: 5px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .buttoms {
      display: flex;
      align-items: center;
      justify-content: center;
      button:nth-child(2) {
        background-color: var(--red);
        margin-left: 15px;
      }
    }
    div:nth-child(1) {
      display: flex;
      align-items: center;
      div {
        input {
          width: 22px;
          height: 22px;
          margin-right: 20px;
          cursor: pointer;
        }
      }
    }
    p {
      font-size: 0.8rem;
      color: var(--black);
      text-align: start;
    }
  }

  @media only screen and (max-width: 650px) {
    margin: 10px;
    section {
      padding: 10px;

      div:nth-child(1) {
        div {
          input {
            margin-right: 10px;
          }
        }
      }
    }

    .buttoms {
      flex-direction: column;
      button {
        margin-top: 10px;
        font-size: 0.9rem;
      }
    }
  }
`;

export default TasksList;
