import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import ProgressBar from '../components/ProgressBar';

function ConfirmationPage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <ProgressBar step={4} />
      <div style={{ maxWidth: '1126px', margin: '40px auto', padding: '0 20px', textAlign: 'left' }}>
        <h2>Проверка заказа</h2>
        
        <div style={{ border: '1px solid #e5e4e7', padding: '30px', background: '#fff', borderRadius: '4px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h3 style={{ borderBottom: '1px solid #e5e4e7', paddingBottom: '10px' }}>Поезд</h3>
            <p><strong>Рейс:</strong> 116С "Премиум" (Москва → Санкт-Петербург)</p>
          </div>
          
          <div>
            <h3 style={{ borderBottom: '1px solid #e5e4e7', paddingBottom: '10px' }}>Пассажиры</h3>
            <p>1. Место 12 (Купе), Взрослый билет</p>
          </div>

          <div>
            <h3 style={{ borderBottom: '1px solid #e5e4e7', paddingBottom: '10px' }}>Способ оплаты</h3>
            <p>Банковская карта (Онлайн)</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
            <button className="button" style={{ backgroundColor: '#939393' }} onClick={() => navigate('/payment')}>
              Назад
            </button>
            <button className="button" onClick={() => navigate('/success')}>
              Подтвердить и купить билет
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ConfirmationPage;
