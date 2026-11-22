import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import SidebarFilter from '../components/SidebarFilter';
import CityInput from '../components/CityInput';
import SearchLoader from '../components/SearchLoader';
import InfoModal from '../components/InfoModal';
import { fetchCities, fetchRoutes } from '../api/trainApi';
import { mapRouteItem } from '../api/mappers';
import './RoutesPage.css';

const durationToMinutes = (d) => {
  const [h, m] = d.split(':').map(Number);
  return h * 60 + m;
};

export default function RoutesPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = location.state;

  const [fromCity, setFromCity] = useState(searchParams?.fromCity || '');
  const [toCity, setToCity] = useState(searchParams?.toCity || '');
  const [fromCityId, setFromCityId] = useState(searchParams?.fromCityId || '');
  const [toCityId, setToCityId] = useState(searchParams?.toCityId || '');
  const [dateOut, setDateOut] = useState(searchParams?.dateOut || '');
  const [dateReturn, setDateReturn] = useState(searchParams?.dateReturn || '');

  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('date');
  const [limit, setLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [modal, setModal] = useState({ open: false, type: 'error', title: '', text: '' });

    useEffect(() => {
    if (!searchParams?.fromCity || !searchParams?.toCity) return;

    let isCancelled = false;

    const fetchData = async () => {
      try {
        let resolvedFromId = searchParams.fromCityId;
        let resolvedToId = searchParams.toCityId;

        if (!resolvedFromId) {
          const list = await fetchCities(searchParams.fromCity);
          resolvedFromId = list?.[0]?._id || '';
        }
        if (!resolvedToId) {
          const list = await fetchCities(searchParams.toCity);
          resolvedToId = list?.[0]?._id || '';
        }

        if (isCancelled) return;

        if (!resolvedFromId || !resolvedToId) {
          setRoutes([]);
          setModal({
            open: true,
            type: 'error',
            title: 'Направление не найдено',
            text: 'Проверьте правильность написания городов отправления и назначения.',
          });
          setLoading(false);
          return;
        }

        const data = await fetchRoutes({
          from_city_id: resolvedFromId,
          to_city_id: resolvedToId,
          date_start: searchParams.dateOut,
          date_end: searchParams.dateReturn,
          ...filters,
        });

        if (isCancelled) return;

        const items = Array.isArray(data?.items) ? data.items : [];
        setRoutes(items.map((item, idx) => mapRouteItem(item, idx)));
        setCurrentPage(1);
      } catch (err) {
        if (!isCancelled) {
          setRoutes([]);
          setModal({
            open: true,
            type: 'error',
            title: 'Ошибка при загрузке поездов',
            text: err.message || 'Не удалось связаться с сервером.',
          });
        }
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [searchParams, filters]);


  const handleSwapCities = () => {
    setFromCity(toCity);
    setToCity(fromCity);
    setFromCityId(toCityId);
    setToCityId(fromCityId);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!fromCity.trim() || !toCity.trim()) return;
    navigate('/routes', {
      replace: true,
      state: { fromCity, toCity, fromCityId, toCityId, dateOut, dateReturn },
    });
  };

  const sortedRoutes = [...routes].sort((a, b) => {
    if (sortBy === 'price') {
      const minA = a.carTypes.length ? Math.min(...a.carTypes.map((c) => c.price)) : 0;
      const minB = b.carTypes.length ? Math.min(...b.carTypes.map((c) => c.price)) : 0;
      return minA - minB;
    }
    if (sortBy === 'duration') {
      return durationToMinutes(a.duration) - durationToMinutes(b.duration);
    }
    return a.departureTime.localeCompare(b.departureTime);
  });

  const totalPages = Math.max(1, Math.ceil(sortedRoutes.length / limit));
  const visibleRoutes = sortedRoutes.slice((currentPage - 1) * limit, currentPage * limit);

  const renderHero = () => (
    <section className="routes-hero">
      <div className="routes-hero__container">
        <form className="search-form search-form_horizontal" onSubmit={handleSearch}>
          <div className="search-form__col">
            <label className="search-form__label">Направление</label>
            <div className="search-form__row">
              <CityInput placeholder="Откуда" value={fromCity} onChange={setFromCity} onSelectCity={setFromCityId} />
              <button type="button" className="search-form__swap" onClick={handleSwapCities}>⇄</button>
              <CityInput placeholder="Куда" value={toCity} onChange={setToCity} onSelectCity={setToCityId} />
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

  if (loading) {
    return (
      <main className="routes-page">
        {renderHero()}
        <SearchLoader />
      </main>
    );
  }

  return (
    <main className="routes-page">
      {renderHero()}
      <ProgressBar step={1} />

      <div className="routes-layout">
        <SidebarFilter onFilterChange={setFilters} />

        <section className="routes-list">
          <header className="list-header">
            <span className="list-header__count">найдено {sortedRoutes.length}</span>
            <div className="list-header__controls">
              <div className="list-sort">
                <span>сортировать по: </span>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="date">времени</option>
                  <option value="price">стоимости</option>
                  <option value="duration">длительности</option>
                </select>
              </div>
              <div className="list-limit">
                <span>показывать по: </span>
                {[5, 10, 20].map((num) => (
                  <button
                    key={num}
                    type="button"
                    className={`limit-btn ${limit === num ? 'limit-btn_active' : ''}`}
                    onClick={() => { setLimit(num); setCurrentPage(1); }}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          </header>

          {visibleRoutes.length === 0 ? (
            <p className="routes__empty">По вашему запросу поездов не найдено. Попробуйте изменить фильтры.</p>
          ) : (
            <div className="routes-cards">
              {visibleRoutes.map((route) => (
                <article key={route.id} className="route-card">
                  <div className="route-card__left">
                    <div className="train-icon">🚆</div>
                    <span className="train-number">{route.trainNumber}</span>
                    <span className="train-route">{route.from} →<br />{route.to}</span>
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
                      {route.carTypes.map((car, idx) => (
                        <div key={idx} className="car-option">
                          <span className="car-type">{car.type}</span>
                          <span className="car-seats">{car.seats}</span>
                          <span className="car-price">
                            от <strong>{car.price.toLocaleString('ru-RU')}</strong> ₽
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="route-card__bottom">
                      <div className="route-card__icons">
                        {route.haveWifi && <span title="Wi-Fi">📶</span>}
                        {route.isExpress && <span title="Экспресс">🚀</span>}
                        <span title="Питание">☕</span>
                      </div>
                      <button
                        type="button"
                        className="button btn-select"
                        onClick={() =>
                          navigate('/seats', {
                            state: { route, fromCity, toCity, dateOut, dateReturn },
                          })
                        }
                      >
                        Выбрать места
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="pagination">
            <button
              type="button"
              className="page-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                type="button"
                className={`page-btn ${currentPage === page ? 'page-btn_active' : ''}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              type="button"
              className="page-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              &gt;
            </button>
          </div>
        </section>
      </div>

      <InfoModal
        isOpen={modal.open}
        type={modal.type}
        title={modal.title}
        text={modal.text}
        onClose={() => setModal((prev) => ({ ...prev, open: false }))}
      />
    </main>
      );
}