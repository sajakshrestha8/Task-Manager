import axios from "axios";
import { useCallback, useEffect, useState } from "react";

interface ITaskResponse {
  Title: string;
  Description: string;
}

const App = () => {
  const [task, setTask] = useState<ITaskResponse[] | undefined>(undefined);

  const token = localStorage.getItem("token");
  const URL = "http://localhost:8000/task/tasks";
  const fetchData = useCallback(async () => {
    const res = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setTask(res.data);
  }, [URL, token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {task?.map((value, index) => {
            return (
              <tr key={index}>
                <td>{value.Title}</td>
                <td>{value.Description}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button>Create</button>
    </>
  );
};

export default App;
