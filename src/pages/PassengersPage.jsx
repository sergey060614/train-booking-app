import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

function PassengersPage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <h2>Информация о пассажирах</h2>
      <button className="button" onClick={() => navigate('/payment')}>Перейти к оплате</button>
    </Layout>
  );
}

export default PassengersPage;
