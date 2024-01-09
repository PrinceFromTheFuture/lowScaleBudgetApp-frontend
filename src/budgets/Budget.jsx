import { useContext, useState } from "react";
import useDelete from "../hooks/useDelete";
import useUpdate from "../hooks/useUpdate";
import actionModeContext from "../contexts/actionModeContext";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const Budget = ({ budget, setAllBudgets, allBudgets }) => {
  const [updatedBudget, setUpdatedBudget] = useState(budget);

  const { deleteData } = useDelete("Budgets", updatedBudget._id);
  const { updateData } = useUpdate("Budgets", updatedBudget);

  const allowActions = useContext(actionModeContext);

  //editMode
  const handleChange = (event) => {
    const { value, id } = event.target;
    setUpdatedBudget({ ...updatedBudget, [id]: value });
  };
  const handleUpdate = () => {
    updateData();

    const newAllBudgets = allBudgets.map((obj) =>
      obj._id === updatedBudget._id
        ? {
            ...obj,
            title: updatedBudget.title,
            balance: updatedBudget.balance,
            contributionPercentage: updatedBudget.contributionPercentage,
          }
        : obj
    );
    setAllBudgets(newAllBudgets);
  };

  const onDelete = () => {
    const newAllBudgets = allBudgets.filter(
      (obj) => obj._id !== updatedBudget._id
    );
    setAllBudgets(newAllBudgets);
    deleteData();
  };

  return (
    <div>
      <Card className="w-[200px]">
        <CardHeader>
          <CardTitle>{budget.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="font-bold text-3xl">
            ₪{Number(budget.balance).toFixed(2)}
          </div>
          <div className=" text-slate-500 ">
            {budget.contributionPercentage}%
          </div>
        </CardContent>
        {allowActions ? (
          <CardFooter className="flex justify-between">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the Budget and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    className="bg-red-500 text-slate-50 shadow-sm hover:bg-red-500/90 "
                    onClick={onDelete}
                  >
                    Delete Permanently
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="udpate">Edit</Button>
              </DialogTrigger>
              <>
                <DialogContent className="sm:max-w-[450px]">
                  <DialogHeader>
                    <DialogTitle>Update Budget</DialogTitle>
                    <DialogDescription>
                      Updated your Budget details. Click Save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                        Title
                      </Label>
                      <Input
                        id="title"
                        className="col-span-3"
                        onChange={handleChange}
                        value={updatedBudget.title}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="budget" className="text-right">
                        Budget
                      </Label>
                      <Input
                        id="balance"
                        className="col-span-3"
                        type="number"
                        onChange={handleChange}
                        value={updatedBudget.balance}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="type" className="text-right">
                        contribution percentage
                      </Label>
                      <Input
                        id="contributionPercentage"
                        className="col-span-3"
                        onChange={handleChange}
                        value={updatedBudget.contributionPercentage}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose>
                      <Button
                        variant="udpate"
                        type="submit"
                        onClick={handleUpdate}
                      >
                        Save Changes
                      </Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </>
            </Dialog>
          </CardFooter>
        ) : (
          ""
        )}
      </Card>
    </div>
  );
};

export default Budget;
