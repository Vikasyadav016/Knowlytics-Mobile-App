import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ErrorBoundary from "./ErrorBoundaries/ErrorBoundaries";
import LandingPage from "./Pages/Pageone";
// import Registration from "./Pages/AuthPages/AuthMainPage/Registration";
import NotFound from "./ErrorBoundaries/NotFound";
import UnauthorizedLayout from "./AuthUnVerifiedLayout/UnAuthorizedLayout";
import ProtectedRoute from "./CommonComponents/ProtectedRoutes";
import UserLayout from "./AuthVerifiedLayout/UserLayout";
import UserDashboard from "./AuthVerifiedLayout/UserDashboard";
import LoginPage from "./Pages/AuthPages/AuthMainPage/Login";
import Registration from "./Pages/AuthPages/Registration/Registration";

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/user" element={<UserLayout />}>
              <Route index element={<UserDashboard />} />
            </Route>
          </Route>

          <Route path="/unauthorized" element={<UnauthorizedLayout />}>
            <Route index element={<LoginPage />} />
            {/* <Route path="register" element={<Registration />} /> */}
            <Route path="register" element={<Registration />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
