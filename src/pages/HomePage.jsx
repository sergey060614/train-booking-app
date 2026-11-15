import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

function HomePage() {
  const navigate = useNavigate();

  // Состояния для формы поиска билетов
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [dateOut, setDateOut] = useState('');
  const [dateReturn, setDateReturn] = useState('');

  // Обработчик отправки формы
  const handleSearch = (e) => {
    e.preventDefault();
    if (!fromCity || !toCity || !dateOut) {
      alert('Пожалуйста, заполните пункты отправления, прибытия и дату.');
      return;
    }
    // Переходим на страницу результатов поиска
    navigate('/routes');
  };

  return (
    <Layout>
      {/* 1. Главный экран с формой поиска */}
      <section className="hero">
        <div className="hero__content">
          <h1 className="hero__title">Всякие направления здесь</h1>
          
          <form className="search-form" onSubmit={handleSearch}>
            <div className="search-form__row">
              {/* Поле ОТКУДА */}
              <div className="search-form__field">
                <label className="search-form__label">Направление</label>
                <input
                  type="text"
                  placeholder="Откуда"
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  className="search-form__input"
                />
              </div>

              {/* Поле КУДА */}
              <div className="search-form__field">
                <label className="search-form__label">&nbsp;</label>
                <input
                  type="text"
                  placeholder="Куда"
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  className="search-form__input"
                />
              </div>
            </div>

            <div className="search-form__row">
              {/* Дата ТУДА */}
              <div className="search-form__field">
                <label className="search-form__label">Дата</label>
                <input
                  type="date"
                  value={dateOut}
                  onChange={(e) => setDateOut(e.target.value)}
                  className="search-form__input"
                />
              </div>

              {/* Дата ОБРАТНО */}
              <div className="search-form__field">
                <label className="search-form__label">&nbsp;</label>
                <input
                  type="date"
                  value={dateReturn}
                  onChange={(e) => setDateReturn(e.target.value)}
                  className="search-form__input"
                />
              </div>
            </div>

            <button type="submit" className="button search-form__submit">
              Найти билеты
            </button>
          </form>
        </div>
      </section>

      {/* 2. Секция О НАС */}
      <section id="about" className="info-section">
        <div className="info-section__container">
          <h2 className="info-section__title">О нас</h2>
          <p className="info-section__text">
            Мы предоставляем удобный сервис для поиска и быстрой покупки железнодорожных билетов по всем популярным направлениям.
          </p>
        </div>
      </section>

      {/* 3. Секция КАК ЭТО РАБОТАЕТ */}
      <section id="how-it-works" className="info-section info-section_gray">
        <div className="info-section__container">
          <h2 className="info-section__title">Как это работает</h2>
          <div className="steps-grid">
            <div className="steps-grid__item">
              <div className="steps-grid__icon">🔍</div>
              <p>Выбираете направление и дату</p>
            </div>
            <div className="steps-grid__item">
              <div className="steps-grid__icon">💺</div>
              <p>Выбираете тип вагона и место</p>
            </div>
            <div className="steps-grid__item">
              <div className="steps-grid__icon">💳</div>
              <p>Оплачиваете билет онлайн</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Секция ОТЗЫВЫ */}
      <section id="reviews" className="info-section">
        <div className="info-section__container">
          <h2 className="info-section__title">Отзывы</h2>
          <div className="reviews-list">
            <div className="reviews-list__item">
              <p className="reviews-list__author">Сергей Никифоров</p>
              <p className="reviews-list__text">"Очень удобный интерфейс, билеты купил буквально за пару минут!"</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default HomePage;
