import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DatePicker } from "./DatePicker";
import { toast } from "sonner";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { addDoc, collection, updateDoc, doc , deleteDoc} from "firebase/firestore";
import { db } from "../firebase";

export function DialogBox({ task = null, open, onOpenChange }) {
  const [loading, setLoading] = useState(false);

  const isEditMode = !!task;

  const TaskSchema = Yup.object().shape({
    Taskname: Yup.string().required("Task name is required!"),
    description: Yup.string().required("Description is required"),
    date: Yup.date().nullable().required("Deadline is required"),
  });

  const formik = useFormik({
    initialValues: {
      Taskname: task?.Taskname || "",
      description: task?.description || "",
      date: task?.deadline?.toDate?.() || null,
    },
    enableReinitialize: true,
    validationSchema: TaskSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        if (isEditMode) {
          const taskRef = doc(db, "tasks", task.id);
          await updateDoc(taskRef, {
            Taskname: values.Taskname,
            description: values.description,
            deadline: values.date,
          });
          toast.success("Task updated successfully!");
        } else {
          await addDoc(collection(db, "tasks"), {
            Taskname: values.Taskname,
            description: values.description,
            deadline: values.date,
            status: "pending",
          });
          toast.success("Task added successfully!");
          resetForm(); // clear only for add mode
        }
        onOpenChange(false); // close the dialog
      } catch (error) {
        console.error("Error:", error);
        toast.error("Something went wrong.");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {!isEditMode && (
        <DialogTrigger asChild>
          <Button variant="outline" className="w-[fit-Content]">Add Task</Button>
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={formik.handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isEditMode ? "Edit Task" : "Add Task"}</DialogTitle>
            <DialogDescription>
              {isEditMode
                ? "Update your task details below."
                : "Create a new task. Click save when you're done."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="Taskname">Task Name</Label>
              <Input
                id="Taskname"
                name="Taskname"
                value={formik.values.Taskname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{
                  borderColor:
                    formik.touched.Taskname && formik.errors.Taskname
                      ? "red"
                      : undefined,
                }}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={{
                  borderColor:
                    formik.touched.description && formik.errors.description
                      ? "red"
                      : undefined,
                }}
              />
            </div>

            <div className="grid gap-2">
              <DatePicker
                value={formik.values.date}
                onChange={(date) => formik.setFieldValue("date", date)}
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={loading}>
              {loading
                ? isEditMode
                  ? "Updating..."
                  : "Adding..."
                : isEditMode
                ? "Update Task"
                : "Add Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
