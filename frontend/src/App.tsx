import axios, { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "./components/ui/dialog";
import { Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ITaskResponse {
  Title: string;
  Description: string;
}

const App = () => {
  const [task, setTask] = useState<ITaskResponse[] | []>([]);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const URL = "http://localhost:8000/task/tasks";
  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get(URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTask(res.data);
      console.log(res.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 403) {
          localStorage.clear();
          navigate("/login");
        }
      }
      console.log(error);
    }
  }, [URL, token, navigate]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div className="flex justify-between">
        <h4>my app</h4>

        <Button
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
        >
          Logout
        </Button>
      </div>
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
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Create Task</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create new task</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2"></div>
            <Button type="submit" size="sm" className="px-3">
              <span className="sr-only">Copy</span>
              <Copy />
            </Button>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default App;
