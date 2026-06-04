import React from 'react';
import { QRCodeComponent } from './QRCodeComponent';

export type PassType = 'explorer' | 'day' | 'week' | 'month';

export interface PassDetails {
  fullName: string;
  instagramId: string;
  passId: string;
  passType: PassType;
  startDate?: string;
  endDate?: string;
  visitDate?: string; // For day pass
}

interface PassPreviewProps {
  details: PassDetails;
  isPreview?: boolean;
}

export const PassPreview: React.FC<PassPreviewProps> = ({ details, isPreview = true }) => {
  const { fullName, instagramId, passId, passType, startDate, endDate } = details;

  // Formatting dates for display
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Generate QR Value
  const qrValue = JSON.stringify({
    id: passId,
    name: fullName,
    ig: instagramId,
    type: passType,
    start: startDate,
    end: endDate,
  });

  // SVG Icons for standard passes
  const PaletteIcon = () => (
    <svg className="pass-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a9 9 0 0 0-9 9 9 9 0 0 0 9 9c1.5 0 2.5-1 2.5-2.5 0-.7-.3-1.3-.7-1.7-.4-.4-.7-.9-.7-1.5 0-1.1.9-2 2-2h1.9C19.8 13.3 21 11.2 21 9a9 9 0 0 0-9-6z" />
      <circle cx="7.5" cy="10.5" r="1" fill="currentColor" />
      <circle cx="11.5" cy="7.5" r="1" fill="currentColor" />
      <circle cx="15.5" cy="9.5" r="1" fill="currentColor" />
      <path d="M18.5 3.5L10 12" />
    </svg>
  );

  const EaselIcon = () => (
    <svg className="pass-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 5L5 20M12 5l7 15M5 14h14M12 5v15" />
      <rect x="7" y="10" width="10" height="3" rx="0.5" />
    </svg>
  );

  const EaselWithStoolIcon = () => (
    <svg className="pass-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 4L3 19M7 4l4 15M3 14h8M7 4v15" />
      <path d="M15 13h6M16 13l-1 6M20 13l1 6M15 16h6" />
    </svg>
  );

  const ArtistPaintingIcon = () => (
    <svg className="pass-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 5L2 19M5 5l3 14M2 14h6M5 5v14" />
      <rect x="3" y="9" width="4" height="3" rx="0.5" />
      <circle cx="14" cy="7" r="1.5" />
      <path d="M11 19v-4.5a1.5 1.5 0 0 1 1.5-1.5h1.5a1.5 1.5 0 0 1 1.5 1.5v4.5" />
      <path d="M12.5 13l-4.5-1" />
    </svg>
  );

  const CameraIcon = () => (
    <svg className="pass-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="6" width="14" height="8" rx="1.5" />
      <circle cx="12" cy="10" r="2" />
      <path d="M9 6v-1h6v1" />
      <path d="M12 14L8 21M12 14l4 7M12 14v7" />
    </svg>
  );

  // If explorer type, render the pentagon pass layout
  if (passType === 'explorer') {
    return (
      <div
        id="printable-pass"
        className={`cohort-pass explorer-pass ${isPreview ? 'preview-mode' : 'print-target'}`}
      >
        {/* SVG Background for rounded corners, even border, and nestled hole punch */}
        <svg
          viewBox="0 0 370 480"
          className="pass-svg-bg"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <clipPath id="inner-white-area">
              <polygon points="185,29 341,182 291,451 79,451 29,182" />
            </clipPath>
          </defs>

          {/* Outer pentagon (red border + white background) */}
          <polygon
            points="185,15 355,182 303,465 67,465 15,182"
            fill="#ffffff"
            stroke="#c21d24"
            strokeWidth="28"
            strokeLinejoin="round"
          />

          {/* Black lanyard hole punch, clipped by the inner white area */}
          <circle
            cx="185"
            cy="29"
            r="40"
            fill="#111111"
            clipPath="url(#inner-white-area)"
          />
        </svg>

        <div className="pass-pentagon-inner">
          {/* Cohort Coworking Logo */}
          <div className="pass-logo-wrap">
            <img
              src="/cohort-logo.png"
              alt="Cohort Coworking"
              className="pass-cohort-logo-img"
            />
          </div>

          {/* Pass Title */}
          <div className="pass-title-block">
            <div className="pass-title-line1">ART</div>
            <div className="pass-title-line2">EXPLORER</div>
            <div className="pass-title-line3">PASS</div>
          </div>

          {/* Validity */}
          <div className="pass-validity-block">
            <div className="pass-validity-label">V A L I D I T Y</div>
            <div className="pass-validity-value">ONE DAY</div>
          </div>

          {/* User Details (only when name/ig filled) */}
          {(fullName || instagramId || passId) && (
            <div className="pass-user-details">
              <div className="pass-meta-info">
                <div className="pass-meta-row-top">
                  {fullName && (
                    <div className="pass-meta-row">
                      NAME <strong>{fullName}</strong>
                    </div>
                  )}
                  {instagramId && (
                    <div className="pass-meta-row">
                      INSTAGRAM <strong>@{instagramId.replace('@', '')}</strong>
                    </div>
                  )}
                </div>
                {passId && (
                  <div className="pass-meta-row-bottom">
                    <div className="pass-meta-row">
                      PASS ID <strong className="pass-id-mono">#{passId}</strong>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ArtArtist Badge */}
          <div className="pass-badge-block">
            <img src="/art-artist-logo.png" className="pass-badge-logo-img" alt="Art Artist" />
            <div className="pass-badge-text">ART ARTIST</div>
          </div>
        </div>
      </div>
    );
  }

  // Render the standard rectangular pass layout for day, week, month
  return (
    <div
      id="printable-pass"
      className={`cohort-pass standard-pass ${passType}-pass ${isPreview ? 'preview-mode' : 'print-target'}`}
    >
      {/* Top Section: Logo */}
      <div className="pass-logo-wrap">
        <img src="/cohort-logo.png" alt="Cohort Coworking" style={{ width: '160px', height: 'auto', objectFit: 'contain' }} />
      </div>

      {/* Title */}
      <div className="pass-main-title">
        {passType === 'day' && 'SKETCH PASS'}
        {passType === 'week' && 'STUDIO PASS'}
        {passType === 'month' && 'RESIDENCY'}
      </div>

      {/* Validity */}
      <div className="pass-validity-block">
        <span className="pass-validity-label">VALIDITY</span>
        <span className="pass-validity-value">
          {passType === 'day' && 'ONE DAY'}
          {passType === 'week' && 'ONE WEEK'}
          {passType === 'month' && 'ONE MONTH'}
        </span>
        {passType !== 'day' && startDate && endDate && (
          <div className="pass-dates-subtext">
            {formatDate(startDate)} — {formatDate(endDate)}
          </div>
        )}
      </div>

      {/* Icons */}
      <div className="pass-icons-row">
        {passType === 'day' && <PaletteIcon />}
        {passType === 'week' && (
          <>
            <EaselIcon />
            <PaletteIcon />
          </>
        )}
        {passType === 'month' && (
          <>
            <EaselWithStoolIcon />
            <PaletteIcon />
            <ArtistPaintingIcon />
            <CameraIcon />
          </>
        )}
      </div>

      {/* User Details Block with QR Code */}
      <div className="pass-user-details">
        <div className="pass-meta-info">
          <div className="pass-meta-row">
            NAME
            <strong>{fullName || 'ENTER NAME'}</strong>
          </div>
          <div className="pass-meta-row">
            INSTAGRAM
            <strong>{instagramId ? `@${instagramId.replace('@', '')}` : 'ENTER INSTAGRAM'}</strong>
          </div>
          <div className="pass-meta-row" style={{ marginTop: '2px' }}>
            PASS ID
            <strong className="pass-id-mono">
              #{passId || 'CH-XXXXX'}
            </strong>
          </div>
        </div>
        <div className="pass-qr-wrap">
          <QRCodeComponent value={qrValue} />
        </div>
      </div>

      {/* Bottom Section: Badge */}
      <div className="pass-badge-block">
        <img src="/art-artist-logo.png" className="pass-badge-logo-img" alt="Art Artist" />
        <div className="pass-badge-text">ART ARTIST</div>
      </div>
    </div>
  );
};
