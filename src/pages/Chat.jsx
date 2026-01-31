import { useSendPostMutation } from "../redux/features/api/baseApi";

const Chat = () => {
  const [setPost, { data }] = useSendPostMutation();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const details = form.details.value;
    const payload = { title, details };
    setPost(payload);
  };
  console.log(data);
  return (
    <div className="mx-auto w-52 mt-10">
      <h1 className="mb-8">Create Post</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" className="mb-2" />
        <textarea
          name="details"
          placeholder="Details"
          className="w-full"
        ></textarea>
        <input type="submit" value="Post" className="btn btn-primary" />
      </form>
    </div>
  );
};

export default Chat;
