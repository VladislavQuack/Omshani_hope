import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BubbleBackground from "./components/BubbleBackground";
import LoadingScreen from "./components/LoadingScreen";
import TransitionOverlay from "./components/TransitionOverlay";
import MenuPage from "./pages/MenuPage";
import AboutPage from "./pages/AboutPage";
import ClassesPage from "./pages/ClassesPage";
import InstructorsPage from "./pages/InstructorsPage";
import PricesPage from "./pages/PricesPage";
import ContactPage from "./pages/ContactPage";
import BookingPage from "./pages/BookingPage";

type PageRoute = "/" | "/about" | "/classes" | "/instructors" | "/prices" | "/contact" | "/booking";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<PageRoute>("/");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Prevent scroll when loading
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
    setShowContent(true);
  }, []);

  const navigateTo = useCallback((path: PageRoute) => {
    if (path === currentPage) return;
    
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentPage(path);
      setIsTransitioning(false);
    }, 800);
  }, [currentPage]);

  const goBack = useCallback(() => {
    navigateTo("/");
  }, [navigateTo]);

  const renderPage = () => {
    switch (currentPage) {
      case "/about":
        return <AboutPage key="about" onBack={goBack} />;
      case "/classes":
        return (
          <ClassesPage
            key="classes"
            onBack={goBack}
            onBook={() => navigateTo("/booking")}
          />
        );
      case "/instructors":
        return <InstructorsPage key="instructors" onBack={goBack} />;
      case "/prices":
        return (
          <PricesPage
            key="prices"
            onBack={goBack}
            onBook={() => navigateTo("/booking")}
          />
        );
      case "/contact":
        return <ContactPage key="contact" onBack={goBack} />;
      case "/booking":
        return <BookingPage key="booking" onBack={goBack} />;
      default:
        return <MenuPage key="menu" onNavigate={(path) => navigateTo(path as PageRoute)} />;
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <BubbleBackground />

      {/* Loading Screen */}
      <LoadingScreen onComplete={handleLoadingComplete} />

      {/* Transition Overlay */}
      <TransitionOverlay isActive={isTransitioning} />

      {/* Main Content */}
      <AnimatePresence mode="wait">
        {showContent && !isLoading && (
          <motion.div
            className="relative z-10 min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              {renderPage()}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
