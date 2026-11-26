import { useTranslation } from 'react-i18next';
import { MotionConfig } from 'framer-motion';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ExperienceLog from './components/ExperienceLog';
import SkillTree from './components/SkillTree';
import ProjectsInventory from './components/ProjectsInventory';
import SideQuests from './components/SideQuests';
import Testimonials from './components/Testimonials';
import ContactCard from './components/ContactCard';
import BackToTop from './components/BackToTop';
import CursorGrid from './components/CursorGrid';
import CrawlingBugs from './components/CrawlingBugs';
import Inspector from './components/Inspector';

function App() {
  const { t } = useTranslation();

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative isolate min-h-screen bg-background text-text-main overflow-x-hidden pt-16">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded font-mono text-sm"
        >
          {t('a11y.skip')}
        </a>

        <Navbar />

        {/* Background layers, behind all content */}
        <CursorGrid />
        <CrawlingBugs />
        <Inspector />

        <main id="main" tabIndex={-1} className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-y-28 md:gap-y-40 outline-none">
          <HeroSection />
          <AboutSection />
          <ExperienceLog />
          <SkillTree />
          <ProjectsInventory />
          <SideQuests />
          <Testimonials />
          <ContactCard />
        </main>

        <footer className="mt-28 border-t border-surface-light">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row gap-2 justify-between text-sm text-text-muted font-mono">
            <p>{t('footer.text', { year: new Date().getFullYear() })}</p>
            <p>
              {t('footer.gg')}{' '}
              <span className="text-text-muted/60">
                {t('footer.icons')}{' '}
                <a href="https://game-icons.net" target="_blank" rel="noreferrer" className="underline underline-offset-4 hover:text-text-main">game-icons.net</a>
                {' '}(CC BY 3.0)
              </span>
            </p>
          </div>
        </footer>

        <BackToTop />
      </div>
    </MotionConfig>
  );
}

export default App;
