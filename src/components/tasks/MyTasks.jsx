import {
  CheckIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useState } from "react";
import Modal from "../ui/Modal";
import {
  makeSelectUserTasks,
  updatedStatus,
} from "../../redux/features/tasks/tasksSlice";

const MyTasks = () => {
  const dispatch = useDispatch();
  const [selectedTask, setSelectedTask] = useState(null);

  const userName = useSelector((state) => state.users.name);

  // 🔥 create selector once per component
  const selectUserTasks = useMemo(makeSelectUserTasks, []);
  const userTasks = useSelector((state) =>
    selectUserTasks(state, userName)
  );

  return (
    <div>
      <h1 className="text-xl my-3">My Tasks</h1>

      <div className="h-[750px] overflow-auto space-y-3">
        {userTasks.length === 0 && (
          <p className="text-sm text-gray-400">
            No tasks assigned to you
          </p>
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
              <button
                title="Details"
                onClick={() => setSelectedTask(task)}
              >
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

      {/* ONE modal only */}
      <Modal
        isOpen={!!selectedTask}
        setIsOpen={() => setSelectedTask(null)}
      >
        {selectedTask && (
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">
              {selectedTask.title}
            </h1>

            <p>
              <span className="font-semibold">Description:</span>{" "}
              {selectedTask.description}
            </p>

            <p>
              <span className="font-semibold">Deadline:</span>{" "}
              {selectedTask.deadline}
            </p>

            <p>
              <span className="font-semibold">Assignees:</span>{" "}
              {Array.isArray(selectedTask.assignees)
                ? selectedTask.assignees.join(", ")
                : selectedTask.assignees}
            </p>

            <p>
              <span className="font-semibold">Priority:</span>{" "}
              <span
                className={`capitalize ${
                  selectedTask.priority === "high"
                    ? "text-red-500"
                    : selectedTask.priority === "medium"
                    ? "text-yellow-500"
                    : "text-green-500"
                }`}
              >
                {selectedTask.priority}
              </span>
            </p>

            <p>
              <span className="font-semibold">Status:</span>{" "}
              {selectedTask.status}
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MyTasks;
