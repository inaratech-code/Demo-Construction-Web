import { useState, useEffect, useRef } from 'react';
import { Trash2, Plus, AlertCircle, CheckCircle2, Lock, LogOut, Upload, Image as ImageIcon } from 'lucide-react';
import { getProjects, addProject, deleteProject, getMessages, deleteMessage } from '../utils/projectStorage';
import './Admin.css';

const categories = ['Commercial', 'Industrial', 'Residential', 'Renovation'];

const compressImage = (file, callback) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const MAX_WIDTH = 800;
      const MAX_HEIGHT = 600;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      // Compress to JPEG with 0.7 quality to keep it under ~80KB
      const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
      callback(dataUrl);
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
};

const Admin = () => {
  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState('portfolio'); // 'portfolio' or 'messages'
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('isAdmin') === 'true';
  });
  
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    category: 'Commercial',
    client: '',
    location: '',
    year: '',
    description: '',
  });

  const [uploadedPhotos, setUploadedPhotos] = useState([]); // Array of { dataUrl, caption }
  const [uploadedBlueprints, setUploadedBlueprints] = useState([]); // Array of { dataUrl, caption }

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const photoInputRef = useRef(null);
  const blueprintInputRef = useRef(null);

  // Load projects and inbox messages
  const loadProjects = () => {
    setProjects(Object.values(getProjects()));
  };

  const loadMessages = () => {
    setMessages(getMessages());
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadProjects();
      loadMessages();
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('isAdmin', 'true');
      setLoginError('');
    } else {
      setLoginError('Invalid administrative passcode.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('isAdmin');
    setPasscode('');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  // Convert uploaded image files to Base64 with compression
  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      compressImage(file, (compressedDataUrl) => {
        const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
        const defaultCaption = nameWithoutExt
          .replace(/[_-]/g, ' ')
          .replace(/\b\w/g, c => c.toUpperCase());

        setUploadedPhotos(prev => [...prev, {
          dataUrl: compressedDataUrl,
          caption: defaultCaption
        }]);
      });
    });
    e.target.value = '';
  };

  const handleBlueprintChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      compressImage(file, (compressedDataUrl) => {
        const nameWithoutExt = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
        const defaultCaption = nameWithoutExt
          .replace(/[_-]/g, ' ')
          .replace(/\b\w/g, c => c.toUpperCase());

        setUploadedBlueprints(prev => [...prev, {
          dataUrl: compressedDataUrl,
          caption: defaultCaption
        }]);
      });
    });
    e.target.value = '';
  };

  const updatePhotoCaption = (index, val) => {
    setUploadedPhotos(prev => {
      const copy = [...prev];
      copy[index].caption = val;
      return copy;
    });
  };

  const updateBlueprintCaption = (index, val) => {
    setUploadedBlueprints(prev => {
      const copy = [...prev];
      copy[index].caption = val;
      return copy;
    });
  };

  const removePhoto = (index) => {
    setUploadedPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const removeBlueprint = (index) => {
    setUploadedBlueprints(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validations
    if (!formData.title.trim()) {
      setError('Project title is required.');
      return;
    }
    if (!formData.description.trim()) {
      setError('Project description is required.');
      return;
    }
    if (!formData.location.trim()) {
      setError('Project location is required.');
      return;
    }

    // Process photo and blueprint arrays
    const photos = uploadedPhotos.map(p => p.dataUrl);
    const photoCaptions = uploadedPhotos.map(p => p.caption);

    const blueprints = uploadedBlueprints.map(b => b.dataUrl);
    const blueprintCaptions = uploadedBlueprints.map(b => b.caption);

    // Save project
    addProject({
      title: formData.title,
      category: formData.category,
      client: formData.client || 'N/A',
      location: formData.location,
      year: formData.year || new Date().getFullYear().toString(),
      description: formData.description,
      photos,
      photoCaptions,
      blueprints,
      blueprintCaptions
    });

    setSuccess('Project added successfully!');
    setFormData({
      title: '',
      category: 'Commercial',
      client: '',
      location: '',
      year: '',
      description: '',
    });
    setUploadedPhotos([]);
    setUploadedBlueprints([]);

    loadProjects();

    // Clear success message
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete the project "${title}"?`)) {
      deleteProject(id);
      loadProjects();
      setSuccess('Project deleted successfully.');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  const handleDeleteMessage = (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      deleteMessage(id);
      loadMessages();
      setSuccess('Message deleted successfully.');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

  // Render Login Screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="page admin-login-wrapper" style={{ paddingTop: '100px' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <div className="admin-card admin-login-card">
            <div className="admin-login-icon">
              <Lock size={32} />
            </div>
            <h2 className="heading-sm mb-2" style={{ textTransform: 'uppercase' }}>Admin Access</h2>
            <p className="text-muted mb-4" style={{ fontSize: '0.85rem' }}>
              Please enter the administrative passcode to manage the portfolio list.
            </p>

            {loginError && (
              <div className="admin-alert error-alert" style={{ marginBottom: '1.25rem' }}>
                <AlertCircle size={16} />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="admin-form-group" style={{ marginBottom: '1.5rem' }}>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    if (loginError) setLoginError('');
                  }}
                  placeholder="Passcode (hint: admin123)"
                  className="admin-input"
                  style={{ textAlign: 'center', letterSpacing: passcode ? '4px' : 'normal' }}
                  autoFocus
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Verify & Enter
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page" style={{ paddingTop: '100px' }}>
      <section className="section bg-secondary pt-5 pb-5">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 className="heading-lg" style={{ marginBottom: '0.5rem' }}>Admin Dashboard</h1>
            <p className="text-lg text-muted">
              Manage portfolio projects or check contact submissions from clients.
            </p>
          </div>
          <button 
            onClick={handleLogout} 
            className="btn btn-outline" 
            style={{ 
              padding: '0.75rem 1.5rem', 
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              border: '1px solid var(--border-color)'
            }}
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </section>

      {/* Dashboard Tabs */}
      <div className="container" style={{ marginTop: '2rem', display: 'flex', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
        <button
          onClick={() => setActiveTab('portfolio')}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            background: 'transparent',
            border: 'none',
            color: activeTab === 'portfolio' ? 'var(--accent-color)' : 'var(--text-secondary)',
            cursor: 'pointer',
            padding: '0.5rem 1.2rem',
            borderBottom: activeTab === 'portfolio' ? '2px solid var(--accent-color)' : '2px solid transparent',
            marginBottom: '-0.85rem',
            transition: 'all var(--transition-fast)',
            fontWeight: activeTab === 'portfolio' ? 'bold' : 'normal'
          }}
        >
          Portfolio Manager
        </button>
        <button
          onClick={() => setActiveTab('messages')}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            background: 'transparent',
            border: 'none',
            color: activeTab === 'messages' ? 'var(--accent-color)' : 'var(--text-secondary)',
            cursor: 'pointer',
            padding: '0.5rem 1.2rem',
            borderBottom: activeTab === 'messages' ? '2px solid var(--accent-color)' : '2px solid transparent',
            marginBottom: '-0.85rem',
            transition: 'all var(--transition-fast)',
            fontWeight: activeTab === 'messages' ? 'bold' : 'normal',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          Inbox Messages 
          {messages.length > 0 && (
            <span style={{
              background: 'var(--accent-color)',
              color: '#000',
              fontSize: '0.7rem',
              fontWeight: 'bold',
              borderRadius: '10px',
              padding: '0.1rem 0.5rem',
              fontFamily: 'var(--font-mono)'
            }}>
              {messages.length}
            </span>
          )}
        </button>
      </div>

      <section className="section" style={{ paddingTop: '3rem' }}>
        {activeTab === 'portfolio' ? (
          <div className="container admin-grid">
            {/* Left: Add project form */}
            <div className="admin-card">
              <h2 className="heading-sm mb-4">Add New Project</h2>
              
              {error && (
                <div className="admin-alert error-alert">
                  <AlertCircle size={18} />
                  <span>{error}</span>
                </div>
              )}
              
              {success && (
                <div className="admin-alert success-alert">
                  <CheckCircle2 size={18} />
                  <span>{success}</span>
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="admin-form-group">
                  <label className="admin-label">Project Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="e.g. Oceanfront Condos"
                    className="admin-input"
                  />
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-label">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="admin-input"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-label">Client</label>
                    <input
                      type="text"
                      name="client"
                      value={formData.client}
                      onChange={handleChange}
                      placeholder="e.g. Horizon Group"
                      className="admin-input"
                    />
                  </div>
                </div>

                <div className="admin-form-row">
                  <div className="admin-form-group">
                    <label className="admin-label">Location *</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. Miami, FL"
                      className="admin-input"
                    />
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-label">Year</label>
                    <input
                      type="text"
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      placeholder="e.g. 2026"
                      className="admin-input"
                    />
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-label">Description *</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Tell us about the project specifications, structure, and design principles..."
                    rows="4"
                    className="admin-input"
                  ></textarea>
                </div>

                {/* Photos upload module */}
                <div className="admin-form-group">
                  <label className="admin-label">Project Photos</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handlePhotoChange}
                    ref={photoInputRef}
                    style={{ display: 'none' }}
                  />
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => photoInputRef.current.click()}
                    style={{ width: '100%', gap: '0.5rem', padding: '0.8rem 1.5rem', marginBottom: '1rem', border: '1px dashed var(--accent-color)', color: 'var(--accent-color)' }}
                  >
                    <Upload size={16} /> Select Photos from Device
                  </button>

                  {/* Previews List */}
                  <div className="upload-preview-list">
                    {uploadedPhotos.map((item, idx) => (
                      <div key={idx} className="upload-preview-card">
                        <div className="preview-img-container">
                          <img src={item.dataUrl} alt="Preview" />
                        </div>
                        <input
                          type="text"
                          value={item.caption}
                          onChange={(e) => updatePhotoCaption(idx, e.target.value)}
                          placeholder="Type photo caption..."
                          className="admin-input preview-caption-input"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(idx)}
                          className="preview-remove-btn"
                          title="Remove photo"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                    {uploadedPhotos.length === 0 && (
                      <div className="upload-empty-placeholder">
                        <ImageIcon size={20} />
                        <span>No photos uploaded. Default placeholder will be used.</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Blueprints upload module */}
                <div className="admin-form-group" style={{ marginTop: '1rem' }}>
                  <label className="admin-label">Architectural Blueprints</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleBlueprintChange}
                    ref={blueprintInputRef}
                    style={{ display: 'none' }}
                  />
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => blueprintInputRef.current.click()}
                    style={{ width: '100%', gap: '0.5rem', padding: '0.8rem 1.5rem', marginBottom: '1rem', border: '1px dashed var(--accent-color)', color: 'var(--accent-color)' }}
                  >
                    <Upload size={16} /> Select Blueprints from Device
                  </button>

                  {/* Previews List */}
                  <div className="upload-preview-list">
                    {uploadedBlueprints.map((item, idx) => (
                      <div key={idx} className="upload-preview-card">
                        <div className="preview-img-container">
                          <img src={item.dataUrl} alt="Blueprint Preview" />
                        </div>
                        <input
                          type="text"
                          value={item.caption}
                          onChange={(e) => updateBlueprintCaption(idx, e.target.value)}
                          placeholder="Type blueprint caption..."
                          className="admin-input preview-caption-input"
                        />
                        <button
                          type="button"
                          onClick={() => removeBlueprint(idx)}
                          className="preview-remove-btn"
                          title="Remove blueprint"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                    {uploadedBlueprints.length === 0 && (
                      <div className="upload-empty-placeholder">
                        <ImageIcon size={20} />
                        <span>No blueprints uploaded. Standard blueprint will be used.</span>
                      </div>
                    )}
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-admin-submit" style={{ marginTop: '2rem' }}>
                  <Plus size={16} /> Add Project to Portfolio
                </button>
              </form>
            </div>

            {/* Right: Existing projects table */}
            <div className="admin-card">
              <h2 className="heading-sm mb-4">Existing Portfolio ({projects.length})</h2>
              
              <div className="admin-table-container">
                {projects.length === 0 ? (
                  <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                    No projects in portfolio. Add one using the form.
                  </div>
                ) : (
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Preview</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Location</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((proj) => (
                        <tr key={proj.id}>
                          <td>
                            <div className="admin-table-preview">
                              <img src={proj.image} alt={proj.title} />
                            </div>
                          </td>
                          <td className="font-weight-bold">{proj.title}</td>
                          <td>
                            <span className="admin-table-badge">{proj.category}</span>
                          </td>
                          <td className="text-muted">{proj.location}</td>
                          <td style={{ textAlign: 'right' }}>
                            <button
                              onClick={() => handleDelete(proj.id, proj.title)}
                              className="admin-delete-btn"
                              title="Delete project"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="container" style={{ maxWidth: '1000px' }}>
            <h2 className="heading-sm mb-4">Incoming Client Inquiries ({messages.length})</h2>
            
            {success && (
              <div className="admin-alert success-alert" style={{ maxWidth: '400px', margin: '0 auto 1.5rem 0' }}>
                <CheckCircle2 size={18} />
                <span>{success}</span>
              </div>
            )}

            <div className="messages-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {messages.length === 0 ? (
                <div className="admin-card" style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '4rem' }}>
                  No messages in inbox. Incoming inquiries from the contact form will appear here.
                </div>
              ) : (
                messages.map(msg => (
                  <div key={msg.id} className="admin-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '4px', padding: '2.5rem' }}>
                    <button
                      onClick={() => handleDeleteMessage(msg.id)}
                      className="admin-delete-btn"
                      style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}
                      title="Delete message"
                    >
                      <Trash2 size={18} />
                    </button>
                    
                    <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                      <span className="mono-text" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        Submitted: {new Date(msg.timestamp).toLocaleString()}
                      </span>
                      <h3 className="heading-sm" style={{ margin: 0, textTransform: 'none', fontSize: '1.25rem', color: 'var(--text-primary)' }}>
                        {msg.firstName} {msg.lastName}
                      </h3>
                      <a href={`mailto:${msg.email}`} className="text-accent" style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', display: 'inline-block', width: 'fit-content' }}>
                        {msg.email}
                      </a>
                    </div>
                    
                    <div>
                      <p style={{ whiteSpace: 'pre-wrap', color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                        {msg.message}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default Admin;
