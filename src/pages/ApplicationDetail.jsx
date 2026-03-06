import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, Calendar, Mail, Phone, MapPin, Building2, User,
  FileText, DollarSign, Clock, ShieldCheck, BarChart3, CheckCircle,
  XCircle, AlertTriangle, Package, ChevronRight,
} from 'lucide-react';
import { getApplicationById } from '../data/mockData';
import StatusBadge from '../components/StatusBadge';

/* ── Helpers ──────────────────────────────── */
function fmt(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function fmtDate(iso) {
  if (!iso) return '—';
  if (iso.length === 10) {
    const [y, m, d] = iso.split('-');
    return new Date(y, m - 1, d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function cur(n) {
  if (n == null) return '—';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: n % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(n);
}

function fmtPhone(str) {
  if (!str) return '—';
  const cleaned = ('' + str).replace(/\D/g, '');
  if (cleaned.length === 10) return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  return str;
}

function fmtEin(str) {
  if (!str) return '—';
  const cleaned = ('' + str).replace(/\D/g, '');
  if (cleaned.length === 9) return `${cleaned.slice(0, 2)}-${cleaned.slice(2)}`;
  return str;
}

function fmtPct(n) {
  if (n == null) return '—';
  return new Intl.NumberFormat('en-US', { style: 'percent', minimumFractionDigits: 2, maximumFractionDigits: 3 }).format(n / 100);
}

/* ── Tab Definitions ──────────────────────── */
const TABS = [
  { key: 'overview', label: 'Overview', icon: BarChart3 },
  { key: 'thirdparty', label: 'Third-Party Data', icon: ShieldCheck },
  { key: 'documents', label: 'Documents', icon: FileText },
  { key: 'offers', label: 'Offers', icon: DollarSign },
];

/* ══════════════════════════════════════════════
   Overview Tab
   ══════════════════════════════════════════════ */
function OverviewTab({ app }) {
  return (
    <div className="tab-content">
      {/* Stat Cards */}
      <div className="stat-cards">
        <div className="stat-card">
          <div className="stat-card-label">Loan Amount</div>
          <div className="stat-card-value">{cur(app.loan.amount)}</div>
          <div className="stat-card-sub">{app.loan.term} month term</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Documents</div>
          <div className="stat-card-value">{app.documents.length}</div>
          <div className="stat-card-sub">{app.documents.filter(d => d.status === 'Verified').length} verified</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Offers</div>
          <div className="stat-card-value">{app.offers.length}</div>
          <div className="stat-card-sub">{app.offers.length > 0 ? app.offers[0].status : 'None yet'}</div>
        </div>
        <div className="stat-card">
          <div className="stat-card-label">Days Since Submission</div>
          <div className="stat-card-value">
            {Math.max(1, Math.ceil((new Date('2026-03-06') - new Date(app.submittedAt)) / 86400000))}
          </div>
          <div className="stat-card-sub">Submitted {fmtDate(app.submittedAt)}</div>
        </div>
      </div>

      <div className="cards-grid">
        {/* Applicant Info */}
        <div className="card">
          <div className="card-title"><User size={14} className="card-title-icon" /> Applicant Information</div>
          <div className="card-row"><span className="card-row-label">Name</span><span className="card-row-value">{app.applicant.name}</span></div>
          <div className="card-row"><span className="card-row-label">Email</span><span className="card-row-value">{app.applicant.email}</span></div>
          <div className="card-row"><span className="card-row-label">Phone</span><span className="card-row-value">{fmtPhone(app.applicant.phone)}</span></div>
          <div className="card-row"><span className="card-row-label">Address</span><span className="card-row-value">{app.applicant.address}</span></div>
        </div>

        {/* Business Info */}
        <div className="card">
          <div className="card-title"><Building2 size={14} className="card-title-icon" /> Business Information</div>
          <div className="card-row"><span className="card-row-label">Legal Name</span><span className="card-row-value">{app.business.legalName}</span></div>
          {app.business.dba && <div className="card-row"><span className="card-row-label">DBA</span><span className="card-row-value">{app.business.dba}</span></div>}
          <div className="card-row"><span className="card-row-label">EIN</span><span className="card-row-value mono">{fmtEin(app.business.ein)}</span></div>
          <div className="card-row"><span className="card-row-label">Entity</span><span className="card-row-value">{app.business.entityType}</span></div>
          <div className="card-row"><span className="card-row-label">Industry</span><span className="card-row-value">{app.business.industry}</span></div>
          <div className="card-row"><span className="card-row-label">Established</span><span className="card-row-value">{fmtDate(app.business.dateEstablished)}</span></div>
          <div className="card-row"><span className="card-row-label">Revenue</span><span className="card-row-value">{cur(app.business.annualRevenue)}</span></div>
          <div className="card-row"><span className="card-row-label">Employees</span><span className="card-row-value">{app.business.numberOfEmployees?.toLocaleString('en-US')}</span></div>
        </div>

        {/* Loan Details */}
        <div className="card">
          <div className="card-title"><DollarSign size={14} className="card-title-icon" /> Loan Details</div>
          <div className="card-row"><span className="card-row-label">Purpose</span><span className="card-row-value">{app.loan.purpose}</span></div>
          <div className="card-row"><span className="card-row-label">Amount</span><span className="card-row-value">{cur(app.loan.amount)}</span></div>
          <div className="card-row"><span className="card-row-label">Term</span><span className="card-row-value">{app.loan.term} months</span></div>
          {app.loan.collateralType && <div className="card-row"><span className="card-row-label">Collateral</span><span className="card-row-value">{app.loan.collateralType}</span></div>}
        </div>

        {/* Timeline */}
        <div className="card">
          <div className="card-title"><Clock size={14} className="card-title-icon" /> Activity Timeline</div>
          <div className="timeline">
            {[...app.timeline].reverse().map((item, i) => (
              <div className="timeline-item" key={i}>
                <div className="timeline-dot" />
                <div className="timeline-event">{item.event}</div>
                <div className="timeline-meta">
                  <span>{fmt(item.date)}</span>
                  <span>• {item.actor}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   Third-Party Data Tab
   ══════════════════════════════════════════════ */
function ThirdPartyTab({ app }) {
  const { kyb, bureau } = app.thirdParty;

  return (
    <div className="tab-content">
      {/* KYB Section */}
      <div className="vendor-card">
        <div className="vendor-card-header">
          <div className="vendor-card-provider">
            <div className="vendor-card-provider-icon kyb"><ShieldCheck size={18} /></div>
            <div>
              <div className="vendor-card-provider-name">{kyb?.provider || 'KYB Verification'}</div>
              {kyb && <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>Know Your Business</div>}
            </div>
          </div>
          {kyb ? <StatusBadge status={kyb.status} /> : <StatusBadge status="N/A" />}
        </div>
        <div className="vendor-card-body">
          {kyb && kyb.status !== 'In Progress' ? (
            <>
              <div className="vendor-score">
                <div className="vendor-score-value">{kyb.riskScore ?? '—'}</div>
                <div className="vendor-score-label">Risk Score</div>
                <div className="vendor-score-sub"><StatusBadge status={kyb.riskLevel || 'Pending'} /></div>
              </div>
              <div className="vendor-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
                <div className="vendor-field">
                  <div className="vendor-field-label">Business Verified</div>
                  <div className="vendor-field-value">
                    {kyb.businessVerified ? <><CheckCircle size={14} style={{ color: 'var(--success)' }} /> Yes</> : <><XCircle size={14} style={{ color: 'var(--error)' }} /> No</>}
                  </div>
                </div>
                <div className="vendor-field">
                  <div className="vendor-field-label">EIN Match</div>
                  <div className="vendor-field-value">
                    {kyb.einMatch ? <><CheckCircle size={14} style={{ color: 'var(--success)' }} /> Confirmed</> : <><XCircle size={14} style={{ color: 'var(--error)' }} /> Mismatch</>}
                  </div>
                </div>
                <div className="vendor-field">
                  <div className="vendor-field-label">SOS Status</div>
                  <div className="vendor-field-value">{kyb.sosStatus}</div>
                </div>
                <div className="vendor-field" style={{ gridColumn: '1 / -1' }}>
                  <div className="vendor-field-label">SOS Registration Data</div>
                  <div className="vendor-field-value">{kyb.sosDetails || '—'}</div>
                </div>
                <div className="vendor-field" style={{ gridColumn: '1 / -1' }}>
                  <div className="vendor-field-label">Corporate Structure</div>
                  <div className="vendor-field-value">{kyb.corporateStructure || '—'}</div>
                </div>
                <div className="vendor-field" style={{ gridColumn: '1 / -1' }}>
                  <div className="vendor-field-label">Beneficial Ownership</div>
                  <div className="vendor-field-value">{kyb.beneficialOwners?.join(', ') || '—'}</div>
                </div>

                <div className="vendor-field">
                  <div className="vendor-field-label">Sanctions (OFAC/UN/EU)</div>
                  <div className="vendor-field-value">
                    {kyb.sanctionsClear ? <><CheckCircle size={14} style={{ color: 'var(--success)' }} /> Clear</> : <><AlertTriangle size={14} style={{ color: 'var(--warning)' }} /> Flagged</>}
                  </div>
                </div>
                <div className="vendor-field">
                  <div className="vendor-field-label">PEP Lists</div>
                  <div className="vendor-field-value">
                    {kyb.pepClear ? <><CheckCircle size={14} style={{ color: 'var(--success)' }} /> Clear</> : <><AlertTriangle size={14} style={{ color: 'var(--warning)' }} /> Found</>}
                  </div>
                </div>
                <div className="vendor-field">
                  <div className="vendor-field-label">Adverse Media</div>
                  <div className="vendor-field-value">
                    {kyb.adverseMediaClear ? <><CheckCircle size={14} style={{ color: 'var(--success)' }} /> Clear</> : <><AlertTriangle size={14} style={{ color: 'var(--warning)' }} /> Present</>}
                  </div>
                </div>
                <div className="vendor-field">
                  <div className="vendor-field-label">Regulatory Actions</div>
                  <div className="vendor-field-value">
                    {kyb.regulatoryActionsClear ? <><CheckCircle size={14} style={{ color: 'var(--success)' }} /> Clear</> : <><AlertTriangle size={14} style={{ color: 'var(--warning)' }} /> Flagged</>}
                  </div>
                </div>

                <div className="vendor-field">
                  <div className="vendor-field-label">UCC & Liens</div>
                  <div className="vendor-field-value">{kyb.uccAndLiens || '—'}</div>
                </div>
                <div className="vendor-field">
                  <div className="vendor-field-label">Bankruptcy Records</div>
                  <div className="vendor-field-value">
                    {kyb.bankruptcyClear ? <><CheckCircle size={14} style={{ color: 'var(--success)' }} /> Clear</> : <><AlertTriangle size={14} style={{ color: 'var(--warning)' }} /> Found</>}
                  </div>
                </div>
                <div className="vendor-field">
                  <div className="vendor-field-label">Court Judgments</div>
                  <div className="vendor-field-value">
                    {kyb.judgmentsClear ? <><CheckCircle size={14} style={{ color: 'var(--success)' }} /> Clear</> : <><AlertTriangle size={14} style={{ color: 'var(--warning)' }} /> Found</>}
                  </div>
                </div>
                <div className="vendor-field">
                  <div className="vendor-field-label">Financial Stability</div>
                  <div className="vendor-field-value">{kyb.financialStabilityScore || '—'}</div>
                </div>

                <div className="vendor-field" style={{ gridColumn: '1 / -1', marginTop: 'var(--space-md)', paddingTop: 'var(--space-sm)', borderTop: '1px solid var(--border-color)' }}>
                  <div className="vendor-field-label">Verified At</div>
                  <div className="vendor-field-value">{fmt(kyb.verifiedAt)}</div>
                </div>
                <div className="vendor-field" style={{ gridColumn: '1 / -1' }}>
                  <div className="vendor-field-label">Flags</div>
                  <div className="vendor-field-value">{kyb.flags?.length > 0 ? kyb.flags.join(', ') : 'None'}</div>
                </div>
              </div>
            </>
          ) : kyb && kyb.status === 'In Progress' ? (
            <div className="vendor-na">
              <div className="vendor-na-icon"><Clock size={40} /></div>
              <p>KYB verification is currently in progress…</p>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)', marginTop: 'var(--space-xs)' }}>Results will appear here once the verification completes.</p>
            </div>
          ) : (
            <div className="vendor-na">
              <div className="vendor-na-icon"><ShieldCheck size={40} /></div>
              <p>KYB verification data missing.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   Documents Tab
   ══════════════════════════════════════════════ */
function DocumentsTab({ app }) {
  if (app.documents.length === 0) {
    return (
      <div className="tab-content">
        <div className="empty-state">
          <div className="empty-state-icon"><Package size={48} /></div>
          <div className="empty-state-title">No Documents</div>
          <div className="empty-state-desc">No documents have been uploaded for this application.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="tab-content">
      <div className="data-table-container">
        <table className="docs-table">
          <thead>
            <tr>
              <th>Document</th>
              <th>Type</th>
              <th>Uploaded</th>
              <th>Size</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {app.documents.map((doc, i) => (
              <tr key={i}>
                <td>
                  <div className="doc-name">
                    <FileText size={16} className="doc-icon" />
                    {doc.name}
                  </div>
                </td>
                <td>{doc.type}</td>
                <td style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>{fmtDate(doc.uploadedAt)}</td>
                <td style={{ color: 'var(--text-muted)', fontSize: 'var(--font-size-xs)' }}>{doc.size}</td>
                <td><StatusBadge status={doc.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   Offers Tab
   ══════════════════════════════════════════════ */
function OffersTab({ app }) {
  if (app.offers.length === 0) {
    return (
      <div className="tab-content">
        <div className="empty-state">
          <div className="empty-state-icon"><DollarSign size={48} /></div>
          <div className="empty-state-title">No Offers Generated</div>
          <div className="empty-state-desc">Offers will appear here once the review process advances.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="tab-content">
      <div className="data-table-container">
        <table className="docs-table data-table">
          <thead>
            <tr>
              <th>Offer ID</th>
              <th>Rate</th>
              <th>Term</th>
              <th>Monthly Payment</th>
              <th>Total Amount</th>
              <th>Generated</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {app.offers.map((offer) => (
              <tr key={offer.id}>
                <td>
                  <div className="table-id" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <DollarSign size={14} style={{ color: 'var(--text-muted)' }} />
                    {offer.id}
                  </div>
                </td>
                <td style={{ fontWeight: 600 }}>{fmtPct(offer.rate)}</td>
                <td>{offer.term} mo</td>
                <td>{cur(offer.monthlyPayment)}</td>
                <td style={{ fontWeight: 500 }}>{cur(offer.totalAmount)}</td>
                <td style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-secondary)' }}>{fmtDate(offer.generatedAt)}</td>
                <td><StatusBadge status={offer.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   Application Detail — Main Component
   ══════════════════════════════════════════════ */
export default function ApplicationDetail() {
  const { id } = useParams();
  const app = getApplicationById(id);
  const [activeTab, setActiveTab] = useState('overview');

  if (!app) {
    return (
      <div className="fade-in-up">
        <div className="breadcrumb">
          <Link to="/" className="breadcrumb-link"><ArrowLeft size={14} /> Applications</Link>
        </div>
        <div className="empty-state">
          <div className="empty-state-icon"><XCircle size={48} /></div>
          <div className="empty-state-title">Application Not Found</div>
          <div className="empty-state-desc">The application ID "{id}" doesn't exist.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in-up">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <Link to="/" className="breadcrumb-link"><ArrowLeft size={14} /> Applications</Link>
        <ChevronRight size={14} className="breadcrumb-sep" />
        <span className="breadcrumb-current">{app.id}</span>
      </div>

      {/* Detail Header */}
      <div className="detail-header">
        <div className="detail-header-left">
          <h1>{app.applicant.name}</h1>
          <div className="detail-header-meta">
            <span className="detail-meta-item"><FileText size={12} /> {app.id}</span>
            <span className="detail-meta-item"><Calendar size={12} /> {fmtDate(app.submittedAt)}</span>
          </div>
        </div>
        <div className="detail-header-right">
          <StatusBadge status={app.status} />
        </div>
      </div>

      {/* Tab Bar */}
      <div className="tab-bar">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const count = tab.key === 'documents' ? app.documents.length
                      : tab.key === 'offers' ? app.offers.length
                      : null;
          return (
            <button
              key={tab.key}
              className={`tab-item ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              <Icon size={15} />
              {tab.label}
              {count !== null && <span className="tab-count">{count}</span>}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && <OverviewTab app={app} />}
      {activeTab === 'thirdparty' && <ThirdPartyTab app={app} />}
      {activeTab === 'documents' && <DocumentsTab app={app} />}
      {activeTab === 'offers' && <OffersTab app={app} />}
    </div>
  );
}
