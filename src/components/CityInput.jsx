import { useState, useRef, useEffect } from 'react';
import { fetchCities } from '../api/trainApi';
import './CityInput.css';

export default function CityInput({ value, onChange, onSelectCity, placeholder }) {
  const [cities, setCities] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  const query = (value || '').trim();

  useEffect(() => {
    if (!query) return;

    const timer = setTimeout(() => {
      fetchCities(query)
        .then((data) => {
          setCities(Array.isArray(data) ? data : []);
          setIsOpen(true);
        })
        .catch(() => setCities([]));
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const visibleCities = query ? cities : [];

  return (
    <div className="city-input-wrap" ref={wrapperRef}>
      <input
        type="text"
        className="search-form__input"
        placeholder={placeholder}
        value={value}
        onFocus={() => visibleCities.length > 0 && setIsOpen(true)}
        onChange={(e) => {
          const nextValue = e.target.value;
          onChange(nextValue);
          if (!nextValue.trim()) {
            setCities([]);
            setIsOpen(false);
          }
          if (onSelectCity) onSelectCity('');
        }}
      />

      {isOpen && visibleCities.length > 0 && (
        <ul className="city-dropdown">
          {visibleCities.map((city) => (
            <li
              key={city._id}
              className="city-dropdown__item"
              onMouseDown={() => {
                onChange(city.name.toUpperCase());
                if (onSelectCity) onSelectCity(city._id);
                setIsOpen(false);
              }}
            >
              {city.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
