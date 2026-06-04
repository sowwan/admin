import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import DashboardHome from './pages/DashboardHome';
import ManageServices from './pages/ManageServices';
import ViewOrders from './pages/ViewOrders';

// مكون بسيط للشريط الجانبي (Sidebar) لسهولة التنقل داخل لوحة التحكم
const AdminLayout = ({ children }) => (
  <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif' }}>
    <aside style={{ width: '250px', background: '#2c3e50', color: '#fff', padding: '20px' }}>
      <h2>لوحة التحكم</h2>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '30px' }}>
        <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>📊 الإحصائيات العامة</Link>
        <Link to="/services" style={{ color: '#fff', textDecoration: 'none' }}>🛠️ إدارة الخدمات</Link>
        <Link to="/orders" style={{ color: '#fff', textDecoration: 'none' }}>📦 عرض الطلبات</Link>
      </nav>
    </aside>
    <main style={{ flex: 1, padding: '20px', background: '#f8f9fa' }}>
      {children}
    </main>
  </div>
);

function App() {
  return (
    <Router>
      <AdminLayout>
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="/services" element={<ManageServices />} />
          <Route path="/orders" element={<ViewOrders />} />
        </Routes>
      </AdminLayout>
    </Router>
  );
}

export default App;
