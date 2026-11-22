import WagonMap from './WagonMap';

export default function WagonBlock({
  wagonNum,
  carConfig,
  services,
  isLinenIncluded,
  onToggleService,
  selectedSeats,
  onToggleSeat,
}) {
  const isPlatzkart = carConfig.type === 'Плацкарт';
  const isLux = carConfig.type === 'Люкс';

  return (
    <div className="wagon-instance">
      <div className="wagon-details">
        <div className="wagon-details__num">
          <strong>{wagonNum}</strong>
          <span>вагон</span>
        </div>

        <div className="wagon-details__col">
          <div className="wagon-details__head">
            Места <strong>{carConfig.seats}</strong>
          </div>
          {!isLux && (
            <>
              <div className="wagon-details__row">
                <span>Верхние</span>
                <strong>{Math.floor(carConfig.seats / 3)}</strong>
              </div>
              <div className="wagon-details__row">
                <span>Нижние</span>
                <strong>{Math.ceil(carConfig.seats / 3)}</strong>
              </div>
            </>
          )}
          {isPlatzkart && (
            <div className="wagon-details__row">
              <span>Боковые</span>
              <strong>{Math.floor(carConfig.seats / 3)}</strong>
            </div>
          )}
        </div>

        <div className="wagon-details__col">
          <div className="wagon-details__head">Стоимость</div>
          <div className="wagon-details__row">
            <strong>{carConfig.price.toLocaleString('ru-RU')}</strong> ₽
          </div>
          {!isLux && (
            <div className="wagon-details__row">
              <strong>{(carConfig.price + 400).toLocaleString('ru-RU')}</strong> ₽
            </div>
          )}
          {isPlatzkart && (
            <div className="wagon-details__row">
              <strong>{(carConfig.price - 300).toLocaleString('ru-RU')}</strong> ₽
            </div>
          )}
        </div>

        <div className="wagon-details__col">
          <div className="wagon-details__head">Обслуживание ФПК</div>
          <div className="services-block">
            <button
              type="button"
              data-tooltip="кондиционер"
              className={`service-icon-btn ${services.ac ? 'service-icon-btn_active' : ''}`}
              onClick={() => onToggleService('ac')}
            >
              ❄️
            </button>
            <button
              type="button"
              data-tooltip="wi-fi"
              className={`service-icon-btn ${services.wifi ? 'service-icon-btn_active' : ''}`}
              onClick={() => onToggleService('wifi')}
            >
              📶
            </button>
            <button
              type="button"
              data-tooltip="бельё"
              className={`service-icon-btn ${services.linen ? 'service-icon-btn_active' : ''}`}
              onClick={() => !isLinenIncluded && onToggleService('linen')}
            >
              🛏️
            </button>
          </div>
        </div>
      </div>

      <WagonMap
        carType={carConfig.type}
        selectedSeats={selectedSeats}
        onToggleSeat={onToggleSeat}
      />
    </div>
  );
}
