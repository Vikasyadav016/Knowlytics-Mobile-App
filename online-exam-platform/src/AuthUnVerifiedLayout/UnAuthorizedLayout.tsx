import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

type AuthScreen =
  | 'login'
  | 'logout'
  | 'forgotPassword'
  | 'changePassword'
  | 'register';

const imageMap: Record<AuthScreen, { src: string; alt: string; text: string }> = {
  login: {
    src: '/images/login.jpg',
    alt: 'Login Illustration',
    text: 'Welcome back! Please login to your account.',
  },
  logout: {
    src: '/images/logout.jpg',
    alt: 'Logout Illustration',
    text: 'You have been logged out successfully.',
  },
  forgotPassword: {
    src: '/images/forgot-password.jpg',
    alt: 'Forgot Password Illustration',
    text: 'Forgot your password? Let’s reset it.',
  },
  changePassword: {
    src: '/images/change-password.jpg',
    alt: 'Change Password Illustration',
    text: 'Secure your account by changing your password regularly.',
  },
  register: {
    src: '/images/register.jpg',
    alt: 'Register Illustration',
    text: 'Join us! Create a new account.',
  },
};

const UnauthorizedLayout: React.FC = () => {
  const location = useLocation();

  // Map URL paths to screen keys
  const pathToScreen: Record<string, AuthScreen> = {
    '/login': 'login',
    '/logout': 'logout',
    '/forgot-password': 'forgotPassword',
    '/change-password': 'changePassword',
    '/register': 'register',
  };

  // Default to 'login' if path is not mapped
  const screen = pathToScreen[location.pathname] || 'login';

  const { src, alt, text } = imageMap[screen];

  return (
    <div className="flex min-h-screen">
      {/* Left half */}
      <div className="w-1/2 bg-gray-100 flex flex-col items-center justify-center p-10">
        <img src={src} alt={alt} className="max-w-full max-h-96 object-contain mb-8" />
        <p className="text-gray-700 text-lg text-center max-w-sm">{text}</p>
      </div>

      {/* Right half with nested routes */}
      <div className="w-1/2 flex items-center justify-center p-10">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedLayout;
