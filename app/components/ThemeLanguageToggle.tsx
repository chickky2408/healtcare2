'use client';

import { useApp } from '../contexts/AppContext';
import { Sun, Moon, Languages } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThemeLanguageToggle() {
  const { theme, language, setTheme, setLanguage, t } = useApp();

  const cycleLanguage = () => {
    const languages = ['en', 'th', 'zh'] as const;
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex]);
  };

  const getLanguageLabel = () => {
    switch (language) {
      case 'en': return 'EN';
      case 'th': return 'TH';
      case 'zh': return 'ZH';
      default: return 'EN';
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Language Toggle */}
      <motion.button
        onClick={cycleLanguage}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/20 dark:bg-white/10 hover:bg-blue-500/30 dark:hover:bg-white/20 transition-colors border border-blue-500/40 dark:border-white/20 text-blue-900 dark:text-white"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={t('settings.language')}
      >
        <Languages size={18} />
        <span className="text-sm font-medium">
          {getLanguageLabel()}
        </span>
      </motion.button>

      {/* Theme Toggle */}
      <motion.button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/20 dark:bg-white/10 hover:bg-blue-500/30 dark:hover:bg-white/20 transition-colors border border-blue-500/40 dark:border-white/20 text-blue-900 dark:text-white"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={t('settings.theme')}
      >
        {theme === 'dark' ? (
          <>
            <Sun size={18} />
            <span className="text-sm font-medium">{t('theme.light')}</span>
          </>
        ) : (
          <>
            <Moon size={18} />
            <span className="text-sm font-medium">{t('theme.dark')}</span>
          </>
        )}
      </motion.button>
    </div>
  );
}
