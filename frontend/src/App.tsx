import { useCallback, useEffect, useState } from "react";
import { Button } from "./components/ui/button";

import { useNavigate } from "react-router-dom";

import { fetchData } from "./service/fetchData";

import DataTable from "./components/dataTable";
import CreateTask from "./components/createTask";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./components/ui/alert-dialog";
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog";

export interface ITaskResponse {
  Id: number;
  Title: string;
  Description: string;
}

const App = () => {
  const [task, setTask] = useState<ITaskResponse[] | []>([]);
  const navigate = useNavigate();
  const loadData = useCallback(async () => {
    const result = await fetchData(navigate);
    setTask(result);
    console.log(result);
  }, [navigate]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <>
      <div className="max-w-7xl m-auto mt-10">
        <div className="flex flex-wrap justify-between">
          <label className="text-xl font-bold">MyTasks</label>

          <AlertDialog>
            <AlertDialogTrigger>
              <Button variant={"outline"}>Logout &rarr;</Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Logout Confirmation</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to do logout?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="cursor-pointer">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    localStorage.clear();
                    navigate("/login");
                  }}
                  className="bg-red-500 hover:bg-red-600 cursor-pointer"
                >
                  LogOut
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <DataTable loadData={loadData} task={task} />
        <CreateTask loadData={loadData} />
      </div>
    </>
  );
};

export default App;
