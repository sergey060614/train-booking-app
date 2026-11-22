import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import TripDetailsSidebar from '../components/TripDetailsSidebar';
import './RoutesPage.css';
import './PassengersPage.css';

const createEmptyPassenger = () => ({
  type: 'adult',
  lastName: '',
  firstName: '',
  patronymic: '',
  gender: 'male',
  birthDate: '',
  limitedMobility: false,
  docType: 'passport',
  passportSeries: '',
  passportNumber: '',
  birthCertNumber: '',
  isOpen: true,
  error: '',
  done: false,
});

export default function PassengersPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const orderData = location.state || {};
  const seatsCount = orderData.seats ? orderData.seats.length : 1;

  const [passengers, setPassengers] = useState(() =>
    Array.from({ length: seatsCount }, () => createEmptyPassenger())
  );

  const validatePassenger = (p) => {
    if (!p.lastName.trim() || !p.firstName.trim() || !p.birthDate) {
      return 'Заполните фамилию, имя и дату рождения пассажира';
    }
    if (p.docType === 'passport') {
      if (!/^\d{4}$/.test(p.passportSeries)) {
        return 'Серия паспорта указана некорректно. Пример: 4204';
      }
      if (!/^\d{6}$/.test(p.passportNumber)) {
        return 'Номер паспорта указан некорректно. Пример: 380694';
      }
    } else if (!/^[IVXLCDM]+-[А-ЯЁ]{2}-\d{6}$/i.test(p.birthCertNumber.trim())) {
      return 'Номер свидетельства о рождении указан некорректно. Пример: VIII-УН-256319';
    }
    return '';
  };

  const updatePassenger = (index, field, value) => {
    setPassengers((prev) =>
      prev.map((p, i) => {
        if (i !== index) return p;
        const updated = { ...p, [field]: value };
        // Пока карточка «помечена» ошибкой или отмечена зелёной — статус пересчитываем на лету
        const err = validatePassenger(updated);
        return {
          ...updated,
          error: p.error || p.done ? err : '',
          done: !err && p.done ? true : p.done && err ? false : p.done,
        };
      })
    );
  };

  const setPassengerStatus = (index, patch) => {
    setPassengers((prev) =>
      prev.map((p, i) => (i === index ? { ...p, ...patch } : p))
    );
  };

  const handleAddPassenger = () => {
    setPassengers((prev) => [...prev, createEmptyPassenger()]);
  };

  const handleRemovePassenger = (index) => {
    if (passengers.length <= 1) return;
    setPassengers((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNextPassenger = (idx) => {
    const err = validatePassenger(passengers[idx]);
    if (err) {
      setPassengerStatus(idx, { error: err, done: false });
      return;
    }
    // Валидация пройдена — отмечаем карточку зелёной
    setPassengerStatus(idx, { error: '', done: true });

    if (idx + 1 < passengers.length) {
      updatePassenger(idx + 1, 'isOpen', true);
    } else {
      handleAddPassenger();
    }
  };

  const handleNext = () => {
    let hasErrors = false;
    const checkedPassengers = passengers.map((p) => {
      const err = validatePassenger(p);
      if (err) hasErrors = true;
      return { ...p, error: err, done: !err };
    });

    setPassengers(checkedPassengers);

    if (hasErrors) return;

    navigate('/payment', {
      state: {
        ...orderData,
        passengers: checkedPassengers,
      },
    });
  };

  return (
    <main className="routes-page">
      <section className="routes-hero routes-hero_compact" />
      <ProgressBar step={2} />

      <div className="routes-layout">
        <TripDetailsSidebar orderData={orderData} />

        <section className="passengers-main">
          {passengers.map((p, idx) => (
            <div key={idx} className="passenger-card">
              {/* Шапка карточки пассажира */}
              <div className="passenger-card__header">
                <button
                  type="button"
                  className="passenger-card__toggle"
                  onClick={() => updatePassenger(idx, 'isOpen', !p.isOpen)}
                >
                  <span
                    className={`passenger-toggle-icon ${
                      p.isOpen ? 'passenger-toggle-icon_open' : ''
                    }`}
                  >
                    {p.isOpen ? '−' : '+'}
                  </span>
                  <span>Пассажир {idx + 1}</span>
                </button>

                {passengers.length > 1 && (
                  <button
                    type="button"
                    className="passenger-card__remove"
                    onClick={() => handleRemovePassenger(idx)}
                    title="Удалить пассажира"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Тело карточки */}
              {p.isOpen && (
                <div className="passenger-card__body">
                  {/* Тип билета */}
                  <div className="pass-row">
                    <select
                      className="pass-select"
                      value={p.type}
                      onChange={(e) => updatePassenger(idx, 'type', e.target.value)}
                    >
                      <option value="adult">Взрослый</option>
                      <option value="child">Детский</option>
                    </select>
                  </div>

                  {/* ФИО */}
                  <div className="pass-grid-3">
                    <div className="pass-field">
                      <label className="pass-label">Фамилия</label>
                      <input
                        type="text"
                        className="pass-input"
                        placeholder="Мартынюк"
                        value={p.lastName}
                        onChange={(e) => updatePassenger(idx, 'lastName', e.target.value)}
                      />
                    </div>
                    <div className="pass-field">
                      <label className="pass-label">Имя</label>
                      <input
                        type="text"
                        className="pass-input"
                        placeholder="Ирина"
                        value={p.firstName}
                        onChange={(e) => updatePassenger(idx, 'firstName', e.target.value)}
                      />
                    </div>
                    <div className="pass-field">
                      <label className="pass-label">Отчество</label>
                      <input
                        type="text"
                        className="pass-input"
                        placeholder="Эдуардовна"
                        value={p.patronymic}
                        onChange={(e) =>
                          updatePassenger(idx, 'patronymic', e.target.value)
                        }
                      />
                    </div>
                  </div>

                  {/* Пол и дата рождения */}
                  <div className="pass-grid-2">
                    <div className="pass-field">
                      <label className="pass-label">Пол</label>
                      <div className="gender-switch">
                        <button
                          type="button"
                          className={`gender-btn ${
                            p.gender === 'male' ? 'gender-btn_active' : ''
                          }`}
                          onClick={() => updatePassenger(idx, 'gender', 'male')}
                        >
                          М
                        </button>
                        <button
                          type="button"
                          className={`gender-btn ${
                            p.gender === 'female' ? 'gender-btn_active' : ''
                          }`}
                          onClick={() => updatePassenger(idx, 'gender', 'female')}
                        >
                          Ж
                        </button>
                      </div>
                    </div>

                    <div className="pass-field">
                      <label className="pass-label">Дата рождения</label>
                      <input
                        type="date"
                        className="pass-input"
                        value={p.birthDate}
                        onChange={(e) =>
                          updatePassenger(idx, 'birthDate', e.target.value)
                        }
                      />
                    </div>
                  </div>

                  {/* Чекбокс ограниченной подвижности */}
                  <label className="pass-checkbox">
                    <input
                      type="checkbox"
                      checked={p.limitedMobility}
                      onChange={(e) =>
                        updatePassenger(idx, 'limitedMobility', e.target.checked)
                      }
                    />
                    <span>ограниченная подвижность</span>
                  </label>

                  {/* Документ */}
                  <div className="pass-doc-section">
                    <div className="pass-field">
                      <label className="pass-label">Тип документа</label>
                      <select
                        className="pass-select"
                        value={p.docType}
                        onChange={(e) => updatePassenger(idx, 'docType', e.target.value)}
                      >
                        <option value="passport">Паспорт РФ</option>
                        <option value="birth-cert">Свидетельство о рождении</option>
                      </select>
                    </div>

                    {p.docType === 'passport' ? (
                      <>
                        <div className="pass-field">
                          <label className="pass-label">Серия</label>
                          <input
                            type="text"
                            maxLength={4}
                            className="pass-input"
                            placeholder="_ _ _ _"
                            value={p.passportSeries}
                            onChange={(e) =>
                              updatePassenger(
                                idx,
                                'passportSeries',
                                e.target.value.replace(/\D/g, '')
                              )
                            }
                          />
                        </div>
                        <div className="pass-field">
                          <label className="pass-label">Номер</label>
                          <input
                            type="text"
                            maxLength={6}
                            className="pass-input"
                            placeholder="_ _ _ _ _ _"
                            value={p.passportNumber}
                            onChange={(e) =>
                              updatePassenger(
                                idx,
                                'passportNumber',
                                e.target.value.replace(/\D/g, '')
                              )
                            }
                          />
                        </div>
                      </>
                    ) : (
                      <div className="pass-field">
                        <label className="pass-label">Номер</label>
                        <input
                          type="text"
                          className="pass-input"
                          placeholder="VIII-УН-123456"
                          value={p.birthCertNumber}
                          onChange={(e) =>
                            updatePassenger(idx, 'birthCertNumber', e.target.value)
                          }
                        />
                      </div>
                    )}
                  </div>

                  {/* Кнопка «Следующий пассажир» */}
                  <button
                    type="button"
                    className="btn-next-pass"
                    onClick={() => handleNextPassenger(idx)}
                  >
                    Следующий пассажир
                  </button>
                </div>
              )}

              {/* Статус карточки: ошибка или «Готово» */}
              {p.error ? (
                <div className="passenger-card__error">
                  <span className="passenger-card__error-icon">✕</span>
                  <span>{p.error}</span>
                </div>
              ) : p.done ? (
                <div className="passenger-card__done">
                  <span className="passenger-card__done-icon">✓</span>
                  <span>Готово</span>
                  <button
                    type="button"
                    className="btn-next-pass btn-next-pass_in-done"
                    onClick={() => handleNextPassenger(idx)}
                  >
                    Следующий пассажир
                  </button>
                </div>
              ) : null}
            </div>
          ))}

          {/* Кнопка «Добавить пассажира» */}
          <button
            type="button"
            className="btn-add-passenger"
            onClick={handleAddPassenger}
          >
            Добавить пассажира <span className="btn-add-passenger__plus">+</span>
          </button>

          {/* Кнопка «Далее» */}
          <button type="button" className="button btn-next" onClick={handleNext}>
            ДАЛЕЕ
          </button>
        </section>
      </div>
    </main>
  );
}
