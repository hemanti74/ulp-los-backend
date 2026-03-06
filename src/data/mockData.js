/* ═══════════════════════════════════════════════════════
   Mock Data — Simulated Loan Applications for Underwriters
   ═══════════════════════════════════════════════════════ */

const applications = [
  {
    id: 'APP-2026-001',
    type: 'business',
    status: 'Under Review',
    submittedAt: '2026-03-04T14:32:00Z',
    applicant: {
      name: 'Jane Smith',
      email: 'jane@acmesolutions.com',
      phone: '(555) 987-1234',
      address: '456 Commerce Drive, San Francisco, CA 94105',
    },
    business: {
      legalName: 'Acme Solutions LLC',
      dba: 'Acme Co',
      ein: '12-3456789',
      entityType: 'LLC',
      industry: 'Technology',
      stateOfIncorporation: 'CA',
      dateEstablished: '2019-03-10',
      annualRevenue: 1200000,
      numberOfEmployees: 15,
    },
    loan: {
      purpose: 'Working Capital',
      amount: 250000,
      term: 60,
      collateralType: 'Equipment',
    },
    thirdParty: {
      kyb: {
        provider: 'KYB Verify Pro',
        status: 'Complete',
        verifiedAt: '2026-03-04T15:10:00Z',
        businessVerified: true,
        einMatch: true,
        sosStatus: 'Active / Good Standing',
        sosDetails: 'Filed 2019-03-10, ID: C1234567',
        beneficialOwners: ['Jane Smith (100%)'],
        sanctionsClear: true,
        pepClear: true,
        adverseMediaClear: true,
        uccAndLiens: '0 Active',
        bankruptcyClear: true,
        judgmentsClear: true,
        corporateStructure: 'Single Entity',
        regulatoryActionsClear: true,
        financialStabilityScore: '85/100 (Stable)',
        ofacClear: true,
        riskScore: 22,
        riskLevel: 'Low',
        flags: [],
      },
      plaid: {
        provider: 'Plaid',
        status: 'Connected',
        connectedAt: '2026-03-04T14:35:00Z',
        accountName: 'Business Checking ****4567',
        institution: 'Chase Bank',
        currentBalance: 85400,
        availableBalance: 85400,
        avgMonthlyRevenue: 125000,
        avgMonthlyExpenses: 95000,
        monthlyNetFlow: 30000,
        nsfCount90Days: 0,
        daysNegativeBalance: 0,
        revenueTrend: 'Growing (+15%)',
        flags: [],
      },
      bureau: {
        provider: 'Business Credit Bureau',
        status: 'Complete',
        pulledAt: '2026-03-04T15:12:00Z',
        businessCreditScore: 78,
        paydexyScore: 72,
        derogRecords: 0,
        liensJudgments: 0,
        tradeLines: 12,
        avgDaysBeyondTerms: 8,
        riskClass: 'Low Risk',
        recommendations: 'Eligible for standard terms.',
      },
    },
    documents: [
      { name: 'Articles_of_Organization.pdf', type: 'Formation Docs', uploadedAt: '2026-03-04T14:30:00Z', size: '2.4 MB', status: 'Verified' },
      { name: 'EIN_Letter.pdf', type: 'Tax ID', uploadedAt: '2026-03-04T14:30:00Z', size: '890 KB', status: 'Verified' },
      { name: 'Bank_Statements_Q4_2025.pdf', type: 'Bank Statement', uploadedAt: '2026-03-04T14:31:00Z', size: '5.1 MB', status: 'Under Review' },
      { name: 'PnL_2025.xlsx', type: 'Financial Statement', uploadedAt: '2026-03-04T14:31:00Z', size: '1.2 MB', status: 'Under Review' },
      { name: 'Drivers_License_Jane_Smith.jpg', type: 'Government ID', uploadedAt: '2026-03-04T14:32:00Z', size: '3.8 MB', status: 'Verified' },
    ],
    offers: [
      { id: 'OFR-001', rate: 7.25, term: 60, monthlyPayment: 4975, totalAmount: 298500, status: 'Pending Review', generatedAt: '2026-03-05T09:00:00Z' },
      { id: 'OFR-002', rate: 8.50, term: 48, monthlyPayment: 6150, totalAmount: 295200, status: 'Pending Review', generatedAt: '2026-03-05T09:00:00Z' },
    ],
    timeline: [
      { event: 'Application Submitted', date: '2026-03-04T14:32:00Z', actor: 'Applicant' },
      { event: 'Documents Uploaded', date: '2026-03-04T14:32:00Z', actor: 'Applicant' },
      { event: 'KYB Verification Initiated', date: '2026-03-04T15:00:00Z', actor: 'System' },
      { event: 'KYB Verification Complete', date: '2026-03-04T15:10:00Z', actor: 'KYB Verify Pro' },
      { event: 'Bureau Report Pulled', date: '2026-03-04T15:12:00Z', actor: 'System' },
      { event: 'Offers Generated', date: '2026-03-05T09:00:00Z', actor: 'System' },
      { event: 'Assigned to Underwriter', date: '2026-03-05T10:30:00Z', actor: 'System' },
    ],
  },
  {
    id: 'APP-2026-003',
    type: 'business',
    status: 'Pending Documents',
    submittedAt: '2026-03-05T16:45:00Z',
    applicant: {
      name: 'Michael Chen',
      email: 'michael@brightbyte.io',
      phone: '(555) 456-7890',
      address: '890 Innovation Way, Austin, TX 73301',
    },
    business: {
      legalName: 'BrightByte Inc.',
      dba: 'BrightByte',
      ein: '98-7654321',
      entityType: 'C-Corp',
      industry: 'Software & SaaS',
      stateOfIncorporation: 'DE',
      dateEstablished: '2021-06-15',
      annualRevenue: 3500000,
      numberOfEmployees: 42,
    },
    loan: {
      purpose: 'Expansion',
      amount: 500000,
      term: 84,
      collateralType: 'Accounts Receivable',
    },
    thirdParty: {
      kyb: {
        provider: 'KYB Verify Pro',
        status: 'Complete',
        verifiedAt: '2026-03-05T17:05:00Z',
        businessVerified: true,
        einMatch: true,
        sosStatus: 'Active / Good Standing',
        sosDetails: 'Filed 2021-06-15, ID: P9876543',
        beneficialOwners: ['Michael Chen (80%)', 'Emma Watson (20%)'],
        sanctionsClear: true,
        pepClear: true,
        adverseMediaClear: true,
        uccAndLiens: '1 Active (Equipment)',
        bankruptcyClear: true,
        judgmentsClear: true,
        corporateStructure: 'Subsidiary of TechHoldings',
        regulatoryActionsClear: true,
        financialStabilityScore: '92/100 (Strong)',
        ofacClear: true,
        riskScore: 15,
        riskLevel: 'Low',
        flags: [],
      },
      bureau: {
        provider: 'Business Credit Bureau',
        status: 'Pending',
        pulledAt: null,
        businessCreditScore: null,
        paydexyScore: null,
        riskClass: 'Pending',
        recommendations: 'Awaiting bureau response.',
      },
    },
    documents: [
      { name: 'Certificate_of_Incorporation.pdf', type: 'Formation Docs', uploadedAt: '2026-03-05T16:44:00Z', size: '1.9 MB', status: 'Verified' },
      { name: 'EIN_Confirmation.pdf', type: 'Tax ID', uploadedAt: '2026-03-05T16:44:00Z', size: '420 KB', status: 'Verified' },
    ],
    offers: [],
    timeline: [
      { event: 'Application Submitted', date: '2026-03-05T16:45:00Z', actor: 'Applicant' },
      { event: 'KYB Verification Initiated', date: '2026-03-05T17:00:00Z', actor: 'System' },
      { event: 'KYB Verification Complete', date: '2026-03-05T17:05:00Z', actor: 'KYB Verify Pro' },
      { event: 'Additional Documents Requested', date: '2026-03-05T18:00:00Z', actor: 'System' },
    ],
  },
  {
    id: 'APP-2026-004',
    type: 'business',
    status: 'KYB In Progress',
    submittedAt: '2026-03-06T08:10:00Z',
    applicant: {
      name: 'Laura Martinez',
      email: 'laura@greenleaffoods.com',
      phone: '(555) 321-9876',
      address: '1200 Farm Road, Portland, OR 97201',
    },
    business: {
      legalName: 'GreenLeaf Foods LLC',
      dba: 'GreenLeaf Organics',
      ein: '45-6789012',
      entityType: 'LLC',
      industry: 'Food & Beverage',
      stateOfIncorporation: 'OR',
      dateEstablished: '2017-09-01',
      annualRevenue: 850000,
      numberOfEmployees: 8,
    },
    loan: {
      purpose: 'Equipment Purchase',
      amount: 120000,
      term: 48,
      collateralType: 'Equipment',
    },
    thirdParty: {
      kyb: {
        provider: 'KYB Verify Pro',
        status: 'In Progress',
        verifiedAt: null,
        businessVerified: null,
        einMatch: null,
        sosStatus: 'Pending',
        sosDetails: null,
        beneficialOwners: null,
        sanctionsClear: null,
        pepClear: null,
        adverseMediaClear: null,
        uccAndLiens: null,
        bankruptcyClear: null,
        judgmentsClear: null,
        corporateStructure: null,
        regulatoryActionsClear: null,
        financialStabilityScore: null,
        ofacClear: null,
        riskScore: null,
        riskLevel: 'Pending',
        flags: [],
      },
      bureau: null,
    },
    documents: [
      { name: 'LLC_Operating_Agreement.pdf', type: 'Formation Docs', uploadedAt: '2026-03-06T08:09:00Z', size: '3.1 MB', status: 'Under Review' },
      { name: 'EIN_Letter.pdf', type: 'Tax ID', uploadedAt: '2026-03-06T08:09:00Z', size: '750 KB', status: 'Under Review' },
      { name: 'Bank_Statements_2025.pdf', type: 'Bank Statement', uploadedAt: '2026-03-06T08:09:00Z', size: '6.8 MB', status: 'Under Review' },
      { name: 'Tax_Return_2024.pdf', type: 'Tax Return', uploadedAt: '2026-03-06T08:10:00Z', size: '4.5 MB', status: 'Under Review' },
    ],
    offers: [],
    timeline: [
      { event: 'Application Submitted', date: '2026-03-06T08:10:00Z', actor: 'Applicant' },
      { event: 'Documents Uploaded', date: '2026-03-06T08:10:00Z', actor: 'Applicant' },
      { event: 'KYB Verification Initiated', date: '2026-03-06T08:15:00Z', actor: 'System' },
    ],
  },
  {
    id: 'APP-2026-006',
    type: 'business',
    status: 'Offer Sent',
    submittedAt: '2026-02-28T10:00:00Z',
    applicant: {
      name: 'Sarah Kim',
      email: 'sarah@precisionmfg.com',
      phone: '(555) 789-0123',
      address: '500 Industrial Pkwy, Detroit, MI 48201',
    },
    business: {
      legalName: 'Precision Manufacturing Corp',
      dba: null,
      ein: '67-8901234',
      entityType: 'S-Corp',
      industry: 'Manufacturing',
      stateOfIncorporation: 'MI',
      dateEstablished: '2012-01-20',
      annualRevenue: 4800000,
      numberOfEmployees: 65,
    },
    loan: {
      purpose: 'Equipment Purchase',
      amount: 750000,
      term: 72,
      collateralType: 'Real Estate',
    },
    thirdParty: {
      kyb: {
        provider: 'KYB Verify Pro',
        status: 'Complete',
        verifiedAt: '2026-02-28T10:30:00Z',
        businessVerified: true,
        einMatch: true,
        sosStatus: 'Active / Good Standing',
        sosDetails: 'Filed 2012-01-20, ID: M1029384',
        beneficialOwners: ['Sarah Kim (51%)', 'John Doe (49%)'],
        sanctionsClear: true,
        pepClear: true,
        adverseMediaClear: true,
        uccAndLiens: '0 Active',
        bankruptcyClear: true,
        judgmentsClear: true,
        corporateStructure: 'Single Entity',
        regulatoryActionsClear: true,
        financialStabilityScore: '95/100 (Strong)',
        ofacClear: true,
        riskScore: 12,
        riskLevel: 'Low',
        flags: [],
      },
      bureau: {
        provider: 'Business Credit Bureau',
        status: 'Complete',
        pulledAt: '2026-02-28T10:35:00Z',
        businessCreditScore: 85,
        paydexyScore: 80,
        derogRecords: 0,
        liensJudgments: 0,
        tradeLines: 24,
        avgDaysBeyondTerms: 3,
        riskClass: 'Low Risk',
        recommendations: 'Strong credit profile. Eligible for preferred terms.',
      },
    },
    documents: [
      { name: 'S-Corp_Certificate.pdf', type: 'Formation Docs', uploadedAt: '2026-02-28T09:58:00Z', size: '2.0 MB', status: 'Verified' },
      { name: 'EIN_Verification.pdf', type: 'Tax ID', uploadedAt: '2026-02-28T09:58:00Z', size: '680 KB', status: 'Verified' },
      { name: 'Audited_Financials_2025.pdf', type: 'Financial Statement', uploadedAt: '2026-02-28T09:59:00Z', size: '8.3 MB', status: 'Verified' },
      { name: 'Bank_Statements_6mo.pdf', type: 'Bank Statement', uploadedAt: '2026-02-28T09:59:00Z', size: '7.2 MB', status: 'Verified' },
      { name: 'Property_Appraisal.pdf', type: 'Collateral', uploadedAt: '2026-02-28T10:00:00Z', size: '12.1 MB', status: 'Verified' },
    ],
    offers: [
      { id: 'OFR-004', rate: 6.50, term: 72, monthlyPayment: 12950, totalAmount: 932400, status: 'Sent', generatedAt: '2026-03-01T10:00:00Z' },
      { id: 'OFR-005', rate: 7.00, term: 60, monthlyPayment: 14850, totalAmount: 891000, status: 'Sent', generatedAt: '2026-03-01T10:00:00Z' },
      { id: 'OFR-006', rate: 5.99, term: 84, monthlyPayment: 10980, totalAmount: 922320, status: 'Sent', generatedAt: '2026-03-01T10:00:00Z' },
    ],
    timeline: [
      { event: 'Application Submitted', date: '2026-02-28T10:00:00Z', actor: 'Applicant' },
      { event: 'Documents Uploaded', date: '2026-02-28T10:00:00Z', actor: 'Applicant' },
      { event: 'KYB Verification Complete', date: '2026-02-28T10:30:00Z', actor: 'KYB Verify Pro' },
      { event: 'Bureau Report Pulled', date: '2026-02-28T10:35:00Z', actor: 'System' },
      { event: 'Financials Verified', date: '2026-02-28T11:00:00Z', actor: 'Underwriting Team' },
      { event: 'Application Approved', date: '2026-03-01T09:30:00Z', actor: 'Underwriting Team' },
      { event: 'Offers Generated', date: '2026-03-01T10:00:00Z', actor: 'System' },
      { event: 'Offers Sent to Applicant', date: '2026-03-01T10:05:00Z', actor: 'Sarah Johnson (Underwriter)' },
    ],
  },
];

