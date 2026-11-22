import { useLocation, useNavigate } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import TripDetailsSidebar from '../components/TripDetailsSidebar';
import './RoutesPage.css';
import './ConfirmationPage.css';

export default function ConfirmationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state || {};

  const {
    route,
    passengers = [],
    paymentMethod = 'online',
    seats = [],
    pricePerSeat = 0,
  } = orderData;

  const totalSum = seats.length * pricePerSeat;

  if (!route) {
    return (
      <main className="routes-page">
        <section className="routes-hero routes-hero_compact" />
        <ProgressBar step={4} />
        <p className="routes__loading">Нет данных о заказе. Вернитесь на главную.</p>
        <div style={{ textAlign: 'center', paddingBottom: 60 }}>
          <button
            type="button"
            className="button btn-select"
            style={{ maxWidth: 280 }}
            onClick={() => navigate('/')}
          >
            На главную
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="routes-page">
      <section className="routes-hero routes-hero_compact" />
      <ProgressBar step={4} />

      <div className="routes-layout">
        <TripDetailsSidebar orderData={orderData} />

        <section className="confirm-main">
          {/* Карточка 1: Поезд */}
          <div className="confirm-card">
            <h3 className="confirm-card__title">Поезд</h3>

            <div className="route-card confirm-train-box">
              <div className="route-card__left">
                <div className="train-icon">🚆</div>
                <span className="train-number">{route.trainNumber}</span>
                <span className="train-route">
                  {route.from} →<br />
                  {route.to}
                </span>
              </div>

              <div className="route-card__center">
                <div className="way-point">
                  <span className="time">{route.departureTime}</span>
                  <span className="city">{route.from}</span>
                  <span className="station">{route.fromStation}</span>
                </div>
                <div className="way-duration">
                  <span>{route.duration}</span>
                  <span className="way-arrow">➔</span>
                </div>
                <div className="way-point">
                  <span className="time">{route.arrivalTime}</span>
                  <span className="city">{route.to}</span>
                  <span className="station">{route.toStation}</span>
                </div>
              </div>

              <div className="route-card__right">
                <div className="route-card__options">
                  {route.carTypes?.map((car, idx) => (
                    <div key={idx} className="car-option">
                      <span className="car-type">{car.type}</span>
                      <span className="car-seats">{car.seats}</span>
                      <span className="car-price">
                        от <strong>{car.price.toLocaleString('ru-RU')}</strong> ₽
                      </span>
                    </div>
                  ))}
                </div>

                <div className="confirm-edit-wrap">
                  <button
                    type="button"
                    className="btn-confirm-edit"
                    onClick={() => navigate('/routes', { state: orderData })}
                  >
                    Изменить
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Карточка 2: Пассажиры */}
          <div className="confirm-card">
            <h3 className="confirm-card__title">Пассажиры</h3>

            <div className="confirm-passengers-body">
              <div className="confirm-passengers-list">
                {passengers.map((p, idx) => (
                  <div key={idx} className="confirm-passenger-item">
                    <div className="confirm-passenger-avatar">
                      <span className="avatar-circle">👤</span>
                      <span>{p.type === 'child' ? 'Детский' : 'Взрослый'}</span>
                    </div>

                    <div className="confirm-passenger-info">
                      <div className="confirm-passenger-name">
                        {p.lastName} {p.firstName} {p.patronymic}
                      </div>
                      <div className="confirm-passenger-meta">
                        Пол {p.gender === 'female' ? 'женский' : 'мужской'}
                      </div>
                      <div className="confirm-passenger-meta">
                        Дата рождения {p.birthDate}
                      </div>
                      <div className="confirm-passenger-meta">
                        {p.docType === 'passport'
                          ? `Паспорт РФ ${p.passportSeries} ${p.passportNumber}`
                          : `Свидетельство о рождении ${p.birthCertNumber}`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="confirm-passengers-aside">
                <div className="confirm-total-row">
                  <span>Всего</span>
                  <strong>{totalSum.toLocaleString('ru-RU')} <span>₽</span></strong>
                </div>
                <button
                  type="button"
                  className="btn-confirm-edit"
                  onClick={() => navigate('/passengers', { state: orderData })}
                >
                  Изменить
                </button>
              </div>
            </div>
          </div>

          {/* Карточка 3: Способ оплаты */}
          <div className="confirm-card">
            <h3 className="confirm-card__title">Способ оплаты</h3>

            <div className="confirm-payment-body">
              <span className="confirm-payment-text">
                {paymentMethod === 'cash' ? 'Наличными' : 'Онлайн'}
              </span>
              <button
                type="button"
                className="btn-confirm-edit"
                onClick={() => navigate('/payment', { state: orderData })}
              >
                Изменить
              </button>
            </div>
          </div>

          {/* Кнопка ПОДТВЕРДИТЬ */}
          <div className="confirm-footer">
            <button
              type="button"
              className="button btn-buy-tickets"
              onClick={() => navigate('/success', { state: orderData })}
            >
              ПОДТВЕРДИТЬ
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
