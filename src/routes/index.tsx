import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Star,
  MapPin,
  Phone,
  Clock,
  Instagram,
  Facebook,
  Twitter,
  ChevronRight,
  Sparkle,
  Sparkles,
  ArrowUpRight,
  ArrowLeft,
  ArrowRight,
  Music2,
  Youtube,
  Fish,
  Soup,
  Flame,
  ChefHat,
  Wine,
  Coffee,
  ArrowUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast, Toaster } from "sonner";
import dishRoll from "@/assets/dish-roll.jpg";
import dishNigiri from "@/assets/dish-nigiri.jpg";
import dishSashimi from "@/assets/dish-sashimi.jpg";
import dishRamen from "@/assets/dish-ramen.jpg";
import dishBento from "@/assets/dish-bento.jpg";
import dishDessert from "@/assets/dish-dessert.jpg";
import galleryInterior from "@/assets/gallery-interior.jpg";
import galleryChef from "@/assets/gallery-chef.jpg";
import galleryDining from "@/assets/gallery-dining.jpg";
import logo from "@/assets/logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sora Sushi — Authentic Japanese Dining" },
      {
        name: "description",
        content:
          "Sora Sushi: premium sushi, sashimi and ramen crafted fresh daily. Reserve a table in minutes.",
      },
    ],
  }),
  component: Index,
});

const NAV = [
  { label: "Menu", href: "#menu" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Reservations", href: "#reserve" },
  { label: "Contact", href: "#contact" },
];

const FEATURED = [
  {
    name: "Dragon Roll",
    desc: "Eel, cucumber and avocado, crowned with torched salmon.",
    price: "$18",
    tag: "Sushi Rolls",
    img: dishRoll,
  },
  {
    name: "Salmon Nigiri",
    desc: "Hand-pressed rice with silk-cut Atlantic salmon.",
    price: "$9",
    tag: "Nigiri",
    img: dishNigiri,
  },
  {
    name: "Otoro Sashimi",
    desc: "Five slices of premium fatty bluefin tuna belly.",
    price: "$26",
    tag: "Sashimi",
    img: dishSashimi,
  },
  {
    name: "Tonkotsu Ramen",
    desc: "12-hour pork bone broth, chashu, ajitama, scallion.",
    price: "$16",
    tag: "Ramen",
    img: dishRamen,
  },
  {
    name: "Sora Bento",
    desc: "Chef's daily selection: nigiri, tempura, rice and pickles.",
    price: "$24",
    tag: "Bento",
    img: dishBento,
  },
  {
    name: "Matcha Mochi",
    desc: "Stone-ground Uji matcha ice cream in soft rice cake.",
    price: "$8",
    tag: "Desserts",
    img: dishDessert,
  },
];

const FULL_MENU: { category: string; items: { name: string; desc: string; price: string }[] }[] = [
  {
    category: "Sushi Rolls",
    items: [
      { name: "Spicy Tuna Roll", desc: "Tuna, chili mayo, cucumber, sesame.", price: "$14" },
      { name: "Dragon Roll", desc: "Eel, cucumber, avocado, torched salmon.", price: "$18" },
      { name: "Rainbow Roll", desc: "Crab, tuna, salmon, yellowtail, avocado.", price: "$19" },
      {
        name: "Vegetable Futomaki",
        desc: "Avocado, cucumber, pickled radish, shiso.",
        price: "$12",
      },
    ],
  },
  {
    category: "Nigiri & Sashimi",
    items: [
      { name: "Salmon Nigiri (2 pc)", desc: "Atlantic salmon, hand-pressed rice.", price: "$9" },
      { name: "Tuna Nigiri (2 pc)", desc: "Akami bluefin, fresh wasabi.", price: "$10" },
      { name: "Otoro Sashimi", desc: "Premium fatty tuna belly, 5 slices.", price: "$26" },
      { name: "Hamachi Sashimi", desc: "Yellowtail, ponzu, micro shiso.", price: "$18" },
    ],
  },
  {
    category: "Ramen & Hot",
    items: [
      { name: "Tonkotsu Ramen", desc: "Pork bone broth, chashu, ajitama.", price: "$16" },
      { name: "Shoyu Ramen", desc: "Soy-based clear broth, bamboo, nori.", price: "$15" },
      { name: "Miso Black Cod", desc: "48-hour saikyo-miso marinated cod.", price: "$28" },
      { name: "Chicken Karaage", desc: "Twice-fried, yuzu kosho aioli.", price: "$11" },
    ],
  },
  {
    category: "Bento & Desserts",
    items: [
      { name: "Sora Bento", desc: "Chef's selection of the day.", price: "$24" },
      { name: "Tempura Bento", desc: "Shrimp & vegetable tempura, rice.", price: "$22" },
      { name: "Matcha Mochi", desc: "Uji matcha ice cream, rice cake.", price: "$8" },
      { name: "Yuzu Cheesecake", desc: "Light cheesecake, candied yuzu peel.", price: "$9" },
    ],
  },
  {
    category: "Drinks",
    items: [
      { name: "Junmai Sake (carafe)", desc: "Niigata, dry & clean finish.", price: "$14" },
      { name: "Matcha Latte", desc: "Hot or iced, ceremonial grade.", price: "$6" },
      { name: "Japanese Whisky Highball", desc: "Suntory Toki, soda, lemon.", price: "$12" },
      { name: "Hojicha Tea", desc: "Roasted green tea, pot for two.", price: "$7" },
    ],
  },
];

const REVIEWS = [
  {
    name: "Amelia Tanaka",
    rating: 5,
    text: "The otoro melts on the tongue. Easily the best sushi night we've had in the city.",
  },
  {
    name: "David Okafor",
    rating: 5,
    text: "Calm, beautiful room and faultless service. The tonkotsu ramen is unreal.",
  },
  {
    name: "Priya Raman",
    rating: 5,
    text: "Booked for a birthday — the chef's bento was a gift. We'll be back monthly.",
  },
];

function VideoBackground() {
  return <IntersectionVideoBackground />;
}

function IntersectionVideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  // Intersection Observer
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.01 },
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animationFrameId: number | null = null;

    const updateLoop = () => {
      if (!isIntersecting) return;

      if (video.duration && !isNaN(video.duration)) {
        const currentTime = video.currentTime;
        const duration = video.duration;

        let opacity = 1;

        // Fade in over 0.5s at the start (opacity 0 to 1)
        if (currentTime < 0.5) {
          opacity = currentTime / 0.5;
        }
        // Fade out over 0.5s before the end (opacity 1 to 0)
        else if (currentTime > duration - 0.5) {
          opacity = Math.max(0, (duration - currentTime) / 0.5);
        }

        video.style.opacity = opacity.toString();
      }

      animationFrameId = requestAnimationFrame(updateLoop);
    };

    const handleEnded = () => {
      if (!isIntersecting) return;
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      video.style.opacity = "0";
      setTimeout(() => {
        if (!videoRef.current || !isIntersecting) return;
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch((err) => console.log("Video play failed:", err));
      }, 100);
    };

    const handlePlay = () => {
      if (animationFrameId === null) {
        animationFrameId = requestAnimationFrame(updateLoop);
      }
    };

    const handlePause = () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);

    if (isIntersecting) {
      video.play().catch((err) => console.log("Hero video autoplay blocked/failed:", err));
      animationFrameId = requestAnimationFrame(updateLoop);
    } else {
      video.pause();
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      video.style.opacity = "0";
    }

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isIntersecting]);

  return (
    <div className="absolute inset-0 z-0 select-none pointer-events-none">
      <video
        ref={videoRef}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4"
        muted
        playsInline
        className="absolute object-cover w-full transition-opacity duration-100 ease-linear"
        style={{
          top: "300px",
          inset: "auto 0 0 0",
          height: "calc(100% - 300px)",
          opacity: 0,
        }}
      />
      {/* Gradient overlay on video */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white pointer-events-none" />
    </div>
  );
}

