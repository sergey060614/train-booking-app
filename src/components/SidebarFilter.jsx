import { useState } from 'react';

function SidebarFilter() {
  const [priceFrom, setPriceFrom] = useState(1920);
  const [priceTo, setPriceTo] = useState(7000);

  return (
    <aside className="sidebar-filter">
      {/* Блок даты */}
      <div className="sidebar-filter__section">
        <label className="sidebar-filter__label">Дата поездки</label>
        <input type="date" className="sidebar-filter__input-date" />
      </div>

      {/* Переключатели / Радиокнопки типов вагонов */}
      <div className="sidebar-filter__section">
        <h4 className="sidebar-filter__subtitle">Тип вагона</h4>
        <div className="sidebar-filter__checkbox-group">
          <label className="sidebar-filter__checkbox-label">
            <input type="checkbox" className="sidebar-filter__checkbox" defaultChecked />
            <span className="sidebar-filter__checkbox-text">Купе</span>
          </label>
          <label className="sidebar-filter__checkbox-label">
            <input type="checkbox" className="sidebar-filter__checkbox" />
            <span className="sidebar-filter__checkbox-text">Плацкарт</span>
          </label>
        </div>
      </div>

      {/* Ползунок стоимости (Инпуты для связи со стейтом) */}
      <div className="sidebar-filter__section">
        <h4 className="sidebar-filter__subtitle">Стоимость</h4>
        <div className="sidebar-filter__price-range">
          <span>от {priceFrom}</span>
          <span>до {priceTo}</span>
        </div>
        <input 
          type="range" 
          min="1000" 
          max="10000" 
          value={priceTo} 
          onChange={(e) => setPriceTo(e.target.value)}
          className="sidebar-filter__slider" 
        />
      </div>
    </aside>
  );
}

export default SidebarFilter;
