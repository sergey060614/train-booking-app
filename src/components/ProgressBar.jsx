function ProgressBar({ step = 1 }) {
  const steps = [
    { id: 1, title: 'Билеты' },
    { id: 2, title: 'Пассажиры' },
    { id: 3, title: 'Оплата' },
    { id: 4, title: 'Проверка' },
  ];

  return (
    <div className="progress-bar" style={{ background: '#3e3c47', padding: '15px 0', width: '100%' }}>
      <div className="progress-bar__container" style={{ maxWidth: '1126px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', padding: '0 20px' }}>
        {steps.map((s) => {
          const isActive = s.id === step;
          const isPast = s.id < step;
          
          return (
            <div 
              key={s.id} 
              className={`progress-bar__step ${isActive ? 'progress-bar__step_active' : ''}`}
              style={{
                color: isActive || isPast ? '#ffa500' : '#ffffff',
                fontWeight: isActive ? 'bold' : 'normal',
                fontSize: '16px',
                position: 'relative',
                flex: 1,
                textAlign: 'center'
              }}
            >
              <span className="progress-bar__num" style={{ marginRight: '8px', border: '1px solid', borderRadius: '50%', padding: '2px 7px' }}>
                {s.id}
              </span>
              {s.title}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProgressBar;
