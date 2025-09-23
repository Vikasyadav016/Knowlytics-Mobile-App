import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ErrorBoundary from "./ErrorBoundaries/ErrorBoundaries";
import LandingPage from "./Pages/Pageone";
import Registration from "./Pages/AuthPages/AuthMainPage/Registration";
import NotFound from "./ErrorBoundaries/NotFound";
import UnauthorizedLayout from "./AuthUnVerifiedLayout/UnAuthorizedLayout";
import ProtectedRoute from "./CommonComponents/ProtectedRoutes";
import UserLayout from "./AuthVerifiedLayout/UserLayout";
import UserDashboard from "./AuthVerifiedLayout/UserDashboard";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/user" element={<UserLayout />}>
              <Route index element={<UserDashboard />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
          <Route path="/unauthorized" element={<UnauthorizedLayout />}>
            <Route path="register" index element={<Registration />} />
          </Route>
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
