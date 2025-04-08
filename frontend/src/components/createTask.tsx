import { AlertCircle } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { addTask } from "@/service/addTask";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";

interface props {
  loadData: () => void;
}

function CreateTask({ loadData }: props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [taskErrorMessage, setTaskErrorMessage] = useState("");
  const [show, setShow] = useState(false);

  const navigate = useNavigate();

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setTaskErrorMessage("");
  };

  const handleTitleInput = (value: string) => {
    setTitle(value);
  };

  const handleDescInput = (value: string) => {
    setDescription(value);
  };

  const handleAddTask = async () => {
    try {
      await addTask(title, description);
      setShow(!show);
      loadData();
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 403) {
          localStorage.clear();
          return navigate("/login");
        }
        setTaskErrorMessage(error.response?.data.message);
      }
    }
  };

  return (
    <>
      <Dialog
        open={show}
        onOpenChange={() => {
          setShow(!show);
          resetForm();
        }}
      >
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
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleAddTask();
            }}
          >
            {taskErrorMessage ? (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{taskErrorMessage}</AlertDescription>
              </Alert>
            ) : null}
            <div className="mb-2 grid gap-1">
              <label htmlFor="title">
                Title <span className="text-red-500">*</span>
              </label>
              <Input
                type="text"
                name="title"
                placeholder="Title of the task"
                required
                onChange={(e) => {
                  handleTitleInput(e.target.value);
                }}
              />
            </div>
            <div className="mb-4 grid gap-1">
              <label htmlFor="title">
                Description{" "}
                <span className="text-xs italic text-gray-500">(optional)</span>
              </label>
              <Textarea
                placeholder="Description of the task"
                onChange={(e) => {
                  handleDescInput(e.target.value);
                }}
              />
            </div>
            <div className="flex justify-end items-center gap-2">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setShow(false);
                  resetForm();
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Create</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateTask;
