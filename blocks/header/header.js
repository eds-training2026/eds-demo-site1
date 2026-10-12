export default function decorate(block) {
  const bodyHeader = document.querySelector('body > header .header');

  // Prevent the same header block from rendering twice when the page already
  // creates a site header in the body and this authored block is also present in
  // the main content area.
  if (block.closest('main') && bodyHeader && bodyHeader !== block) {
    block.remove();
    return;
  }

  const navItems = [];

  // Read rows directly from the authored da.live content table
  const rows = [...block.children];
  rows.forEach((row) => {
    const cols = [...row.children];
    if (cols.length > 0) {
      const linkEl = cols[0].querySelector('a');
      const text = cols[0].textContent.trim();

      // If a link was added in da.live, use its href; otherwise, fallback to a clean slug
      const href = linkEl
        ? linkEl.getAttribute('href')
        : `/${text.toLowerCase().replace(/\s+/g, '-')}`;

      // Skip the table header text if it says "Navigation"
      if (text && text.toLowerCase() !== 'navigation') {
        navItems.push({ text, href });
      }
    }
  });

  block.classList.add('header');
  block.innerHTML = `
    <nav class="navbar" aria-label="Main navigation">
      <ul class="nav-links">
        ${navItems.map((item) => `<li><a href="${item.href}">${item.text}</a></li>`).join('')}
      </ul>

      <button class="nav-hamburger" type="button" aria-label="Toggle navigation" aria-expanded="false">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  `;

  // Mobile Hamburger menu toggle logic
  const navbar = block.querySelector('.navbar');
  const hamburger = block.querySelector('.nav-hamburger');

  if (hamburger && navbar) {
    hamburger.addEventListener('click', () => {
      const isOpen = navbar.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });
  }
}
