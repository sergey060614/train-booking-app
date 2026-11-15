import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

function HomePage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <section className="hero">
        <h1>Всякие направления здесь</h1>
        {/* Форма поиска */}
        <button className="button" onClick={() => navigate('/routes')}>Найти билеты</button>
      </section>
      
      <section id="about"><h2>О нас</h2></section>
      <section id="how-it-works"><h2>Как это работает</h2></section>
      <section id="reviews"><h2>Отзывы</h2></section>
    </Layout>
  );
}

export default HomePage;
