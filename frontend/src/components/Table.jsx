import axios from "axios";
import { useState } from "react";
import {
  MdEditNote,
  MdDeleteOutline,
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";

const Table = ({ todos, setTodos }) => {
  const [editText, setEditText] = useState({ body: "" });

  const deleteHandler = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/todo/${id}`);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const editHandler = async (id, value) => {
    try {
      const res = await axios.patch(
        `http://127.0.0.1:8000/api/todo/${id}/`,
        value
      );
      setTodos(todos.map((todo) => (todo.id === id ? res.data : todo)));
    } catch (error) {
      console.log(error);
    }
  };

  const checkboxHandler = async (id, value) => {
    editHandler(id, {
      completed: !value,
    });
  };

  const changeHandler = (e) => {
    setEditText((prev) => ({ ...prev, body: e.target.value }));
  };

  return (
    <div className="flex justify-center mt-5 text-black">
      <table className="w-11/12 max-w-4xl">
        <thead className="border-b border-b-black">
          <tr>
            <th className="p-3 text-center tracking-wide text-sm font-semibold">
              Checkbox
            </th>
            <th className="p-3 text-center tracking-wide text-sm font-semibold">
              To Do
            </th>
            <th className="p-3 text-center tracking-wide text-sm font-semibold">
              Status
            </th>
            <th className="p-3 text-center tracking-wide text-nowrap text-sm font-semibold">
              Data Created
            </th>
            <th className="p-3 text-center tracking-wide text-sm font-semibold">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <th className="p-3">
                <span
                  className="inline-block cursor-pointer"
                  onClick={() => {
                    checkboxHandler(todo.id, todo.completed);
                  }}
                >
                  {todo.completed ? (
                    <MdOutlineCheckBox />
                  ) : (
                    <MdOutlineCheckBoxOutlineBlank />
                  )}
                </span>
              </th>
              <th className="p-3 text-sm">{todo.body}</th>
              <th className="p-3 text-sm text-center">
                {todo.completed ? (
                  <span className="p-1.5 text-xs tracking-wider font-medium rounded-md bg-green-300">
                    Done
                  </span>
                ) : (
                  <span className="p-1.5 text-xs tracking-wider font-medium rounded-md bg-red-400">
                    incompeleted
                  </span>
                )}
              </th>
              <th className="p-3 text-sm">
                {new Date(todo.created).toLocaleString()}
              </th>
              <th className="p-3 text-sm font-medium grid grid-flow-col items-center mt-5">
                <span className="text-xl cursor-pointer">
                  <label
                    htmlFor="my_modal_6"
                    className="btn"
                    onClick={() => {
                      setEditText(todo);
                    }}
                  >
                    {" "}
                    <MdEditNote className="text-xl" />
                  </label>
                </span>
                <span className="text-xl cursor-pointer">
                  <MdDeleteOutline
                    onClick={() => {
                      deleteHandler(todo.id);
                    }}
                  />
                </span>
              </th>
            </tr>
          ))}
        </tbody>
      </table>

      <input type="checkbox" id="my_modal_6" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box bg-blue-100">
          <h3 className="text-lg font-bold mb-4">Edit Todo</h3>
          <input
            type="text"
            value={editText.body}
            className="input input-bordered input-info w-full max-w-xs bg-white"
            onChange={changeHandler}
          />
          <div className="modal-action">
            <label
              htmlFor="my_modal_6"
              onClick={() => {
                editHandler(editText.id, editText);
              }}
              className="btn btn-primary"
            >
              Edit
            </label>
            <label htmlFor="my_modal_6" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
