const DEFAULT_PROJECTS = {
  '1': {
    id: '1',
    title: 'The Apex Tower',
    category: 'Commercial',
    image: '/project_1.png',
    photos: {
      images: [
        '/project_1.png',
        '/project_1_alt1.png',
        '/project_1_alt2.png',
      ],
      captions: [
        'The Apex Tower — Façade Overview',
        'The Apex Tower — Exterior Detail at Dusk',
        'The Apex Tower — Grand Lobby Interior',
      ]
    },
    blueprints: {
      images: [
        '/project_1_blueprint.png',
      ],
      captions: [
        'The Apex Tower — Structural Framing & Core Plan',
      ]
    },
    client: 'Apex Global',
    location: 'New York, NY',
    year: '2025',
    description: 'A striking 80-story commercial skyscraper featuring sustainable materials, a complex steel sub-structure, and an entirely glass exterior. This project represents the pinnacle of modern architecture and engineering efficiency.',
  },
  '2': {
    id: '2',
    title: 'Lumina Tech Park',
    category: 'Industrial',
    image: '/project_2.png',
    photos: {
      images: [
        '/project_2.png',
        '/project_2_alt1.png',
        '/project_2_alt2.png',
      ],
      captions: [
        'Lumina Tech Park — Campus Aerial View',
        'Lumina Tech Park — Eco-Friendly Exteriors',
        'Lumina Tech Park — Research Lab Interior',
      ]
    },
    blueprints: {
      images: [
        '/project_2_blueprint.png',
      ],
      captions: [
        'Lumina Tech Park — Site Masterplan & Zoning Layout Plan',
      ]
    },
    client: 'Lumina Industries',
    location: 'San Francisco, CA',
    year: '2024',
    description: 'An expansive modern tech park designed for the future of work. Spanning 40 acres, it integrates eco-friendly architecture with robust industrial infrastructure tailored for research and technological development.',
  },
  '3': {
    id: '3',
    title: 'Vanguard Residences',
    category: 'Residential',
    image: '/about.png',
    photos: {
      images: [
        '/about.png',
      ],
      captions: [
        'Vanguard Residences — Exterior Perspective Rendering',
      ]
    },
    blueprints: {
      images: [
        '/project_2_blueprint.png',
      ],
      captions: [
        'Vanguard Residences — Floor Layout Plan',
      ]
    },
    client: 'Vanguard Realty Group',
    location: 'Miami, FL',
    year: '2026',
    description: 'A modern, multi-family residential building designed with modular construction principles and open-concept floor plans, featuring sustainable green roofs and private balconies.',
  },
  '4': {
    id: '4',
    title: 'Heritage Restoration',
    category: 'Renovation',
    image: '/hero_bg.png',
    photos: {
      images: [
        '/hero_bg.png',
      ],
      captions: [
        'Heritage Restoration — Completed Frontage Restoration',
      ]
    },
    blueprints: {
      images: [
        '/project_1_blueprint.png',
      ],
      captions: [
        'Heritage Restoration — Structural Reinforcement Drawings',
      ]
    },
    client: 'Historic Preservation Board',
    location: 'Boston, MA',
    year: '2023',
    description: 'A delicate historical restoration and modernization project. The building facade was meticulously preserved while completely reinforcing the aging structural steel frame and foundation.',
  }
};

export const getProjects = () => {
  const stored = localStorage.getItem('projectsData');
  if (!stored) {
    localStorage.setItem('projectsData', JSON.stringify(DEFAULT_PROJECTS));
    return DEFAULT_PROJECTS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error("Error parsing stored projects, resetting to defaults", e);
    localStorage.setItem('projectsData', JSON.stringify(DEFAULT_PROJECTS));
    return DEFAULT_PROJECTS;
  }
};

export const saveProjects = (projects) => {
  try {
    localStorage.setItem('projectsData', JSON.stringify(projects));
    return true;
  } catch (e) {
    console.error("Failed to save projects to localStorage", e);
    alert("Warning: Local storage quota exceeded! The images you uploaded are too large. We have implemented automatic image compression, but please try using smaller or fewer images, or delete some older projects to free up space.");
    return false;
  }
};

export const addProject = (project) => {
  const projects = getProjects();
  const id = Date.now().toString();
  
  // Format details
  const newProject = {
    id,
    title: project.title,
    category: project.category,
    image: project.photos && project.photos[0] ? project.photos[0] : '/about.png',
    photos: {
      images: project.photos && project.photos.length > 0 ? project.photos : ['/about.png'],
      captions: project.photoCaptions && project.photoCaptions.length > 0 
        ? project.photoCaptions 
        : project.photos.map((_, i) => `${project.title} — View ${i + 1}`)
    },
    blueprints: {
      images: project.blueprints && project.blueprints.length > 0 ? project.blueprints : ['/project_1_blueprint.png'],
      captions: project.blueprintCaptions && project.blueprintCaptions.length > 0 
        ? project.blueprintCaptions 
        : project.blueprints.map((_, i) => `${project.title} — Blueprint ${i + 1}`)
    },
    client: project.client || 'N/A',
    location: project.location || 'N/A',
    year: project.year || new Date().getFullYear().toString(),
    description: project.description || '',
  };

  projects[id] = newProject;
  saveProjects(projects);
  return newProject;
};

export const deleteProject = (id) => {
  const projects = getProjects();
  if (projects[id]) {
    delete projects[id];
    saveProjects(projects);
    return true;
  }
  return false;
};

// Message Inbox Storage Helpers
export const getMessages = () => {
  const stored = localStorage.getItem('contactMessages');
  if (!stored) {
    localStorage.setItem('contactMessages', JSON.stringify([]));
    return [];
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error("Error parsing stored messages", e);
    return [];
  }
};

export const addMessage = (message) => {
  const messages = getMessages();
  const newMessage = {
    id: Date.now().toString(),
    firstName: message.firstName,
    lastName: message.lastName,
    email: message.email,
    message: message.message,
    timestamp: new Date().toISOString()
  };
  messages.unshift(newMessage); // Prepend so new messages appear first
  localStorage.setItem('contactMessages', JSON.stringify(messages));
  return newMessage;
};

export const deleteMessage = (id) => {
  const messages = getMessages();
  const filtered = messages.filter(msg => msg.id !== id);
  localStorage.setItem('contactMessages', JSON.stringify(filtered));
  return true;
};
