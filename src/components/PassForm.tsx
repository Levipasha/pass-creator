import React, { useEffect } from 'react';
import type { PassDetails } from './PassPreview';

interface PassFormProps {
  details: PassDetails;
  onChange: (details: PassDetails) => void;
  onDownload: () => void;
}

export const PassForm: React.FC<PassFormProps> = ({
  details,
  onChange,
  onDownload,
}) => {
  const { fullName, instagramId, passId, passType, startDate, endDate } = details;


  // Automatically update end dates when start date changes
  useEffect(() => {
    if (passType === 'week' && startDate) {
      const start = new Date(startDate);
      const end = new Date(start.getTime() + 6 * 24 * 60 * 60 * 1000); // 7 days total including start
      onChange({
        ...details,
        endDate: end.toISOString().split('T')[0],
      });
    } else if (passType === 'month' && startDate) {
      const start = new Date(startDate);
      const end = new Date(start.getTime() + 29 * 24 * 60 * 60 * 1000); // 30 days total including start
      onChange({
        ...details,
        endDate: end.toISOString().split('T')[0],
      });
    }
  }, [startDate, passType]);

  // Set default dates if not present
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    if ((passType === 'week' || passType === 'month') && !startDate) {
      onChange({ ...details, startDate: today });
    }
  }, [passType]);


  // SVGs for inputs
  const UserIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="input-icon-svg">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );

  const InstagramIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="input-icon-svg">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );

  const LockIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="input-icon-svg">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );

  const CalendarIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="input-icon-svg">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );

  const FlagIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="input-icon-svg">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
      <line x1="4" y1="22" x2="4" y2="15" />
    </svg>
  );



  const DownloadIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', marginRight: '6px' }}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );


  return (
    <div className="form-panel">
      {/* Form Header */}
      <div className="form-header">
        <div className="form-title-block">
          <h2>
            {passType === 'day' && 'Day Pass Details'}
            {passType === 'week' && 'Weekly Pass Details'}
            {passType === 'month' && 'Monthly Pass Details'}
          </h2>
          <p>Fill out the details to generate your official coworking pass.</p>
        </div>
      </div>

      {/* Form Fields */}
      <div className="form-group">
        <label className="form-label" htmlFor="fullName">Full Name</label>
        <div className="input-wrapper">
          <span className="input-icon">
            <UserIcon />
          </span>
          <input
            id="fullName"
            type="text"
            className="form-input"
            placeholder="vamshi"
            value={fullName}
            onChange={(e) => onChange({ ...details, fullName: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="instagramId">Instagram ID</label>
        <div className="input-wrapper">
          <span className="input-icon">
            <InstagramIcon />
          </span>
          <input
            id="instagramId"
            type="text"
            className="form-input"
            placeholder="vamshi"
            value={instagramId}
            onChange={(e) => onChange({ ...details, instagramId: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="passId">Unique Pass ID</label>
        <div className="input-wrapper">
          <span className="input-icon">
            <LockIcon />
          </span>
          <input
            id="passId"
            type="text"
            className="form-input"
            placeholder="COH-DAY-12345"
            value={passId}
            readOnly
            tabIndex={-1}
            required
          />
        </div>
      </div>

      {/* Date Selectors depending on type */}
      {passType !== 'day' && (
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="startDate">Start Date</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <CalendarIcon />
              </span>
              <input
                id="startDate"
                type="date"
                className="form-input"
                value={startDate || ''}
                onChange={(e) => onChange({ ...details, startDate: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="endDate">End Date</label>
            <div className="input-wrapper">
              <span className="input-icon">
                <FlagIcon />
              </span>
              <input
                id="endDate"
                type="date"
                className="form-input"
                value={endDate || ''}
                disabled // Auto calculated, but shown for user convenience
                style={{ opacity: 0.7, cursor: 'not-allowed' }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Editor Actions */}
      <div className="editor-actions" style={{ marginTop: '2.5rem' }}>
        <button className="btn-action primary" onClick={onDownload} style={{ width: '100%' }}>
          <DownloadIcon /> Download PNG
        </button>
      </div>

    </div>
  );
};
