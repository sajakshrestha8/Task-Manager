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
import { useNavigate } from "react-router-dom";
import { Input } from "./components/ui/input";

interface ITaskResponse {
  Id: number;
  Title: string;
  Description: string;
}

const App = () => {
  const [task, setTask] = useState<ITaskResponse[] | []>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [show, setShow] = useState(false);

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

  const handleAddTask = async () => {
    try {
      const res = await axios.post(
        URL,
        {
          title: title,
          description: description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShow(!show);
      fetchData();
      console.log(res);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await axios.delete(`${URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchData();
      console.log(res);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
    }
  };

  const handleTitleInput = (value: string) => {
    setTitle(value);
  };

  const handleDescInput = (value: string) => {
    setDescription(value);
  };

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
                <Button onClick={() => handleDelete(value.Id)}>Delete</Button>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Dialog open={show} onOpenChange={() => setShow(!show)}>
        <DialogTrigger asChild>
          <Button variant="outline">Create Task</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create new task</DialogTitle>
            <DialogDescription>
              Enter the data on all the required fields
            </DialogDescription>
          </DialogHeader>
          <form>
            <label htmlFor="title">Title</label>
            <Input
              type="text"
              name="title"
              placeholder="Title of the task"
              required
              onChange={(e) => {
                handleTitleInput(e.target.value);
              }}
            />
            <label htmlFor="title">Description</label>
            <Input
              type="text"
              placeholder="Description of the task"
              required
              onChange={(e) => {
                handleDescInput(e.target.value);
              }}
            />
          </form>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button
              onClick={(e) => {
                e.preventDefault();
                handleAddTask();
              }}
            >
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default App;
