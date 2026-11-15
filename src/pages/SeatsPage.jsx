import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

function SeatsPage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <h2>Выбор вагонов и мест</h2>
      {/* Сюда позже добавим карту рассадки */}
      <button className="button" onClick={() => navigate('/passengers')}>Следующий шаг: Пассажиры</button>
    </Layout>
  );
}

export default SeatsPage;
