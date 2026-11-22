import './WagonMap.css';

export default function WagonMap({ carType, selectedSeats, onToggleSeat }) {
  const isLux = carType === 'Люкс';
  const isPlatzkart = carType === 'Плацкарт';
  const isSeated = carType === 'Сидячий';

  const count = isLux ? 16 : isPlatzkart ? 48 : isSeated ? 60 : 32;
  const seatsGrid = Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    occupied: (i * 7 + 3) % 10 < 3,
  }));

  const bgUrl = `${import.meta.env.BASE_URL}images/wagon-coupe.png`;

  // Для Сидячего — сетка 60 мест поверх картинки вагона
  if (isSeated) {
    return (
      <div className="wagon-scheme">
        <div className="wagon-scheme__top">
          <span className="wagon-scheme__note">11 человек выбирают места в этом поезде</span>
        </div>

        <div className="wagon-scheme__body" style={{ backgroundImage: `url(${bgUrl})` }}>
          <div className="wagon-scheme__seated-grid">
            {seatsGrid.map((seat) => (
              <button
                key={seat.id}
                type="button"
                disabled={seat.occupied}
                className={`seat-box seat-box_seated ${seat.occupied ? 'seat-box_occupied' : ''} ${
                  selectedSeats.includes(seat.id) ? 'seat-box_selected' : ''
                }`}
                onClick={() => onToggleSeat(seat.id, seat.occupied)}
              >
                {seat.id}
              </button>
            ))}
          </div>
        </div>

        <div className="seat-legend">
          <span><i className="seat-legend__dot seat-legend__dot_free" /> свободно</span>
          <span><i className="seat-legend__dot seat-legend__dot_selected" /> выбрано</span>
          <span><i className="seat-legend__dot seat-legend__dot_occupied" /> занято</span>
        </div>
      </div>
    );
  }

  // Для Купе (32), Люкс (16) и Плацкарта (32 сверху + 16 боковых снизу)
  const mainSeats = isPlatzkart ? seatsGrid.slice(0, 32) : seatsGrid;
  const sideSeats = isPlatzkart ? seatsGrid.slice(32) : [];

  const perCoupe = isLux ? 2 : 4;
  const coupes = [];
  for (let i = 0; i < mainSeats.length; i += perCoupe) {
    coupes.push(mainSeats.slice(i, i + perCoupe));
  }

  return (
    <div className="wagon-scheme">
      <div className="wagon-scheme__top">
        <span className="wagon-scheme__note">11 человек выбирают места в этом поезде</span>
      </div>

      <div className="wagon-scheme__body" style={{ backgroundImage: `url(${bgUrl})` }}>
        {/* Основные купе сверху */}
        <div className="wagon-scheme__grid">
          {coupes.map((coupeSeats, idx) => (
            <div key={idx} className={`coupe ${isLux ? 'coupe_lux' : ''}`}>
              {coupeSeats.map((seat) => (
                <button
                  key={seat.id}
                  type="button"
                  disabled={seat.occupied}
                  className={`seat-box ${seat.occupied ? 'seat-box_occupied' : ''} ${
                    selectedSeats.includes(seat.id) ? 'seat-box_selected' : ''
                  }`}
                  onClick={() => onToggleSeat(seat.id, seat.occupied)}
                >
                  {seat.id}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Боковые места снизу для Плацкарта */}
        {isPlatzkart && (
          <div className="wagon-scheme__side-grid">
            {sideSeats.map((seat) => (
              <button
                key={seat.id}
                type="button"
                disabled={seat.occupied}
                className={`seat-box seat-box_side ${seat.occupied ? 'seat-box_occupied' : ''} ${
                  selectedSeats.includes(seat.id) ? 'seat-box_selected' : ''
                }`}
                onClick={() => onToggleSeat(seat.id, seat.occupied)}
              >
                {seat.id}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="seat-legend">
        <span><i className="seat-legend__dot seat-legend__dot_free" /> свободно</span>
        <span><i className="seat-legend__dot seat-legend__dot_selected" /> выбрано</span>
        <span><i className="seat-legend__dot seat-legend__dot_occupied" /> занято</span>
      </div>
    </div>
  );
}
