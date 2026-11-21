export const COMPANY_NAME = "Manu Maso Digital Solutions";

export function updateLegacyBrand(text) {
  return typeof text === "string"
    ? text.replace(/\bNexus\s+DevOps\s+Limited\b/gi, COMPANY_NAME)
    : text;
}

const defaultContact = {
  companyName: COMPANY_NAME,
  tagline: "Digital systems, modern websites, and dependable support.",
  address: "Port Moresby, Papua New Guinea",
  email: "info@manumaso.com",
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
    text: updateLegacyBrand(source?.text ?? fallback.text),
  };
}

export function normalizeAboutContent(about) {
  const source = about || {};
  const defaultAbout = createDefaultAbout();
  const contactSource = source.contact || {};
  const configuredEmail = isNonEmptyString(contactSource.email)
    ? contactSource.email.trim()
    : defaultAbout.contact.email;
  const email =
    ["info@ndo.com", "info@ndoltd.com"].includes(configuredEmail.toLowerCase())
      ? defaultAbout.contact.email
      : configuredEmail;

  return {
    ...defaultAbout,
    ...source,
    history: normalizeMedia(source.history, defaultAbout.history),
    mission: updateLegacyBrand(source.mission ?? defaultAbout.mission),
    vision: updateLegacyBrand(source.vision ?? defaultAbout.vision),
    mvv: normalizeMedia(source.mvv, defaultAbout.mvv),
    contact: {
      companyName: COMPANY_NAME,
      tagline: isNonEmptyString(contactSource.tagline)
        ? updateLegacyBrand(contactSource.tagline)
        : defaultAbout.contact.tagline,
      address: isNonEmptyString(contactSource.address)
        ? contactSource.address
        : defaultAbout.contact.address,
      email,
      phone: isNonEmptyString(contactSource.phone)
        ? contactSource.phone
        : defaultAbout.contact.phone,
      whatsapp: isNonEmptyString(contactSource.whatsapp)
        ? contactSource.whatsapp
        : defaultAbout.contact.whatsapp,
      hours: isNonEmptyString(contactSource.hours)
        ? contactSource.hours
        : defaultAbout.contact.hours,
      mapUrl: isNonEmptyString(contactSource.mapUrl)
        ? contactSource.mapUrl
        : defaultAbout.contact.mapUrl,
      facebook: isNonEmptyString(contactSource.facebook)
        ? contactSource.facebook
        : defaultAbout.contact.facebook,
      linkedin: isNonEmptyString(contactSource.linkedin)
        ? contactSource.linkedin
        : defaultAbout.contact.linkedin,
      x: isNonEmptyString(contactSource.x)
        ? contactSource.x
        : defaultAbout.contact.x,
    },
    values: Array.isArray(source.values)
      ? source.values.filter(isNonEmptyString).map(updateLegacyBrand)
      : [],
    team: Array.isArray(source.team)
      ? source.team.map((member) => ({
          ...member,
          role: updateLegacyBrand(member?.role),
          bio: updateLegacyBrand(member?.bio),
        }))
      : [],
    projects: Array.isArray(source.projects)
      ? source.projects.map((project) => ({
          ...project,
          title: updateLegacyBrand(project?.title),
          description: updateLegacyBrand(project?.description),
        }))
      : [],
  };
}
