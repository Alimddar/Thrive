import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="error-page">
      <div className="error-content">
        <AlertCircle size={80} color="#ef4444" />
        <h1 className="error-title">404</h1>
        <h2 className="error-subtitle">Səhifə tapılmadı</h2>
        <p className="error-description">
          Axtardığınız səhifə mövcud deyil və ya köçürülüb
        </p>

        <Link to="/products" className="error-back-button">
          <ArrowLeft size={20} />
          <span>Məhsullara qayıt</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
