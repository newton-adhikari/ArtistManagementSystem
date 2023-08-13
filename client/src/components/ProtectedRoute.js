import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({
  allowedRoles = [],
  children,
}) => {
  const role = JSON.parse(JSON.stringify(localStorage.getItem("role")));

  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;

