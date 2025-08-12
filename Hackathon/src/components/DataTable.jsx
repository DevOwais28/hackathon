import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { db } from "../firebase.js";
import { onSnapshot, collection, doc, updateDoc ,deleteDoc} from "firebase/firestore";
import { BookCheckIcon, CheckCheckIcon, CheckCircle, CheckCircle2Icon, CheckSquare, DeleteIcon, Edit, LucideDelete } from "lucide-react";
import { toast } from "sonner";
import { DialogBox } from "./DialogBox.jsx";

export function DataTable() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
      const tasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasks);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
    <div className="flex flex-col gap-4">
      <DialogBox
        task={editingTask}
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setEditingTask(null);
        }}
      />

      <Table className="w-full">
        <TableCaption>A list of your recent Tasks.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Task Id</TableHead>
            <TableHead>Task Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Deadline</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Mark as Completed</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell >{task.id}</TableCell>
              <TableCell >{task.Taskname}</TableCell>
              <TableCell >{task.description}</TableCell>
              <TableCell >
                {task.deadline && task.deadline.toDate().toLocaleDateString()}
              </TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell className="text-white flex items-center justify-center">
                <CheckCircle
                  onClick={async () => {
                    const taskRef = doc(db, "tasks", task.id);
                    await updateDoc(taskRef, { status: "completed" });
                    toast.success("Task marked as completed!");
                  }}
                  className="text-green-500 cursor-pointer"
                />
              </TableCell>
              <TableCell>
                <button
                  className="!text-blue-500 hover:underline"
                  onClick={() => {
                    setEditingTask(task);
                    setIsDialogOpen(true);
                  }}
                >
                  <Edit />
                </button>
                <button className="!text-red-500 hover:underline ml-2" onClick={async () => {
                  const taskRef = doc(db, "tasks", task.id);
                    await deleteDoc(taskRef);
                    toast.success("Task deleted successfully!");
                }}>
                  <DeleteIcon />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </div>
    </>

  );
}
