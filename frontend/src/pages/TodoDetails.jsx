import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import API from "../services/api";
import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";

const TodoDetails = () => {
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

  if (loading) return <Spinner />;

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="details-card">

          <h1>{todo.title}</h1>

          <p>
            <strong>Description :</strong>{" "}
            {todo.description}
          </p>

          <p>
            <strong>Priority :</strong>{" "}
            {todo.priority}
          </p>

          <p>
            <strong>Status :</strong>{" "}
            {todo.status}
          </p>

          <p>
            <strong>Due Date :</strong>{" "}
            {todo.dueDate
              ? new Date(todo.dueDate).toLocaleDateString()
              : "N/A"}
          </p>

          <p>
            <strong>Created :</strong>{" "}
            {new Date(todo.createdAt).toLocaleString()}
          </p>

          <Link to="/">
            <button className="back-btn">
              Back
            </button>
          </Link>

        </div>
      </div>
    </>
  );
};

export default TodoDetails;