import { URL } from "../../consts";
import TodoItem from "../todo-item/todo-item";
import "./todos-list.scss";

const TodosList = ({todos, setTodos}) => {
  const handleListChange = (evt) => {
    if (evt.target.matches(".todo__checkbox")) {
      const changedItemId = +evt.target.value;
      const changedItem = todos.find((todo) => todo.id === changedItemId);

      fetch(URL + "/todos/" + changedItemId, {
        method: "PATCH",
        body: JSON.stringify({
          completed: !changedItem.completed
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }
  }

  const handleListClick = (evt) => {
    if (evt.target.matches(".todo__delete")) {
      const clickedItemId = evt.target.dataset.id;
      const clickedItemIndex = todos.findIndex((todo) => todo.id === +clickedItemId);


      fetch(URL + "/todos/" + clickedItemId, {
        method: "DELETE"
      })
        .then((response) => {
          return response.json();
        })
        .then(() => {
          setTodos([
            ...todos.slice(0, clickedItemIndex),
            ...todos.slice(clickedItemIndex + 1)
          ]);
        })
        .catch((err) => {
          console.log(err);
        });
      // setTodos([
      //   ...todos.slice(0, clickedItemIndex),
      //   ...todos.slice(clickedItemIndex + 1)
      // ])
    }
  }

  return (
    <ul onChange={handleListChange} onClick={handleListClick} className="todos-list">
      {
        todos.map((todo) => <TodoItem key={todo.id} {...todo} />)
      }
    </ul>
  );
};

export default TodosList;