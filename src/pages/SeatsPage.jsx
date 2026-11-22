import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import SidebarFilter from '../components/SidebarFilter';
import WagonBlock from '../components/WagonBlock';
import CityInput from '../components/CityInput';
import './RoutesPage.css';
import './SeatsPage.css';

const CAR_TYPES_META = [
  { type: 'Сидячий', icon: '💺' },
  { type: 'Плацкарт', icon: '🚃' },
  { type: 'Купе', icon: '🛏️' },
  { type: 'Люкс', icon: '⭐' },
];

const AVAILABLE_WAGONS = ['07', '09'];

export default function SeatsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = location.state || {};
  const route = params.route;

  const [fromCity, setFromCity] = useState(params.fromCity || '');
  const [toCity, setToCity] = useState(params.toCity || '');
  const [dateOut, setDateOut] = useState(params.dateOut || '');
  const [dateReturn, setDateReturn] = useState(params.dateReturn || '');

  const [selectedType, setSelectedType] = useState(
    route?.carTypes?.[0]?.type || 'Купе'
  );
  const [selectedWagons, setSelectedWagons] = useState(['07']);
  const [seatsByWagon, setSeatsByWagon] = useState({});
  const [services, setServices] = useState({ wifi: false, linen: true, ac: true });

  const renderHero = () => (
    <section className="routes-hero">
      <div className="routes-hero__container">
        <form
          className="search-form search-form_horizontal"
          onSubmit={(e) => {
            e.preventDefault();
            navigate('/routes', { state: { fromCity, toCity, dateOut, dateReturn } });
          }}
        >
          <div className="search-form__col">
            <label className="search-form__label">Направление</label>
            <div className="search-form__row">
              <CityInput placeholder="Откуда" value={fromCity} onChange={setFromCity} />
              <button
                type="button"
                className="search-form__swap"
                onClick={() => {
                  setFromCity(toCity);
                  setToCity(fromCity);
                }}
              >
                ⇄
              </button>
              <CityInput placeholder="Куда" value={toCity} onChange={setToCity} />
            </div>
          </div>

          <div className="search-form__col">
            <label className="search-form__label">Дата</label>
            <div className="search-form__row">
              <input type="date" className="search-form__input" value={dateOut} onChange={(e) => setDateOut(e.target.value)} />
              <input type="date" className="search-form__input" value={dateReturn} onChange={(e) => setDateReturn(e.target.value)} />
            </div>
          </div>

          <button type="submit" className="button search-form__submit">НАЙТИ БИЛЕТЫ</button>
        </form>
      </div>
    </section>
  );

  if (!route) {
    return (
      <main className="routes-page">
        {renderHero()}
        <ProgressBar step={1} />
        <p className="routes__loading">Сначала выберите поезд на предыдущем шаге</p>
        <div style={{ textAlign: 'center', paddingBottom: 60 }}>
          <button type="button" className="button btn-select" style={{ maxWidth: 280 }} onClick={() => navigate('/')}>
            На главную
          </button>
        </div>
      </main>
    );
  }

  const carConfig = route.carTypes.find((c) => c.type === selectedType) || route.carTypes[0];
  const isLinenIncluded = carConfig.type === 'Купе' || carConfig.type === 'Люкс';

  const toggleWagon = (num) => {
    setSelectedWagons((prev) =>
      prev.includes(num)
        ? prev.length > 1
          ? prev.filter((w) => w !== num)
          : prev
        : [...prev, num]
    );
  };

  const toggleSeatInWagon = (wagonNum, seatId, occupied) => {
    if (occupied) return;
    setSeatsByWagon((prev) => {
      const current = prev[wagonNum] || [];
      const updated = current.includes(seatId)
        ? current.filter((s) => s !== seatId)
        : [...current, seatId];
      return { ...prev, [wagonNum]: updated };
    });
  };

  const allSelectedSeats = Object.values(seatsByWagon).flat();
  const servicesCost =
    (services.wifi ? 150 : 0) +
    (services.linen && !isLinenIncluded ? 200 : 0) +
    (services.ac ? 100 : 0);
  const totalPrice = allSelectedSeats.length * (carConfig.price + servicesCost);

  const handleNext = () => {
    if (allSelectedSeats.length === 0) return;
    navigate('/passengers', {
      state: {
        fromCity,
        toCity,
        dateOut,
        dateReturn,
        route,
        carType: carConfig.type,
        wagonNumber: selectedWagons.join(', '),
        seats: allSelectedSeats,
        pricePerSeat: carConfig.price + servicesCost,
      },
    });
  };

  return (
    <main className="routes-page">
      {renderHero()}
      <ProgressBar step={1} />

      <div className="routes-layout">
        <SidebarFilter />

        <section className="seats-main">
          <h1 className="seats-page-title">ВЫБОР МЕСТ</h1>

          <div className="seats-card">
            <div className="seats-card__top">
              <button
                type="button"
                className="btn-change-train"
                onClick={() => navigate('/routes', { state: { fromCity, toCity, dateOut, dateReturn } })}
              >
                <span className="btn-change-train__icon">➔</span>
                Выбрать другой поезд
              </button>
            </div>

            <div className="seats-train-bar">
              <div className="seats-train-bar__left">
                <span className="seats-train-bar__icon">🚆</span>
                <div>
                  <div className="seats-train-bar__num">{route.trainNumber}</div>
                  <div className="seats-train-bar__route">{route.from} → {route.to}</div>
                </div>
              </div>

              <div className="seats-train-bar__way">
                <div>
                  <div className="seats-train-bar__time">{route.departureTime}</div>
                  <div className="seats-train-bar__city">{route.from}</div>
                  <div className="seats-train-bar__station">{route.fromStation}</div>
                </div>
                <span className="way-arrow">➔</span>
                <div>
                  <div className="seats-train-bar__time">{route.arrivalTime}</div>
                  <div className="seats-train-bar__city">{route.to}</div>
                  <div className="seats-train-bar__station">{route.toStation}</div>
                </div>
              </div>

              <div className="seats-train-bar__duration">
                <span>🕒</span>
                <span>{route.duration}</span>
              </div>
            </div>

            <div className="seats-block">
              <h3 className="seats-block__title">Количество билетов</h3>
              <div className="ticket-counts">
                <div className="ticket-count-box ticket-count-box_active">
                  <div className="ticket-count-box__input">Взрослых — {allSelectedSeats.length}</div>
                  <div className="ticket-count-box__desc">
                    Можно добавить ещё {Math.max(0, 5 - allSelectedSeats.length)} пассажиров
                  </div>
                </div>
                <div className="ticket-count-box">
                  <div className="ticket-count-box__input">Детских — 0</div>
                  <div className="ticket-count-box__desc">
                    Можно добавить ещё 3 детей до 10 лет. Своё место в вагоне, как у взрослых,
                    но дешевле в среднем на 50–65%
                  </div>
                </div>
                <div className="ticket-count-box">
                  <div className="ticket-count-box__input">Детских «без места» — 0</div>
                </div>
              </div>
            </div>

            <div className="seats-block">
              <h3 className="seats-block__title">Тип вагона</h3>
              <div className="wagon-types">
                {CAR_TYPES_META.map((item) => {
                  const availableCar = route.carTypes.find((c) => c.type === item.type);
                  return (
                    <button
                      key={item.type}
                      type="button"
                      disabled={!availableCar}
                      className={`wagon-type-btn ${selectedType === item.type ? 'wagon-type-btn_active' : ''}`}
                      onClick={() => {
                        setSelectedType(item.type);
                        setSeatsByWagon({});
                      }}
                    >
                      <span className="wagon-type-btn__icon">{item.icon}</span>
                      <span className="wagon-type-btn__label">{item.type}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="wagon-numbers-bar">
              <div className="wagon-numbers-bar__left">
                <span>Вагоны</span>
                {AVAILABLE_WAGONS.map((num) => (
                  <button
                    key={num}
                    type="button"
                    className={`wagon-num-btn ${selectedWagons.includes(num) ? 'wagon-num-btn_active' : ''}`}
                    onClick={() => toggleWagon(num)}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <span className="wagon-numbers-bar__note">
                Нумерация вагонов начинается с головы поезда
              </span>
            </div>

            {selectedWagons.map((wagonNum) => (
              <WagonBlock
                key={wagonNum}
                wagonNum={wagonNum}
                carConfig={carConfig}
                services={services}
                isLinenIncluded={isLinenIncluded}
                onToggleService={(key) => setServices((s) => ({ ...s, [key]: !s[key] }))}
                selectedSeats={seatsByWagon[wagonNum] || []}
                onToggleSeat={(seatId, occ) => toggleSeatInWagon(wagonNum, seatId, occ)}
              />
            ))}

            {totalPrice > 0 && (
              <div className="seats-total">
                <span>Итого:</span>
                <span className="seats-total__price">
                  {totalPrice.toLocaleString('ru-RU')} ₽
                </span>
              </div>
            )}

            <button
              type="button"
              className="button btn-next"
              disabled={allSelectedSeats.length === 0}
              onClick={handleNext}
            >
              ДАЛЕЕ
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
