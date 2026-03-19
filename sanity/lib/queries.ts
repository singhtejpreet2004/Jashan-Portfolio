export const siteSettingsQuery = `*[_type == "siteSettings"][0]{name, title, tagline, email, phone, linkedinUrl, githubUrl, "resumeFileUrl": resumeFile.asset->url}`;

export const aboutQuery = `*[_type == "about"][0]{photo, bio, education}`;

export const skillsQuery = `*[_type == "skill"] | order(order asc){_id, category, items, color, order}`;

export const experiencesQuery = `*[_type == "experience"] | order(order asc){_id, company, role, period, achievements, order}`;

export const projectsQuery = `*[_type == "project"] | order(date desc){_id, title, description, date, techStack, achievements, githubUrl, liveUrl, image}`;

export const researchQuery = `*[_type == "research"] | order(year desc){_id, title, venue, year, status, link}`;

export const certificationsQuery = `*[_type == "certification"] | order(date desc){_id, name, issuer, date}`;

export const achievementsQuery = `*[_type == "achievement"] | order(order asc){_id, title, subtitle, icon, order}`;
