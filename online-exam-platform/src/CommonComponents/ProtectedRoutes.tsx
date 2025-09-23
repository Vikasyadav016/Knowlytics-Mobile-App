import { Navigate, Outlet } from 'react-router-dom';

function isTokenExpired(token:string) {
  if (!token) return true;

  try {
    const payloadBase64 = token.split('.')[1];
    if (!payloadBase64) return true;

    const decodedPayload = JSON.parse(atob(payloadBase64));
    const expiry = decodedPayload.exp;
    if (!expiry) return true;

    const now = Math.floor(Date.now() / 1000);
    return now >= expiry;
  } catch (e) {
    return true;
  }
}

const ProtectedRoute = () => {
  const token = localStorage.getItem('session_token');

  if (!token || isTokenExpired(token)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
