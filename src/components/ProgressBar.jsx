function ProgressBar({ step = 1 }) {
  const steps = [
    { id: 1, title: 'Билеты' },
    { id: 2, title: 'Пассажиры' },
    { id: 3, title: 'Оплата' },
    { id: 4, title: 'Проверка' },
  ];

  return (
    <div className="progress-bar" style={{ background: '#3e3c47', padding: '15px 0', width: '100%' }}>
      <div
        className="progress-bar__container"
        style={{
          maxWidth: '1126px',
          margin: '0 auto',
          display: 'flex',
          padding: '0 20px',
        }}
      >
        {steps.map((s, i) => {
          const isActive = s.id === step;
          const isPast = s.id < step;

          return (
            <div
              key={s.id}
              className={`progress-bar__step ${isActive ? 'progress-bar__step_active' : ''}`}
              style={{
                flex: 1,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                height: '44px',
                fontSize: '16px',
                color: isActive ? '#000' : isPast ? '#ffa500' : '#ffffff',
                fontWeight: isActive ? 'bold' : 'normal',
                background: isActive ? '#ffa500' : 'transparent',
                clipPath:
                  i === 0
                    ? 'polygon(0 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, 0 100%)'
                    : 'polygon(0 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, 0 100%, 15px 50%)',
              }}
            >
              <span
                className="progress-bar__num"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '26px',
                  height: '26px',
                  border: '1px solid',
                  borderRadius: '50%',
                  flexShrink: 0,
                }}
              >
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
