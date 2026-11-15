import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

function ConfirmationPage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <h2>Подтверждение заказа</h2>
      <button className="button" onClick={() => navigate('/success')}>Купить билет</button>
    </Layout>
  );
}

export default ConfirmationPage;
