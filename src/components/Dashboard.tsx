import React, { useState } from 'react';
import type { PassType } from './PassPreview';

interface DashboardProps {
  onSelectType: (type: PassType) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onSelectType }) => {
  const [copiedType, setCopiedType] = useState<PassType | null>(null);

  const handleCopyLink = (e: React.MouseEvent, type: PassType) => {
    e.preventDefault();
    e.stopPropagation();
    
    const baseUrl = window.location.origin + window.location.pathname;
    const link = `${baseUrl}?type=${type}`;
    
    navigator.clipboard.writeText(link).then(() => {
      setCopiedType(type);
      setTimeout(() => setCopiedType(null), 2000);
    }).catch(err => {
      console.error('Failed to copy link:', err);
    });
  };

  // SVGs for Copy and Check
  const CopyIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }}>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );

  const CheckIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'inline-block', marginRight: '8px', verticalAlign: 'middle' }}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );

  // SVG Palette Icon for Day Pass
  const PaletteIcon = () => (
    <svg className="dashboard-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: '40px', height: '40px' }}>
      <path d="M12 3a9 9 0 0 0-9 9 9 9 0 0 0 9 9c1.5 0 2.5-1 2.5-2.5 0-.7-.3-1.3-.7-1.7-.4-.4-.7-.9-.7-1.5 0-1.1.9-2 2-2h1.9C19.8 13.3 21 11.2 21 9a9 9 0 0 0-9-6z" />
      <circle cx="7.5" cy="10.5" r="1" fill="currentColor" />
      <circle cx="11.5" cy="7.5" r="1" fill="currentColor" />
      <circle cx="15.5" cy="9.5" r="1" fill="currentColor" />
      <path d="M18.5 3.5L10 12" />
    </svg>
  );

  // SVG Easel Icon for Weekly Pass
  const EaselIcon = () => (
    <svg className="dashboard-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: '40px', height: '40px' }}>
      <path d="M12 5L5 20M12 5l7 15M5 14h14M12 5v15" />
      <rect x="7" y="10" width="10" height="3" rx="0.5" />
    </svg>
  );

  // SVG Camera Icon for Monthly Pass
  const CameraIcon = () => (
    <svg className="dashboard-card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: '40px', height: '40px' }}>
      <rect x="5" y="6" width="14" height="8" rx="1.5" />
      <circle cx="12" cy="10" r="2" />
      <path d="M9 6v-1h6v1" />
      <path d="M12 14L8 21M12 14l4 7M12 14v7" />
    </svg>
  );

  return (
    <div className="dashboard-grid">
      {/* Day Pass Option */}
      <a 
        href="?type=day" 
        className="pass-card-select day-select" 
        onClick={(e) => {
          e.preventDefault();
          onSelectType('day');
        }}
      >
        <div className="card-icon-wrapper">
          <PaletteIcon />
        </div>
        <h3 className="card-title">Day Pass</h3>
        <p className="card-desc">
          Official <strong>Sketch Pass</strong>. Valid for a single day of workspace access. Best for creators working on short-term sketch projects.
        </p>
        <span 
          className={`btn-select ${copiedType === 'day' ? 'copied' : ''}`}
          onClick={(e) => handleCopyLink(e, 'day')}
        >
          {copiedType === 'day' ? <CheckIcon /> : <CopyIcon />}
          {copiedType === 'day' ? 'Copied!' : 'Copy Link'}
        </span>
      </a>

      {/* Week Pass Option */}
      <a 
        href="?type=week" 
        className="pass-card-select week-select" 
        onClick={(e) => {
          e.preventDefault();
          onSelectType('week');
        }}
      >
        <div className="card-icon-wrapper">
          <EaselIcon />
        </div>
        <h3 className="card-title">Weekly Pass</h3>
        <p className="card-desc">
          Official <strong>Studio Pass</strong>. Select any starting date, valid for a full 7-day period of creative coworking.
        </p>
        <span 
          className={`btn-select ${copiedType === 'week' ? 'copied' : ''}`}
          onClick={(e) => handleCopyLink(e, 'week')}
        >
          {copiedType === 'week' ? <CheckIcon /> : <CopyIcon />}
          {copiedType === 'week' ? 'Copied!' : 'Copy Link'}
        </span>
      </a>

      {/* Month Pass Option */}
      <a 
        href="?type=month" 
        className="pass-card-select month-select" 
        onClick={(e) => {
          e.preventDefault();
          onSelectType('month');
        }}
      >
        <div className="card-icon-wrapper">
          <CameraIcon />
        </div>
        <h3 className="card-title">Monthly Pass</h3>
        <p className="card-desc">
          Official <strong>Residency Pass</strong>. Valid for a full 30-day term. Designed for resident artists, designers, and photographers.
        </p>
        <span 
          className={`btn-select ${copiedType === 'month' ? 'copied' : ''}`}
          onClick={(e) => handleCopyLink(e, 'month')}
        >
          {copiedType === 'month' ? <CheckIcon /> : <CopyIcon />}
          {copiedType === 'month' ? 'Copied!' : 'Copy Link'}
        </span>
      </a>
    </div>
  );
};
