import React, { useState, useRef, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./AuthVerifiedLayout.css";

interface User {
  name: string;
  email: string;
  avatarUrl: string;
}

interface AuthVerifiedLayoutProps {
  companyName: string;
  user: User;
  notificationCount: number;
  onLogout: () => void;
  sideMenuItems: { path:string; label: string; icon?: React.ReactNode; onClick?: () => void }[];
  
}

const AuthVerifiedLayout: React.FC<AuthVerifiedLayoutProps> = ({
  companyName,
  user,
  notificationCount,
  onLogout,
  sideMenuItems,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate()
  const [expandedMenus, setExpandedMenus] = useState<{ [key: number]: boolean }>({});

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMenuItemClick = (path:string,onClick?: () => void) => {
     navigate(path)
    if (onClick) {
      onClick(
      );
    }
    if (sidebarOpen && window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };
  const toggleSubMenu = (index: number) => {
  setExpandedMenus((prev) => ({
    ...prev,
    [index]: !prev[index],
  }));
};

  return (
    <div className="layout">
      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        {/* <nav className="side-menu">
          {sideMenuItems.map(({ label,path, icon, onClick }, i) => (
            <button
              key={i}
              onClick={() => handleMenuItemClick(path,onClick)}
              className="side-menu-item"
              type="button"
            >
              {icon && <span className="side-menu-icon">{icon}</span>}
              {label}
            </button>
          ))}
        </nav> */}
        <nav className="side-menu">
  {sideMenuItems.map(({ label, path, icon, onClick, subMenu }:any, i) => {
    const hasSubMenu = subMenu && subMenu.length > 0;
    const isExpanded = expandedMenus[i];

    return (
      <div key={i}>
        <button
          onClick={() => {
            if (hasSubMenu) {
              toggleSubMenu(i);
            } else {
              handleMenuItemClick(path || "", onClick);
            }
          }}
          className="side-menu-item"
          type="button"
        >
          {icon && <span className="side-menu-icon">{icon}</span>}
          <span>{label}</span>
          {hasSubMenu && (
            <span className={`submenu-arrow ${isExpanded ? "expanded" : ""}`}>
              &gt;
            </span>
          )}
        </button>

        {hasSubMenu && isExpanded && (
          <div className="submenu">
            {subMenu!.map(({ label, path, icon, onClick }:any, j:any) => (
              <button
                key={j}
                onClick={() => handleMenuItemClick(path || "", onClick)}
                className="side-menu-subitem"
                type="button"
              >
                {icon && <span className="side-menu-icon">{icon}</span>}
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  })}
</nav>

      </aside>
      <div className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="sidebar-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
            >
              <svg
                className="icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            <div className="company-name">{companyName}</div>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
              />
              <div className="search-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="topbar-right">
            <div className="notification-container">
              <button
                type="button"
                className="notification-button"
                aria-label="Notifications"
              >
                <svg
                  className="icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                {notificationCount > 0 && (
                  <span className="notification-count">{notificationCount}</span>
                )}
              </button>
            </div>
            <div className="user-menu" ref={dropdownRef}>
              <button
                className="user-button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-haspopup="true"
                aria-expanded={dropdownOpen}
              >
                <img
                  className="user-avatar"
                  src={user.avatarUrl}
                  alt={user.name}
                />
                <span className="user-name">{user.name}</span>
                <svg
                  className={`icon dropdown-icon ${dropdownOpen ? "open" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {dropdownOpen && (
                <div
                  className="user-dropdown"
                  role="menu"
                  aria-orientation="vertical"
                >
                  <div className="user-info">
                    <div className="user-info-name">{user.name}</div>
                    <div className="user-info-email">{user.email}</div>
                  </div>
                  <button
                    onClick={onLogout}
                    className="logout-button"
                    role="menuitem"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="content-area">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AuthVerifiedLayout;

