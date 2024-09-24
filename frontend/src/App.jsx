import { TodoForm, Table } from "./components/index";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/todo/");
      if (res.status === 200) {
        setTodos(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-indigo-100 px-8 min-h-screen">
      <nav className="pt-8">
        <h1 className="text-5xl text-center text-black pb-14">Todo list</h1>
      </nav>
      <TodoForm setTodos={setTodos} fetchData={fetchData} />
      <Table todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
