import { useEffect, useState } from "react";

const TodoForm = ({ onSubmit, initialData }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "Pending",
    dueDate: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        priority: initialData.priority || "Medium",
        status: initialData.status || "Pending",
        dueDate: initialData.dueDate
          ? initialData.dueDate.substring(0, 10)
          : "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      return onSubmit(null, "Title is required");
    }

    if (!formData.description.trim()) {
      return onSubmit(null, "Description is required");
    }

    try {
      setLoading(true);

      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
      />

      <textarea
        rows="5"
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />

      <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <select
        name="status"
        value={formData.status}
        onChange={handleChange}
      >
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
      </select>

      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
      />

      <button
        className="save-btn"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Todo"}
      </button>
    </form>
  );
};

export default TodoForm;