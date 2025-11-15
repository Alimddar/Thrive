import { useState, useEffect } from 'react';
import { api, DEFAULT_USER_PROFILE } from '../services/api';

function Profile({ discountActive, setDiscountActive }) {
  const [userInfo, setUserInfo] = useState({
    name: 'John',
    surname: 'Doe',
    location: 'New York, USA',
    age: '28',
    sex: 'Male',
    phoneNumber: '+1 (555) 123-4567',
    date: '1996-05-15'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [personalizedOffers, setPersonalizedOffers] = useState([]);
  const [loadingOffers, setLoadingOffers] = useState(false);

  // Fetch personalized offers when discount is activated
  useEffect(() => {
    const fetchOffers = async () => {
      if (discountActive) {
        try {
          setLoadingOffers(true);
          const offers = await api.getDemoOffers();
          setPersonalizedOffers(offers.offers || []);
          console.log('Personalized Offers:', offers);
        } catch (error) {
          console.error('Failed to fetch personalized offers:', error);
        } finally {
          setLoadingOffers(false);
        }
      }
    };

    fetchOffers();
  }, [discountActive]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleToggleDiscount = () => {
    setDiscountActive(!discountActive);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Here you can add logic to save to backend/localStorage
    alert('Profile updated successfully!');
  };

  return (
    <div className="profile-container">
      <div className="profile-header-section">
        <h1 className="profile-main-title">My Profile</h1>
        <p className="profile-subtitle">Manage your personal information and preferences</p>
      </div>

      <div className="profile-content">
        <div className="profile-card">
          <div className="profile-card-header">
            <h2 className="profile-section-title">Personal Information</h2>
            <button
              className="btn-edit-profile"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          <div className="profile-form">
            <div className="profile-form-row">
              <div className="profile-form-group">
                <label className="profile-label">Name</label>
                <input
                  type="text"
                  name="name"
                  value={userInfo.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="profile-input"
                />
              </div>

              <div className="profile-form-group">
                <label className="profile-label">Surname</label>
                <input
                  type="text"
                  name="surname"
                  value={userInfo.surname}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="profile-input"
                />
              </div>
            </div>

            <div className="profile-form-row">
              <div className="profile-form-group">
                <label className="profile-label">Location</label>
                <input
                  type="text"
                  name="location"
                  value={userInfo.location}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="profile-input"
                />
              </div>

              <div className="profile-form-group">
                <label className="profile-label">Age</label>
                <input
                  type="number"
                  name="age"
                  value={userInfo.age}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="profile-input"
                />
              </div>
            </div>

            <div className="profile-form-row">
              <div className="profile-form-group">
                <label className="profile-label">Sex</label>
                <select
                  name="sex"
                  value={userInfo.sex}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="profile-input"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="profile-form-group">
                <label className="profile-label">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={userInfo.phoneNumber}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="profile-input"
                />
              </div>
            </div>

            <div className="profile-form-row">
              <div className="profile-form-group full-width">
                <label className="profile-label">Date of Birth</label>
                <input
                  type="date"
                  name="date"
                  value={userInfo.date}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="profile-input"
                />
              </div>
            </div>

            {isEditing && (
              <div className="profile-actions">
                <button className="btn-save-profile" onClick={handleSaveProfile}>
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="profile-card">
          <div className="profile-card-header">
            <h2 className="profile-section-title">Discount Settings</h2>
          </div>

          <div className="discount-section">
            <div className="discount-info">
              <div className="discount-icon-wrapper">
                <svg
                  className="discount-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="discount-text">
                <h3 className="discount-title">Special Discount Program</h3>
                <p className="discount-description">
                  {discountActive
                    ? 'You are currently receiving special discounts on selected products!'
                    : 'Activate to receive exclusive discounts on your purchases'}
                </p>
              </div>
            </div>

            <div className="discount-toggle-section">
              <div className="discount-status">
                <span className="status-label">Status:</span>
                <span className={`status-badge ${discountActive ? 'active' : 'inactive'}`}>
                  {discountActive ? 'Active' : 'Inactive'}
                </span>
              </div>

              <button
                className={`btn-toggle-discount ${discountActive ? 'active' : ''}`}
                onClick={handleToggleDiscount}
              >
                {discountActive ? 'Deactivate Discount' : 'Activate Discount'}
              </button>
            </div>

            {discountActive && (
              <div className="discount-benefits">
                <h4 className="benefits-title">Your Active Benefits:</h4>
                <ul className="benefits-list">
                  <li className="benefit-item">
                    <span className="benefit-check">✓</span>
                    Up to 20% off on selected bank products
                  </li>
                  <li className="benefit-item">
                    <span className="benefit-check">✓</span>
                    Priority customer service
                  </li>
                  <li className="benefit-item">
                    <span className="benefit-check">✓</span>
                    Early access to new financial products
                  </li>
                  <li className="benefit-item">
                    <span className="benefit-check">✓</span>
                    Reduced fees on transactions
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
