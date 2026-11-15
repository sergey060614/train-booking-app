import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

function PaymentPage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <h2>Способ оплаты</h2>
      <button className="button" onClick={() => navigate('/confirmation')}>Проверить заказ</button>
    </Layout>
  );
}

export default PaymentPage;
