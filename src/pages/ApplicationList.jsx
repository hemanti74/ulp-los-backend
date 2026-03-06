import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';
import { getApplications } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';

const STATUS_FILTERS = ['All', 'Under Review', 'Pending Documents', 'KYB In Progress', 'Approved', 'Declined', 'Offer Sent'];

function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatCurrency(n) {
  if (n == null) return '—';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: n % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(n);
}

export default function ApplicationList() {
  const navigate = useNavigate();
  const allApps = getApplications();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = useMemo(() => {
    let list = allApps;
    if (statusFilter !== 'All') {
      list = list.filter((a) => a.status === statusFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.id.toLowerCase().includes(q) ||
          a.applicant.name.toLowerCase().includes(q) ||
          (a.business?.legalName || '').toLowerCase().includes(q) ||
          a.applicant.email.toLowerCase().includes(q)
      );
    }
    return list;
  }, [allApps, search, statusFilter]);

  return (
    <div className="fade-in-up">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div className="page-header-left">
            <h1 className="page-title">Applications</h1>
            <span className="page-badge">{allApps.length}</span>
          </div>
          <p className="page-subtitle">Review and manage submitted loan applications</p>
        </div>
      </div>

      {/* Controls */}
      <div className="controls-bar">
        <div className="search-box">
          <Search size={16} className="search-box-icon" />
          <input
            type="text"
            placeholder="Search by name, ID, or business…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="filter-pills">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              className={`filter-pill ${statusFilter === s ? 'active' : ''}`}
              onClick={() => setStatusFilter(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="data-table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Applicant</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Submitted</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((app) => (
              <tr key={app.id} onClick={() => navigate(`/applications/${app.id}`)}>
                <td><span className="table-id">{app.id}</span></td>
                <td>
                  <div className="table-applicant">
                    <span className="table-applicant-name">{app.applicant.name}</span>
                    <span className="table-applicant-email">{app.applicant.email}</span>
                  </div>
                </td>
                <td className="table-amount">{formatCurrency(app.loan.amount)}</td>
                <td><StatusBadge status={app.status} /></td>
                <td className="table-date">{formatDate(app.submittedAt)}</td>
                <td><ChevronRight size={16} className="table-arrow" /></td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                  No applications found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
