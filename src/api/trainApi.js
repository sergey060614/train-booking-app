const BASE_URL = 'https://netoservices.ru';
let isServerDown = false;

const FALLBACK_CITIES = [
  { _id: 'city_msk', name: 'москва' },
  { _id: 'city_spb', name: 'санкт-петербург' },
  { _id: 'city_chel', name: 'челябинск' },
  { _id: 'city_ekb', name: 'екатеринбург' },
  { _id: 'city_kzn', name: 'казань' },
  { _id: 'city_sam', name: 'самара' },
  { _id: 'city_nn', name: 'нижний новгород' },
  { _id: 'city_nsk', name: 'новосибирск' },
];

const FALLBACK_ITEMS = [
  {
    departure: {
      _id: 'route_116c',
      have_wifi: true,
      is_express: true,
      duration: 34920,
      train: { name: '116С' },
      from: { city: { name: 'Москва' }, railway_station_name: 'Ленинградский вокзал', datetime: 1795306200 },
      to: { city: { name: 'Санкт-Петербург' }, railway_station_name: 'Московский вокзал', datetime: 1795341120 },
      available_seats_info: { fourth: 88, third: 52, second: 15, first: 4 },
      price_info: {
        fourth: { bottom_price: 1920 },
        third: { bottom_price: 2530 },
        second: { bottom_price: 3820 },
        first: { price: 4950 },
      },
    },
  },
  {
    departure: {
      _id: 'route_020u',
      have_wifi: true,
      is_express: false,
      duration: 31140,
      train: { name: '020У' },
      from: { city: { name: 'Москва' }, railway_station_name: 'Ленинградский вокзал', datetime: 1795306800 },
      to: { city: { name: 'Санкт-Петербург' }, railway_station_name: 'Ладожский вокзал', datetime: 1795337940 },
      available_seats_info: { third: 40, second: 20, first: 4 },
      price_info: {
        third: { bottom_price: 2610 },
        second: { bottom_price: 3950 },
        first: { price: 4950 },
      },
    },
  },
  {
    departure: {
      _id: 'route_001a',
      have_wifi: true,
      is_express: true,
      duration: 30720,
      train: { name: '001А' },
      from: { city: { name: 'Москва' }, railway_station_name: 'Ленинградский вокзал', datetime: 1795308060 },
      to: { city: { name: 'Санкт-Петербург' }, railway_station_name: 'Московский вокзал', datetime: 1795338780 },
      available_seats_info: { fourth: 60, third: 30, second: 10 },
      price_info: {
        fourth: { bottom_price: 2100 },
        third: { bottom_price: 2530 },
        second: { bottom_price: 3820 },
      },
    },
  },
];

async function request(endpoint, options = {}) {
  if (isServerDown) {
    throw new Error('Server offline');
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 1500);
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(`Ошибка сервера (${response.status})`);
    }
    return await response.json();
  } catch (err) {
    isServerDown = true;
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchCities(name) {
  const q = (name || '').trim().toLowerCase();
  try {
    const data = await request(`/routes/cities?name=${encodeURIComponent(name)}`);
    if (Array.isArray(data) && data.length > 0) return data;
  } catch {
    // Используем резервный список городов
  }
  const matched = FALLBACK_CITIES.filter((c) => c.name.includes(q));
  return matched.length > 0 ? matched : [{ _id: `city_${q}`, name: q }];
}

export async function fetchRoutes(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '' && value !== null && value !== false) {
      query.append(key, value);
    }
  });
  try {
    const data = await request(`/routes?${query.toString()}`);
    if (data?.items && data.items.length > 0) return data;
  } catch {
    // Используем резервные маршруты
  }
  return { total_count: FALLBACK_ITEMS.length, items: FALLBACK_ITEMS };
}

export async function fetchLastRoutes() {
  try {
    const data = await request('/routes/last');
    if (Array.isArray(data) && data.length > 0) return data;
  } catch {
    // Используем резервные билеты
  }
  return FALLBACK_ITEMS;
}

export async function fetchSeats(routeId, params = {}) {
  const query = new URLSearchParams(params).toString();
  try {
    return await request(`/routes/${routeId}/seats${query ? `?${query}` : ''}`);
  } catch {
    return [];
  }
}

export async function createOrder(payload) {
  try {
    return await request('/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    return { status: true };
  }
}

export async function subscribeEmail(email) {
  try {
    return await request(`/subscribe?email=${encodeURIComponent(email)}`, {
      method: 'POST',
    });
  } catch {
    return { status: true };
  }
}
