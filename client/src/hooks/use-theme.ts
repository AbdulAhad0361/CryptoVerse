import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export function useThemeMode() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Make sure the component is mounted on the client before accessing theme
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    if (resolvedTheme === 'dark') {
      setTheme('light');
    } else {
      setTheme('dark');
    }
  };

  return { 
    theme: mounted ? resolvedTheme : undefined, 
    toggleTheme,
    isDark: mounted && resolvedTheme === 'dark',
    isLight: mounted && resolvedTheme === 'light'
  };
}
