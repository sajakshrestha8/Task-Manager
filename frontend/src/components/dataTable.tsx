import {
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "./ui/table";
import axios, { AxiosError } from "axios";
import { ITaskResponse } from "@/App";
import { URL } from "@/constants/enum";

interface props {
  loadData: () => void;
  task: ITaskResponse[];
}

const DataTable = ({ loadData, task }: props) => {
  console.log(task);
  const TOKEN = `Bearer ${localStorage.getItem("token")}`;

  const handleDelete = async (id: number) => {
    try {
      const res = await axios.delete(`${URL}/task/tasks/${id}`, {
        headers: {
          Authorization: TOKEN,
        },
      });
      loadData();
      console.log(res);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
    }
  };

  return (
    <Table className="table-fixed">
      <TableCaption>List of tasks</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {task?.map((value, index) => {
          return (
            <TableRow key={index}>
              <TableCell>{value.Title}</TableCell>
              <TableCell>{value.Description}</TableCell>
              <AlertDialog>
                <AlertDialogTrigger>
                  <Button variant={"destructive"} size={"sm"} className="mt-1">
                    DELETE
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure to delete?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      your task and remove your data from our servers.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(value.Id)}
                      className="bg-red-500 hover:bg-red-600 cursor-pointer"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default DataTable;
