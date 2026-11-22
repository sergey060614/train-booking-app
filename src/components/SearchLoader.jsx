import './SearchLoader.css';

export default function SearchLoader() {
  return (
    <div className="search-loader">
      <div className="search-loader__text">ИДЕТ ПОИСК</div>
      <div className="search-loader__track">
        <span className="search-loader__train">🚆</span>
        <div className="search-loader__line" />
      </div>
    </div>
  );
}
