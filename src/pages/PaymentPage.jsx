import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import TripDetailsSidebar from '../components/TripDetailsSidebar';
import './RoutesPage.css';
import './PaymentPage.css';

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState('online');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!lastName.trim() || !firstName.trim() || !phone.trim() || !email.trim()) {
      setError('Пожалуйста, заполните все обязательные поля.');
      return;
    }
    setError('');
    navigate('/confirmation', {
      state: {
        ...orderData,
        payer: { lastName, firstName, middleName },
        contactPhone: phone,
        contactEmail: email,
        paymentMethod,
      },
    });
  };

  return (
    <main className="routes-page">
      <section className="routes-hero routes-hero_compact" />
      <ProgressBar step={3} />

      <div className="routes-layout">
        <TripDetailsSidebar orderData={orderData} />

        <section className="passengers-main">
          <form onSubmit={handleSubmit} className="payment-form">
            <div className="payment-card">
              {/* Секция 1: Персональные данные */}
              <div className="payment-section">
                <h3 className="payment-card__heading">Персональные данные</h3>

                <div className="payment-grid-3">
                  <div className="pass-field">
                    <label className="pass-label">Фамилия</label>
                    <input
                      type="text"
                      className="pass-input"
                      placeholder="Мартынюк"
                      value={lastName}
                      onChange={(e) => { setLastName(e.target.value); setError(''); }}
                    />
                  </div>
                  <div className="pass-field">
                    <label className="pass-label">Имя</label>
                    <input
                      type="text"
                      className="pass-input"
                      placeholder="Ирина"
                      value={firstName}
                      onChange={(e) => { setFirstName(e.target.value); setError(''); }}
                    />
                  </div>
                  <div className="pass-field">
                    <label className="pass-label">Отчество</label>
                    <input
                      type="text"
                      className="pass-input"
                      placeholder="Эдуардовна"
                      value={middleName}
                      onChange={(e) => setMiddleName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="payment-single-col">
                  <div className="pass-field">
                    <label className="pass-label">Контактный телефон</label>
                    <input
                      type="tel"
                      className="pass-input"
                      placeholder="+7 ___ ___ __ __"
                      value={phone}
                      onChange={(e) => { setPhone(e.target.value); setError(''); }}
                    />
                  </div>

                  <div className="pass-field">
                    <label className="pass-label">E-mail</label>
                    <input
                      type="email"
                      className="pass-input"
                      placeholder="inbox@gmail.ru"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(''); }}
                    />
                  </div>
                </div>
              </div>

              {/* Секция 2: Способ оплаты */}
              <div className="payment-section payment-section_last">
                <h3 className="payment-card__heading">Способ оплаты</h3>

                <div className="payment-methods">
                  <label className={`payment-checkbox ${paymentMethod === 'online' ? 'payment-checkbox_active' : ''}`}>
                    <input
                      type="checkbox"
                      checked={paymentMethod === 'online'}
                      onChange={() => setPaymentMethod('online')}
                    />
                    <span>Онлайн</span>
                  </label>

                  <div className="payment-online-list">
                    <strong>Банковской<br />картой</strong>
                    <strong>PayPal</strong>
                    <strong>Visa QIWI Wallet</strong>
                  </div>
                </div>

                <div className="payment-cash-block">
                  <label className={`payment-checkbox ${paymentMethod === 'cash' ? 'payment-checkbox_active' : ''}`}>
                    <input
                      type="checkbox"
                      checked={paymentMethod === 'cash'}
                      onChange={() => setPaymentMethod('cash')}
                    />
                    <span>Наличными</span>
                  </label>
                </div>
              </div>

              {error && (
                <div className="passenger-card__error">
                  <span className="passenger-card__error-icon">✕</span>
                  <span>{error}</span>
                </div>
              )}
            </div>

            {/* Кнопка КУПИТЬ БИЛЕТЫ под карточкой справа как в Figma */}
            <div className="payment-footer">
              <button type="submit" className="button btn-buy-tickets">
                КУПИТЬ БИЛЕТЫ
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
