import { AuthContext } from "@/auth/authProvider";
import React, { useContext } from "react";
import LandingPage from "../(AuthUnVerifiedLayout)/landingpage";
import VerifiedAuthMainLayout from "../(AuthVerifiedLayout)/VerifiedAuthMainLayout";

export default function TabLayout() {
  const { isAuthenticated } = useContext(AuthContext);

  return <>{isAuthenticated ? <VerifiedAuthMainLayout /> : <LandingPage />}</>;
}
