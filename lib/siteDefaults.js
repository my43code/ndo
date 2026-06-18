const defaultContact = {
  companyName: "Nexus DevOps Limited",
  tagline: "Digital systems, modern websites, and dependable support.",
  address: "Port Moresby, Papua New Guinea",
  email: "info@ndo.com",
  phone: "+675 78337326",
  whatsapp: "+675 78337326",
  hours: "Monday to Friday, 8:00 AM to 5:00 PM",
  mapUrl: "https://www.google.com/maps?q=Port+Moresby+Papua+New+Guinea",
  facebook: "https://www.facebook.com/",
  linkedin: "https://www.linkedin.com/",
  x: "https://x.com/",
};

function createDefaultMedia() {
  return {
    text: "",
    image: "",
    video: "",
  };
}

export function createDefaultContact() {
  return { ...defaultContact };
}

export function createDefaultAbout() {
  return {
    history: createDefaultMedia(),
    mission: "",
    vision: "",
    values: [],
    mvv: createDefaultMedia(),
    team: [],
    projects: [],
    contact: createDefaultContact(),
  };
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function normalizeMedia(source, fallback) {
  return {
    ...fallback,
    ...(source || {}),
  };
}

export function normalizeAboutContent(about) {
  const source = about || {};
  const defaultAbout = createDefaultAbout();

  return {
    ...defaultAbout,
    ...source,
    history: normalizeMedia(source.history, defaultAbout.history),
    mvv: normalizeMedia(source.mvv, defaultAbout.mvv),
    contact: {
      ...defaultAbout.contact,
      ...(source.contact || {}),
    },
    values: Array.isArray(source.values)
      ? source.values.filter(isNonEmptyString)
      : [],
    team: Array.isArray(source.team) ? source.team : [],
    projects: Array.isArray(source.projects) ? source.projects : [],
  };
}
