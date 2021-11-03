import { useEffect, useState } from "react";
import AddTodo from "./components/add-todo/add-todo";
import TodosList from "./components/todos-list/todos-list";

function App() {
  const [todos, setTodos] = useState([]);
  // let [number, setNumber] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        setLoading(false);
        return response.json()
      })
      .then(data => setTodos(data))
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      })
  }, []);

  useEffect(() => {
    console.log("todos o'zgardi");
  }, [todos]);

  return (
    <main className="main container">
      <h1 className="main__title text-center fw-bold text-info mt-5">To-Do App</h1>

      {/* <button onClick={() => setNumber(number + 1)}>{number}</button> */}

      <AddTodo todos={todos} setTodos={setTodos} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <TodosList setTodos={setTodos} todos={todos} />
    </main>
  );
};

export default App;