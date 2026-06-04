import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const BACKEND_URL = "https://back-yc0g.onrender.com";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(`${BACKEND_URL}/api/admin/login`, { username, password });
      localStorage.setItem('adminToken', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'خطأ فادح في الاتصال بسيرفر التحكم المركزي');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '120px auto', padding: '30px', border: '1px solid #e0e0e0', borderRadius: '12px', direction: 'rtl', fontFamily: 'Arial', boxShadow: '0 4px 15px rgba(0,0,0,0.08)', backgroundColor: '#fff' }}>
      <h2 style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '25px', fontSize: '22px' }}>نظام التحكم وإدارة الاشتراكات والمبيعات</h2>
      {error && <div style={{ backgroundColor: '#f8d7da', color: '#721c24', padding: '10px', borderRadius: '6px', marginBottom: '15px', fontSize: '14px', textAlign: 'center' }}>{error}</div>}
      <form onSubmit={handleLogin}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '6px', color: '#34495e', fontWeight:'bold' }}>اسم مستخدم الإدارة:</label>
          <input type="text" required onChange={e => setUsername(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '6px', color: '#34495e', fontWeight:'bold' }}>كلمة المرور المشفرة السرية:</label>
          <input type="password" required onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' }} />
        </div>
        <button type="submit" style={{ width: '100%', padding: '12px', background: '#2c3e50', color: 'white', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}>تسجيل الدخول للمنظومة 🔒</button>
      </form>
    </div>
  );
}
