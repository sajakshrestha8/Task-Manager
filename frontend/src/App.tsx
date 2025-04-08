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
          <h1>My app</h1>

          <AlertDialog>
            <AlertDialogTrigger>
              <Button variant={"outline"}>Logout &rarr;</Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure to Logout?</AlertDialogTitle>
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
