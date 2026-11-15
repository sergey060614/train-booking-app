import { Link } from 'react-router-dom';

function Layout({ children }) {
  return (
    <div className="app-container">
      {/* Шапка сайта */}
      <header className="header">
        <nav className="header__nav">
          <Link to="/" className="header__logo">Логотип (Ж/Д)</Link>
          <ul className="header__menu">
            <li><a href="#about">О нас</a></li>
            <li><a href="#how-it-works">Как это работает</a></li>
            <li><a href="#reviews">Отзывы</a></li>
          </ul>
        </nav>
      </header>

      {/* Основной контент страницы */}
      <main className="main-content">
        {children}
      </main>

      {/* Подвал сайта */}
      <footer className="footer">
        <p>© 2026 Система бронирования ж/д билетов</p>
      </footer>
    </div>
  );
}

export default Layout;
