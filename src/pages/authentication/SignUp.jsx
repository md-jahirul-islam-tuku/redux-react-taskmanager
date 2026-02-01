import { useDispatch } from "react-redux";
import { createUser } from "../../redux/features/users/usersSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    dispatch(createUser({ name, email, password }));
  };
  return (
    <div className="w-96 mx-auto mt-20">
      <h1 className="text-2xl font-semibold mb-3">Please Sign Up </h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input type="text" name="name" placeholder="Name" />
        <br />
        <input type="email" name="email" placeholder="Email" />
        <br />
        <input type="password" name="password" placeholder="Password" />
        <br />
        <input type="submit" value="Sign up" className="btn-primary py-2" />
      </form>
    </div>
  );
};

export default SignUp;
