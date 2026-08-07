const buttons = document.querySelectorAll('button.primary-button, button.secondary-button');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const message = button.classList.contains('secondary-button')
      ? 'Thanks for your interest! Learn more is coming soon.'
      : 'Action received.';
    window.alert(message);
  });
});

const drawerToggle = document.getElementById('drawerToggle');
const sidebarDrawer = document.querySelector('.sidebar-drawer');
const drawerClose = document.querySelector('.drawer-close');
const drawerLinks = document.querySelectorAll('.drawer-link');

if (drawerToggle && sidebarDrawer && drawerClose) {
  const closeDrawer = () => {
    sidebarDrawer.classList.remove('open');
    sidebarDrawer.setAttribute('aria-hidden', 'true');
  };

  drawerToggle.addEventListener('click', () => {
    sidebarDrawer.classList.add('open');
    sidebarDrawer.setAttribute('aria-hidden', 'false');
  });

  drawerClose.addEventListener('click', closeDrawer);

  drawerLinks.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });
}

// Dashboard search: filter tables and stat cards
(function setupDashboardSearch(){
  const searchInput = document.querySelector('.search-box input');
  if (!searchInput) return;

  function normalize(s){ return (s||'').toString().toLowerCase(); }

  function applySearch(){
    const q = normalize(searchInput.value).trim();

    // filter table rows
    const tables = document.querySelectorAll('.dashboard-main .table-card table');
    tables.forEach(table => {
      const tbody = table.tBodies[0];
      if (!tbody) return;
      Array.from(tbody.rows).forEach(row => {
        const rowText = normalize(row.textContent);
        row.style.display = q === '' || rowText.includes(q) ? '' : 'none';
      });
    });

    // filter stat cards
    const stats = document.querySelectorAll('.dashboard-main .stat-card');
    stats.forEach(card => {
      const text = normalize(card.textContent);
      card.style.display = q === '' || text.includes(q) ? '' : 'none';
    });
  }

  searchInput.addEventListener('input', applySearch);
})();
