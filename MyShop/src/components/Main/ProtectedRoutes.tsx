import { useSelector } from "react-redux";
import { ChildrenPropType } from "../../interfaces";
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ProtectedRoutes({ children }: ChildrenPropType) {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
