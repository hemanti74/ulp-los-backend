import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Settings, ShieldCheck } from 'lucide-react';
import { getApplications } from '../data/mockData';

export default function Sidebar() {
  const count = getApplications().length;

  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">
          <ShieldCheck size={22} />
        </div>
        <div className="sidebar-brand-text">
          <span className="sidebar-brand-name">LoanOS</span>
          <span className="sidebar-brand-sub">Underwriter</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Main Menu</div>

        <NavLink
          to="/"
          end
          className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
        >
          <FileText size={18} className="sidebar-link-icon" />
          Applications
          <span className="sidebar-link-badge">{count}</span>
        </NavLink>

        <div className="sidebar-link" style={{ opacity: 0.45, cursor: 'default' }}>
          <LayoutDashboard size={18} className="sidebar-link-icon" />
          Dashboard
        </div>

        <div className="sidebar-link" style={{ opacity: 0.45, cursor: 'default' }}>
          <Settings size={18} className="sidebar-link-icon" />
          Settings
        </div>
      </nav>

      {/* Footer / User */}
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-avatar">SJ</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">Sarah Johnson</div>
            <div className="sidebar-user-role">Senior Underwriter</div>
          </div>
        </div>
      </div>
    </aside>
  );
}
