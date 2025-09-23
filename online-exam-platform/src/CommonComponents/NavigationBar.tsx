import React from 'react';
import { NavLink } from 'react-router-dom'; // or use your routing library

interface NavItem {
  label: string;
  route: string;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;          // optional for styling
  activeClassName?: string;    // optional active link style
}

const NavBar: React.FC<NavBarProps> = ({ items, className = '', activeClassName = 'active' }) => {
  return (
    <nav className={className}>
      <ul style={{ display: 'flex', listStyle: 'none', gap: '1rem', padding: 0 }}>
        {items.map(({ label, route }) => (
          <li key={route}>
            <NavLink
              to={route}
              className={({ isActive }) => (isActive ? activeClassName : '')}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
