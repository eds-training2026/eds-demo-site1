export default function decorate(block) {
  block.classList.add('header');
  block.innerHTML = `
    <nav class="navbar" aria-label="Main navigation">
      <div class="nav-brand">
        <img src="/icons/logo.png" alt="Medi Assist logo" />
        <span>Medi Assist</span>
      </div>

      <ul class="nav-links">
        <li><a href="/home">Home</a></li>
        <li><a href="/policies">Policies</a></li>
        <li><a href="/claims">Claims</a></li>
        <li><a href="/wellness">Wellness</a></li>

        <li class="dropdown">
          <button class="dropdown-toggle" type="button" aria-expanded="false">All Services</button>
          <ul class="dropdown-menu">
            <li><a href="/services/health-insurance">Health Insurance</a></li>
            <li><a href="/services/dental-plans">Dental Plans</a></li>
            <li><a href="/services/vision-plans">Vision Plans</a></li>
          </ul>
        </li>

        <li><a href="/help">Help</a></li>
        <li><a href="/account">Account</a></li>
      </ul>

      <div class="nav-actions">
        <span class="notification" aria-label="Notifications">🔔</span>
        <div class="profile" aria-label="User profile">VS</div>
      </div>

      <button class="nav-hamburger" type="button" aria-label="Toggle navigation" aria-expanded="false">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </nav>
  `;

  const navbar = block.querySelector('.navbar');
  const hamburger = block.querySelector('.nav-hamburger');
  const dropdown = block.querySelector('.dropdown');
  const dropdownToggle = block.querySelector('.dropdown-toggle');

  if (hamburger && navbar) {
    hamburger.addEventListener('click', () => {
      const isOpen = navbar.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });
  }

  if (dropdown && dropdownToggle) {
    dropdownToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = dropdown.classList.toggle('open');
      dropdownToggle.setAttribute('aria-expanded', String(isOpen));
    });

    document.addEventListener('click', (event) => {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove('open');
        dropdownToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }
}
