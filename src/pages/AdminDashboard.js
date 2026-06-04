import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const BACKEND_URL = "https://back-yc0g.onrender.com";

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await axios.get(`${BACKEND_URL}/api/admin/orders`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(res.data);
      } catch (err) {
        alert('الجلسة الأمنية انتهت أو تالفة، الرجاء إعادة المصادقة');
        localStorage.removeItem('adminToken');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  return (
    <div style={{ padding: '30px', direction: 'rtl', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '2px solid #eee', paddingBottom: '15px' }}>
        <h2 style={{ margin: '0', color: '#2c3e50' }}>لوحة التحكم الإدارية المستقلة - مراقبة وحفظ زبائن المنصة</h2>
        <button onClick={handleLogout} style={{ padding: '10px 20px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>خروج آمن 🚪</button>
      </header>

      {loading ? (
        <p style={{ textAlign: 'center', fontSize: '18px', color:'#7f8c8d' }}>جاري جلب الاشتراكات وقوائم العملاء الحالية من السيرفر الموحد...</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 4px 8px rgba(0,0,0,0.04)', borderRadius: '8px', overflow: 'hidden' }}>
            <thead>
              <tr style={{ backgroundColor: '#2c3e50', color: '#fff', textAlign: 'right' }}>
                <th style={{ padding: '15px' }}>اسم العميل</th>
                <th style={{ padding: '15px' }}>البريد الإلكتروني</th>
                <th style={{ padding: '15px' }}>نوع الخدمة المفعلة</th>
                <th style={{ padding: '15px' }}>القيمة المالية المدفوعة</th>
                <th style={{ padding: '15px' }}>حالة المشروع / الاشتراك</th>
                <th style={{ padding: '15px' }}>تفاصيل المتمتطلبات البرمجية</th>
                <th style={{ padding: '15px' }}>تاريخ وتوقيت الطلب</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ padding: '25px', textAlign: 'center', color: '#95a5a6', backgroundColor:'#fff' }}>لا يوجد مشتركين أو مبيعات مقيدة بقاعدة البيانات حالياً.</td>
                </tr>
              ) : (
                orders.map((order, index) => (
                  <tr key={order._id} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f8f9fa', borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '15px', fontWeight: 'bold', color: '#34495e' }}>{order.clientName}</td>
                    <td style={{ padding: '15px', color: '#2980b9' }}>{order.clientEmail}</td>
                    <td style={{ padding: '15px' }}>{order.serviceName}</td>
                    <td style={{ padding: '15px', fontWeight: 'bold', color: '#27ae60' }}>{order.price > 0 ? `${order.price}$` : 'طلب خاص (إرسال إيميل)'}</td>
                    <td style={{ padding: '15px' }}>
                      <span style={{ backgroundColor: order.status.includes('Pending') ? '#ffeaa7' : '#2ecc71', color: order.status.includes('Pending') ? '#d63031' : '#fff', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                        {order.status}
                      </span>
                    </td>
                    <td style={{ padding: '15px', fontSize: '13px', color: '#666', maxWidth: '280px', whiteSpace: 'normal', wordBreak: 'break-word' }}>
                      {order.customRequirements || 'مبيعات فورية (لا يوجد شروط مخصصة)'}
                    </td>
                    <td style={{ padding: '15px', color: '#7f8c8d', fontSize:'13px' }}>{new Date(order.createdAt).toLocaleString('ar-EG')}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
