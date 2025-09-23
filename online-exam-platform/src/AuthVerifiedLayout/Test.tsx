import AuthVerifiedLayout from "./AuthVerifiedLayout";

const user = {
  name: "Jane Doe",
  email: "jane@example.com",
  avatarUrl: "https://i.pravatar.cc/150?img=32",
};

const sideMenuItems = [
  { label: "Dashboard", path: "/user/dashboard" },
  { label: "Profile", path: "/user/dashboard" },
  { label: "Settings", path: "/user/dashboard" },
];

function UserLayout() {
  const handleLogout = () => {
    alert("Logout clicked");
  };

  return (
    <AuthVerifiedLayout
      companyName="ExamPro"
      user={user}
      notificationCount={3}
      onLogout={handleLogout}
      sideMenuItems={sideMenuItems}
    />
  );
}

export default UserLayout;
