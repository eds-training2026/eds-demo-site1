/**
 * Tabs Component
 * Provides accessible tabbed interface functionality
 */

export default function decorate(block) {
  const tabs = block.querySelectorAll(':scope > div');
  const tabList = document.createElement('ul');
  tabList.className = 'tabs__list';

  const panels = [];

  tabs.forEach((tab, index) => {
    // Create tab button
    const tabButton = document.createElement('button');
    tabButton.className = 'tabs__button';
    tabButton.setAttribute('aria-selected', index === 0);
    tabButton.setAttribute('aria-controls', `panel-${index}`);
    tabButton.setAttribute('id', `tab-${index}`);
    tabButton.setAttribute('role', 'tab');

    // Get tab label from first child or use index
    const tabLabel = tab.querySelector('h2, h3, h4, h5, h6, p');
    tabButton.textContent = tabLabel ? tabLabel.textContent : `Tab ${index + 1}`;

    // Create tab list item
    const tabItem = document.createElement('li');
    tabItem.className = 'tabs__tab';
    tabItem.setAttribute('role', 'presentation');
    tabItem.appendChild(tabButton);
    tabList.appendChild(tabItem);

    // Create panel
    const panel = document.createElement('div');
    panel.className = 'tabs__panel';
    panel.setAttribute('id', `panel-${index}`);
    panel.setAttribute('aria-labelledby', `tab-${index}`);
    panel.setAttribute('role', 'tabpanel');
    panel.appendChild(tab);

    panels.push({ button: tabButton, panel });

    // Add click handler
    tabButton.addEventListener('click', () => {
      selectTab(index, panels);
    });

    // Add keyboard navigation
    tabButton.addEventListener('keydown', (e) => {
      handleKeyboard(e, index, panels);
    });
  });

  // Build the tabs structure
  const tabsWrapper = document.createElement('div');
  tabsWrapper.className = 'tabs';
  tabsWrapper.appendChild(tabList);

  block.innerHTML = '';
  block.appendChild(tabsWrapper);
  panels.forEach(({ panel }) => {
    block.appendChild(panel);
  });

  // Select first tab by default
  selectTab(0, panels);
}

function selectTab(index, panels) {
  panels.forEach(({ button, panel }, i) => {
    const isSelected = i === index;
    button.setAttribute('aria-selected', isSelected);
    panel.style.display = isSelected ? 'block' : 'none';
  });
}

function handleKeyboard(event, currentIndex, panels) {
  let nextIndex = null;

  switch (event.key) {
    case 'ArrowLeft':
    case 'ArrowUp':
      nextIndex = (currentIndex - 1 + panels.length) % panels.length;
      event.preventDefault();
      break;
    case 'ArrowRight':
    case 'ArrowDown':
      nextIndex = (currentIndex + 1) % panels.length;
      event.preventDefault();
      break;
    case 'Home':
      nextIndex = 0;
      event.preventDefault();
      break;
    case 'End':
      nextIndex = panels.length - 1;
      event.preventDefault();
      break;
    default:
      return;
  }

  if (nextIndex !== null) {
    panels[nextIndex].button.focus();
    selectTab(nextIndex, panels);
  }
}
