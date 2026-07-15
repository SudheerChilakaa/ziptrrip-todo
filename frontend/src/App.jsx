import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import AddTodo from "./pages/AddTodo";
import EditTodo from "./pages/EditTodo";
import TodoDetails from "./pages/TodoDetails";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/add" element={<AddTodo />} />

      <Route path="/edit" element={<EditTodo />} />

      <Route path="/todo" element={<TodoDetails />} />

      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}

export default App;