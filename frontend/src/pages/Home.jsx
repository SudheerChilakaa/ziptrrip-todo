import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getTodos,
  deleteTodo as deleteTodoAPI,
} from "../services/api";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import TodoCard from "../components/TodoCard";
import Spinner from "../components/Spinner";

const Home = () => {
  const [todos, setTodos] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [priorityFilter, setPriorityFilter] = useState("All");

  const [sortBy, setSortBy] = useState("latest");

  const [page, setPage] = useState(1);

  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchTodos();
  }, [search, statusFilter, priorityFilter, sortBy, page]);

  const fetchTodos = async () => {
    try {
      setLoading(true);

      const res = await getTodos({
        search,

        status:
          statusFilter === "All"
            ? ""
            : statusFilter,

        priority:
          priorityFilter === "All"
            ? ""
            : priorityFilter,

        sort: sortBy,

        page,

        limit: 5,
      });

      setTodos(res.data.data);

      setTotalPages(res.data.pages || 1);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to load todos."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this todo?"
    );

    if (!confirmDelete) return;

    try {
      await deleteTodoAPI(id);

      toast.success("Todo deleted successfully");

      fetchTodos();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to delete todo."
      );
    }
  };

  const clearFilters = () => {
    setSearch("");

    setStatusFilter("All");

    setPriorityFilter("All");

    setSortBy("latest");

    setPage(1);
  };

  return (
    <>
      <Navbar />

      <div className="container">

        <div className="top-bar">

          <h1>Todo List</h1>

          <Link to="/add">
            <button className="add-btn">
              Add Todo
            </button>
          </Link>

        </div>

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <Filter
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
        />

        <div
          style={{
            display: "flex",
            gap: "15px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value)
            }
          >
            <option value="latest">
              Latest
            </option>

            <option value="dueDate">
              Due Date
            </option>

            <option value="priority">
              Priority
            </option>
          </select>

          <button
            className="add-btn"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </div>

        {loading ? (
          <Spinner />
        ) : todos.length === 0 ? (
          <div className="empty-state">
            <h2>No Todos Found</h2>

            <p>
              Create a new Todo or change the
              filters.
            </p>
          </div>
        ) : (
          <>
            <div className="todo-grid">
              {todos.map((todo) => (
                <TodoCard
                  key={todo._id}
                  todo={todo}
                  onDelete={handleDelete}
                />
              ))}
            </div>

            <div className="pagination">
              {[...Array(totalPages)].map(
                (_, index) => (
                  <button
                    key={index}
                    className={
                      page === index + 1
                        ? "active-page"
                        : ""
                    }
                    onClick={() =>
                      setPage(index + 1)
                    }
                  >
                    {index + 1}
                  </button>
                )
              )}
            </div>
          </>
        )}

      </div>
    </>
  );
};

export default Home;