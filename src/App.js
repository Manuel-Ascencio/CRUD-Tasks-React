import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TaskForm from "./components/TaskForm";
import Header from "./components/Header";
import TasksList from "./components/TasksList";
import { DataProvider } from "./components/DataContext";

export default function App() {
  return (
    <DataProvider>
      <div>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<TasksList />} />
            <Route path="/tasks/new" element={<TaskForm />} />
            <Route path="/tasks/:id/edit" element={<TaskForm />} />
          </Routes>
        </BrowserRouter>
      </div>
    </DataProvider>
  );
}
