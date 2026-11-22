import './InfoModal.css';

export default function InfoModal({
  isOpen,
  type = 'info', // 'error' или 'info'
  title,
  text,
  onClose,
}) {
  if (!isOpen) return null;

  const isError = type === 'error';

  return (
    <div className="info-modal-overlay" onClick={onClose}>
      <div className="info-modal" onClick={(e) => e.stopPropagation()}>
        <div className={`info-modal__header ${isError ? 'info-modal__header_error' : 'info-modal__header_info'}`}>
          <span className={`info-modal__icon ${isError ? 'info-modal__icon_error' : 'info-modal__icon_info'}`}>
            {isError ? '!' : 'i'}
          </span>
        </div>

        <div className="info-modal__body">
          {title && <h3 className="info-modal__title">{title}</h3>}
          {text && <p className="info-modal__text">{text}</p>}
        </div>

        <div className="info-modal__footer">
          <button type="button" className="info-modal__btn" onClick={onClose}>
            Понятно
          </button>
        </div>
      </div>
    </div>
  );
}