function Index() {
  const [open, setOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button when within 1000px of the bottom of the page
      const isNearBottom =
        document.documentElement.scrollHeight - (window.scrollY + window.innerHeight) < 1000;
      setShowScrollTop(isNearBottom);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <Toaster position="top-center" richColors />

      {/* Fullscreen Single-Page Hero & Nav Container */}
      <div className="relative min-h-screen w-full overflow-hidden bg-white">
        <VideoBackground />
        <Navbar open={open} setOpen={setOpen} />
        <Hero />
      </div>

      <main>
        <Featured />
        <FullMenu />
        <About />
        <Gallery />
        <Reserve />
        <Location />
      </main>
      <Footer />

      {/* Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:bg-gray-200 transition-colors backdrop-blur-md"
            aria-label="Back to top"
          >
            <ArrowUp size={20} strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Navbar ---------- */
function Navbar({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollRotation, setScrollRotation] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      setScrollRotation(window.scrollY * 0.12);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 transition-all duration-300 ${
        open
          ? "bg-black/90 backdrop-blur-xl border-b border-white/10 z-[9999]"
          : scrolled
            ? "bg-black/60 backdrop-blur-md border-b border-white/10 z-50 shadow-lg"
            : "bg-transparent border-b border-transparent z-50"
      }`}
    >
      <nav className="relative mx-auto flex max-w-7xl items-center justify-between px-8 py-6">
        {/* Spacer to preserve flex layout since the logo is positioned absolutely */}
        <div className="w-20 md:w-24 h-10 shrink-0" />

        <a
          href="#top"
          className="absolute left-8 top-3 md:top-2 z-50 w-20 h-20 md:w-24 md:h-24 flex items-center justify-center transition-all duration-300 select-none hover:scale-103"
        >
          {/* Rotating Text Ring */}
          <div
            className={`absolute inset-0 w-full h-full flex items-center justify-center transition-colors duration-300 ${
              open || scrolled ? "text-white/85" : "text-black/70"
            }`}
            style={{ transform: `rotate(${scrollRotation}deg)` }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                id="textPath-nav"
                d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                fill="none"
              />
              <text className="text-[6.5px] fill-current font-sans tracking-[0.25em] uppercase font-bold">
                <textPath href="#textPath-nav" startOffset="0%">
                  Sora Sushi • Sora Sushi • Sora Sushi •
                </textPath>
              </text>
            </svg>
          </div>
          {/* Central 3D Logo (text-free) */}
          <div
            className={`relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border transition-all duration-300 ${
              open || scrolled
                ? "border-white/20 bg-black shadow-lg"
                : "border-black/10 bg-black shadow-md"
            }`}
          >
            <img
              src={logo}
              alt="Sora Sushi Logo"
              className="w-full h-full object-cover scale-110"
            />
          </div>
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {NAV.map((n, idx) => (
            <li key={n.href}>
              <a
                href={n.href}
                className={`text-sm font-sans transition-colors duration-200 ${
                  open || scrolled
                    ? idx === 0
                      ? "text-white font-medium"
                      : "text-white/60 hover:text-white"
                    : idx === 0
                      ? "text-black font-medium"
                      : "text-[#6F6F6F] hover:text-black"
                }`}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a
            href="#reserve"
            className={`hidden rounded-full px-6 py-2.5 text-sm font-sans font-medium shadow-sm transition-all duration-200 hover:scale-103 md:inline-flex ${
              open || scrolled
                ? "bg-white text-black hover:bg-white/90"
                : "bg-black text-white hover:bg-black/90"
            }`}
          >
            Reserve Table
          </a>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md border active:scale-95 transition-all duration-350 md:hidden ${
              open
                ? "bg-white/10 border-white/30 text-white z-[9999]"
                : scrolled
                  ? "bg-white/10 border-white/20 text-white hover:bg-white/25"
                  : "bg-black/[0.04] border-black/10 text-black hover:bg-black/[0.08]"
            }`}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-transparent md:hidden absolute left-0 right-0 top-full z-[9999]"
          >
            <ul className="flex flex-col gap-1 px-8 py-6 bg-black/90 backdrop-blur-xl border-b border-white/10 shadow-2xl">
              {NAV.map((n, idx) => (
                <motion.li
                  key={n.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04, ease: "easeOut" }}
                >
                  <a
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-base font-sans font-medium text-white/70 hover:text-white hover:bg-white/5 transition-all duration-200"
                  >
                    {n.label}
                  </a>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV.length * 0.04, ease: "easeOut" }}
              >
                <a
                  href="#reserve"
                  onClick={() => setOpen(false)}
                  className="mt-3 block rounded-full bg-white text-black px-6 py-3.5 text-center text-base font-sans font-semibold hover:bg-white/90 shadow-md active:scale-98 transition-all duration-200"
                >
                  Reserve Table
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  return (
    <section
      id="top"
      className="relative z-10 flex flex-col items-center justify-center text-center px-6"
      style={{
        paddingTop: "8rem",
        paddingBottom: "10rem", // pb-40
      }}
    >
      <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-3.5 py-1.5 text-xs font-sans uppercase tracking-[0.2em] text-[#6F6F6F] backdrop-blur-sm animate-fade-rise">
        <span className="h-1.5 w-1.5 rounded-full bg-black animate-pulse" /> Now taking reservations
        • Rated 4.9 on Resy
      </span>

      <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-normal max-w-7xl text-black tracking-[-2.46px] leading-[0.95] animate-fade-rise">
        Authentic Japanese dining,
        <br />
        <span className="italic text-[#6F6F6F]">crafted fresh daily.</span>
      </h1>

      <p className="font-sans text-base sm:text-lg text-[#6F6F6F] max-w-2xl mt-8 leading-relaxed animate-fade-rise-delay">
        From hand-pressed nigiri to slow-simmered tonkotsu — every plate at Sora is built around
        seasonal fish, quiet rooms and unhurried evenings.
      </p>

      <div className="mt-12 flex flex-col items-center gap-4 animate-fade-rise-delay-2">
        <a
          href="#reserve"
          className="rounded-full bg-black text-white px-14 py-5 text-base font-sans font-medium hover:scale-103 transition-transform duration-200 ease-out shadow-lg"
        >
          Reserve Table
        </a>
        <a
          href="#menu"
          className="text-[#6F6F6F] hover:text-black text-sm font-sans font-medium transition-colors duration-200 flex items-center gap-1"
        >
          View Menu <ChevronRight size={14} />
        </a>
      </div>

      <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-12 border-t border-gray-100/60 pt-8 text-sm font-sans text-[#6F6F6F] animate-fade-rise-delay-2">
        <div className="flex items-center gap-2">
          <Clock size={14} className="text-black" />
          <span>
            <strong className="text-black font-medium">Open today:</strong> 5:00 PM – 11:00 PM
          </span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={14} className="text-black" />
          <span>
            <strong className="text-black font-medium">Location:</strong> 128 Cedar St, Brooklyn
          </span>
        </div>
      </div>
    </section>
  );
}

/* ---------- FadingVideo Helper ---------- */
function FadingVideo({
  src,
  className,
  style,
}: {
  src: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return <IntersectionFadingVideo src={src} className={className} style={style} />;
}

function IntersectionFadingVideo({
  src,
  className,
  style,
}: {
  src: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadingOutRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const fadeTo = (targetOpacity: number, duration: number = 500) => {
    const video = videoRef.current;
    if (!video) return;

    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }

    const startOpacity = parseFloat(video.style.opacity || "0");
    const startTime = performance.now();

    const animateFade = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentOpacity = startOpacity + (targetOpacity - startOpacity) * progress;
      video.style.opacity = currentOpacity.toString();

      if (progress < 1) {
        rafIdRef.current = requestAnimationFrame(animateFade);
      } else {
        rafIdRef.current = null;
      }
    };

    rafIdRef.current = requestAnimationFrame(animateFade);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.01 },
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isIntersecting) {
      video.play().catch((err) => console.log("Video play failed on intersection:", err));
      fadeTo(1, 500);
    } else {
      video.pause();
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      video.style.opacity = "0";
      fadingOutRef.current = false;
    }
  }, [isIntersecting]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedData = () => {
      if (isIntersecting) {
        video.style.opacity = "0";
        video.play().catch((err) => console.log("Video play failed on load:", err));
        fadeTo(1, 500);
      }
    };

    const handleTimeUpdate = () => {
      if (!isIntersecting) return;
      if (video.duration && !isNaN(video.duration)) {
        const remaining = video.duration - video.currentTime;
        if (!fadingOutRef.current && remaining <= 0.55 && remaining > 0) {
          fadingOutRef.current = true;
          fadeTo(0, 500);
        }
      }
    };

    const handleEnded = () => {
      if (!isIntersecting) return;
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      video.style.opacity = "0";
      setTimeout(() => {
        if (!videoRef.current || !isIntersecting) return;
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch((err) => console.log("Video replay failed:", err));
        fadingOutRef.current = false;
        fadeTo(1, 500);
      }, 100);
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [src, isIntersecting]);

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      playsInline
      preload="auto"
      className={className}
      style={{
        ...style,
        opacity: 0,
      }}
    />
  );
}

/* ---------- Featured (Space-Travel Capabilities Redesign) ---------- */
function Featured() {
  return (
    <section
      id="featured"
      className="relative min-h-screen bg-black bg-[radial-gradient(circle_at_center,rgba(26,46,34,0.18)_0%,rgba(0,0,0,1)_100%)] text-white overflow-hidden flex flex-col justify-between py-24 border-t border-white/5 z-10"
    >
      <FadingVideo
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_132944_a0d124bb-eaa1-4082-aa30-2310efb42b4b.mp4"
        className="absolute inset-0 w-full h-full object-cover z-0 select-none pointer-events-none"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-8 md:px-16 lg:px-20 flex flex-col justify-between h-full w-full flex-1">
        <div className="mb-auto">
          <p className="text-sm font-body text-white/80 mb-6 tracking-[0.15em]">SIGNATURE DISHES</p>
          <h2 className="font-heading italic text-white text-6xl md:text-7xl lg:text-[6rem] leading-[0.9] tracking-[-3px]">
            Gastronomy
            <br />
            evolved
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {/* Card 1 */}
          <div className="liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col justify-between">
            <div className="flex items-start justify-between gap-4">
              <div className="w-11 h-11 rounded-[0.75rem] liquid-glass flex items-center justify-center text-white">
                <Flame size={20} strokeWidth={1.5} className="text-white" />
              </div>
              <div className="flex flex-wrap justify-end gap-1.5 max-w-[70%]">
                {["Sushi Rolls", "Torched Salmon", "Eel & Cucumber", "Chef's Special"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="rounded-full px-3 py-1 text-[11px] text-white/90 font-body whitespace-nowrap liquid-glass"
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-heading italic text-white text-3xl md:text-4xl tracking-[-1px] leading-none flex justify-between items-baseline mb-2">
                <span>Dragon Roll</span>
                <span className="text-lg font-sans not-italic text-white/60 font-light">$18</span>
              </h3>
              <p className="text-sm text-white/80 font-body font-light leading-snug max-w-[32ch]">
                Eel, cucumber and avocado, crowned with torched salmon.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col justify-between">
            <div className="flex items-start justify-between gap-4">
              <div className="w-11 h-11 rounded-[0.75rem] liquid-glass flex items-center justify-center text-white">
                <Fish size={20} strokeWidth={1.5} className="text-white" />
              </div>
              <div className="flex flex-wrap justify-end gap-1.5 max-w-[70%]">
                {["Sashimi", "Bluefin Tuna", "Premium Belly", "Fresh Wasabi"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full px-3 py-1 text-[11px] text-white/90 font-body whitespace-nowrap liquid-glass"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-heading italic text-white text-3xl md:text-4xl tracking-[-1px] leading-none flex justify-between items-baseline mb-2">
                <span>Otoro Sashimi</span>
                <span className="text-lg font-sans not-italic text-white/60 font-light">$26</span>
              </h3>
              <p className="text-sm text-white/80 font-body font-light leading-snug max-w-[32ch]">
                Five slices of premium fatty bluefin tuna belly.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="liquid-glass rounded-[1.25rem] p-6 min-h-[360px] flex flex-col justify-between">
            <div className="flex items-start justify-between gap-4">
              <div className="w-11 h-11 rounded-[0.75rem] liquid-glass flex items-center justify-center text-white">
                <Soup size={20} strokeWidth={1.5} className="text-white" />
              </div>
              <div className="flex flex-wrap justify-end gap-1.5 max-w-[70%]">
                {["Ramen & Hot", "12-Hour Broth", "Chashu Pork", "Soft Ajitama"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full px-3 py-1 text-[11px] text-white/90 font-body whitespace-nowrap liquid-glass"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-heading italic text-white text-3xl md:text-4xl tracking-[-1px] leading-none flex justify-between items-baseline mb-2">
                <span>Tonkotsu Ramen</span>
                <span className="text-lg font-sans not-italic text-white/60 font-light">$16</span>
              </h3>
              <p className="text-sm text-white/80 font-body font-light leading-snug max-w-[32ch]">
                12-hour pork bone broth, chashu, ajitama, scallion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Full menu ---------- */
function FullMenu() {
  return (
    <section id="menu" className="py-24 bg-black text-white relative z-10 border-t border-white/5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/40 font-body">
            The Menu
          </p>
          <h2 className="font-heading italic text-white text-5xl md:text-6xl tracking-tight">
            Our full menu
          </h2>
          <p className="mt-4 text-base text-white/50 font-body font-light">
            Every dish is prepared to order. Please tell us about allergies — we'll happily adapt.
          </p>
        </div>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-x-16">
          {FULL_MENU.map((cat) => (
            <div key={cat.category} className="liquid-glass rounded-3xl p-6 md:p-8">
              <h3 className="font-heading italic text-3xl text-white mb-2">{cat.category}</h3>
              <div className="h-[2px] w-12 bg-white/20 mb-6" />
              <ul className="space-y-6">
                {cat.items.map((it) => (
                  <li
                    key={it.name}
                    className="flex items-start justify-between gap-4 sm:gap-6 border-b border-white/5 pb-4 last:border-b-0 last:pb-0"
                  >
                    <div className="min-w-0">
                      <div className="font-medium text-white text-base font-body">{it.name}</div>
                      <div className="mt-1 text-sm text-white/50 font-body font-light">
                        {it.desc}
                      </div>
                    </div>
                    <div className="shrink-0 text-sm font-semibold text-white font-body">
                      {it.price}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- About (Chef Mori Personal Portfolio grid) ---------- */
function About() {
  const scrollIconsRow1 = [Fish, Soup, Flame, ChefHat, Wine, Coffee, Sparkle, Star];
  const scrollIconsRow2 = [Star, Sparkle, Coffee, Wine, ChefHat, Flame, Soup, Fish];

  return (
    <section
      id="about"
      className="relative bg-[#0a0a0a] text-white py-24 px-6 sm:px-8 md:px-12 lg:px-16 overflow-hidden border-t border-white/5 z-10"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
          <div className="max-w-3xl">
            <h2 className="text-[28px] sm:text-3xl md:text-4xl lg:text-[44px] leading-[1.15] font-normal tracking-tight font-sans text-white mb-4 animate-fade-rise">
              Hi, I'm Chef Kenji Mori!
            </h2>
            <p className="text-sm md:text-[15px] leading-[1.6] text-white/60 font-sans max-w-2xl animate-fade-rise-delay">
              A Tokyo-trained culinary creator shaping sharp gastronomic systems, seasonal products,
              and story-first dining campaigns. With decades of craft behind me, I help ideas move
              with focus and intention.
            </p>
          </div>
          <div className="shrink-0 animate-fade-rise-delay-2">
            <a
              href="#reserve"
              className="liquid-glass rounded-full px-6 py-3 text-sm font-sans font-medium text-white hover:bg-white/10 transition-colors block"
            >
              Let's Team Up Today
            </a>
          </div>
        </div>

        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Column 1 - Background Timeline Card */}
          <div className="rounded-2xl bg-black bg-[radial-gradient(circle_at_center,rgba(50,68,68,0.15)_0%,rgba(0,0,0,1)_100%)] min-h-[460px] relative overflow-hidden p-6 flex flex-col justify-between border border-white/5 shadow-inner">
            <FadingVideo
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_150203_44a5bd32-516a-47ce-a077-8acbf9aa8991.mp4"
              className="absolute inset-0 w-full h-full object-cover z-0 select-none pointer-events-none opacity-40"
            />

            <div className="relative z-10 flex justify-center w-full">
              <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] text-white/70 font-sans font-semibold uppercase">
                <Sparkle size={12} className="text-white/60" /> BACKGROUND{" "}
                <Sparkle size={12} className="text-white/60" />
              </span>
            </div>

            <div className="relative z-10 space-y-6 mt-12">
              <div className="grid grid-cols-[auto_1fr] gap-x-4 items-center">
                <span className="text-xs font-semibold text-white/50 font-sans">2018-Now</span>
                <div>
                  <div className="text-sm font-semibold text-white font-sans flex items-center gap-2">
                    Executive Chef <Sparkle size={10} className="text-white/30" /> Sora Brooklyn
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-[auto_1fr] gap-x-4 items-center">
                <span className="text-xs font-semibold text-white/50 font-sans">2012-2017</span>
                <div>
                  <div className="text-sm font-semibold text-white font-sans flex items-center gap-2">
                    Head Sushi Chef <Sparkle size={10} className="text-white/30" /> Tokyo Ginza
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-[auto_1fr] gap-x-4 items-center">
                <span className="text-xs font-semibold text-white/50 font-sans">2003-2012</span>
                <div>
                  <div className="text-sm font-semibold text-white font-sans flex items-center gap-2">
                    Apprentice Chef <Sparkle size={10} className="text-white/30" /> Tsukiji Market
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2 - Stacked Client Voice & Resy Rating */}
          <div className="grid grid-rows-[auto_1fr] gap-6">
            {/* Top - Client Voice Card */}
            <div className="rounded-2xl bg-[#324444] p-6 relative noise-overlay border border-white/5 flex flex-col justify-between gap-6 min-h-[220px] shadow-sm">
              <div className="flex items-center gap-2 text-[11px] tracking-[0.22em] text-white/70 font-sans font-semibold uppercase">
                <Sparkle size={12} className="text-white/60" /> GUEST VOICE
              </div>
              <p className="text-[13px] sm:text-[13.5px] leading-[1.6] text-white/85 font-sans italic">
                "Kenji reshaped our image of fine dining with a degree of finesse and vision that
                surpassed what we'd hoped for. The process felt graceful, and the outcomes speak for
                themselves."
              </p>
              <div className="text-xs font-sans text-white/90">
                <strong className="text-white">Amelia Tanaka</strong>, Brooklyn Guest
              </div>
            </div>

            {/* Bottom - Rating Card */}
            <div className="rounded-2xl bg-black bg-[radial-gradient(circle_at_center,rgba(50,68,68,0.15)_0%,rgba(0,0,0,1)_100%)] relative overflow-hidden p-6 flex flex-col justify-between border border-white/5 min-h-[220px] shadow-inner">
              <FadingVideo
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_154543_d5b83fc1-9cea-44f3-b5e8-8f325935211a.mp4"
                className="absolute inset-0 w-full h-full object-cover z-0 select-none pointer-events-none opacity-40"
              />
              <div className="relative z-10" />
              <div className="relative z-10 flex flex-col items-center justify-center flex-1">
                <span className="text-[88px] font-sans font-light tracking-tight text-white leading-none drop-shadow-md">
                  4.9★
                </span>
                <span className="text-xs text-white/85 font-sans mt-3">Rated on Resy & Yelp</span>
              </div>
            </div>
          </div>

          {/* Column 3 - Stacked Tools & Contact */}
          <div className="grid grid-rows-[auto_1fr] gap-6">
            {/* Top - Daily Software / Kitchen Tools Card */}
            <div className="rounded-2xl bg-black bg-[radial-gradient(circle_at_center,rgba(50,68,68,0.15)_0%,rgba(0,0,0,1)_100%)] relative overflow-hidden p-6 flex flex-col justify-between border border-white/5 min-h-[220px] shadow-inner">
              <FadingVideo
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_153148_d7a3e1dd-e5d0-4ce6-8306-00d7522ecc44.mp4"
                className="absolute inset-0 w-full h-full object-cover z-0 select-none pointer-events-none opacity-40"
              />

              <div className="relative z-10 flex justify-center">
                <span className="text-[11px] tracking-[0.22em] text-white/70 font-sans font-semibold uppercase">
                  OUR CRAFT
                </span>
              </div>

              {/* Scrolling Marquees */}
              <div className="relative z-10 overflow-hidden w-full space-y-3 mt-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                {/* Row 1 scrolls left */}
                <div className="flex w-[200%] gap-3 animate-marquee-left">
                  {[...scrollIconsRow1, ...scrollIconsRow1].map((Icon, idx) => (
                    <div
                      key={idx}
                      className="h-14 w-14 rounded-xl liquid-glass flex items-center justify-center shrink-0 border border-white/10 shadow-sm"
                    >
                      <Icon size={22} className="text-white/80" strokeWidth={1.5} />
                    </div>
                  ))}
                </div>

                {/* Row 2 scrolls right */}
                <div className="flex w-[200%] gap-3 animate-marquee-right">
                  {[...scrollIconsRow2, ...scrollIconsRow2].map((Icon, idx) => (
                    <div
                      key={idx}
                      className="h-14 w-14 rounded-xl liquid-glass flex items-center justify-center shrink-0 border border-white/10 shadow-sm"
                    >
                      <Icon size={22} className="text-white/80" strokeWidth={1.5} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom - Reach Us Card */}
            <div className="rounded-2xl bg-[#324444] p-6 relative noise-overlay border border-white/5 flex flex-col justify-between min-h-[220px] shadow-sm">
              <div className="flex justify-between items-start">
                <span className="text-[11px] tracking-[0.22em] text-white/70 font-sans font-semibold uppercase">
                  REACH US
                </span>
                <a
                  href="mailto:hi@sorasushi.com"
                  className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center text-white"
                >
                  <ArrowUpRight size={18} />
                </a>
              </div>

              <div className="space-y-2 mt-8">
                <div className="text-[15px] font-sans text-white/90">hi@sorasushi.com</div>
                <div className="text-[15px] font-sans text-white/90">+1 (555) 555-0123</div>
                <div className="text-[13px] font-sans text-white/60">
                  128 Cedar St, Brooklyn, NY
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Gallery (Restaurant Dish Carousel) ---------- */
const GALLERY_IMAGES = [
  {
    src: dishRoll,
    bg: "#1A2E22", // deep spruce/sushi green
    panel: "#2D3E35",
    title: "DRAGON ROLL",
    desc: "Signature chef roll featuring freshwater eel, cucumber, and avocado, crowned with torched salmon slices.",
  },
  {
    src: dishNigiri,
    bg: "#321A11", // warm teak/ginger
    panel: "#432A20",
    title: "SALMON NIGIRI",
    desc: "Delicate cuts of fresh Atlantic salmon laid over perfectly seasoned, hand-pressed Japanese sushi rice.",
  },
  {
    src: dishSashimi,
    bg: "#3C151B", // deep maguro/tuna burgundy
    panel: "#4D262C",
    title: "OTORO SASHIMI",
    desc: "Five select thick slices of premium fatty bluefin tuna belly, known for its buttery melting texture.",
  },
  {
    src: dishRamen,
    bg: "#1D1C24", // nori charcoal gray
    panel: "#2E2D35",
    title: "TONKOTSU RAMEN",
    desc: "Traditional slow-simmered 12-hour pork bone broth, topped with sliced chashu, soft ajitama egg, and green onion.",
  },
];

function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    GALLERY_IMAGES.forEach((img) => {
      const image = new window.Image();
      image.src = img.src;
    });

    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-swipe every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      if (isAnimating) return;
      setIsAnimating(true);
      setActiveIndex((prev) => (prev + 1) % 4);
      setTimeout(() => {
        setIsAnimating(false);
      }, 650);
    }, 5000);

    return () => clearInterval(timer);
  }, [activeIndex, isAnimating]);

  const navigate = (dir: "next" | "prev") => {
    if (isAnimating) return;
    setIsAnimating(true);

    if (dir === "next") {
      setActiveIndex((prev) => (prev + 1) % 4);
    } else {
      setActiveIndex((prev) => (prev + 3) % 4);
    }

    setTimeout(() => {
      setIsAnimating(false);
    }, 650);
  };

  const centerIdx = activeIndex;
  const leftIdx = (activeIndex + 3) % 4;
  const rightIdx = (activeIndex + 1) % 4;
  const backIdx = (activeIndex + 2) % 4;

  const getRoleStyle = (idx: number): React.CSSProperties => {
    if (idx === centerIdx) {
      return {
        transform: `translate(-50%, -50%) scale(${isMobile ? 1.25 : 1.6})`,
        filter: "blur(0px)",
        opacity: 1,
        zIndex: 20,
        left: "50%",
        top: isMobile ? "45%" : "48%",
        height: isMobile ? "50%" : "52%",
      };
    }
    if (idx === leftIdx) {
      return {
        transform: "translate(-50%, -50%) scale(1)",
        filter: "blur(2px)",
        opacity: 0.85,
        zIndex: 10,
        left: isMobile ? "15%" : "28%",
        top: "50%",
        height: isMobile ? "28%" : "35%",
      };
    }
    if (idx === rightIdx) {
      return {
        transform: "translate(-50%, -50%) scale(1)",
        filter: "blur(2px)",
        opacity: 0.85,
        zIndex: 10,
        left: isMobile ? "85%" : "72%",
        top: "50%",
        height: isMobile ? "28%" : "35%",
      };
    }
    return {
      transform: "translate(-50%, -50%) scale(0.8)",
      filter: "blur(4px)",
      opacity: 0.5,
      zIndex: 5,
      left: "50%",
      top: "50%",
      height: isMobile ? "22%" : "28%",
    };
  };

  return (
    <section
      id="gallery"
      className="relative w-full overflow-hidden select-none z-10 border-t border-white/5"
      style={{
        height: "100vh",
        backgroundColor: GALLERY_IMAGES[activeIndex].bg,
        transition: "background-color 650ms cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-40 z-50 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='matrix' values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.08 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`,
          backgroundSize: "200px 200px",
        }}
      />

      <div
        className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none z-2 top-[18%] font-anton font-black text-white opacity-10 uppercase tracking-[-0.02em] leading-none whitespace-nowrap"
        style={{ fontSize: "clamp(90px, 28vw, 380px)" }}
      >
        SORA SUSHI
      </div>

      <div className="absolute top-6 left-4 sm:left-8 z-[60] text-xs font-semibold uppercase text-white opacity-90 tracking-[0.18em] font-sans">
        SIGNATURE EXHIBIT @ SORA
      </div>

      <div className="absolute inset-0 z-3">
        {GALLERY_IMAGES.map((img, idx) => (
          <div
            key={idx}
            className="absolute aspect-[0.6/1] pointer-events-none"
            style={{
              ...getRoleStyle(idx),
              transition:
                "transform 650ms cubic-bezier(0.4, 0, 0.2, 1), filter 650ms cubic-bezier(0.4, 0, 0.2, 1), opacity 650ms cubic-bezier(0.4, 0, 0.2, 1), left 650ms cubic-bezier(0.4, 0, 0.2, 1), height 650ms cubic-bezier(0.4, 0, 0.2, 1), top 650ms cubic-bezier(0.4, 0, 0.2, 1)",
              willChange: "transform, filter, opacity",
            }}
          >
            {/* High-end glassmorphic picture frame */}
            <div className="w-full h-full rounded-[2rem] overflow-hidden border border-white/20 shadow-2xl bg-white/5 backdrop-blur-md p-3 flex flex-col">
              <div className="relative flex-1 w-full rounded-[1.5rem] overflow-hidden">
                <img
                  src={img.src}
                  alt={img.title}
                  draggable={false}
                  className="w-full h-full object-cover select-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 left-4 sm:bottom-20 sm:left-24 z-[60] max-w-[320px] text-white">
        <h3 className="font-sans font-bold uppercase tracking-widest text-base sm:text-[22px] mb-2 sm:mb-3 opacity-95">
          {GALLERY_IMAGES[activeIndex].title}
        </h3>
        <p className="hidden sm:block text-xs sm:text-sm font-sans font-light leading-snug opacity-85 mb-4 sm:mb-5">
          {GALLERY_IMAGES[activeIndex].desc}
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => navigate("prev")}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white flex items-center justify-center text-white hover:scale-108 hover:bg-white/10 transition-all duration-200 active:scale-95"
            aria-label="Previous Dish"
          >
            <ArrowLeft size={24} strokeWidth={2.25} />
          </button>
          <button
            onClick={() => navigate("next")}
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-white flex items-center justify-center text-white hover:scale-108 hover:bg-white/10 transition-all duration-200 active:scale-95"
            aria-label="Next Dish"
          >
            <ArrowRight size={24} strokeWidth={2.25} />
          </button>
        </div>
      </div>

      <div className="absolute bottom-6 right-4 sm:bottom-20 sm:right-10 z-[60]">
        <a
          href="#reserve"
          className="flex items-center gap-2 font-anton text-white opacity-95 hover:opacity-100 tracking-[-0.02em] leading-none uppercase select-none transition-opacity duration-200"
          style={{ fontSize: "clamp(20px, 4vw, 56px)" }}
        >
          DISCOVER IT <ArrowRight className="w-5 h-5 sm:w-8 sm:h-8" strokeWidth={2.25} />
        </a>
      </div>
    </section>
  );
}

/* ---------- Reserve ---------- */
function Reserve() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    guests: "2",
    date: "",
    time: "19:00",
    notes: "",
  });

  function update<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim() || !form.date) {
      toast.error("Please fill in your name, phone, and date.");
      return;
    }
    toast.success(`Thank you, ${form.name.split(" ")[0]} — we'll confirm shortly.`);
    setForm({ name: "", phone: "", guests: "2", date: "", time: "19:00", notes: "" });
  }

  const field =
    "w-full rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all font-body";

  return (
    <section
      id="reserve"
      className="py-24 bg-black text-white relative z-10 border-t border-white/5"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/40 font-body">
            Reservations
          </p>
          <h2 className="font-heading italic text-5xl text-white">Reserve your table</h2>
          <p className="mt-4 text-base text-white/50 font-body font-light">
            Walk-ins welcome at the bar. For dining tables, please book ahead — we hold tables for
            15 minutes.
          </p>
        </div>
        <form
          onSubmit={onSubmit}
          className="liquid-glass rounded-[2rem] p-8 md:p-10 border border-white/5 shadow-lg"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-wider text-white/60 font-body">
                Name
              </span>
              <input
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                maxLength={80}
                className={field}
                placeholder="Your full name"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-wider text-white/60 font-body">
                Phone
              </span>
              <input
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                maxLength={30}
                inputMode="tel"
                className={field}
                placeholder="(555) 555-5555"
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-wider text-white/60 font-body">
                Guests
              </span>
              <select
                value={form.guests}
                onChange={(e) => update("guests", e.target.value)}
                className={field}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "guest" : "guests"}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-wider text-white/60 font-body">
                Date
              </span>
              <input
                type="date"
                value={form.date}
                onChange={(e) => update("date", e.target.value)}
                className={field}
              />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-2 block text-xs uppercase tracking-wider text-white/60 font-body">
                Time
              </span>
              <select
                value={form.time}
                onChange={(e) => update("time", e.target.value)}
                className={field}
              >
                {[
                  "17:00",
                  "17:30",
                  "18:00",
                  "18:30",
                  "19:00",
                  "19:30",
                  "20:00",
                  "20:30",
                  "21:00",
                  "21:30",
                ].map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-2 block text-xs uppercase tracking-wider text-white/60 font-body">
                Special requests
              </span>
              <textarea
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                maxLength={400}
                rows={3}
                className={`${field} rounded-[1.25rem]`}
                placeholder="Allergies, occasion, seating preference..."
              />
            </label>
          </div>
          <button
            type="submit"
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white text-black hover:bg-white/90 px-8 py-4 text-sm font-semibold transition-all duration-200 hover:scale-103 sm:w-auto"
          >
            Confirm Reservation <ChevronRight size={16} />
          </button>
        </form>
      </div>
    </section>
  );
}

/* ---------- Location ---------- */
function Location() {
  const [mapBlocked, setMapBlocked] = useState(false);

  useEffect(() => {
    // 1. Check if WebGL is supported in the browser
    const checkWebGL = () => {
      try {
        const canvas = document.createElement("canvas");
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
        );
      } catch (e) {
        return false;
      }
    };

    if (!checkWebGL()) {
      setMapBlocked(true);
      return;
    }

    // 2. Accessibility/connectivity check for OpenStreetMap
    const testMapUrl =
      "https://www.openstreetmap.org/export/embed.html?bbox=-73.9990%2C40.6960%2C-73.9890%2C40.7020&layer=mapnik";
    fetch(testMapUrl, { mode: "no-cors", credentials: "omit" })
      .then(() => {
        setMapBlocked(false);
      })
      .catch(() => {
        setMapBlocked(true);
      });
  }, []);

  return (
    <section
      id="contact"
      className="relative w-full h-[400px] overflow-hidden border-t border-white/5 bg-black z-10 flex items-center justify-center px-4"
    >
      {mapBlocked ? (
        /* Foreground premium fallback / info card */
        <div className="relative z-10 liquid-glass p-8 rounded-[1.75rem] border border-white/10 max-w-sm w-full text-center shadow-2xl bg-black/60 backdrop-blur-md">
          <MapPin className="mx-auto text-white mb-3.5 animate-pulse" size={28} strokeWidth={1.5} />
          <h3 className="font-heading italic text-white text-3xl mb-2">Our Location</h3>
          <p className="text-xs sm:text-sm text-white/80 font-body font-light leading-snug mb-5 max-w-[28ch] mx-auto">
            128 Cedar St, Brooklyn, NY 11201
          </p>
          <a
            href="https://www.openstreetmap.org/?mlat=40.6990&mlon=-73.9940#map=17/40.6990/-73.9940"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white text-black hover:bg-white/90 px-6 py-2.5 text-xs font-semibold font-sans tracking-wide transition-all duration-200 active:scale-95"
          >
            Open Map View <ArrowUpRight size={14} />
          </a>
        </div>
      ) : (
        <>
          {/* Background ambient map iframe */}
          <iframe
            title="Sora Sushi location"
            className="absolute inset-0 h-full w-full opacity-60 invert filter contrast-125 pointer-events-none z-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-73.9990%2C40.6960%2C-73.9890%2C40.7020&layer=mapnik"
          />
          {/* Subtle floating link so user can still open externally */}
          <div className="absolute bottom-4 right-4 z-10">
            <a
              href="https://www.openstreetmap.org/?mlat=40.6990&mlon=-73.9940#map=17/40.6990/-73.9940"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-black/70 backdrop-blur-sm text-white/85 hover:text-white border border-white/10 px-4 py-1.5 text-[10px] font-semibold font-sans uppercase tracking-wider transition-all duration-200"
            >
              Open External Map <ArrowUpRight size={10} />
            </a>
          </div>
        </>
      )}
    </section>
  );
}

/* ---------- Footer (LUMINA Redesign) ---------- */
function Footer() {
  return (
    <div className="relative bg-black py-16 px-6 sm:px-8 border-t border-white/5 z-10">
      <motion.footer
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        className="liquid-glass w-full rounded-3xl p-6 md:p-10 text-white/70 max-w-7xl mx-auto border border-white/5"
      >
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 mb-10 max-w-7xl mx-auto">
          {/* Col 1 */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center text-white">
              <div className="h-20 w-20 rounded-full overflow-hidden border border-white/20 bg-black shadow-xl">
                <img
                  src={logo}
                  alt="Sora Sushi Logo"
                  className="w-full h-full object-cover scale-110"
                />
              </div>
            </div>
            <p className="text-sm leading-relaxed max-w-sm text-white/60 font-body font-light">
              Sora provides premium clarity on Japanese culinary craft - shared with our guests with
              care and focus.
            </p>
          </div>

          {/* Links Col */}
          <div className="md:col-span-7 grid grid-cols-3 gap-6">
            {/* Discover */}
            <div>
              <h4 className="text-sm uppercase tracking-wider text-white font-medium mb-4 font-body">
                Discover
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Menu", href: "#menu" },
                  { label: "Signature Rolls", href: "#featured" },
                  { label: "Sake List", href: "#menu" },
                  { label: "Gallery", href: "#gallery" },
                  { label: "Reservations", href: "#reserve" },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs text-white/50 hover:text-white transition-colors font-body font-light"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mission */}
            <div>
              <h4 className="text-sm uppercase tracking-wider text-white font-medium mb-4 font-body">
                The Mission
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Origin Story", href: "#about" },
                  { label: "The Collective", href: "#about" },
                  { label: "Newsroom Hub", href: "#about" },
                  { label: "Join the Team", href: "#about" },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs text-white/50 hover:text-white transition-colors font-body font-light"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Concierge */}
            <div>
              <h4 className="text-sm uppercase tracking-wider text-white font-medium mb-4 font-body">
                Concierge
              </h4>
              <ul className="space-y-2.5">
                {[
                  { label: "Get in Touch", href: "#contact" },
                  { label: "Legal Privacy", href: "#contact" },
                  { label: "User Agreement", href: "#contact" },
                  { label: "Report Concern", href: "#contact" },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs text-white/50 hover:text-white transition-colors font-body font-light"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4 max-w-7xl mx-auto font-body">
          <p className="text-[10px] uppercase tracking-widest opacity-50 text-white/60">
            Curated by @GotInGeorgiG
          </p>
          <div className="flex items-center gap-4">
            <span className="text-[10px] uppercase tracking-widest opacity-50 text-white/60">
              Join the Journey:
            </span>
            <div className="flex gap-3">
              {[
                { Icon: Music2, href: "#" },
                { Icon: Facebook, href: "#" },
                { Icon: Twitter, href: "#" },
                { Icon: Youtube, href: "#" },
                { Icon: Instagram, href: "#" },
              ].map(({ Icon, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  className="opacity-70 hover:opacity-100 transition-opacity text-white hover:text-white"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}
