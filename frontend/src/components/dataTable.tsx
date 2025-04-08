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
import { AxiosError } from "axios";
import { ITaskResponse } from "@/App";
import { deleteData } from "@/service/deleteData";

interface props {
  loadData: () => void;
  task: ITaskResponse[];
}

const DataTable = ({ loadData, task }: props) => {
  console.log(task);

  const handleDelete = async (id: number) => {
    try {
      const result = await deleteData(id);
      loadData();
      console.log(result);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.message);
      }
    }
  };

  return (
    <Table className="table-fixed text-center border border-black-500">
      <TableCaption>List of tasks</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Title</TableHead>
          <TableHead className="text-center">Description</TableHead>
          <TableHead className="text-center">Action</TableHead>
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
                  <Button
                    variant={"destructive"}
                    size={"sm"}
                    className="mt-1 cursor-pointer"
                  >
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
