function CoachSchema({ type }) {
  // Симуляция данных с сервера (занятые места)
  const genericSeats = [
    { number: 1, isAvailable: true },
    { number: 2, isAvailable: false },
    { number: 3, isAvailable: true },
    { number: 4, isAvailable: true },
  ];

  return (
    <div className={`coach-schema coach-schema_${type}`}>
      <h3 className="coach-schema__title">Схема вагона: {type}</h3>
      
      <div className="coach-schema__wagon-body">
        {/* Коридор вагона */}
        <div className="coach-schema__corridor"></div>
        
        {/* Сетка с местами */}
        <div className="coach-schema__seats-grid">
          {genericSeats.map((seat) => (
            <button
              key={seat.number}
              disabled={!seat.isAvailable}
              className={`coach-schema__seat ${
                seat.isAvailable ? 'coach-schema__seat_free' : 'coach-schema__seat_taken'
              }`}
            >
              {seat.number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CoachSchema;
