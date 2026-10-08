import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the header
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // load header as fragment
  const headerMeta = getMetadata('header');
  const headerPath = headerMeta ? new URL(headerMeta, window.location).pathname : '/header';
  const fragment = await loadFragment(headerPath);

  // decorate header DOM
  block.textContent = '';
  const header = document.createElement('div');
  while (fragment.firstElementChild) header.append(fragment.firstElementChild);

  // Add hamburger button for mobile navigation
  const hamburger = document.createElement('button');
  hamburger.className = 'nav-hamburger';
  hamburger.setAttribute('aria-label', 'Open navigation');
  hamburger.innerHTML = '<span></span><span></span><span></span>';

  const nav = header.querySelector('nav');
  if (nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
    header.appendChild(hamburger);
  }

  block.append(header);
}
