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
  }
};
