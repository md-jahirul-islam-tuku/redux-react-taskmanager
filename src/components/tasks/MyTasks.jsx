import {
  CheckIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserTasks,
  updatedStatus,
} from "../../redux/features/tasks/tasksSlice";
import Modal from "../ui/Modal";
import { useState } from "react";

const MyTasks = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const user = useSelector((state) => state.users.name);
  const userTasks = useSelector(selectUserTasks(user));
  const dispatch = useDispatch();

  return (
    <div>
      <h1 className="text-xl my-3">My Tasks</h1>

      <div className="h-[750px] overflow-auto space-y-3">
        {userTasks.length === 0 && (
          <p className="text-sm text-gray-400">No tasks assigned to you</p>
        )}

        {userTasks.map((task) => (
          <div
            key={task.id}
            className="bg-secondary/10 rounded-md p-3 flex justify-between items-center"
          >
            <div>
              <h1 className="font-medium">{task.title}</h1>
              <p className="text-xs capitalize text-gray-500">
                Status: {task.status}
              </p>
            </div>

            <div className="flex gap-3">
              <button onClick={() => selectUserTasks(task)} title="Details">
                <DocumentMagnifyingGlassIcon className="w-5 h-5 text-primary" />
              </button>

              {task.status !== "archive" && (
                <button
                  title="Next status"
                  onClick={() => dispatch(updatedStatus(task.id))}
                >
                  <CheckIcon className="w-5 h-5 text-primary" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <Modal
        isOpen={!!selectedTask}
        setIsOpen={() => setSelectedTask(null)}
        title={selectedTask?.title}
        task={selectedTask}
      />
    </div>
  );
};

export default MyTasks;
