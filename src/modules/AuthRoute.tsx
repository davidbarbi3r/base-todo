import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import logging from "../config/logging";

export interface IAuthRouteProps {
  children: any;
}

const AuthRoute = (props: IAuthRouteProps) => {
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const AuthCheck = onAuthStateChanged(auth, (user) => {
      if (!user) {
        logging.warn("Unauthorized, you have to login");
        navigate("/login");
      }
    });
    return () => AuthCheck();
  }, [auth]);

  return <>{props.children}</>

};

export default AuthRoute;
