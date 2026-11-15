import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import ProgressBar from '../components/ProgressBar';

function PassengersPage() {
  const navigate = useNavigate();
  const [passengerType, setPassengerType] = useState('adult'); // adult или child
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [docType, setDocType] = useState('passport'); // passport или birth-cert

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!lastName || !firstName) {
      alert('Пожалуйста, заполните фамилию и имя пассажира.');
      return;
    }
    navigate('/payment');
  };

  return (
    <Layout>
      <ProgressBar step={2} />
      <div style={{ maxWidth: '1126px', margin: '40px auto', padding: '0 20px', textAlign: 'left' }}>
        <h2>Пассажиры</h2>
        
        <form onSubmit={handleSubmit} style={{ border: '1px solid #e5e4e7', padding: '30px', background: '#fff', borderRadius: '4px' }}>
          {/* Выбор типа билета */}
          <div style={{ marginBottom: '20px', display: 'flex', gap: '20px' }}>
            <label>
              <input 
                type="radio" 
                name="passengerType" 
                checked={passengerType === 'adult'} 
                onChange={() => setPassengerType('adult')} 
              /> Взрослый
            </label>
            <label>
              <input 
                type="radio" 
                name="passengerType" 
                checked={passengerType === 'child'} 
                onChange={() => setPassengerType('child')} 
              /> Детский
            </label>
          </div>

          {/* ФИО поля */}
          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Фамилия</label>
              <input 
                type="text" 
                value={lastName} 
                onChange={(e) => setLastName(e.target.value)} 
                style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
              />
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Имя</label>
              <input 
                type="text" 
                value={firstName} 
                onChange={(e) => setFirstName(e.target.value)} 
                style={{ width: '100%', padding: '10px', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          {/* Тип документа */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px' }}>Тип документа</label>
            <select 
              value={docType} 
              onChange={(e) => setDocType(e.target.value)}
              style={{ padding: '10px', width: '250px' }}
            >
              <option value="passport">Паспорт РФ</option>
              <option value="birth-cert">Свидетельство о рождении</option>
            </select>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px' }}>
            <button type="button" className="button" style={{ backgroundColor: '#939393' }} onClick={() => navigate('/seats')}>
              Назад
            </button>
            <button type="submit" className="button">
              Далее: К оплате
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default PassengersPage;
