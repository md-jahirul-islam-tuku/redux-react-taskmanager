import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../../redux/features/users/usersSlice";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, isLoading, isError, error } = useSelector(
    (state) => state.users,
  );
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    dispatch(signInUser({ email, password }));
  };
  useEffect(() => {
    if (!isLoading && email) {
      navigate("/", { replace: true });
    }
  }, [email, isLoading, navigate]);
  return (
    <div className="w-96 mx-auto mt-20">
      <h1 className="text-2xl font-semibold mb-3">Sign In </h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input type="email" name="email" placeholder="Email" />
        <br />
        <input type="password" name="password" placeholder="Password" />
        <br />
        <input type="submit" value="Sign In" className="btn-primary py-2" />
      </form>
      <p className="mt-3">
        No account?{" "}
        <Link to={"/signup"} className="text-primary underline ml-5 font-bold">
          Sign up
        </Link>
      </p>
      {isError && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default SignIn;
