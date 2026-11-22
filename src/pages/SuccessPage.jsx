import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SuccessPage.css';

export default function SuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state || {};

  const {
    payer = {},
    seats = [],
    pricePerSeat = 0,
  } = orderData;

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const totalSum = seats.length * pricePerSeat || 7760;
  const payerGreeting =
    payer.firstName
      ? `${payer.firstName}${payer.middleName ? ` ${payer.middleName}` : ''}!`
      : 'Уважаемый пассажир!';

  return (
    <main className="success-page">
      {/* Верхний баннер с фото поезда */}
      <section className="success-hero">
        <div className="success-hero__container">
          <h1 className="success-hero__title">Благодарим Вас за заказ!</h1>
        </div>
      </section>

      {/* Карточка успешного заказа, заходящая на баннер */}
      <section className="success-content">
        <div className="success-card">
          {/* Верхняя строка с номером заказа и суммой */}
          <div className="success-card__header">
            <span className="success-order-num">№Заказа 285АА</span>
            <span className="success-order-sum">
              сумма <strong>{totalSum.toLocaleString('ru-RU')}</strong> ₽
            </span>
          </div>

          {/* 3 шага с иконками */}
          <div className="success-steps">
            <div className="success-step">
              <div className="success-step__icon">💻</div>
              <p className="success-step__text">
                билеты будут отправлены на ваш <strong>e-mail</strong>
              </p>
            </div>

            <div className="success-step">
              <div className="success-step__icon">🎫</div>
              <p className="success-step__text">
                <strong>распечатайте</strong> и сохраняйте билеты до даты поездки
              </p>
            </div>

            <div className="success-step">
              <div className="success-step__icon">👮</div>
              <p className="success-step__text">
                <strong>предьявите</strong> распечатанные билеты при посадке
              </p>
            </div>
          </div>

          {/* Персональное сообщение */}
          <div className="success-message">
            <h2 className="success-message__name">{payerGreeting}</h2>
            <p className="success-message__text">
              Ваш заказ успешно оформлен.<br />
              В ближайшее время с вами свяжется наш оператор для подтверждения.
            </p>
            <p className="success-message__thanks">
              Благодарим Вас за оказанное доверие и желаем приятного путешествия!
            </p>
          </div>

          {/* Оранжевая панель оценки и возврата на главную */}
          <div className="success-card__footer">
            <div className="success-rating">
              <span>Оценить сервис</span>
              <div className="success-stars" onMouseLeave={() => setHoverRating(0)}>
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = star <= (hoverRating || rating);
                  return (
                    <button
                      key={star}
                      type="button"
                      className={`star-btn ${isFilled ? 'star-btn_filled' : ''}`}
                      onMouseEnter={() => setHoverRating(star)}
                      onClick={() => setRating(star)}
                      aria-label={`Оценка ${star}`}
                    >
                      {isFilled ? '★' : '☆'}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              className="btn-back-home"
              onClick={() => navigate('/', { replace: true })}
            >
              ВЕРНУТЬСЯ НА ГЛАВНУЮ
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
