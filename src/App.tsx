import { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { Dashboard } from './components/Dashboard';
import { PassForm } from './components/PassForm';
import { PassPreview } from './components/PassPreview';
import type { PassDetails, PassType } from './components/PassPreview';
import { PassAPIPreview } from './components/PassAPIPreview';

function App() {
  const [selectedType, setSelectedType] = useState<PassType | null>(null);
  const [isApiMode, setIsApiMode] = useState<boolean>(false);
  const [details, setDetails] = useState<PassDetails>({
    fullName: '',
    instagramId: '',
    passId: '',
    passType: 'day',
    startDate: '',
    endDate: '',
  });

  // Check URL query parameters on mount and listen to navigation changes
  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      const api = params.get('api') === 'true';
      const type = params.get('type') as PassType | null;

      if (type && ['day', 'week', 'month'].includes(type)) {
        setSelectedType(type);
        setIsApiMode(api);
        setDetails((prev) => {
          const passIdParam = params.get('pass_id');
          let finalPassId = prev.passId;

          if (passIdParam) {
            finalPassId = passIdParam;
          } else {
            const expectedPrefix = `COH-${type.toUpperCase()}-`;
            if (!finalPassId || !finalPassId.startsWith(expectedPrefix)) {
              const randomDigits = Math.floor(10000 + Math.random() * 90000);
              finalPassId = `${expectedPrefix}${randomDigits}`;
            }
          }

          return {
            ...prev,
            passType: type,
            fullName: params.get('name') || prev.fullName || '',
            instagramId: params.get('instagram') || prev.instagramId || '',
            passId: finalPassId,
            startDate: params.get('start_date') || prev.startDate || '',
            endDate: params.get('end_date') || prev.endDate || '',
          };
        });
      } else {
        setSelectedType(null);
        setIsApiMode(false);
      }
    };

    handleUrlChange();
    window.addEventListener('popstate', handleUrlChange);
    return () => window.removeEventListener('popstate', handleUrlChange);
  }, []);

  const handleSelectType = (type: PassType) => {
    setSelectedType(type);
    
    // Auto-generate a new unique ID
    const randomDigits = Math.floor(10000 + Math.random() * 90000);
    const generatedId = `COH-${type.toUpperCase()}-${randomDigits}`;

    setDetails((prev) => ({
      ...prev,
      passType: type,
      passId: generatedId,
    }));
    
    // Push history state to update URL and support browser back button
    const newUrl = `${window.location.origin}${window.location.pathname}?type=${type}`;
    window.history.pushState({ type }, '', newUrl);
  };

  const handleBackToDashboard = () => {
    setSelectedType(null);
    setIsApiMode(false);
    // Clear URL parameters and support history back
    window.history.pushState({}, '', window.location.pathname);
  };

  const handleDownload = () => {
    // We target the pass inside the download container specifically
    const element = document.querySelector('#download-pass-container .cohort-pass') as HTMLElement;
    if (!element) return;

    // Apply temporary print adjustments to capture high quality
    html2canvas(element, {
      scale: 3, // Ultra-high resolution (3x)
      useCORS: true,
      backgroundColor: '#ffffff', // Force white background for download
      logging: false,
    }).then((canvas) => {
      const link = document.createElement('a');
      link.download = `cohort-${details.passType}-pass-${details.passId || 'download'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();

      // Redirect to the ArtArtist site after a short delay so the download gets initiated
      setTimeout(() => {
        window.location.replace('https://www.artartist.in');
      }, 1000);
    }).catch((err) => {
      console.error('Error generating image download:', err);
      // Redirect anyway so the user experience is smooth
      window.location.replace('https://www.artartist.in');
    });
  };

  // If in API mode, render the standalone printable page
  if (isApiMode) {
    return (
      <PassAPIPreview
        details={details}
        onDownload={handleDownload}
        onEdit={() => setIsApiMode(false)}
      />
    );
  }

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header">
        <div className="logo-container" onClick={handleBackToDashboard}>
          <div className="logo-symbol" style={{ background: 'none', boxShadow: 'none', overflow: 'visible', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src="/art-artist-logo.png" alt="ArtArtist Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <h1 className="logo-text">Art<span>Artist</span></h1>
        </div>
        <p className="app-subtitle">
          Official passes for the ArtArtist event and creative workspace access.
        </p>
      </header>

      {/* Main Content */}
      <main style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        {selectedType === null ? (
          <Dashboard onSelectType={handleSelectType} />
        ) : (
          <div className="editor-layout">
            <PassForm
              details={details}
              onChange={setDetails}
              onDownload={handleDownload}
            />
            
            {/* Visible Preview Panel for laptop/desktop view */}
            <div className="preview-panel">
              <div className="pass-container-outer">
                <PassPreview details={details} isPreview={true} />
              </div>
            </div>

            {/* Hidden container in DOM so html2canvas can capture the pass for download */}
            <div id="download-pass-container" className="hidden-download-container">
              <PassPreview details={details} isPreview={true} />
            </div>
          </div>
        )}
      </main>

      <footer style={{ marginTop: '4rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
        &copy; {new Date().getFullYear()} Cohort Coworking. Designed for the Art Artist residency.
      </footer>
    </div>
  );
}

export default App;
