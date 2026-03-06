import { NavLink, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, ChevronRight } from 'lucide-react';
import { getApplications } from '../data/mockData';

const STATUS_STAGES = ['Under Review', 'Pending Documents', 'KYB In Progress', 'Financial Verification', 'Approved', 'Offer Sent', 'Offer Accepted', 'Contract Out', 'Funded', 'Declined'];

export default function Sidebar() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentStatus = searchParams.get('status');
  
  const allApps = getApplications();
  const count = allApps.length;

  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar-brand" style={{ padding: '24px 24px 12px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px', cursor: 'pointer' }} onClick={() => window.location.href='/'}>
        <img src="/uncia-logo.svg" alt="Uncia Logo" style={{ maxWidth: '140px', display: 'block' }} />
        <div className="sidebar-brand-text" style={{ marginLeft: '4px' }}>
          <span className="sidebar-brand-sub">Underwriting Portal</span>
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
          <LayoutDashboard size={18} className="sidebar-link-icon" />
          Dashboard
        </NavLink>

        <NavLink
          to="/applications"
          className={({ isActive }) => `sidebar-link ${isActive && !currentStatus ? 'active' : ''}`}
        >
          <FileText size={18} className="sidebar-link-icon" />
          Applications
          <span className="sidebar-link-badge">{count}</span>
        </NavLink>

        {/* Child Items */}
        <div className="sidebar-sub-menu">
          {STATUS_STAGES.map(status => {
            const stageCount = allApps.filter(a => a.status === status).length;
            if (stageCount === 0) return null;
            return (
              <Link
                key={status}
                to={`/applications?status=${encodeURIComponent(status)}`}
                className={`sidebar-sub-link ${currentStatus === status ? 'active' : ''}`}
              >
                <ChevronRight size={14} className="sidebar-sub-icon" />
                <span className="sidebar-sub-text">{status}</span>
                <span className="sidebar-sub-count">{stageCount}</span>
              </Link>
            );
          })}
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
