import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { setUsers, toggleLoading } from "../redux/features/users/usersSlice";

const PrivateRoute = ({ children }) => {
  const { email, isLoading } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUsers({
            name: user.displayName,
            email: user.email,
          }),
        );
        dispatch(toggleLoading(false));
      } else {
        dispatch(toggleLoading(false));
      }
    });
  }, [dispatch]);

  if (isLoading) return <p className="text-center text-5xl mt-5">Loading...</p>;
  if (!isLoading && !email) return <Navigate to="/signup" />;

  return children;
};

export default PrivateRoute;
