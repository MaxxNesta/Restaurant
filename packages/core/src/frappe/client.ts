// Demo-mode mock client — this preview build has no live Frappe/ERPNext
// backend. Every network call below is replaced with fixture data so the
// dashboard renders fully for visual review.

export interface CallFunction {
  <T = any>(path: string, params?: any): Promise<T>;
  get: (path: string, params?: any) => Promise<any>;
  post: (path: string, params?: any) => Promise<any>;
  put: (path: string, params?: any) => Promise<any>;
  delete: (path: string, params?: any) => Promise<any>;
}

export const DEMO_USER = 'demo.manager@ury.local';

const dashboardSummary = {
  today_sales: 184250,
  today_orders: 92,
  occupied_tables: 14,
  total_tables: 22,
  avg_order_value: 2003,
  active_cashiers: 3,
  pending_kitchen_orders: 6,
  total_menu_items: 148,
};

const dashboardCharts = {
  sales_trend: [
    { date: '2026-09-12', sales: 142000 },
    { date: '2026-09-13', sales: 158500 },
    { date: '2026-09-14', sales: 133200 },
    { date: '2026-09-15', sales: 176800 },
    { date: '2026-09-16', sales: 161400 },
    { date: '2026-09-17', sales: 198700 },
    { date: '2026-09-18', sales: 184250 },
  ],
  hourly_sales: [
    { hour: '10 AM', sales: 8200 },
    { hour: '11 AM', sales: 12400 },
    { hour: '12 PM', sales: 26800 },
    { hour: '1 PM', sales: 31200 },
    { hour: '2 PM', sales: 19500 },
    { hour: '3 PM', sales: 9800 },
    { hour: '7 PM', sales: 22100 },
    { hour: '8 PM', sales: 34600 },
    { hour: '9 PM', sales: 28900 },
    { hour: '10 PM', sales: 14300 },
  ],
  payment_methods: [
    { method: 'Cash', total: 62400 },
    { method: 'Card', total: 78900 },
    { method: 'UPI', total: 42950 },
  ],
  order_types: [
    { order_type: 'Dine In', count: 54, total: 108400 },
    { order_type: 'Takeaway', count: 24, total: 42300 },
    { order_type: 'Delivery', count: 14, total: 33550 },
  ],
  top_items: [
    { item_name: 'Butter Chicken', total_qty: 86, total_amount: 34400 },
    { item_name: 'Paneer Tikka', total_qty: 71, total_amount: 21300 },
    { item_name: 'Veg Biryani', total_qty: 64, total_amount: 19200 },
    { item_name: 'Masala Dosa', total_qty: 58, total_amount: 11600 },
    { item_name: 'Cold Coffee', total_qty: 49, total_amount: 7350 },
  ],
  revenue_by_branch: [
    { branch: 'Downtown', total: 96400 },
    { branch: 'Riverside', total: 58200 },
    { branch: 'Airport Road', total: 29650 },
  ],
  sales_by_course: [
    { course: 'Starters', total: 41200 },
    { course: 'Mains', total: 98600 },
    { course: 'Desserts', total: 18400 },
    { course: 'Beverages', total: 26050 },
  ],
};

const recentTransactions = [
  { name: 'INV-2026-1042', customer: 'Walk-in Customer', posting_date: '2026-09-18', posting_time: '13:42:10', grand_total: 2450, status: 'Paid', order_type: 'Dine In', restaurant_table: 'T-12', cashier: 'Aye Chan' },
  { name: 'INV-2026-1041', customer: 'Zaw Min', posting_date: '2026-09-18', posting_time: '13:35:02', grand_total: 1180, status: 'Paid', order_type: 'Takeaway', restaurant_table: 'Counter', cashier: 'Aye Chan' },
  { name: 'INV-2026-1040', customer: 'Walk-in Customer', posting_date: '2026-09-18', posting_time: '13:20:47', grand_total: 3620, status: 'Submitted', order_type: 'Dine In', restaurant_table: 'T-04', cashier: 'Su Su' },
  { name: 'INV-2026-1039', customer: 'Grab Food', posting_date: '2026-09-18', posting_time: '13:05:33', grand_total: 940, status: 'Paid', order_type: 'Delivery', restaurant_table: 'Counter', cashier: 'Su Su' },
  { name: 'INV-2026-1038', customer: 'Htet Aung', posting_date: '2026-09-18', posting_time: '12:48:19', grand_total: 1760, status: 'Paid', order_type: 'Dine In', restaurant_table: 'T-08', cashier: 'Aye Chan' },
];

function mockCall(path: string): any {
  switch (path) {
    case 'ury.ury.api.dashboard.get_dashboard_summary':
      return dashboardSummary;
    case 'ury.ury.api.dashboard.get_dashboard_charts':
      return dashboardCharts;
    case 'ury.ury.api.dashboard.get_recent_transactions':
      return recentTransactions;
    case 'ury.ury.api.minimal.setup_organization.get_wizard_status':
      return { step1_complete: true, step2_complete: true };
    default:
      return { message: [] };
  }
}

const callImpl: any = async (path: string, params?: any) => mockCall(path);
callImpl.get = async (path: string) => mockCall(path);
callImpl.post = async (path: string) => mockCall(path);
callImpl.put = async () => ({ message: {} });
callImpl.delete = async () => ({ message: {} });

export const call: CallFunction = callImpl;

export const db = {
  getDoc: async (doctype: string, name: string) => {
    if (doctype === 'User') {
      return {
        name,
        full_name: 'Demo Manager',
        roles: [{ name: '1', role: 'URY Manager', parent: name }],
      };
    }
    return { name };
  },
  getList: async () => [],
  createDoc: async (_doctype: string, doc: any) => doc,
  updateDoc: async (_doctype: string, _name: string, doc: any) => doc,
  deleteDoc: async () => undefined,
};

export const auth = {
  getLoggedInUser: async () => DEMO_USER,
  logout: async () => true,
};

export function createFrappeClient() {
  return null as any;
}
