// Theme toggle functionality
// (function() {
//     const themeToggle = document.getElementById('theme-toggle');
//     const htmlElement = document.documentElement;
//
//     // Check for saved theme preference or default to 'dark'
//     const currentTheme = localStorage.getItem('theme') || 'dark';
//     htmlElement.setAttribute('data-theme', currentTheme);
//
//     // Toggle theme
//     themeToggle.addEventListener('click', function() {
//         const currentTheme = htmlElement.getAttribute('data-theme');
//         const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
//
//         htmlElement.setAttribute('data-theme', newTheme);
//         localStorage.setItem('theme', newTheme);
//     });
// })();

document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('theme-toggle');
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  // Function to set theme
  const setTheme = (theme) => {
    if (theme === 'dark') {
      document.body.classList.remove('light-theme');
      document.body.classList.add('dark-theme-preferred');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme-preferred');
      localStorage.setItem('theme', 'light');
    }
  };

  // Initialize theme based on localStorage or system preference
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    setTheme(prefersDarkScheme.matches ? 'dark' : 'light');
  }

  // Toggle theme when button is clicked
  toggleButton.addEventListener('click', () => {
    const currentTheme = localStorage.getItem('theme') ||
                          (prefersDarkScheme.matches ? 'dark' : 'light');

    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  });

  // Listen for system preference changes
  prefersDarkScheme.addEventListener('change', (e) => {
    const savedTheme = localStorage.getItem('theme');
    if (!savedTheme) {
      setTheme(e.matches ? 'dark' : 'light');
    }
  });
});
