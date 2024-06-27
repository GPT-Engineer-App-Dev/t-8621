import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState(null);
  const [editTaskText, setEditTaskText] = useState("");

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask }]);
      setNewTask("");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEditTask = (task) => {
    setEditTask(task);
    setEditTaskText(task.text);
  };

  const saveEditTask = () => {
    setTasks(tasks.map((task) => (task.id === editTask.id ? { ...task, text: editTaskText } : task)));
    setEditTask(null);
    setEditTaskText("");
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center p-4 bg-background text-foreground">
      <Card className="w-full max-w-lg bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Todo App</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2 mb-4">
            <Input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task"
              className="flex-grow"
            />
            <Button onClick={addTask} className="bg-yellow-500 hover:bg-yellow-600">Add</Button>
          </div>
          <Separator />
          <ScrollArea className="h-64">
            {tasks.map((task) => (
              <div key={task.id} className="flex justify-between items-center p-2 border-b border-border">
                <span>{task.text}</span>
                <div className="space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => startEditTask(task)}>
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Task</DialogTitle>
                      </DialogHeader>
                      <Input
                        value={editTaskText}
                        onChange={(e) => setEditTaskText(e.target.value)}
                        placeholder="Edit task"
                        className="mb-4"
                      />
                      <Button onClick={saveEditTask}>Save</Button>
                    </DialogContent>
                  </Dialog>
                  <Button variant="destructive" size="sm" onClick={() => deleteTask(task.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
        <CardFooter className="text-center">Total Tasks: {tasks.length}</CardFooter>
      </Card>
    </div>
  );
};

export default Index;