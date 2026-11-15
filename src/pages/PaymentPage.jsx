import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import ProgressBar from '../components/ProgressBar';

function PaymentPage() {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('online');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleNext = (e) => {
    e.preventDefault();
    if (!email || !phone) {
      alert('Пожалуйста, заполните Email и номер телефона для связи.');
      return;
    }
    navigate('/confirmation');
  };

  return (
    <Layout>
      <ProgressBar step={3} />
      <div style={{ maxWidth: '1126px', margin: '40px auto', padding: '0 20px', textAlign: 'left' }}>
        <h2>Способ оплаты</h2>
        
        <form onSubmit={handleNext} style={{ border: '1px solid #e5e4e7', padding: '30px', background: '#fff', borderRadius: '4px' }}>
          {/* Контакты */}
          <h3 style={{ marginBottom: '20px' }}>Персональные данные</h3>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px' }}>E-mail</label>
              <input 
                type="email" 
                placeholder="example@mail.ru" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', marginBottom: '8px' }}>Телефон</label>
              <input 
                type="tel" 
                placeholder="+7 ___ ___ __ __" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          {/* Варианты оплаты */}
          <h3 style={{ marginBottom: '20px' }}>Тип оплаты</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input 
                type="radio" 
                name="payment" 
                checked={paymentMethod === 'online'} 
                onChange={() => setPaymentMethod('online')} 
              />
              <strong>Онлайн-оплата</strong> (Банковская карта, СБП)
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input 
                type="radio" 
                name="payment" 
                checked={paymentMethod === 'cash'} 
                onChange={() => setPaymentMethod('cash')} 
              />
              <strong>Наличными</strong> (В кассе вокзала)
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
            <button type="button" className="button" style={{ backgroundColor: '#939393' }} onClick={() => navigate('/passengers')}>
              Назад
            </button>
            <button type="submit" className="button">
              Далее: Проверить заказ
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default PaymentPage;
