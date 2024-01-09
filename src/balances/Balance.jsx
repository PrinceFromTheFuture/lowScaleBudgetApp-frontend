import { useContext, useEffect, useState } from "react";
import useDelete from "../hooks/useDelete";
import useUpdate from "../hooks/useUpdate";
import actionModeContext from "../contexts/actionModeContext";

import {
  Card,
  CardContent,
  CardDescription,
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

const Balance = ({ balance, allBalances, setAllBalances }) => {
  const [updatedBalance, setUpdatedBalance] = useState(balance);

  const { deleteData } = useDelete("balances", updatedBalance._id);
  const { updateData } = useUpdate("balances", updatedBalance);

  const allowActions = useContext(actionModeContext);

  //editMode
  const handleChange = (event) => {
    const { value, id } = event.target;
    setUpdatedBalance({ ...updatedBalance, [id]: value });
  };
  const handleUpdate = () => {
    updateData();
    console.log(allBalances);
    const newAllBalances = allBalances.map((obj) =>
      obj._id === updatedBalance._id
        ? {
            ...obj,
            title: updatedBalance.title,
            balance: updatedBalance.balance,
            type: updatedBalance.type,
          }
        : obj
    );
    setAllBalances(newAllBalances);
  };

  const onDelete = () => {
    const newAllBalances = allBalances.filter(
      (obj) => obj._id !== updatedBalance._id
    );
    setAllBalances(newAllBalances);
    deleteData();
  };

  return (
    <div>
      <Card className="w-[200px]">
        <CardHeader>
          <CardTitle>{balance.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="font-bold text-3xl">
            ₪{Number(balance.balance).toFixed(2)}
          </div>
          <div className=" text-slate-500 ">{balance.type}</div>
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
                    the Balance and remove your data from our servers.
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
                <DialogContent className="sm:max-w-[380px]">
                  <DialogHeader>
                    <DialogTitle>Update Balance</DialogTitle>
                    <DialogDescription>
                      Updated your Balance details. Click Save when you're done.
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
                        value={updatedBalance.title}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="balance" className="text-right">
                        Balance
                      </Label>
                      <Input
                        id="balance"
                        className="col-span-3"
                        type="number"
                        onChange={handleChange}
                        value={updatedBalance.balance}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="type" className="text-right">
                        Type
                      </Label>
                      <Input
                        id="type"
                        className="col-span-3"
                        onChange={handleChange}
                        value={updatedBalance.type}
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

export default Balance;
