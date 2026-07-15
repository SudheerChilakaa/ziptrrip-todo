import { Link } from "react-router-dom";

const TodoCard = ({ todo, onDelete }) => {
  const priorityClass = todo.priority.toLowerCase();
  const statusClass = todo.status.toLowerCase();

  return (
    <div className="todo-card">
      <div className="card-header">
        <h3>{todo.title}</h3>
      </div>

      <p className="description">{todo.description}</p>

      <div className="badges">
        <span className={`badge ${priorityClass}`}>
          {todo.priority}
        </span>

        <span className={`badge ${statusClass}`}>
          {todo.status}
        </span>
      </div>

      <p className="date">
        Due :
        {" "}
        {todo.dueDate
          ? new Date(todo.dueDate).toLocaleDateString()
          : "N/A"}
      </p>

      <div className="card-buttons">
        <Link to={`/todo?id=${todo._id}`}>
          <button className="view-btn">View</button>
        </Link>

        <Link to={`/edit?id=${todo._id}`}>
          <button className="edit-btn">Edit</button>
        </Link>

        <button
          className="delete-btn"
          onClick={() => onDelete(todo._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoCard;