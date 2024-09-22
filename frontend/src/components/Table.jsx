import {
  MdEditNote,
  MdDeleteOutline,
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";


const Table = ({todos}) => {
  

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
                <span className="inline-block cursor-pointer">
                  {todo.compeleted ? (
                    <MdOutlineCheckBox />
                  ) : (
                    <MdOutlineCheckBoxOutlineBlank />
                  )}
                </span>
              </th>
              <th className="p-3 text-sm">{todo.body}</th>
              <th className="p-3 text-sm text-center">
                {todo.compeleted ? (
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
                  <MdEditNote />
                </span>
                <span className="text-xl cursor-pointer">
                  <MdDeleteOutline />
                </span>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
