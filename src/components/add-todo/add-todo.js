import { useRef, useState } from "react";
import { URL } from "../../consts";
import "./add-todo.scss";

const AddTodo = ({setTodos}) => {
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const handleFormSubmit = (evt) => {
    evt.preventDefault();

    const inputValue = inputRef.current.value;
    if (inputValue.trim()) {
      setLoading(true);
      fetch(URL + "/todos", {
        method: "POST",
        body: JSON.stringify({
          title: inputValue,
          userId: 1,
          completed: false
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      })
        .then(res => {
          setLoading(false);
          return res.json();
        })
        .then(data => {
          setTodos((todos) => [
            data,
            ...todos
          ])
          inputRef.current.value = "";
        });
    }
    // Name, Description, Tags (<- 1ta input) (umumiy 3ta input)
  };

  return (
    <form onSubmit={handleFormSubmit} className="add-todo" action="#">
      <input ref={inputRef} placeholder="Todo name" className="add-todo__input" type="text" />
      <button disabled={loading} className="add-todo__submit" type="submit" >
        {loading ? "Adding..." : "Add todo"}
      </button>
    </form>
  );
};

export default AddTodo;