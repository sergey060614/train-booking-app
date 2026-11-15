import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

function SuccessPage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="success-screen">
        <h2>Благодарим за заказ!</h2>
        <p>Билеты отправлены на вашу почту.</p>
        <button className="button" onClick={() => navigate('/')}>На главную</button>
      </div>
    </Layout>
  );
}

export default SuccessPage;
