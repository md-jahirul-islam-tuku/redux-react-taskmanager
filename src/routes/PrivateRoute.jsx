import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase.config";
import { useDispatch, useSelector } from "react-redux";
import {
  setUsers,
  toggleLoading,
  logout,
} from "../redux/features/users/usersSlice";

const PrivateRoute = ({ children }) => {
  const { email, isLoading } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUsers({
            name: user.displayName,
            email: user.email,
          })
        );
      } else {
        dispatch(logout());
      }
      
      <Navigate to="/" replace />
      dispatch(toggleLoading(false));
    });

    return () => unsubscribe();
  }, [dispatch]);

  // ⏳ loading
  if (isLoading) {
    return <p className="text-center text-5xl mt-5">Loading...</p>;
  }

  // 🔒 not logged in → signup
  if (!email) {
    return <Navigate to="/signup" replace />;
  }

  // ✅ logged in → allow page
  return children;
};

export default PrivateRoute;
