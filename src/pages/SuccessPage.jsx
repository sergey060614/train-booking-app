import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

function SuccessPage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div style={{ maxWidth: '600px', margin: '80px auto', padding: '40px', textAlign: 'center', border: '1px solid #e5e4e7', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>🎉</div>
        <h2 style={{ marginBottom: '16px', color: '#000' }}>Благодарим за заказ!</h2>
        <p style={{ fontSize: '18px', color: '#292929', margin: '0 0 10px 0' }}>
          Ваш заказ успешно оформлен. Номер заказа: <strong>#284-91A</strong>
        </p>
        <p style={{ color: '#6b6375', marginBottom: '32px' }}>
          Электронные билеты и чек отправлены на вашу электронную почту.
        </p>
        <button className="button" onClick={() => navigate('/')} style={{ width: '100%' }}>
          Вернуться на главную
        </button>
      </div>
    </Layout>
  );
}

export default SuccessPage;
