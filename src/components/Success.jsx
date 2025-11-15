import React from 'react';
import { CheckCircle } from 'lucide-react';

const Success = ({ message = 'Əməliyyat uğurla tamamlandı!' }) => {
  return (
    <div className="success-overlay">
      <div className="success-content">
        <div className="success-icon-wrapper">
          <CheckCircle size={80} className="success-icon" />
        </div>
        <h2 className="success-title">Uğurlu!</h2>
        <p className="success-message">{message}</p>
        <div className="success-checkmark">✓</div>
      </div>
    </div>
  );
};

export default Success;
