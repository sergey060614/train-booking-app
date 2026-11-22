import { useState } from 'react';
import './TripDetailsSidebar.css';

export default function TripDetailsSidebar({ orderData }) {
  const {
    route,
    dateOut,
    dateReturn,
    seats = [],
    pricePerSeat = 0,
  } = orderData || {};

  const [openThere, setOpenThere] = useState(true);
  const [openBack, setOpenBack] = useState(true);
  const [openPass, setOpenPass] = useState(true);

  if (!route) return null;

  const totalSum = seats.length * pricePerSeat;

  return (
    <aside className="trip-sidebar">
      <div className="trip-sidebar__header">ДЕТАЛИ ПОЕЗДКИ</div>

      <div className="trip-sidebar__section">
        <button
          type="button"
          className="trip-sidebar__toggle"
          onClick={() => setOpenThere(!openThere)}
        >
          <span className="trip-sidebar__title">
            <span className="trip-badge">➔</span> Туда
            <small className="trip-date">{dateOut || '30.08.2026'}</small>
          </span>
          <span className="trip-plus">{openThere ? '−' : '+'}</span>
        </button>

        {openThere && (
          <div className="trip-sidebar__content">
            <div className="trip-row">
              <span>№ Поезда</span>
              <strong>{route.trainNumber}</strong>
            </div>
            <div className="trip-row">
              <span>Название</span>
              <strong className="trip-right">
                {route.from}<br />{route.to}
              </strong>
            </div>

            <div className="trip-times">
              <div>
                <div className="trip-time">{route.departureTime}</div>
                <div className="trip-sub">{dateOut || '30.08.2026'}</div>
              </div>
              <div className="trip-dur">
                <span>{route.duration}</span>
                <span className="trip-arrow">➔</span>
              </div>
              <div className="trip-right">
                <div className="trip-time">{route.arrivalTime}</div>
                <div className="trip-sub">{dateOut || '30.08.2026'}</div>
              </div>
            </div>

            <div className="trip-stations">
              <div>
                <div className="trip-city">{route.from}</div>
                <div className="trip-sub">{route.fromStation}</div>
              </div>
              <div className="trip-right">
                <div className="trip-city">{route.to}</div>
                <div className="trip-sub">{route.toStation}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {dateReturn && (
        <div className="trip-sidebar__section">
          <button
            type="button"
            className="trip-sidebar__toggle"
            onClick={() => setOpenBack(!openBack)}
          >
            <span className="trip-sidebar__title">
              <span className="trip-badge trip-badge_back">➔</span> Обратно
              <small className="trip-date">{dateReturn}</small>
            </span>
            <span className="trip-plus">{openBack ? '−' : '+'}</span>
          </button>

          {openBack && (
            <div className="trip-sidebar__content">
              <div className="trip-row">
                <span>№ Поезда</span>
                <strong>{route.trainNumber}</strong>
              </div>
              <div className="trip-row">
                <span>Название</span>
                <strong className="trip-right">
                  {route.to}<br />{route.from}
                </strong>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="trip-sidebar__section">
        <button
          type="button"
          className="trip-sidebar__toggle"
          onClick={() => setOpenPass(!openPass)}
        >
          <span className="trip-sidebar__title">
            <span className="trip-badge">👤</span> Пассажиры
          </span>
          <span className="trip-plus">{openPass ? '−' : '+'}</span>
        </button>

        {openPass && (
          <div className="trip-sidebar__content">
            <div className="trip-row">
              <span>{seats.length} Взрослых</span>
              <strong className="trip-price">
                {totalSum.toLocaleString('ru-RU')} <span>₽</span>
              </strong>
            </div>
          </div>
        )}
      </div>

      <div className="trip-sidebar__total">
        <span>ИТОГ</span>
        <strong>{totalSum.toLocaleString('ru-RU')} <span>₽</span></strong>
      </div>
    </aside>
  );
}
