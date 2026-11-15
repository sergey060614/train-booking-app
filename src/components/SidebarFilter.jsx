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

      {/* Интерактивные ползунки для регулирования диапазона */}
<div className="sidebar-filter__sliders-container">
  <input 
    type="range" 
    min="1000" 
    max="15000" 
    value={priceFrom} 
    onChange={(e) => setPriceFrom(Number(e.target.value))} // Исправлено здесь
    className="sidebar-filter__slider" 
  />
  <input 
    type="range" 
    min="1000" 
    max="15000" 
    value={priceTo} 
    onChange={(e) => setPriceTo(Number(e.target.value))}
    className="sidebar-filter__slider" 
  />
</div>
    </aside>
  );
}

export default SidebarFilter;
