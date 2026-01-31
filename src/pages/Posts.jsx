import { Link } from "react-router-dom";
import { useGetPostsQuery } from "../redux/features/api/baseApi";

const Posts = () => {
  const { data, isLoading, isError } = useGetPostsQuery();

  if (isLoading) return <p className="text-center text-5xl mt-5">Loading...</p>;
  if (isError)
    return <p className="place-items-center text-xl">Something went wrong</p>;

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">Total posts: {data?.length}</h1>
      <div className="grid grid-cols-5 gap-5">
        {data?.map((post) => (
          <div key={post.id} className="border-2 p-3 bg-zinc-200">
            <h1 className="font-semibold mb-3">{post.title}</h1>
            <p className="text-gray-400">{post.body}</p>
            <button className="btn btn-primary">
              <Link to={`/posts/${post.id}`}>Details</Link>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
