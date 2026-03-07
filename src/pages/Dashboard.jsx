import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BarChart3, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  TrendingUp,
  DollarSign
} from 'lucide-react';
import { getApplications } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';

function cur(n) {
  if (n == null) return '—';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);
}

function fmtDate(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function Dashboard() {
  const navigate = useNavigate();
  const allApps = getApplications();

  // Metrics Logic
  const metrics = useMemo(() => {
    const totalApps = allApps.length;
    const underReview = allApps.filter(a => ['Under Review', 'Pending Documents', 'KYB In Progress', 'Financial Verification'].includes(a.status)).length;
    const totalFundedAmount = allApps.filter(a => a.status === 'Funded').reduce((acc, a) => acc + a.loan.amount, 0);
    const approvedOrFunded = allApps.filter(a => ['Approved', 'Offer Sent', 'Offer Accepted', 'Contract Out', 'Funded'].includes(a.status)).length;
    
    // Approval Rate calculation
    const totalDecisioned = allApps.filter(a => ['Approved', 'Offer Sent', 'Offer Accepted', 'Contract Out', 'Funded', 'Rejected'].includes(a.status)).length;
    const approvalRate = totalDecisioned === 0 ? 0 : Math.round((approvedOrFunded / totalDecisioned) * 100);

    return { totalApps, underReview, totalFundedAmount, approvalRate };
  }, [allApps]);

  // Priority Applications (Pending or Needs Review)
  const priorityApps = useMemo(() => {
    return allApps
      .filter(a => ['Under Review', 'KYB In Progress', 'Financial Verification', 'Pending Documents'].includes(a.status))
      .sort((a, b) => new Date(a.submittedAt) - new Date(b.submittedAt)) // Oldest first (needs attention)
      .slice(0, 5); // Just top 5
  }, [allApps]);

  const recentFunded = useMemo(() => {
    return allApps
      .filter(a => ['Funded', 'Contract Out', 'Offer Accepted'].includes(a.status))
      .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt)) 
      .slice(0, 5);
  }, [allApps]);

  return (
    <div className="fade-in-up">
      <div className="page-header">
        <div>
          <div className="page-header-left">
            <h1 className="page-title">Dashboard Overview</h1>
          </div>
          <p className="page-subtitle">Welcome back, Sarah. Here's what's happening today.</p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="stat-cards">
        <div 
          className="stat-card" 
          onClick={() => navigate('/applications')} 
          style={{ cursor: 'pointer' }}
          title="View all applications"
        >
          <div className="stat-card-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FileText size={14} style={{ color: 'var(--accent-start)' }}/> Total Applications
          </div>
          <div className="stat-card-value">{metrics.totalApps}</div>
          <div className="stat-card-sub" style={{ color: 'var(--success)' }}>+12% this month</div>
        </div>
        
        <div className="stat-card">
          <div className="stat-card-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Clock size={14} style={{ color: '#d97706' }}/> Action Required
          </div>
          <div className="stat-card-value">{metrics.underReview}</div>
          <div className="stat-card-sub">Waiting on Underwriter</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <TrendingUp size={14} style={{ color: 'var(--success)' }}/> Approval Rate
          </div>
          <div className="stat-card-value">{metrics.approvalRate}%</div>
          <div className="stat-card-sub">Of decisioned apps</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <DollarSign size={14} style={{ color: 'var(--success)' }}/> Volume Funded
          </div>
          <div className="stat-card-value">{cur(metrics.totalFundedAmount)}</div>
          <div className="stat-card-sub">Year to Date</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-xl)', marginTop: 'var(--space-xl)' }}>
        
        {/* Priority Queue Pipeline */}
        <div className="card">
          <div className="card-title">
            <AlertTriangle size={14} className="card-title-icon" /> 
            Priority Queue
          </div>
          {priorityApps.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <CheckCircle size={32} style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <p>Inbox zero! All immediate files cleared.</p>
            </div>
          ) : (
            <div className="data-table-container" style={{ boxShadow: 'none', border: 'none' }}>
              <table className="data-table">
                <tbody>
                  {priorityApps.map(app => (
                    <tr key={app.id} onClick={() => navigate(`/applications/${app.id}`)}>
                      <td style={{ padding: '0.8rem 0' }}>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{app.applicant.name || app.business?.legalName}</div>
                        <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>{app.id} • {cur(app.loan.amount)}</div>
                      </td>
                      <td style={{ padding: '0.8rem 0', textAlign: 'right' }}>
                        <StatusBadge status={app.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Closing Soon Pipeline */}
        <div className="card">
          <div className="card-title">
            <CheckCircle size={14} className="card-title-icon" /> 
            Recent Closings
          </div>
          {recentFunded.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              <p>No recent closing activity this week.</p>
            </div>
          ) : (
            <div className="data-table-container" style={{ boxShadow: 'none', border: 'none' }}>
              <table className="data-table">
                <tbody>
                  {recentFunded.map(app => (
                    <tr key={app.id} onClick={() => navigate(`/applications/${app.id}`)}>
                      <td style={{ padding: '0.8rem 0' }}>
                        <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{app.applicant.name || app.business?.legalName}</div>
                        <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>{app.id} • {cur(app.loan.amount)}</div>
                      </td>
                      <td style={{ padding: '0.8rem 0', textAlign: 'right' }}>
                         <StatusBadge status={app.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
