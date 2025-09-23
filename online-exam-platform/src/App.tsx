import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundaries/ErrorBoundaries';
import LandingPage from './Pages/Pageone';
import Registration from './Pages/AuthPages/AuthMainPage/Registration';
import NotFound from './ErrorBoundaries/NotFound';
import UnauthorizedLayout from './AuthUnVerifiedLayout/UnAuthorizedLayout';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/register" element={<Registration />} /> */}
          <Route path="*" element={<NotFound />} />
           <Route path="/unauthorized" element={<UnauthorizedLayout />} >
           <Route path='register' index element={<Registration />} />
           </Route>
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
