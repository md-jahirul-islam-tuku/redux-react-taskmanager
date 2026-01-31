import { useParams } from "react-router-dom";
import { useGetPostByIdQuery } from "../redux/features/api/baseApi";

const PostDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetPostByIdQuery(id);
  if (isLoading) return <p className="text-center text-5xl mt-5">Loading...</p>;
  if (isError)
    return <p className="place-items-center text-xl">Something went wrong</p>;
  return (
    <div className="mx-auto text-center w-80 border-2 p-8 mt-10">
      <h1 className="text-3xl capitalize">{data.title}</h1>
      <p>{data.body}</p>
    </div>
  );
};

export default PostDetails;
