import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar      from './components/Navbar'
import HomeFeed    from './pages/HomeFeed'
import CreatePost  from './pages/CreatePost'
import DebateArena from './pages/DebateArena'
import Profile     from './pages/Profile'

function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28, ease: [0.2, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <div className="min-h-screen ambient-bg">
      {/* Ambient radials */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(ellipse 500px 250px at 15% 10%, rgba(124,58,237,0.07) 0%, transparent 70%),' +
            'radial-gradient(ellipse 350px 350px at 85% 85%, rgba(0,207,255,0.05) 0%, transparent 70%)',
        }}
      />

      {/* Navbar: renders both desktop sidebar + mobile bars */}
      <Navbar />

      {/*
        Layout:
        - Mobile:  full width, Navbar is sticky top + fixed bottom
        - Desktop: ml-56 to clear the 224px sidebar
      */}
      <div className="relative z-10 md:ml-56">
        <main>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/"       element={<PageWrapper><HomeFeed /></PageWrapper>} />
              <Route path="/create" element={<PageWrapper><CreatePost /></PageWrapper>} />
              <Route path="/arena"  element={<PageWrapper><DebateArena /></PageWrapper>} />
              <Route path="/profile"element={<PageWrapper><Profile /></PageWrapper>} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
