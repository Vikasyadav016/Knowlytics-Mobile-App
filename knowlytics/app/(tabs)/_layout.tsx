import { AuthContext } from "@/auth/authProvider";
import VerifiedAuthMainLayout from "@/AuthVerifiedLayout/VerifiedAuthMainLayout";
import React, { useContext } from "react";
import LandingPage from "../(AuthUnVerifiedLayout)/landingpage";

export default function TabLayout() {
  const { isAuthenticated } = useContext(AuthContext);

  return <>{isAuthenticated ? <VerifiedAuthMainLayout /> : <LandingPage />}</>;
}
