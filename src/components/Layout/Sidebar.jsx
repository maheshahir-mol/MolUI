import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Download, Airplay, SendHorizontal } from 'lucide-react';
import './Sidebar.scss';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <Home size={20} />
          <span>Home</span>
        </NavLink>
        <NavLink to="/docs" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <BookOpen size={20} />
          <span>Docs</span>
        </NavLink>
        <NavLink to="/downloads" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <Download size={20} />
          <span>Downloads</span>
        </NavLink>
        <NavLink to="/editorPage" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <Airplay size={20} />
          <span>CKEditor Demo</span>
        </NavLink>
        <NavLink to="/sendEmailTemplate" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
          <SendHorizontal size={20} />
          <span>Send Email Template</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
