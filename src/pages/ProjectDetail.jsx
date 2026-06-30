import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, X, Play, Pause, ZoomIn } from 'lucide-react';
import './ProjectDetail.css';
import { getProjects } from '../utils/projectStorage';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [activeTab, setActiveTab] = useState('photos'); // 'photos' or 'blueprints'
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  
  const touchStartX = useRef(null);
  const autoplayRef = useRef(null);

  // Load project details dynamically
  useEffect(() => {
    const data = getProjects();
    const proj = data[id] || Object.values(data)[0]; // Fallback to first project if ID doesn't exist
    setProject(proj);
    setActiveTab('photos');
    setActiveIndex(0);
  }, [id]);

  // Safely extract media properties
  const activeMedia = project ? (project[activeTab] || project.photos) : null;
  const images = activeMedia ? activeMedia.images : [];
  const captions = activeMedia ? activeMedia.captions : [];
  const totalImages = images.length;

  // Reset index when changing tabs
  useEffect(() => {
    setActiveIndex(0);
  }, [activeTab]);

  const handlePrev = useCallback(() => {
    if (totalImages === 0) return;
    setActiveIndex(prev => (prev - 1 + totalImages) % totalImages);
  }, [totalImages]);

  const handleNext = useCallback(() => {
    if (totalImages === 0) return;
    setActiveIndex(prev => (prev + 1) % totalImages);
  }, [totalImages]);

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
  };

  const openLightbox = () => setIsLightboxOpen(true);
  const closeLightbox = () => setIsLightboxOpen(false);

  // Autoplay logic
  useEffect(() => {
    if (isPlaying && !isHovering && !isLightboxOpen && totalImages > 1) {
      autoplayRef.current = setInterval(handleNext, 5000);
    }
    return () => clearInterval(autoplayRef.current);
  }, [isPlaying, isHovering, isLightboxOpen, handleNext, totalImages]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  // Touch swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      delta < 0 ? handleNext() : handlePrev();
    }
  };

  if (!project) {
    return (
      <div className="page" style={{ paddingTop: '100px', textAlign: 'center', paddingBottom: '5rem' }}>
        <div className="container">
          <p className="text-lg text-muted">Loading project details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page" style={{ paddingTop: '100px' }}>
      {/* Hero Header */}
      <section className="section bg-secondary text-center pt-5 pb-5">
        <div className="container">
          <span className="text-accent text-lg mb-2 d-block">{project.category}</span>
          <h1 className="heading-lg">{project.title}</h1>
        </div>
      </section>

      {/* Carousel Section */}
      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">

          {/* Photo vs Blueprint Tab switcher */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '2rem',
            justifyContent: 'center',
            borderBottom: '1px solid var(--border-color)',
            paddingBottom: '0.75rem'
          }}>
            <button
              onClick={() => setActiveTab('photos')}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                background: 'transparent',
                border: 'none',
                color: activeTab === 'photos' ? 'var(--accent-color)' : 'var(--text-secondary)',
                cursor: 'pointer',
                padding: '0.5rem 1rem',
                borderBottom: activeTab === 'photos' ? '2px solid var(--accent-color)' : '2px solid transparent',
                marginBottom: '-0.85rem',
                transition: 'all var(--transition-fast)',
                fontWeight: activeTab === 'photos' ? 'bold' : 'normal'
              }}
            >
              Real Photographs
            </button>
            <button
              onClick={() => setActiveTab('blueprints')}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                background: 'transparent',
                border: 'none',
                color: activeTab === 'blueprints' ? 'var(--accent-color)' : 'var(--text-secondary)',
                cursor: 'pointer',
                padding: '0.5rem 1rem',
                borderBottom: activeTab === 'blueprints' ? '2px solid var(--accent-color)' : '2px solid transparent',
                marginBottom: '-0.85rem',
                transition: 'all var(--transition-fast)',
                fontWeight: activeTab === 'blueprints' ? 'bold' : 'normal'
              }}
            >
              Architectural Blueprints
            </button>
          </div>

          {/* Main Carousel */}
          <div
            className="carousel-container"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            aria-label="Project image carousel"
          >
            {images.map((img, i) => (
              <div key={i} className={`carousel-slide${i === activeIndex ? ' active' : ''}`}>
                <img
                  src={img}
                  alt={captions[i] || project.title}
                  className="carousel-image"
                  onClick={openLightbox}
                  title="Click to enlarge"
                  draggable="false"
                />
              </div>
            ))}

            {/* Prev / Next Arrows */}
            {totalImages > 1 && (
              <>
                <button
                  className="carousel-btn carousel-btn-prev"
                  onClick={handlePrev}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  className="carousel-btn carousel-btn-next"
                  onClick={handleNext}
                  aria-label="Next image"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}

            {/* Autoplay Toggle */}
            {totalImages > 1 && (
              <button
                className="carousel-play-btn"
                onClick={() => setIsPlaying(p => !p)}
                aria-label={isPlaying ? 'Pause autoplay' : 'Start autoplay'}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
            )}

            {/* Dot Indicators */}
            {totalImages > 1 && (
              <div className="carousel-indicators" role="tablist">
                {images.map((_, i) => (
                  <button
                    key={i}
                    className={`carousel-indicator-dot${i === activeIndex ? ' active' : ''}`}
                    onClick={() => setActiveIndex(i)}
                    role="tab"
                    aria-selected={i === activeIndex}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Thumbnails Strip */}
          {totalImages > 1 && (
            <div className="thumbnails-container" role="tablist" aria-label="Image thumbnails">
              {images.map((img, i) => (
                <div
                  key={i}
                  className={`thumbnail-card${i === activeIndex ? ' active' : ''}`}
                  onClick={() => handleThumbnailClick(i)}
                  role="tab"
                  aria-selected={i === activeIndex}
                  aria-label={`View image ${i + 1}`}
                  title={captions[i]}
                >
                  <img src={img} alt={`Thumbnail ${i + 1}`} draggable="false" />
                </div>
              ))}
            </div>
          )}

          {/* Project Info Grid */}
          <div className="grid-2" style={{ marginTop: totalImages > 1 ? '0' : '2rem' }}>
            <div>
              <h2 className="heading-sm mb-4">Project Overview</h2>
              <p className="text-muted text-lg">{project.description}</p>
            </div>
            <div style={{ background: 'var(--bg-secondary)', padding: '2rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}>
              <h3 className="heading-sm mb-4 border-b pb-2">Details</h3>
              <ul style={{ listStyle: 'none' }}>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
                  <span className="text-muted">Client:</span>
                  <span className="font-weight-bold">{project.client}</span>
                </li>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
                  <span className="text-muted">Location:</span>
                  <span className="font-weight-bold">{project.location}</span>
                </li>
                <li style={{ padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between' }}>
                  <span className="text-muted">Year:</span>
                  <span className="font-weight-bold">{project.year}</span>
                </li>
                <li style={{ padding: '0.5rem 0', display: 'flex', justifyContent: 'space-between' }}>
                  <span className="text-muted">Images:</span>
                  <span className="font-weight-bold">{activeIndex + 1} / {totalImages}</span>
                </li>
              </ul>
              <div className="mt-4" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button
                  className="btn btn-outline"
                  onClick={openLightbox}
                  style={{ width: '100%', gap: '0.5rem' }}
                >
                  <ZoomIn size={16} /> View Fullscreen
                </button>
                <Link to="/contact" className="btn btn-primary" style={{ width: '100%' }}>
                  Like this? Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <div
        className={`lightbox-overlay${isLightboxOpen ? ' open' : ''}`}
        onClick={(e) => { if (e.target === e.currentTarget) closeLightbox(); }}
        role="dialog"
        aria-modal="true"
        aria-label="Image lightbox"
      >
        {/* Close Button */}
        <button className="lightbox-close-btn" onClick={closeLightbox} aria-label="Close lightbox">
          <X size={22} />
        </button>

        {/* Image */}
        <div className="lightbox-content">
          {/* Prev */}
          {totalImages > 1 && (
            <button className="lightbox-btn lightbox-btn-prev" onClick={handlePrev} aria-label="Previous image">
              <ChevronLeft size={24} />
            </button>
          )}

          <img
            src={images[activeIndex]}
            alt={captions[activeIndex]}
            className="lightbox-image"
          />

          {/* Next */}
          {totalImages > 1 && (
            <button className="lightbox-btn lightbox-btn-next" onClick={handleNext} aria-label="Next image">
              <ChevronRight size={24} />
            </button>
          )}
        </div>

        {/* Caption */}
        <div className="lightbox-caption">
          <span className="active-num">{String(activeIndex + 1).padStart(2, '0')}</span>
          <span style={{ color: 'var(--border-color)' }}>—</span>
          <span>{captions[activeIndex]}</span>
          <span style={{ color: 'var(--border-color)' }}>—</span>
          <span>/ {String(totalImages).padStart(2, '0')}</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
