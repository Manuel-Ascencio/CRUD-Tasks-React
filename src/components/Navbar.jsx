import React, { useContext } from "react";
import Button, { SelectButton } from "./Button";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { DataContext } from "./DataContext";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();

  const { setTasks, setLoading } = useContext(DataContext);

  const completedTasks = async (value) => {
    setLoading(true);

    if (value === "INCOMPLETE") {
      let tasks;
      await axios
        .get("https://tasks-list-node.herokuapp.com/api/v1/tasks")
        .then((res) => (tasks = res.data?.data.tasks))
        .finally(() => setLoading(false));

      const incomplete = tasks.filter((task) => task.completed === false);

      console.log(incomplete);

      setTasks(incomplete);
    } else if (value === "COMPLETE") {
      let tasks;
      await axios
        .get("https://tasks-list-node.herokuapp.com/api/v1/tasks")
        .then((res) => (tasks = res.data?.data.tasks))
        .finally(() => setLoading(false));

      const complete = tasks.filter((task) => task.completed === true);

      setTasks(complete);
    } else if (value === "ALL") {
      let tasks;
      await axios
        .get("https://tasks-list-node.herokuapp.com/api/v1/tasks")
        .then((res) => (tasks = res.data?.data.tasks))
        .finally(() => setLoading(false));

      setTasks(tasks);
    }
  };

  return (
    <NavbarStyled>
      <Button
        title={"Add Task"}
        type="button"
        onClick={() => navigate("/tasks/new/")}
      />
      <SelectButton onChange={(e) => completedTasks(e.target.value)}>
        <option value="ALL">ALL</option>
        <option value="INCOMPLETE">INCOMPLETE</option>
        <option value="COMPLETE">COMPLETE</option>
      </SelectButton>
    </NavbarStyled>
  );
}

const NavbarStyled = styled.div`
  max-width: 750px;
  margin: auto;
  display: flex;
  justify-content: space-between;
`;

export default Navbar;
