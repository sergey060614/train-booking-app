import InfoModal from '../components/InfoModal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const BASE = import.meta.env.BASE_URL;

function HomePage() {
  const navigate = useNavigate();
  const [modal, setModal] = useState({ open: false, type: 'error', title: '', text: '' });
  const [fromCity, setFromCity] = useState('');
  const [fromCityId, setFromCityId] = useState('');
const [toCityId, setToCityId] = useState('');

  const [toCity, setToCity] = useState('');
  const [dateOut, setDateOut] = useState('');
  const [dateReturn, setDateReturn] = useState('');

 const handleSwap = () => {
  setFromCity(toCity);
  setToCity(fromCity);
  setFromCityId(toCityId);
  setToCityId(fromCityId);
};

  const handleSearch = (e) => {
  e.preventDefault();
  if (!fromCity.trim() || !toCity.trim() || !dateOut) {
    setModal({
      open: true,
      type: 'error',
      title: 'Не заполнены поля поиска',
      text: 'Пожалуйста, укажите город отправления, город прибытия и дату поездки.',
    });
    return;
  }
  navigate('/routes', {
    state: { fromCity, toCity, fromCityId, toCityId, dateOut, dateReturn },
  });
};


  const reviews = [
    {
      name: 'Екатерина Вальнова',
      avatar: `${BASE}images/review-1.jpg`,
      text: 'Доброжелательные подсказки на всех этапах помогли правильно заполнить поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые.',
    },
    {
      name: 'Евгений Стрыкало',
      avatar:  `${BASE}images/review-2.jpg`,
      text: 'СМС-оповещение до посадки. Способ оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке.',
    },
  ];

  const features = [
    { icon: '🖥️', text: 'Удобный заказ на сайте' },
    { icon: '🏢', text: 'Нет необходимости ехать в офис' },
    { icon: '🌐', text: 'Огромный выбор направлений' },
  ];

  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="hero__container">
          <h1 className="hero__slogan">
            <span className="hero__slogan_light">Вся жизнь —</span>
            <span className="hero__slogan_bold">путешествие!</span>
          </h1>

          <form className="search-form" onSubmit={handleSearch}>
            <div className="search-form__group">
              <span className="search-form__label">Направление</span>
              <div className="search-form__row">
                <input
                  type="text"
                  placeholder="Откуда"
                  value={fromCity}
                  onChange={(e) => setFromCity(e.target.value)}
                  className="search-form__input"
                />
                <button
                  type="button"
                  className="search-form__swap"
                  aria-label="Поменять города местами"
                  onClick={handleSwap}
                >
                  ⇄
                </button>
                <input
                  type="text"
                  placeholder="Куда"
                  value={toCity}
                  onChange={(e) => setToCity(e.target.value)}
                  className="search-form__input"
                />
              </div>
            </div>

            <div className="search-form__group">
              <span className="search-form__label">Дата</span>
              <div className="search-form__row">
                <input
                  type="date"
                  value={dateOut}
                  onChange={(e) => setDateOut(e.target.value)}
                  className="search-form__input"
                />
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

      {/* О нас */}
      <section id="about" className="section-about">
        <div className="section-about__container">
          <h2 className="section-title">О НАС</h2>
          <blockquote className="section-about__quote">
            <p>
              Мы рады видеть вас! Мы работаем для Вас с 2003 года. 14 лет мы
              наблюдаем, как с каждым днем все больше людей заказывают ж/д
              билеты через интернет.
            </p>
            <p>
              Сегодня можно заказать железнодорожные билеты онлайн всего в 2
              клика, но стоит ли это делать? Мы расскажем о преимуществах
              заказа через интернет.
            </p>
            <p>
              <strong>
                Покупать ж/д билеты дешево можно за 90 суток до отправления
                поезда. Благодаря динамическому ценообразованию цена на билеты
                в это время самая низкая.
              </strong>
            </p>
          </blockquote>
        </div>
      </section>

      {/* Как это работает */}
      <section id="how-it-works" className="section-how">
        <div className="section-how__container">
          <div className="section-how__head">
            <h2 className="section-title section-title_light">КАК ЭТО РАБОТАЕТ</h2>
            <button className="button button_outline">Узнать больше</button>
          </div>
          <div className="steps">
            {features.map((f) => (
              <div className="steps__item" key={f.text}>
                <div className="steps__icon">{f.icon}</div>
                <p className="steps__text">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Отзывы */}
      <section id="reviews" className="section-reviews">
        <div className="section-reviews__container">
          <h2 className="section-title">ОТЗЫВЫ</h2>
          <div className="reviews">
            {reviews.map((r) => (
              <article className="review" key={r.name}>
                <img src={r.avatar} alt={r.name} className="review__photo" />
                <div className="review__body">
                  <h3 className="review__name">{r.name}</h3>
                  <p className="review__text">“ {r.text} ”</p>
                </div>
              </article>
            ))}
          </div>
          <div className="reviews__dots">
            <span className="reviews__dot reviews__dot_active" />
            <span className="reviews__dot" />
            <span className="reviews__dot" />
            <span className="reviews__dot" />
            <span className="reviews__dot" />
          </div>      <InfoModal
        isOpen={modal.open}
        type={modal.type}
        title={modal.title}
        text={modal.text}
        onClose={() => setModal((prev) => ({ ...prev, open: false }))}
      />

        </div>
      </section>
    </>
  );
}

export default HomePage;
