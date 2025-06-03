document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.getElementById('theme-toggle');
  const body = document.body;
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  // Function to set theme
  const setTheme = (theme) => {
    if (theme === 'dark') {
      body.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.toggle('light-theme');
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
    const currentTheme = body.classList.contains('light-theme') ? 'light' : 'dark';
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
