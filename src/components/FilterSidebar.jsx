import React from 'react';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';

const FilterSidebar = ({ filters, setFilters }) => {
  const [expandedSections, setExpandedSections] = React.useState({
    category: true,
    priceRange: true,
    term: true,
    features: true
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryChange = (category) => {
    setFilters(prev => ({
      ...prev,
      category: prev.category === category ? '' : category
    }));
  };

  const handlePriceChange = (range) => {
    setFilters(prev => ({
      ...prev,
      priceRange: range
    }));
  };

  return (
    <aside className="filter-sidebar">
      <div className="filter-header">
        <div style={{display: "flex", alignItems: "center", gap: "8px"}}>
          <Filter size={20} />
          <h3>Filterlər</h3>
        </div>
          <ChevronDown style={{cursor: "pointer"}}></ChevronDown>
      </div>


      {/* Kateqoriya */}
      <div className="filter-section">
        <button 
          className="filter-section-header"
          onClick={() => toggleSection('category')}
        >
          <span>Kateqoriya</span>
          {expandedSections.category ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {expandedSections.category && (
          <div className="filter-options">
            <label className="filter-option">
              <input
                type="radio"
                name="category"
                checked={filters.category === 'elektronika'}
                onChange={() => handleCategoryChange('elektronika')}
              />
              <span>Elektronika</span>
              <span className="count">(9)</span>
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="category"
                checked={filters.category === 'geyim'}
                onChange={() => handleCategoryChange('geyim')}
              />
              <span>Geyim və Ayaqqabı</span>
              <span className="count">(7)</span>
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="category"
                checked={filters.category === 'kosmetika'}
                onChange={() => handleCategoryChange('kosmetika')}
              />
              <span>Kosmetika</span>
              <span className="count">(4)</span>
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="category"
                checked={filters.category === 'kitab'}
                onChange={() => handleCategoryChange('kitab')}
              />
              <span>Kitablar</span>
              <span className="count">(4)</span>
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="category"
                checked={filters.category === 'ev'}
                onChange={() => handleCategoryChange('ev')}
              />
              <span>Ev və Bağ</span>
              <span className="count">(2)</span>
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="category"
                checked={filters.category === 'telefon'}
                onChange={() => handleCategoryChange('telefon')}
              />
              <span>Telefonlar</span>
              <span className="count">(2)</span>
            </label>
          </div>
        )}
      </div>

      {/* Qiymət aralığı */}
      <div className="filter-section">
        <button
          className="filter-section-header"
          onClick={() => toggleSection('priceRange')}
        >
          <span>Qiymət</span>
          {expandedSections.priceRange ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {expandedSections.priceRange && (
          <div className="filter-options">
            <label className="filter-option">
              <input
                type="radio"
                name="priceRange"
                checked={filters.priceRange === '0-100'}
                onChange={() => handlePriceChange('0-100')}
              />
              <span>0 ₼ - 100 ₼</span>
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="priceRange"
                checked={filters.priceRange === '100-500'}
                onChange={() => handlePriceChange('100-500')}
              />
              <span>100 ₼ - 500 ₼</span>
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="priceRange"
                checked={filters.priceRange === '500-1000'}
                onChange={() => handlePriceChange('500-1000')}
              />
              <span>500 ₼ - 1000 ₼</span>
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="priceRange"
                checked={filters.priceRange === '1000-3000'}
                onChange={() => handlePriceChange('1000-3000')}
              />
              <span>1000 ₼ - 3000 ₼</span>
            </label>
            <label className="filter-option">
              <input
                type="radio"
                name="priceRange"
                checked={filters.priceRange === '3000+'}
                onChange={() => handlePriceChange('3000+')}
              />
              <span>3000 ₼ +</span>
            </label>
          </div>
        )}
      </div>

      {/* Brend */}
      <div className="filter-section">
        <button
          className="filter-section-header"
          onClick={() => toggleSection('term')}
        >
          <span>Brend</span>
          {expandedSections.term ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {expandedSections.term && (
          <div className="filter-options">
            <label className="filter-option">
              <input
                type="checkbox"
                checked={filters.terms?.includes('apple')}
                onChange={(e) => {
                  const newTerms = e.target.checked
                    ? [...(filters.terms || []), 'apple']
                    : filters.terms?.filter(t => t !== 'apple') || [];
                  setFilters(prev => ({ ...prev, terms: newTerms }));
                }}
              />
              <span>Apple</span>
            </label>
            <label className="filter-option">
              <input
                type="checkbox"
                checked={filters.terms?.includes('samsung')}
                onChange={(e) => {
                  const newTerms = e.target.checked
                    ? [...(filters.terms || []), 'samsung']
                    : filters.terms?.filter(t => t !== 'samsung') || [];
                  setFilters(prev => ({ ...prev, terms: newTerms }));
                }}
              />
              <span>Samsung</span>
            </label>
            <label className="filter-option">
              <input
                type="checkbox"
                checked={filters.terms?.includes('nike')}
                onChange={(e) => {
                  const newTerms = e.target.checked
                    ? [...(filters.terms || []), 'nike']
                    : filters.terms?.filter(t => t !== 'nike') || [];
                  setFilters(prev => ({ ...prev, terms: newTerms }));
                }}
              />
              <span>Nike</span>
            </label>
            <label className="filter-option">
              <input
                type="checkbox"
                checked={filters.terms?.includes('sony')}
                onChange={(e) => {
                  const newTerms = e.target.checked
                    ? [...(filters.terms || []), 'sony']
                    : filters.terms?.filter(t => t !== 'sony') || [];
                  setFilters(prev => ({ ...prev, terms: newTerms }));
                }}
              />
              <span>Sony</span>
            </label>
            <label className="filter-option">
              <input
                type="checkbox"
                checked={filters.terms?.includes('adidas')}
                onChange={(e) => {
                  const newTerms = e.target.checked
                    ? [...(filters.terms || []), 'adidas']
                    : filters.terms?.filter(t => t !== 'adidas') || [];
                  setFilters(prev => ({ ...prev, terms: newTerms }));
                }}
              />
              <span>Adidas</span>
            </label>
            <label className="filter-option">
              <input
                type="checkbox"
                checked={filters.terms?.includes('dior')}
                onChange={(e) => {
                  const newTerms = e.target.checked
                    ? [...(filters.terms || []), 'dior']
                    : filters.terms?.filter(t => t !== 'dior') || [];
                  setFilters(prev => ({ ...prev, terms: newTerms }));
                }}
              />
              <span>Dior</span>
            </label>
            <label className="filter-option">
              <input
                type="checkbox"
                checked={filters.terms?.includes('dell')}
                onChange={(e) => {
                  const newTerms = e.target.checked
                    ? [...(filters.terms || []), 'dell']
                    : filters.terms?.filter(t => t !== 'dell') || [];
                  setFilters(prev => ({ ...prev, terms: newTerms }));
                }}
              />
              <span>Dell</span>
            </label>
            <label className="filter-option">
              <input
                type="checkbox"
                checked={filters.terms?.includes('levi\'s')}
                onChange={(e) => {
                  const newTerms = e.target.checked
                    ? [...(filters.terms || []), 'levi\'s']
                    : filters.terms?.filter(t => t !== 'levi\'s') || [];
                  setFilters(prev => ({ ...prev, terms: newTerms }));
                }}
              />
              <span>Levi's</span>
            </label>
          </div>
        )}
      </div>

      {/* Xüsusiyyətlər */}
      <div className="filter-section">
        <button
          className="filter-section-header"
          onClick={() => toggleSection('features')}
        >
          <span>Xüsusiyyətlər</span>
          {expandedSections.features ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
        {expandedSections.features && (
          <div className="filter-options">
            <label className="filter-option">
              <input
                type="checkbox"
                checked={filters.features?.includes('endirim')}
                onChange={(e) => {
                  const newFeatures = e.target.checked
                    ? [...(filters.features || []), 'endirim']
                    : filters.features?.filter(f => f !== 'endirim') || [];
                  setFilters(prev => ({ ...prev, features: newFeatures }));
                }}
              />
              <span>Endirimli</span>
            </label>
            <label className="filter-option">
              <input
                type="checkbox"
                checked={filters.features?.includes('yeni')}
                onChange={(e) => {
                  const newFeatures = e.target.checked
                    ? [...(filters.features || []), 'yeni']
                    : filters.features?.filter(f => f !== 'yeni') || [];
                  setFilters(prev => ({ ...prev, features: newFeatures }));
                }}
              />
              <span>Yeni məhsul</span>
            </label>
            <label className="filter-option">
              <input
                type="checkbox"
                checked={filters.features?.includes('populyar')}
                onChange={(e) => {
                  const newFeatures = e.target.checked
                    ? [...(filters.features || []), 'populyar']
                    : filters.features?.filter(f => f !== 'populyar') || [];
                  setFilters(prev => ({ ...prev, features: newFeatures }));
                }}
              />
              <span>Populyar</span>
            </label>
            <label className="filter-option">
              <input
                type="checkbox"
                checked={filters.features?.includes('pulsuz-catdirilma')}
                onChange={(e) => {
                  const newFeatures = e.target.checked
                    ? [...(filters.features || []), 'pulsuz-catdirilma']
                    : filters.features?.filter(f => f !== 'pulsuz-catdirilma') || [];
                  setFilters(prev => ({ ...prev, features: newFeatures }));
                }}
              />
              <span>Pulsuz çatdırılma</span>
            </label>
          </div>
        )}
      </div>

      <button className="clear-filters-btn" onClick={() => setFilters({})}>
        Filterləri təmizlə
      </button>
    </aside>
  );
};

export default FilterSidebar;
