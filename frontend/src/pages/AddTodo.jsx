import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import API from "../services/api";
import Navbar from "../components/Navbar";
import TodoForm from "../components/TodoForm";

const AddTodo = () => {
  const navigate = useNavigate();

  const createTodo = async (formData, validationError) => {
    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      await API.post("/todos", formData);

      toast.success("Todo created successfully");

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to create Todo."
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h1 className="page-title">Add Todo</h1>

        <TodoForm onSubmit={createTodo} />
      </div>
    </>
  );
};

export default AddTodo;