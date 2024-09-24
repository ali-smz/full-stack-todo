import axios from "axios";
import { useState } from "react";

const TodoForm = ({ fetchData }) => {
  const [newTodo, setNewTodo] = useState({
    body: "",
  });

  const changeHandler = (e) => {
    setNewTodo((prev) => ({
      ...prev,
      body: e.target.value,
    }));
  };

  const postTodo = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/todo/", newTodo);
      setNewTodo({ body: "" });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center">
      <input
        type="text"
        placeholder="Add Todo"
        className="input input-bordered input-info w-full max-w-xs bg-white"
        value={newTodo.body}
        onChange={changeHandler}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            postTodo();
          }
        }}
      />
      <button className="btn ml-3 btn-primary" onClick={postTodo}>
        Add Todo
      </button>
    </div>
  );
};

export default TodoForm;