// Generate additional mock applications to reach 25 items for pagination testing
const statuses = ['Under Review', 'Pending Documents', 'KYB In Progress', 'Financial Verification', 'Approved', 'Offer Sent', 'Offer Accepted', 'Contract Out', 'Funded', 'Declined'];
let currentId = 7;
while (applications.length < 25) {
  const status = statuses[Math.floor(Math.random() * statuses.length)];
  const statusIdx = statuses.indexOf(status);

  // Logical checkpoints
  const docsPending = status === 'Pending Documents';
  const kybComplete = statusIdx >= statuses.indexOf('Financial Verification') && status !== 'Declined';
  const finComplete = statusIdx >= statuses.indexOf('Approved') && status !== 'Declined';
  const hasOffer = statusIdx >= statuses.indexOf('Offer Sent') && status !== 'Declined';
  
  // Timeline building
  const timeline = [{ event: 'Application Submitted', date: '2026-03-01T10:00:00Z', actor: 'Applicant' }];
  if (!docsPending && statusIdx > 0) timeline.push({ event: 'Documents Uploaded', date: '2026-03-02T09:00:00Z', actor: 'Applicant' });
  if (statusIdx >= statuses.indexOf('KYB In Progress')) timeline.push({ event: 'KYB Verification Initiated', date: '2026-03-02T10:00:00Z', actor: 'System' });
  if (kybComplete) timeline.push({ event: 'KYB Verification Complete', date: '2026-03-02T10:30:00Z', actor: 'KYB Verify Pro' });
  if (finComplete) timeline.push({ event: 'Financials Verified', date: '2026-03-03T14:00:00Z', actor: 'Underwriting Team' });
  if (statusIdx >= statuses.indexOf('Approved')) timeline.push({ event: 'Application Approved', date: '2026-03-04T09:00:00Z', actor: 'Underwriting Team' });
  if (statusIdx >= statuses.indexOf('Offer Sent')) timeline.push({ event: 'Offer Sent', date: '2026-03-04T10:00:00Z', actor: 'System' });
  if (statusIdx >= statuses.indexOf('Offer Accepted')) timeline.push({ event: 'Offer Accepted', date: '2026-03-05T11:00:00Z', actor: 'Applicant' });
  if (statusIdx >= statuses.indexOf('Contract Out')) timeline.push({ event: 'Contract Documents Out', date: '2026-03-05T14:00:00Z', actor: 'System' });
  if (statusIdx >= statuses.indexOf('Funded')) timeline.push({ event: 'Loan Funded', date: '2026-03-06T09:00:00Z', actor: 'System' });
  if (status === 'Declined') timeline.push({ event: 'Application Declined', date: '2026-03-05T09:00:00Z', actor: 'Underwriting Team' });

  // Offers building if has offer
  const offersList = hasOffer ? [{
    id: `OFR-${String(currentId).padStart(3, '0')}`,
    rate: 7.5,
    term: 60,
    monthlyPayment: 1100 + (Math.random() * 500),
    totalAmount: 66000 + (Math.random() * 30000),
    status: statusIdx >= statuses.indexOf('Offer Accepted') ? 'Accepted' : 'Sent',
    generatedAt: '2026-03-04T10:00:00Z'
  }] : [];
  
  applications.push({
    id: `APP-2026-${String(currentId).padStart(3, '0')}`,
    type: 'business',
    status: status,
    submittedAt: `2026-03-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}T10:00:00Z`,
    applicant: {
      name: `Applicant ${currentId}`,
      email: `applicant${currentId}@example.com`,
      phone: '(555) 000-0000',
      address: '123 Test St, City, ST 12345',
    },
    business: {
      legalName: `Test Business ${currentId} LLC`,
      dba: null,
      ein: `00-00000${currentId}`,
      entityType: 'LLC',
      industry: 'Retail',
      stateOfIncorporation: 'NY',
      dateEstablished: '2020-01-01',
      annualRevenue: Math.floor(Math.random() * 5000000) + 100000,
      numberOfEmployees: Math.floor(Math.random() * 50) + 1,
    },
    loan: {
      purpose: 'Working Capital',
      amount: Math.floor(Math.random() * 900000) + 50000,
      term: [12, 24, 36, 48, 60, 72][Math.floor(Math.random() * 6)],
      collateralType: 'None',
    },
    thirdParty: {
      kyb: {
        provider: 'KYB Verify Pro',
        status: status === 'KYB In Progress' ? 'In Progress' : (kybComplete ? 'Complete' : 'Pending'),
        verifiedAt: kybComplete ? '2026-03-02T10:30:00Z' : null,
        businessVerified: kybComplete ? true : null,
        einMatch: kybComplete ? true : null,
        sosStatus: kybComplete ? 'Active / Good Standing' : 'Pending',
        riskLevel: kybComplete ? 'Low' : 'Pending',
        riskScore: kybComplete ? 15 : null,
      },
      bureau: {
        provider: 'Business Credit Bureau',
        status: status === 'Financial Verification' ? 'In Progress' : (finComplete ? 'Complete' : 'Pending'),
        businessCreditScore: finComplete ? 75 : null,
      },
      plaid: {
        provider: 'Plaid',
        status: finComplete ? 'Connected' : 'Pending',
        connectedAt: finComplete ? '2026-03-02T10:00:00Z' : null,
        accountName: finComplete ? 'Business Auth ****1234' : null,
        institution: finComplete ? 'Bank of America' : null,
        currentBalance: finComplete ? Math.floor(Math.random() * 100000) + 10000 : null,
        availableBalance: finComplete ? Math.floor(Math.random() * 100000) + 10000 : null,
        avgMonthlyRevenue: finComplete ? Math.floor(Math.random() * 50000) + 10000 : null,
        avgMonthlyExpenses: finComplete ? Math.floor(Math.random() * 40000) + 5000 : null,
        monthlyNetFlow: finComplete ? Math.floor(Math.random() * 10000) + 1000 : null,
        nsfCount90Days: finComplete ? Math.floor(Math.random() * 2) : null,
        daysNegativeBalance: finComplete ? 0 : null,
        revenueTrend: finComplete ? 'Stable' : null,
        flags: []
      }
    },
    documents: docsPending ? [] : [
      { name: 'Formation_Docs.pdf', type: 'Formation Docs', uploadedAt: '2026-03-02T09:00:00Z', size: '2.1 MB', status: finComplete ? 'Verified' : 'Under Review' },
      { name: 'Bank_Statements.pdf', type: 'Bank Statement', uploadedAt: '2026-03-02T09:00:00Z', size: '5.4 MB', status: finComplete ? 'Verified' : 'Under Review' },
    ],
    offers: offersList,
    timeline: timeline
  });
  currentId++;
}

export function getApplications() {
  return applications;
}

export function getApplicationById(id) {
  return applications.find((app) => app.id === id) || null;
}

export default applications;
