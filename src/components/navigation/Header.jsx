import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield } from 'lucide-react';
import { BRAND, NAV_LINKS, ROUTES } from '@utils/constants';
import useAuthStore from '@stores/authStore';
import Button from '@components/ui/Button';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  const isActive = (path) => location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-zoomer-dark/90 backdrop-blur-xl border-b border-zoomer-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link to={ROUTES.HOME} className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-zoomer-neon-dim to-zoomer-neon flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-white hidden sm:inline">{BRAND}</span>
          </Link>

          <div className="hidden md:flex items-center gap-1 flex-shrink-0">
            <nav className="flex items-center gap-0.5 mr-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    isActive(link.path) ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <Link to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.LOGIN}>
              <Button variant="primary" className="text-sm px-5 py-2">
                {isAuthenticated ? 'Личный кабинет' : 'Войти'}
              </Button>
            </Link>
          </div>

          <button type="button" className="md:hidden p-2 text-gray-400" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-zoomer-border bg-zoomer-dark overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-lg text-gray-300 hover:bg-white/5"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-zoomer-border">
                <Link to={isAuthenticated ? ROUTES.DASHBOARD : ROUTES.LOGIN} onClick={() => setMobileOpen(false)}>
                  <Button className="w-full text-sm">{isAuthenticated ? 'Личный кабинет' : 'Войти'}</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
