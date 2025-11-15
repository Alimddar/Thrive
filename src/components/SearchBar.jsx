import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <Search className="search-icon" size={20} />
        <input
          type="text"
          placeholder="Məhsul, kateqoriya və ya xidmət axtar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button className="search-button">Axtar</button>
      </div>
      
      <div className="quick-search">
        <span className="quick-search-label">Populyar axtarışlar:</span>
        <button className="quick-tag" onClick={() => setSearchTerm('iPhone')}>
          iPhone
        </button>
        <button className="quick-tag" onClick={() => setSearchTerm('Samsung')}>
          Samsung
        </button>
        <button className="quick-tag" onClick={() => setSearchTerm('Nike')}>
          Nike ayaqqabı
        </button>
        <button className="quick-tag" onClick={() => setSearchTerm('MacBook')}>
          MacBook
        </button>
        <button className="quick-tag" onClick={() => setSearchTerm('qulaqlıq')}>
          qulaqlıq
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
