import { useState } from 'react';
import { Link } from 'react-router-dom';
import { subscribeEmail } from '../api/trainApi';
import InfoModal from './InfoModal';

function Layout({ children }) {
  const [subEmail, setSubEmail] = useState('');
  const [modal, setModal] = useState({ open: false, type: 'info', title: '', text: '' });

  const scrollTo = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!subEmail.trim()) return;
    try {
      await subscribeEmail(subEmail);
      setModal({
        open: true,
        type: 'info',
        title: 'Вы успешно подписались на рассылку!',
        text: 'Теперь вы будете первыми узнавать о новых маршрутах и специальных предложениях.',
      });
      setSubEmail('');
    } catch (err) {
      setModal({
        open: true,
        type: 'error',
        title: 'Ошибка при подписке',
        text: err.message || 'Не удалось оформить подписку. Попробуйте позже.',
      });
    }
  };

  return (
    <div className="page">
      <header className="header">
        <div className="header__container">
          <Link to="/" className="header__logo">Лого</Link>
        </div>
        <nav className="nav">
          <div className="nav__container">
            <a href="#about" onClick={scrollTo('about')}>О нас</a>
            <a href="#how-it-works" onClick={scrollTo('how-it-works')}>Как это работает</a>
            <a href="#reviews" onClick={scrollTo('reviews')}>Отзывы</a>
            <a href="#contacts" onClick={scrollTo('contacts')}>Контакты</a>
          </div>
        </nav>
      </header>

      <main>{children}</main>

      <footer id="contacts" className="footer">
        <div className="footer__container">
          <div className="footer__col">
            <h3 className="footer__title">Свяжитесь с нами</h3>
            <ul className="footer__contacts">
              <li>📞 <a href="tel:+78000000000">8 (800) 000-00-00</a></li>
              <li>✉️ <a href="mailto:inbox@mail.ru">inbox@mail.ru</a></li>
              <li>💬 tu.train.tickets</li>
              <li>📍 г. Москва, ул. Московская 27-35<br />555 555</li>
            </ul>
          </div>

          <div className="footer__col">
            <h3 className="footer__title">Подписка</h3>
            <p className="footer__text">Будьте в курсе событий</p>
            <form className="subscribe" onSubmit={handleSubscribe}>
              <input
                type="email"
                className="subscribe__input"
                placeholder="e-mail"
                value={subEmail}
                onChange={(e) => setSubEmail(e.target.value)}
              />
              <button type="submit" className="button subscribe__btn">
                ОТПРАВИТЬ
              </button>
            </form>

            <p className="footer__text footer__text_social">Подписывайтесь на нас</p>
            <div className="footer__social">
              <a href="#" aria-label="YouTube">▶</a>
              <a href="#" aria-label="LinkedIn">in</a>
              <a href="#" aria-label="Google+">G+</a>
              <a href="#" aria-label="Facebook">f</a>
              <a href="#" aria-label="Twitter">𝕏</a>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <span className="footer__logo">Лого</span>
          <span>© 2018 WEB</span>
        </div>
      </footer>

      <InfoModal
        isOpen={modal.open}
        type={modal.type}
        title={modal.title}
        text={modal.text}
        onClose={() => setModal((prev) => ({ ...prev, open: false }))}
      />
    </div>
  );
}

export default Layout;
