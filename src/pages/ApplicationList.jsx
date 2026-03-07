import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, ChevronRight } from 'lucide-react';
import { getApplications } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';

const STATUS_FILTERS = ['All', 'Under Review', 'Pending Documents', 'KYB In Progress', 'Financial Verification', 'Approved', 'Offer Sent', 'Offer Accepted', 'Contract Out', 'Funded', 'Rejected', 'Expired'];

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
  const [searchParams, setSearchParams] = useSearchParams();
  const urlStatus = searchParams.get('status');
  
  const allApps = getApplications();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState(urlStatus || 'All');

  useEffect(() => {
    setStatusFilter(urlStatus || 'All');
  }, [urlStatus]);

  const handleStatusChange = (s) => {
    setStatusFilter(s);
    if (s === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ status: s });
    }
  };
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
    return list.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt));
  }, [allApps, search, statusFilter]);

  // Reset to first page when filters change
  useMemo(() => setCurrentPage(1), [search, statusFilter]);

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedApps = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, currentPage]);

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
              onClick={() => handleStatusChange(s)}
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
            {paginatedApps.map((app) => (
              <tr key={app.id} onClick={() => navigate(`/applications/${app.id}`)}>
                <td><span className="table-id">{app.id}</span></td>
                <td>
                  <div className="table-applicant">
                    <span className="table-applicant-name">{app.applicant.name || app.business?.legalName || 'N/A'}</span>
                    <span className="table-applicant-email">{app.applicant.email || 'N/A'}</span>
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

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem', borderTop: '1px solid var(--border-color)', background: 'var(--bg-secondary)' }}>
            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-secondary)' }}>
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filtered.length)} of {filtered.length} entries
            </span>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                style={{ padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: currentPage === 1 ? 'var(--bg-card)' : '#fff', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.6 : 1 }}
              >
                Previous
              </button>
              <div style={{ display: 'flex', alignItems: 'center', padding: '0 0.5rem', fontSize: 'var(--font-size-sm)', fontWeight: 500 }}>
                Page {currentPage} of {totalPages}
              </div>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                style={{ padding: '0.4rem 0.8rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: currentPage === totalPages ? 'var(--bg-card)' : '#fff', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', opacity: currentPage === totalPages ? 0.6 : 1 }}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
