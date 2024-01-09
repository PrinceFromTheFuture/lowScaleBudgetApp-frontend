import { useState } from "react";
import usePost from "../hooks/usePost";

import { Button } from "@/components/ui/button";
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

const NewBalanceDialog = () => {
  const [newBalance, setnewBalance] = useState({
    title: "",
    balance: "",
    type: "",
    net: false,
  });

  const { submitData } = usePost("balances", newBalance);

  const handleChange = (event) => {
    const { value, id } = event.target;
    setnewBalance({ ...newBalance, [id]: value });
    console.log(newBalance);
  };

  const handleSubmit = () => {
    submitData();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="new">New Budget</Button>
      </DialogTrigger>
      <>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>new Balance</DialogTitle>
            <DialogDescription>
              Create a new Balance. Click Create when you're done.
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
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Input id="type" className="col-span-3" onChange={handleChange} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose>
              <Button variant="new" type="submit" onClick={ handleSubmit}>
                Create Balance
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </>
    </Dialog>
  );
};

export default NewBalanceDialog;
