import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import API from "../services/api";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";
import TodoForm from "../components/TodoForm";

const EditTodo = () => {
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");

  useEffect(() => {
    fetchTodo();
  }, []);

  const fetchTodo = async () => {
    try {
      const res = await API.get(`/todos/${id}`);

      setTodo(res.data.data);
    } catch (error) {
      toast.error("Todo not found");

      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const updateTodo = async (formData, validationError) => {
    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      await API.put(`/todos/${id}`, formData);

      toast.success("Todo updated successfully");

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to update Todo."
      );
    }
  };

  if (loading) return <Spinner />;

  return (
    <>
      <Navbar />

      <div className="container">
        <h1 className="page-title">Edit Todo</h1>

        <TodoForm
          initialData={todo}
          onSubmit={updateTodo}
        />
      </div>
    </>
  );
};

export default EditTodo;