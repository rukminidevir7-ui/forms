// Sample data - replace with real data when available
export const sampleData = null;

// Placeholder data for forms when real data is not available
export const placeholderData = {
  comp: {
    name: '{comp.name}',
    logoUrl: 'https://via.placeholder.com/150x50?text=COMPANY+LOGO'
  },
  req: { id: '{req.id}' },
  proj: {
    site_name: '{proj.site_name}',
    wbs_code: '{proj.wbs_code}'
  },
  hire: {
    category: '{hire.category}',
    trade: '{hire.trade}',
    count: '{hire.count}',
    budget_limit: '{hire.budget_limit}',
    reason: '{hire.reason}',
    start_date: '{hire.start_date}',
    duration: '{hire.duration}'
  },
  interview: {
    candidate_name: '{interview.candidate_name}',
    position: '{interview.position}',
    date: '{interview.date}',
    interviewer: '{interview.interviewer}',
    tech_score: '{interview.tech_score}',
    comm_score: '{interview.comm_score}',
    comments: '{interview.comments}',
    status: '{interview.status}' // Selected/Rejected/Hold
  },
  offer: {
    ref_id: '{offer.ref_id}',
    final_ctc: '{offer.final_ctc}',
    approver: '{offer.approver}',
    hr_remarks: '{offer.hr_remarks}'
  },
  sig: {
    site_manager: '{sig.site_manager}',
    project_manager: '{sig.project_manager}',
    hr_seal: '{sig.hr_seal}'
  },
  budget: { source: '{budget.source}' },
  stats: { 
    total_req: '{stats.total_req}', 
    total_approved: '{stats.total_approved}' 
  },
  item: { 
    req_id: '{item.req_id}', 
    site_name: '{item.site_name}', 
    status: '{item.status}' 
  },
  approval: {
    decision: '{approval.decision}',
    approved: false
  },
  // NEW: Candidate Consent
  consent: {
    candidate_name: '{consent.candidate_name}',
    application_id: '{consent.application_id}',
    email: '{consent.email}',
    consent_types: ['{consent.type1}', '{consent.type2}'], // Array example
    request_date: '{consent.request_date}',
    verification_status: '{consent.verification_status}',
    verifier: '{consent.verifier}'
  },
  // NEW: Ref Checks, Offer, BGV
  ref_check: {
    candidate_name: '{ref_check.candidate_name}',
    referee_name: '{ref_check.referee_name}',
    organization: '{ref_check.organization}',
    contact: '{ref_check.contact}',
    feedback_rating: '{ref_check.feedback_rating}'
  },
  offer_approval: {
    designation: '{offer.designation}',
    project: '{offer.project}',
    fixed_ctc: '{offer.fixed_ctc}',
    var_ctc: '{offer.var_ctc}',
    budget_variance: '{offer.budget_variance}'
  },
  bgv_checklist: {
    agency_name: '{bgv.agency_name}',
    status: '{bgv.status}'
  },
  // NEW: Hiring Deviation (FRM-00625, 00626, 00627)
  deviation: {
    reason: '{deviation.reason}',
    impact: '{deviation.impact}',
    justification: '{deviation.justification}',
    requested_by: '{deviation.requested_by}',
    date: '{deviation.date}'
  },
  deviation_ref: '{deviation_ref}',
  // NEW: Recruiter Vendor Empanelment (FRM-00628, 00629, 00630)
  vendor: {
    name: '{vendor.name}',
    expertise: '{vendor.expertise}',
    location: '{vendor.location}',
    contact_person: '{vendor.contact_person}',
    email: '{vendor.email}',
    phone: '{vendor.phone}'
  },
  vendor_ref: '{vendor_ref}',
  vendor_item: {
    vendor_id: '{vendor_item.vendor_id}',
    vendor_name: '{vendor_item.vendor_name}',
    status: '{vendor_item.status}'
  },
  mis: {
  reporting_period: '{mis.reporting_period}',
  total_openings: '{mis.total_openings}',
  closed: '{mis.closed}',
  pending: '{mis.pending}',
  aging_positions: '{mis.aging_positions}',
},
mis_approval: {
  decision: '{mis_approval.decision}',
  approver_name: '{mis_approval.approver_name}',
  comments: '{mis_approval.comments}',
},

  
};
