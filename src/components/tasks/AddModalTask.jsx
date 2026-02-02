import { useForm } from "react-hook-form";
import Modal from "../ui/Modal";
import { useSendTaskMutation } from "../../redux/features/api/taskApi";

const people = [
  "Alice",
  "Saad",
  "Bob",
  "Charlie",
  "David",
  "Eva",
  "Frank",
  "Grace",
  "Helen",
  "Ivy",
  "Jack",
];

const task = {
  id: 1,
  title: "Do the work",
  description:
    "We need a remove button in our task card. Meke the button red and use Heroicon for tashbin icon.",
  deadline: "2023-08-28",
  assignees: "Eva",
  priority: "high",
  // status: 'pending',
};

const AddModalTask = ({ isOpen, setIsOpen }) => {
  const [setPost, { data }] = useSendTaskMutation();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleCancel = () => {
    reset();
    setIsOpen(false);
    console.log("Form cancelled");
  };

  const onSubmit = (payload) => {
    setPost(payload);
    setIsOpen(false);
  };
  console.log(data);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Programming Hero">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              className="w-full rounded-md"
              placeholder="Task title"
              defaultValue={task.title}
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              rows={2}
              className="w-full rounded-md"
              placeholder="Task description"
              defaultValue={task.description}
              {...register("description")}
            />
          </div>

          {/* Deadline */}
          <div>
            <label className="block text-sm font-medium mb-1">Deadline</label>
            <input
              type="date"
              className="w-full rounded-md"
              defaultValue={task.deadline}
              {...register("deadline", { required: true })}
            />
          </div>

          {/* Assign To (Multi Select) */}
          <div>
            <label className="block text-sm font-medium mb-1">Assign To</label>
            <select
              //   multiple
              className="w-full rounded-md"
              defaultValue={task.assignees}
              {...register("assignees", { required: true })}
            >
              {people.map((person) => (
                <option key={person} value={person}>
                  {person}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">
              Hold Ctrl / Cmd to select multiple
            </p>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium mb-1">Priority</label>
            <select
              className="w-full rounded-md"
              defaultValue={task.priority}
              {...register("priority", { required: true })}
            >
              <option value="">Select priority</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddModalTask;
