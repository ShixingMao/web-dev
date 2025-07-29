import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

export default function ProtectedCourseRoute({ children }: { children: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const { cid } = useParams();

  const isEnrolled = enrollments.some(
    (e: any) => e.user === currentUser?._id && e.course === cid
  );

  if (!currentUser) {
    return <Navigate to="/Kambaz/Account/Signin" />;
  }

  if (!isEnrolled) {
    return <Navigate to="/Kambaz/Dashboard" />;
  }

  return children;
}
