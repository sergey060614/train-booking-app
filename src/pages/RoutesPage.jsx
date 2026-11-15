import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

function RoutesPage() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="routes-layout">
        <aside className="sidebar-filter">
          <h3>Фильтры</h3>
          {/* Чекбоксы, радиокнопки и ползунки будут тут */}
        </aside>
        <section className="routes-list">
          <h2>Найденные поезда</h2>
          <div className="route-card">
            <p>Поезд 116С "Премиум"</p>
            <button className="button" onClick={() => navigate('/seats')}>Выбрать места</button>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default RoutesPage;
