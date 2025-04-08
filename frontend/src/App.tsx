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
import { AxiosError } from "axios";
import Logo from "./assets/viber_image_2025-04-08_18-39-36-286.png";

export interface ITaskResponse {
  Id: number;
  Title: string;
  Description: string;
}

const App = () => {
  const [task, setTask] = useState<ITaskResponse[] | []>([]);
  const navigate = useNavigate();
  const loadData = useCallback(async () => {
    try {
      const result = await fetchData();
      setTask(result);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.status === 403) {
          navigate("/login");
        }
      }
    }
  }, [navigate]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <>
      <div className="max-w-7xl m-auto mt-10">
        <div className="flex flex-wrap justify-between mb-8">
          <img src={Logo} />
          <AlertDialog>
            <AlertDialogTrigger>
              <Button variant={"outline"} className="cursor-pointer">
                Logout &rarr;
              </Button>
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
