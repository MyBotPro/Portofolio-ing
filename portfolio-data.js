/* Portfolio data helpers - intentionally dependency-free so the site works on GitHub Pages. */
(function (global) {
  'use strict';

  const localCertificate = Object.freeze({
    id: 'wotd-festival-2024-local',
    title: 'Juara 2 - Lomba Infografis WOTD Festival 2024',
    owner: 'Havidz Gading Fadhilla',
    issuer: 'HIMTO Universitas Indonesia',
    year: '2024',
    thumbnail: './certificates-preview.webp',
    url: './certificates.pdf',
    isLocal: true,
  });

  const fields = (object, names) => {
    if (!object || typeof object !== 'object') return '';
    for (const key of names) {
      const value = object[key];
      if (typeof value === 'string' && value.trim()) return value.trim();
      if (typeof value === 'number' && Number.isFinite(value)) return String(value);
    }
    return '';
  };

  function safeUrl(raw) {
    if (typeof raw !== 'string' || !raw.trim()) return '';
    const value = raw.trim();
    try {
      const url = new URL(value, global.location && global.location.href || 'https://example.com/');
      if (url.protocol !== 'https:' && url.protocol !== 'http:') return '';
      return value;
    } catch (_) {
      return '';
    }
  }

  // The public portfolio intentionally displays only the WOTD award.
  // Older project/certificate data can remain on a visitor's device, but is never rendered.
  function readCache(_key) { return []; }
  function writeCache(_key, _data) { /* Additional items are disabled. */ }

  function getBasePath() {
    // Derive from the bundle location: works both at / and /repo-name/ on GitHub Pages.
    const script = global.document && global.document.querySelector('script[src*="sc.js"]');
    if (!script) return '/';
    try {
      const url = new URL(script.getAttribute('src'), global.location.href);
      return url.pathname.replace(/\/sc\.js$/, '') || '/';
    } catch (_) {
      return '/';
    }
  }

  function certificate(row) {
    const title = fields(row, ['title', 'Title', 'name', 'Name', 'certificateName', 'CertificateName', 'judul', 'Judul']) || 'Sertifikat';
    const issuer = fields(row, ['issuer', 'Issuer', 'organization', 'Organization', 'institution', 'Institution', 'issuedBy', 'IssuedBy', 'provider', 'Provider', 'platform', 'Platform']);
    const year = fields(row, ['year', 'Year', 'date', 'Date', 'issueDate', 'IssueDate']).slice(0, 26);
    const url = safeUrl(fields(row, ['url', 'URL', 'link', 'Link', 'certificateUrl', 'CertificateUrl', 'CertificateURL', 'credentialUrl', 'CredentialURL', 'driveUrl', 'pdfUrl', 'PDFUrl']));
    const potentialThumbnail = safeUrl(fields(row, ['thumbnail', 'Thumbnail', 'Img', 'img', 'image', 'Image', 'imageUrl', 'ImageUrl', 'imageURL', 'certificateImage', 'CertificateImage']));
    const thumbnail = /\.pdf(?:[?#]|$)/i.test(potentialThumbnail) ? '' : potentialThumbnail;
    const id = fields(row, ['id', 'ID']) || title + '-' + issuer;
    return { id, title, issuer, year, url, thumbnail };
  }

  function project(row) {
    const title = fields(row, ['title', 'Title', 'name', 'Name', 'projectName', 'ProjectName']) || 'Proyek';
    const description = fields(row, ['description', 'Description', 'desc', 'Desc', 'detail', 'Detail']);
    const thumbnail = safeUrl(fields(row, ['Img', 'img', 'image', 'Image', 'thumbnail', 'Thumbnail', 'imageUrl', 'ImageUrl']));
    const url = safeUrl(fields(row, ['demoUrl', 'DemoUrl', 'liveUrl', 'LiveUrl', 'url', 'URL', 'link', 'Link']));
    const github = safeUrl(fields(row, ['github', 'Github', 'githubUrl', 'GithubUrl', 'repository', 'Repository']));
    const tagsRaw = row && (row.TechStack || row.techStack || row.technologies || []);
    const tags = (Array.isArray(tagsRaw) ? tagsRaw : [])
      .map((tag) => typeof tag === 'string' ? tag : fields(tag, ['name', 'Name', 'label', 'language']))
      .filter(Boolean).slice(0, 6);
    const id = fields(row, ['id', 'ID']) || title;
    return { id, title, description, thumbnail, url, github, tags };
  }

  global.PortfolioData = Object.freeze({
    localCertificate, readCache, writeCache, getBasePath, certificate, project, safeUrl,
  });
})(window);
