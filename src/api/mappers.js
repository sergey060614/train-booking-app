// Переводим секунды Unix в формат "ЧЧ:ММ"
export function formatTime(timestamp) {
  if (!timestamp) return '00:00';
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
}

// Переводим длительность в секундах в "ЧЧ:ММ"
export function formatDuration(seconds) {
  if (!seconds) return '00:00';
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

// Преобразуем элемент из /routes или /routes/last в объект карточки
export function mapRouteItem(item, index = 0) {
  const dep = item.departure || item;
  const seatsInfo = dep.available_seats_info || {};
  const priceInfo = dep.price_info || {};

  const carTypes = [];
  if (seatsInfo.fourth || priceInfo.fourth) {
    carTypes.push({
      type: 'Сидячий',
      seats: seatsInfo.fourth || 0,
      price: priceInfo.fourth?.bottom_price || priceInfo.fourth?.top_price || 1900,
    });
  }
  if (seatsInfo.third || priceInfo.third) {
    carTypes.push({
      type: 'Плацкарт',
      seats: seatsInfo.third || 0,
      price: priceInfo.third?.bottom_price || priceInfo.third?.top_price || 2500,
    });
  }
  if (seatsInfo.second || priceInfo.second) {
    carTypes.push({
      type: 'Купе',
      seats: seatsInfo.second || 0,
      price: priceInfo.second?.bottom_price || priceInfo.second?.top_price || 3800,
    });
  }
  if (seatsInfo.first || priceInfo.first) {
    carTypes.push({
      type: 'Люкс',
      seats: seatsInfo.first || 0,
      price: priceInfo.first?.price || priceInfo.first?.bottom_price || 4950,
    });
  }

  return {
    id: dep._id || index,
    trainNumber: dep.train?.name || '116С',
    from: dep.from?.city?.name || '',
    fromStation: dep.from?.railway_station_name || '',
    to: dep.to?.city?.name || '',
    toStation: dep.to?.railway_station_name || '',
    departureTime: formatTime(dep.from?.datetime),
    arrivalTime: formatTime(dep.to?.datetime),
    duration: formatDuration(dep.duration),
    haveWifi: Boolean(dep.have_wifi),
    isExpress: Boolean(dep.is_express),
    carTypes,
  };
}
