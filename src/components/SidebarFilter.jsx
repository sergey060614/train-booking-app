import { useState, useEffect } from 'react';
import { fetchLastRoutes } from '../api/trainApi';
import { mapRouteItem } from '../api/mappers';
import './SidebarFilter.css';


const OPTIONS_LIST = [
  { key: 'coupe', label: 'Купе', icon: '🛏️' },
  { key: 'platzkart', label: 'Плацкарт', icon: '🚃' },
  { key: 'seated', label: 'Сидячий', icon: '💺' },
  { key: 'lux', label: 'Люкс', icon: '⭐' },
  { key: 'wifi', label: 'Wi-Fi', icon: '📶' },
  { key: 'express', label: 'Экспресс', icon: '🚀' },
];

export default function SidebarFilter({ onFilterChange }) {
  const [dateOut, setDateOut] = useState('2026-11-11');
  const [dateReturn, setDateReturn] = useState('2026-11-20');

  const [toggles, setToggles] = useState({
    coupe: true,
    platzkart: false,
    seated: false,
    lux: false,
    wifi: true,
    express: false,
  });

  const [priceMin, setPriceMin] = useState(1920);
  const [priceMax, setPriceMax] = useState(4500);
  const [openAcc, setOpenAcc] = useState({ there: true, back: true });
  const [timeRange, setTimeRange] = useState({
    thereDep: 11,
    thereArr: 15,
    backDep: 11,
    backArr: 15,
  });
  const [lastTickets, setLastTickets] = useState([]);

  useEffect(() => {
    fetchLastRoutes()
      .then((data) => {
        if (Array.isArray(data)) {
          setLastTickets(data.slice(0, 3).map((item, idx) => mapRouteItem(item, idx)));
        }
      })
      .catch(() => setLastTickets([]));
  }, []);

    const handleToggle = (key) => {
    const updated = { ...toggles, [key]: !toggles[key] };
    setToggles(updated);
    onFilterChange?.({
      have_second_class: updated.coupe,
      have_third_class: updated.platzkart,
      have_fourth_class: updated.seated,
      have_first_class: updated.lux,
      have_wifi: updated.wifi,
      have_express: updated.express,
      price_from: priceMin,
      price_to: priceMax,
    });
  };


  const toggleAccordion = (key) => {
    setOpenAcc((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const leftPct = ((priceMin - 1920) / (7000 - 1920)) * 100;
  const rightPct = 100 - ((priceMax - 1920) / (7000 - 1920)) * 100;

  return (
    <aside className="sidebar-wrapper">
      <div className="sidebar-filter">
        {/* Даты */}
        <div className="sidebar-section">
          <div className="sidebar-field">
            <label className="sidebar-label">Дата поездки</label>
            <input
              type="date"
              className="sidebar-input"
              value={dateOut}
              onChange={(e) => setDateOut(e.target.value)}
            />
          </div>

          <div className="sidebar-field">
            <label className="sidebar-label">Дата возвращения</label>
            <input
              type="date"
              className="sidebar-input"
              value={dateReturn}
              onChange={(e) => setDateReturn(e.target.value)}
            />
          </div>
        </div>

        {/* Переключатели */}
        <div className="sidebar-section">
          <ul className="sidebar-toggles">
            {OPTIONS_LIST.map(({ key, label, icon }) => (
              <li key={key} className="sidebar-toggle-item">
                <span className="sidebar-toggle-icon">{icon}</span>
                <span className="sidebar-toggle-name">{label}</span>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={toggles[key]}
                    onChange={() => handleToggle(key)}
                  />
                  <span className="switch__slider" />
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Стоимость */}
        <div className="sidebar-section">
          <h3 className="sidebar-title">Стоимость</h3>
          <div className="price-range">
            <div className="price-range__labels">
              <span>от</span>
              <span>до</span>
            </div>
            <div className="price-range__track">
              <div
                className="price-range__fill"
                style={{ left: `${leftPct}%`, right: `${rightPct}%` }}
              />
              <input
                type="range"
                min="1920"
                max="7000"
                value={priceMin}
                onChange={(e) => setPriceMin(Math.min(Number(e.target.value), priceMax - 200))}
                className="price-range__input"
              />
              <input
                type="range"
                min="1920"
                max="7000"
                value={priceMax}
                onChange={(e) => setPriceMax(Math.max(Number(e.target.value), priceMin + 200))}
                className="price-range__input"
              />
            </div>
            <div className="price-range__values">
              <span>{priceMin}</span>
              <span>{priceMax}</span>
              <span>7000</span>
            </div>
          </div>
        </div>

        {/* Аккордеоны Туда / Обратно с ползунками времени */}
        {[
          { key: 'there', title: 'Туда', isBack: false, depKey: 'thereDep', arrKey: 'thereArr' },
          { key: 'back', title: 'Обратно', isBack: true, depKey: 'backDep', arrKey: 'backArr' },
        ].map(({ key, title, isBack, depKey, arrKey }, idx) => (
          <div
            key={key}
            className={`sidebar-section ${idx === 1 ? 'sidebar-section_last' : ''}`}
          >
            <button
              type="button"
              className="sidebar-accordion-btn"
              onClick={() => toggleAccordion(key)}
            >
              <span className="accordion-left">
                <span className={`accordion-arrow ${isBack ? 'accordion-arrow_back' : ''}`}>➔</span>
                {title}
              </span>
              <span className="accordion-plus">{openAcc[key] ? '−' : '+'}</span>
            </button>

            {openAcc[key] && (
              <div className="sidebar-accordion-body">
                <div className="time-filter">
                  <div className="time-filter__title">Время отбытия</div>
                  <input
                    type="range"
                    min="0"
                    max="24"
                    value={timeRange[depKey]}
                    onChange={(e) =>
                      setTimeRange((prev) => ({ ...prev, [depKey]: Number(e.target.value) }))
                    }
                    className="time-filter__slider"
                  />
                  <div className="time-filter__values">
                    <span>0:00</span>
                    <span>{timeRange[depKey]}:00</span>
                    <span>24:00</span>
                  </div>
                </div>

                <div className="time-filter">
                  <div className="time-filter__title time-filter__title_right">Время прибытия</div>
                  <input
                    type="range"
                    min="0"
                    max="24"
                    value={timeRange[arrKey]}
                    onChange={(e) =>
                      setTimeRange((prev) => ({ ...prev, [arrKey]: Number(e.target.value) }))
                    }
                    className="time-filter__slider"
                  />
                  <div className="time-filter__values">
                    <span>0:00</span>
                    <span>{timeRange[arrKey]}:00</span>
                    <span>24:00</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Последние билеты */}
      {lastTickets.length > 0 && (
        <div className="last-tickets">
          <h3 className="last-tickets__title">ПОСЛЕДНИЕ БИЛЕТЫ</h3>
          <div className="last-tickets__list">
            {lastTickets.map((ticket) => {
              const minPrice = ticket.carTypes?.length
                ? Math.min(...ticket.carTypes.map((c) => c.price))
                : 2500;
              return (
                <div key={ticket.id} className="last-ticket-card">
                  <div className="last-ticket-card__row">
                    <div>
                      <div className="last-ticket-card__city">{ticket.from}</div>
                      <div className="last-ticket-card__station">{ticket.fromStation}</div>
                    </div>
                    <div className="last-ticket-card__right">
                      <div className="last-ticket-card__city">{ticket.to}</div>
                      <div className="last-ticket-card__station">{ticket.toStation}</div>
                    </div>
                  </div>
                  <div className="last-ticket-card__bottom">
                    <span className="last-ticket-card__icons">
                      {ticket.haveWifi ? '📶 ' : ''}
                      {ticket.isExpress ? '🚀 ' : ''}
                      ☕
                    </span>
                    <span className="last-ticket-card__price">
                      от <strong>{minPrice.toLocaleString('ru-RU')}</strong> ₽
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </aside>
  );
}