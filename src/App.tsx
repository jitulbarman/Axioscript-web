import { useState, useEffect, useRef, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import {
  Shield,
  ArrowRightLeft,
  Activity,
  Menu,
  X,
  ArrowRight,
  Check,
  MapPin,
  Phone,
  Mail,
  Clock,
  Database,
  GraduationCap,
  Globe,
  Layers,
  Eye,
  ChevronRight,
  FileCheck,
  ThumbsUp,
  Sparkles,
  Search,
  Plus,
  Send,
  Lock,
  Zap,
  TrendingUp,
  Server,
  Calculator,
  Github,
  ExternalLink,
  Minimize2
} from "lucide-react";

import { Logo } from "./components/Logo";
import {
  PERFORMANCE_BADGES,
  CORE_ECOSYSTEMS,
  STRUCTURAL_PILLARS,
  PORTFOLIO_ITEMS,
  CONTACT_INFO,
  PortfolioItem
} from "./types";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function App() {
  // Page Scroll Progress Tracker
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Navigation & Scroll states
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Active Interactive States
  const [selectedEcosystem, setSelectedEcosystem] = useState<string | null>("business-platforms");
  const [selectedPortfolio, setSelectedPortfolio] = useState<string>("kamala-clinic");
  const [showPortfolio, setShowPortfolio] = useState(false);
  
  // Custom Portfolio interactive widget states
  const [clinicSearchTerm, setClinicSearchTerm] = useState("");
  const [billingAmount, setBillingAmount] = useState("12500");
  const [billingTax, setBillingTax] = useState("18");
  const [billingDiscount, setBillingDiscount] = useState("10");

  // Contact Form states
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Custom Business Management Platforms",
    message: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [submitError, setSubmitError] = useState("");

  // Scroll spy to highlight current section
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ["home", "services", "pillars", "portfolio", "contact"];
      const scrollPosition = window.scrollY + 120;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of sticky nav
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  // Contact Form Handlers
  const handleFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formState.name.trim()) newErrors.name = "Full name is required.";
    if (!formState.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formState.message.trim()) newErrors.message = "Message content is required.";
    return newErrors;
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setPreviewUrl("");
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Scroll to the first error
      const firstErrorKey = Object.keys(validationErrors)[0];
      const errorElement = document.getElementsByName(firstErrorKey)[0];
      if (errorElement) errorElement.focus();
      return;
    }

    setIsSubmitting(true);
    try {
      // Direct client-side mailto launch with formatted body text
      const subject = encodeURIComponent(`[Axioscript Consultation] Inquiry from ${formState.name}`);
      const body = encodeURIComponent(`Hello Axioscript,

I would like to request a system consultation. Here are my project parameters:

- Client Name: ${formState.name}
- Email Address: ${formState.email}
- Phone Number: ${formState.phone || "Not provided"}
- Selected Workspace Ecosystem: ${formState.service}

Project Scope & Description:
---------------------------
${formState.message}

---
Generated via Axioscript Systems Portal`);

      const mailtoUrl = `mailto:axioscript@gmail.com?subject=${subject}&body=${body}`;
      
      // Open mail client
      window.location.href = mailtoUrl;

      setSubmitSuccess(true);
      setFormState({
        name: "",
        email: "",
        phone: "",
        service: "Custom Business Management Platforms",
        message: ""
      });
    } catch (err: any) {
      console.error("Form composition error:", err);
      setSubmitError("Failed to initiate mail composer. Please use the direct link on the left.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mock patients filtered for Kamala Clinic interactive search
  const mockPatients = [
    { id: "P-4019", name: "Dharanidhar Das", age: 54, condition: "Chronic Gastric & Acid Reflux", remedy: "Nux Vomica 200CH", status: "Stabilized" },
    { id: "P-3920", name: "Ananya Bezbarua", age: 29, condition: "Acute Rhinitis & Migraine", remedy: "Belladonna 30C", status: "Improving" },
    { id: "P-3104", name: "Bhupen Kalita", age: 62, condition: "Arthritic Joint Inflammation", remedy: "Rhus Tox 1M", status: "Under Treatment" },
    { id: "P-4105", name: "Jonali Barman", age: 38, condition: "Eczematous Skin Eruptions", remedy: "Sulphur 200CH", status: "Under Observation" }
  ].filter(p => p.name.toLowerCase().includes(clinicSearchTerm.toLowerCase()) || p.condition.toLowerCase().includes(clinicSearchTerm.toLowerCase()));

  // Active Portfolio item reference helper
  const activePortfolioData = PORTFOLIO_ITEMS.find((item) => item.id === selectedPortfolio) || PORTFOLIO_ITEMS[0];

  // Helper to calculate JKC Billing dynamic simulation
  const calcSubtotal = parseFloat(billingAmount) || 0;
  const calcTaxAmount = (calcSubtotal * (parseFloat(billingTax) || 0)) / 100;
  const calcDiscountAmount = (calcSubtotal * (parseFloat(billingDiscount) || 0)) / 100;
  const calcTotal = calcSubtotal + calcTaxAmount - calcDiscountAmount;

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-200 font-sans selection:bg-cyan-500 selection:text-black relative overflow-x-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-cyan-400 origin-left z-[9999] shadow-[0_0_8px_rgba(34,211,238,0.6)] pointer-events-none"
        style={{ scaleX }}
        id="scroll-progress-bar"
      />

      {/* Sophisticated Grid/Fine-Border Background Accents */}
      <div className="absolute top-0 left-0 w-full h-[1200px] bg-[linear-gradient(to_bottom,rgba(8,145,178,0.03)_1px,transparent_1px),linear-gradient(to_right,rgba(8,145,178,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />
      <div className="absolute top-[20%] right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(8,145,178,0.05),transparent_70%)] pointer-events-none z-0" />

      {/* Decorative vertical coordinates on margins (Aesthetic, clean, literal) */}
      <div className="hidden xl:flex flex-col gap-12 fixed left-6 top-1/3 text-[10px] font-mono text-cyan-600/40 tracking-widest z-10 select-none">
        <div>LAT_SYS_COORD_26.3195</div>
        <div>LON_SYS_COORD_91.1328</div>
        <div className="h-24 w-[1px] bg-cyan-950/40 ml-4 mt-2"></div>
      </div>

      {/* 1. HEADER / NAVIGATION BAR */}
      <header
        id="navbar-header"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#05070a]/90 backdrop-blur-md border-b border-cyan-900/30 py-3 shadow-2xl"
            : "bg-transparent py-5 border-b border-cyan-900/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo with link to top */}
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center gap-2 text-left cursor-pointer focus:outline-none"
            aria-label="Axioscript Home"
            id="nav-logo-btn"
          >
            <Logo className="w-10 h-10 sm:w-11 sm:h-11 text-cyan-400" />
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1 bg-[#080a12]/80 border border-cyan-900/30 rounded-sm px-3 py-1.5 backdrop-blur-sm">
            {[
              { id: "home", label: "Home" },
              { id: "services", label: "Services" },
              { id: "pillars", label: "Structural Pillars" },
              { id: "portfolio", label: "Portfolio" },
              { id: "contact", label: "Contact Us" }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-all duration-200 cursor-pointer ${
                  activeSection === link.id
                    ? "text-cyan-400"
                    : "text-slate-400 hover:text-cyan-400"
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Header Action Button */}
          <div className="hidden md:block">
            <button
              onClick={() => scrollToSection("contact")}
              className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-black text-xs font-bold uppercase transition-all rounded-sm shadow-[0_0_15px_rgba(8,145,178,0.3)] cursor-pointer"
              id="header-cta-btn"
            >
              Get Started
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-300 hover:text-white p-2 rounded-sm hover:bg-[#080a12] border border-cyan-900/30 focus:outline-none"
              aria-label="Toggle Menu"
              id="mobile-menu-toggle"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-[70px] left-0 w-full bg-[#05070a]/95 border-b border-cyan-900/30 z-40 p-6 flex flex-col gap-4 shadow-2xl backdrop-blur-lg"
          >
            {[
              { id: "home", label: "Home" },
              { id: "services", label: "Services" },
              { id: "pillars", label: "Structural Pillars" },
              { id: "portfolio", label: "Portfolio" },
              { id: "contact", label: "Contact Us" }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-left py-3 px-4 rounded-sm text-xs font-bold uppercase tracking-wider transition-all ${
                  activeSection === link.id
                    ? "text-cyan-400 bg-cyan-950/20 border-l-2 border-cyan-500"
                    : "text-slate-400"
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("contact")}
              className="w-full mt-2 py-3 bg-cyan-600 hover:bg-cyan-500 text-black text-xs font-bold uppercase tracking-widest text-center rounded-sm transition-colors"
            >
              Request Consultation
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. HERO SECTION */}
      <section
        id="home"
        className="relative pt-32 pb-20 md:pt-40 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Content Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* Subtle Intro Tag */}
            <div className="inline-flex items-center gap-2 bg-cyan-500/5 border border-cyan-500/30 text-cyan-400 rounded-sm px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>Sovereign Digital Transition</span>
            </div>

            {/* Tagline */}
            <h1 className="font-display font-light text-4xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight mb-6">
              Your vision, <span className="text-cyan-400 font-medium italic">encoded</span> with{" "}
              <span className="text-white font-medium">absolute precision</span> and defined by the logic of the web.
            </h1>

            {/* Core Value Proposition */}
            <p className="text-slate-400 text-sm sm:text-base font-light leading-relaxed mb-8 max-w-2xl">
              We help organizations move past paper-heavy processes and into the digital future. By turning your vision into precise, reliable advanced technology, we build the automated infrastructure and intelligent tools you need to manage your projects, your works, and your impact with absolute confidence.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10">
              <button
                onClick={() => scrollToSection("services")}
                className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-black font-bold text-xs uppercase tracking-widest rounded-sm shadow-[0_0_15px_rgba(8,145,178,0.2)] hover:shadow-[0_0_20px_rgba(8,145,178,0.4)] transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                id="hero-primary-btn"
              >
                Explore Ecosystems <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white border border-cyan-900/30 font-bold text-xs uppercase tracking-widest rounded-sm transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
                id="hero-secondary-btn"
              >
                Contact Us
              </button>
            </div>

            {/* Performance Badges */}
            <div className="w-full border-t border-cyan-900/30 pt-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {PERFORMANCE_BADGES.map((badge) => (
                  <div key={badge.id} className="flex flex-col" id={`hero-badge-${badge.id}`}>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold font-display text-cyan-400">
                        {badge.metric}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                        {badge.label}
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                      {badge.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Hero Decorative Visual Right (Compliant, high-craft, literal) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-5 relative w-full flex justify-center"
          >
            <div className="relative w-full max-w-[420px] aspect-square rounded-sm border border-cyan-900/30 bg-[#080a12] p-6 flex flex-col justify-between overflow-hidden shadow-2xl">
              {/* Corner Grid Accents */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(8,145,178,0.05),transparent_70%)] pointer-events-none" />

              {/* Decorative Console Header */}
              <div className="flex items-center justify-between border-b border-cyan-900/30 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-950 border border-cyan-500/30"></div>
                  <span className="text-[10px] font-mono text-slate-500 tracking-wider">
                    axioscript_system_monitor.sh
                  </span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-cyan-500/10 text-cyan-400 font-mono text-[9px] border border-cyan-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                  LIVE FEED
                </div>
              </div>

              {/* Simulated code matrix and statistics charts */}
              <div className="flex-1 py-4 flex flex-col gap-4 justify-center">
                <div className="bg-[#05070a] rounded-sm p-3.5 border border-cyan-900/30 font-mono text-[11px] leading-relaxed text-slate-300">
                  <p className="text-cyan-400">
                    <span className="text-slate-500">&gt;</span> const axioscript = require('axioscript');
                  </p>
                  <p className="text-cyan-400 mt-1">
                    <span className="text-slate-500">&gt;</span> axioscript.modernize(workflow);
                  </p>
                  <p className="text-slate-400 mt-2 text-[10px] border-l border-cyan-900/30 pl-2">
                    [INFO] Commencing Analog Archive ingestion...
                    <br />
                    [INFO] Indexing Kamala Clinic database [4,821 recs]
                    <br />
                    [INFO] Setting up JKC automated ledger billing...
                    <br />
                    <span className="text-emerald-400">[SUCCESS] Migration protocol completed with 100% accuracy.</span>
                  </p>
                </div>

                {/* Cyber Dashboard Chart Illustration */}
                <div className="h-28 bg-[#05070a]/50 rounded-sm p-3 border border-cyan-900/20 flex flex-col justify-between">
                  <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                    <span>ARCHIVAL PIPELINE SPEED</span>
                    <span className="text-cyan-400 font-bold">+340% SECURE_SYNC</span>
                  </div>
                  {/* Styled SVG Chart */}
                  <div className="w-full h-16 relative">
                    <svg className="w-full h-full" viewBox="0 0 300 64" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0891b2" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 0 54 Q 30 40 60 48 T 120 32 T 180 38 T 240 10 T 300 4"
                        fill="none"
                        stroke="#0891b2"
                        strokeWidth="2"
                      />
                      <path
                        d="M 0 54 Q 30 40 60 48 T 120 32 T 180 38 T 240 10 T 300 4 L 300 64 L 0 64 Z"
                        fill="url(#chartGrad)"
                      />
                      {/* Grid lines */}
                      <line x1="0" y1="16" x2="300" y2="16" stroke="rgba(8,145,178,0.1)" strokeDasharray="3 3" />
                      <line x1="0" y1="32" x2="300" y2="32" stroke="rgba(8,145,178,0.1)" strokeDasharray="3 3" />
                      <line x1="0" y1="48" x2="300" y2="48" stroke="rgba(8,145,178,0.1)" strokeDasharray="3 3" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Live Core Status Footer */}
              <div className="border-t border-cyan-900/30 pt-3 flex items-center justify-between text-[10px] font-mono text-slate-500">
                <div className="flex items-center gap-1">
                  <Server className="w-3.5 h-3.5 text-cyan-500" />
                  <span>NODE: INGESTION_P_781325</span>
                </div>
                <div className="text-cyan-500/80">SYSTEMS: ONLINE</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. CORE ECOSYSTEMS (SERVICES SECTION) */}
      <section id="services" className="py-20 md:py-28 bg-[#05070a] border-y border-cyan-900/20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-[0.25em] mb-3 inline-block">
              PREMIUM INFRASTRUCTURE
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight mb-4">
              Core Digital Ecosystems
            </h2>
            <p className="text-slate-400 font-light leading-relaxed">
              We engineer specialized, enterprise-grade digital systems engineered to modern standard guidelines. Click each system to inspect features and tech integrations.
            </p>
          </div>

          {/* Interactive Card Selection Area */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* List of Ecosystems (Left 5 Columns) */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              className="lg:col-span-5 flex flex-col gap-4"
            >
              {CORE_ECOSYSTEMS.map((eco) => {
                const isSelected = selectedEcosystem === eco.id;
                return (
                  <motion.button
                    key={eco.id}
                    variants={cardVariants}
                    onClick={() => setSelectedEcosystem(eco.id)}
                    className={`w-full p-5 rounded-sm border text-left transition-all duration-300 relative group cursor-pointer focus:outline-none ${
                      isSelected
                        ? "bg-[#080a12] border-cyan-500/50 shadow-[0_0_15px_rgba(8,145,178,0.15)]"
                        : "bg-[#080a12]/40 border-cyan-900/20 hover:border-cyan-900/50 hover:bg-[#080a12]/80"
                    }`}
                    id={`service-card-${eco.id}`}
                  >
                    {/* Left Accent Bar */}
                    <div
                      className={`absolute left-0 top-0 h-full w-1 rounded-l-sm transition-all ${
                        isSelected ? "bg-cyan-500" : "bg-transparent group-hover:bg-cyan-950"
                      }`}
                    />

                    <div className="flex items-start gap-4">
                      {/* Grid number identifier */}
                      <span className={`font-mono text-xs font-semibold ${isSelected ? "text-cyan-400" : "text-slate-600"}`}>
                        {eco.number}
                      </span>
                      <div className="flex-1">
                        <h3 className={`font-display font-semibold text-sm sm:text-base mb-1.5 ${isSelected ? "text-white" : "text-slate-300"}`}>
                          {eco.title}
                        </h3>
                        <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed">
                          {eco.description}
                        </p>
                      </div>
                      <ChevronRight className={`w-4 h-4 self-center transition-transform ${isSelected ? "text-cyan-400 transform translate-x-1" : "text-slate-600"}`} />
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>

            {/* Detailed Feature Inspection Portal (Right 7 Columns) */}
            <div className="lg:col-span-7 h-full">
              <AnimatePresence mode="wait">
                {selectedEcosystem && (
                  (() => {
                    const activeEco = CORE_ECOSYSTEMS.find((e) => e.id === selectedEcosystem)!;
                    return (
                      <motion.div
                        key={activeEco.id}
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -15 }}
                        transition={{ duration: 0.25 }}
                        className="bg-[#080a12] border border-cyan-900/30 rounded-sm p-6 sm:p-8 relative overflow-hidden shadow-2xl h-full flex flex-col justify-between"
                        id={`service-detail-portal-${activeEco.id}`}
                      >
                        {/* Interactive Digital Badge inside Portal */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-[radial-gradient(circle_at_top_right,rgba(8,145,178,0.02),transparent_70%)] pointer-events-none" />

                        <div>
                          {/* Portal Title Bar */}
                          <div className="flex items-center gap-3 border-b border-cyan-900/20 pb-5 mb-5">
                            <div className="w-8 h-8 rounded-sm bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 text-sm font-mono font-bold">
                              {activeEco.number}
                            </div>
                            <div>
                              <h4 className="font-display font-bold text-lg text-white">
                                {activeEco.title}
                              </h4>
                              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-0.5">
                                SYSTEM SPECS & STACK
                              </p>
                            </div>
                          </div>

                          {/* Long Description */}
                          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                            {activeEco.description}
                          </p>

                          {/* Programmatic Pipeline Checklist */}
                          <div className="mb-6">
                            <h5 className="text-[11px] font-mono text-cyan-500/80 tracking-wider uppercase mb-3">
                              Core Operations Integrated
                            </h5>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                              {activeEco.features.map((feature, idx) => (
                                <div key={idx} className="flex items-start gap-2.5">
                                  <div className="w-4 h-4 rounded-sm bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0 mt-0.5">
                                    <Check className="w-2.5 h-2.5 text-cyan-400" />
                                  </div>
                                  <span className="text-slate-300 text-xs sm:text-sm">
                                    {feature}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Tech Stack Footer */}
                        <div className="border-t border-cyan-900/20 pt-5 mt-4">
                          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-2.5">
                            Technology Framework Deployment
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {activeEco.techStack.map((tech, idx) => (
                              <span
                                key={idx}
                                className="bg-[#05070a] border border-cyan-900/30 text-cyan-400/80 font-mono text-[10px] px-3 py-1 rounded-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })()
                )}
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>

      {/* 4. KEY STRUCTURAL PILLARS SECTION */}
      <section id="pillars" className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-[0.25em] mb-3 inline-block">
            ARCHITECTURAL BLUEPRINT
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight mb-4">
            Key Structural Pillars
          </h2>
          <p className="text-slate-400 font-light leading-relaxed">
             Axioscript operates on three foundational frameworks designed to uphold systemic resilience, metadata integrity, and automated platform control.
          </p>
        </div>

        {/* Pillars Grid Layout */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {STRUCTURAL_PILLARS.map((pillar) => {
            return (
              <motion.div
                key={pillar.id}
                variants={cardVariants}
                className="bg-[#0a0d18] border border-cyan-900/30 hover:border-cyan-500/50 rounded-sm p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_0_15px_rgba(8,145,178,0.15)] relative overflow-hidden group"
                id={`pillar-card-${pillar.id}`}
              >
                {/* Visual glow indicator */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(8,145,178,0.02),transparent_70%)] pointer-events-none" />

                <div>
                  {/* Pillar Icon Box */}
                  <div className="w-12 h-12 rounded-sm bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-105 transition-transform duration-300">
                    {pillar.iconName === "Shield" && <Shield className="w-6 h-6" />}
                    {pillar.iconName === "ArrowRightLeft" && <ArrowRightLeft className="w-6 h-6" />}
                    {pillar.iconName === "Activity" && <Activity className="w-6 h-6" />}
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-1">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-mono text-cyan-400 tracking-wider mb-4">
                    {pillar.tagline}
                  </p>

                  {/* Description */}
                  <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                {/* Sub-points breakdown list */}
                <div className="border-t border-cyan-900/20 pt-5 mt-4">
                  <ul className="space-y-3.5">
                    {pillar.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300 leading-relaxed">
                        <span className="text-cyan-400 font-mono shrink-0 mt-0.5">▪</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </section>

      {/* 5. PROVEN PORTFOLIO & EXPERIENCE */}
      <section id="portfolio" className="py-20 md:py-28 bg-[#05070a] border-y border-cyan-900/20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-[0.25em] mb-3 inline-block">
              CASE STUDIES & PROOFS
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight mb-4">
              Proven Portfolio & Experience
            </h2>
            <p className="text-slate-400 font-light leading-relaxed">
              Explore real-world deployments where Axioscript has eliminated administrative clutter and delivered precise, reliable software infrastructure.
            </p>
          </div>

          {/* Portfolio Layout & Interaction */}
          <AnimatePresence mode="wait">
            {!showPortfolio ? (
              <motion.div
                key="portfolio-teaser"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="flex flex-col items-center justify-center p-8 md:p-16 border border-cyan-500/15 bg-[#080a12]/50 rounded-sm relative overflow-hidden group shadow-[inset_0_0_30px_rgba(8,145,178,0.02)]"
              >
                {/* Decorative Visual Grid & Laser Accents */}
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(8,145,178,0.02)_1px,transparent_1px),linear-gradient(to_right,rgba(8,145,178,0.02)_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(8,145,178,0.08),transparent_70%)] pointer-events-none animate-pulse duration-[8000ms]" />
                
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan-500/40" />
                <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyan-500/40" />
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-cyan-500/40" />
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan-500/40" />

                <div className="relative z-10 text-center max-w-lg space-y-6 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-sm bg-cyan-500/5 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 group-hover:border-cyan-400/40 transition-all duration-500 shadow-[0_0_15px_rgba(8,145,178,0.05)]">
                    <Layers className="w-6 h-6" />
                  </div>
                  
                  <div className="space-y-2">
                    <span className="font-mono text-[9px] text-cyan-400 uppercase tracking-[0.2em] bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-sm">
                      SECURE OPERATIONS LEDGER
                    </span>
                    <h3 className="font-display font-bold text-xl md:text-2xl text-white tracking-wide">
                      System Deployments & Case Studies
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed max-w-md">
                      Retrieve our complete registry of active enterprise networks, live-simulated clinic portals, fee trackers, and automated telemetry systems.
                    </p>
                  </div>
                  
                  <button
                    onClick={() => setShowPortfolio(true)}
                    className="px-6 py-3 bg-[#05070a] border border-cyan-500/30 text-cyan-400 hover:bg-cyan-400 hover:text-black rounded-sm text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer hover:shadow-[0_0_20px_rgba(34,211,238,0.25)] focus:outline-none"
                    id="reveal-portfolio-btn"
                  >
                    Retrieve System Works Ledger <Eye className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="portfolio-grid"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="space-y-6"
              >
                {/* Grid Layout Container */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  
                  {/* Left Selection Column (5 columns) */}
                  <div className="lg:col-span-5 flex flex-col gap-4">
                    {PORTFOLIO_ITEMS.map((item) => {
                      const isSelected = selectedPortfolio === item.id;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setSelectedPortfolio(item.id)}
                          className={`p-5 rounded-sm border text-left transition-all duration-300 cursor-pointer focus:outline-none relative group ${
                            isSelected
                              ? "bg-[#080a12] border-cyan-500/50 shadow-[0_0_15px_rgba(8,145,178,0.15)]"
                              : "bg-[#080a12]/40 border-cyan-900/20 hover:border-cyan-900/50 hover:bg-[#080a12]/80"
                          }`}
                          id={`portfolio-select-card-${item.id}`}
                        >
                          <div className="flex flex-col gap-1">
                            <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">
                              {item.category} • {item.location}
                            </span>
                            <h3 className={`font-display font-bold text-base ${isSelected ? "text-white" : "text-slate-300"}`}>
                              {item.client}
                            </h3>
                            <p className="text-slate-400 text-xs font-light line-clamp-1 mt-1">
                              {item.title}
                            </p>
                          </div>
                        </button>
                      );
                    })}

                    {/* Reset Button to Lock Portfolio again */}
                    <button
                      onClick={() => setShowPortfolio(false)}
                      className="mt-2 py-2.5 px-4 bg-cyan-950/10 border border-dashed border-cyan-500/20 hover:border-cyan-400/40 hover:bg-cyan-500/5 text-cyan-400/80 hover:text-cyan-400 rounded-sm text-[11px] font-mono transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer w-full"
                      id="lock-ledger-view-btn"
                    >
                      <Minimize2 className="w-3.5 h-3.5" /> Minimize & Hide Ledger
                    </button>
                  </div>

                  {/* Right Showcase Portal (7 columns) */}
                  <div className="lg:col-span-7">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activePortfolioData.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.25 }}
                        className="bg-[#080a12] border border-cyan-900/30 rounded-sm p-6 sm:p-8 flex flex-col justify-between shadow-2xl h-full relative"
                        id={`portfolio-showcase-panel-${activePortfolioData.id}`}
                      >
                        {/* Top Header details */}
                        <div>
                          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-cyan-900/20 pb-5 mb-5">
                            <div>
                              <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest block mb-1">
                                DEPLOYED PROJECT SYSTEM
                              </span>
                              <h4 className="font-display font-bold text-xl text-white">
                                {activePortfolioData.client}
                              </h4>
                              <p className="text-slate-400 text-xs font-light mt-0.5">
                                {activePortfolioData.title} • {activePortfolioData.location}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="bg-[#05070a] border border-cyan-900/30 text-cyan-400 text-xs px-3.5 py-1.5 rounded-sm font-mono font-medium">
                                {activePortfolioData.category}
                              </span>
                              <button
                                onClick={() => setShowPortfolio(false)}
                                className="p-1.5 sm:p-2 bg-slate-950/80 border border-cyan-500/25 hover:border-cyan-400 hover:bg-cyan-500/10 text-cyan-400 hover:text-white rounded-sm text-xs transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
                                title="Minimize & hide ledger"
                                id="minimize-portfolio-top-btn"
                              >
                                <Minimize2 className="w-3.5 h-3.5" />
                                <span className="hidden sm:inline font-mono text-[9px] uppercase tracking-wider font-semibold">Minimize</span>
                              </button>
                            </div>
                          </div>

                          {/* Brief description */}
                          <p className="text-slate-400 text-xs sm:text-sm font-light leading-relaxed mb-6">
                            {activePortfolioData.description}
                          </p>

                          {/* Impact metrics visualizer */}
                          <div className="grid grid-cols-3 gap-4 bg-[#05070a]/80 border border-cyan-900/30 rounded-sm p-4 mb-6">
                            {activePortfolioData.impactMetrics.map((metric, idx) => (
                              <div key={idx} className="flex flex-col text-center sm:text-left">
                                <span className="font-display font-bold text-lg sm:text-xl text-cyan-400 leading-none">
                                  {metric.value}
                                </span>
                                <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider mt-1.5 leading-tight">
                                  {metric.label}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Interactive Live Screen Simulation (Exceptional Visual Quality & Polish) */}
                          <div className="border border-cyan-900/30 rounded-sm bg-[#05070a] overflow-hidden mb-6 shadow-inner">
                            {/* Top Window Bar */}
                            <div className="bg-[#080a12] px-4 py-2 flex items-center justify-between border-b border-cyan-900/20">
                              <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-cyan-950 border border-cyan-500/20"></span>
                                <span className="w-2 h-2 rounded-full bg-cyan-950 border border-cyan-500/20"></span>
                                <span className="w-2 h-2 rounded-full bg-cyan-950 border border-cyan-500/20"></span>
                                <span className="text-[9px] font-mono text-slate-500 ml-2">
                                  {activePortfolioData.interfaceMockup.screenTitle}
                                </span>
                              </div>
                              <span className="text-[8px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-1.5 py-0.5 rounded-sm tracking-widest uppercase">
                                SIMULATOR
                              </span>
                            </div>

                            {/* Live Simulated Widget Content */}
                            <div className="p-4 bg-[#050812] min-h-[170px] flex flex-col justify-between text-left">
                              
                              {/* WIDGET CASE 1: KAMALA CLINIC SEARCH SIMULATOR */}
                              {activePortfolioData.id === "kamala-clinic" && (
                                <div className="flex flex-col gap-3">
                                  <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded px-2.5 py-1">
                                    <Search className="w-3.5 h-3.5 text-slate-500" />
                                    <input
                                      type="text"
                                      placeholder="Search medical database (e.g., Das, Rhinitis)..."
                                      className="bg-transparent border-none text-[11px] font-mono text-white placeholder-slate-500 focus:outline-none w-full"
                                      value={clinicSearchTerm}
                                      onChange={(e) => setClinicSearchTerm(e.target.value)}
                                    />
                                  </div>
                                  <div className="max-h-[100px] overflow-y-auto space-y-1.5">
                                    {mockPatients.length > 0 ? (
                                      mockPatients.map((p) => (
                                        <div key={p.id} className="bg-slate-900/40 border border-slate-900 hover:border-slate-800 rounded p-2 flex items-center justify-between text-[10px] font-mono">
                                          <div className="flex flex-col">
                                            <span className="text-white font-semibold">{p.name} (Age {p.age})</span>
                                            <span className="text-slate-500 text-[9px]">ID: {p.id} | Cond: {p.condition}</span>
                                          </div>
                                          <div className="flex flex-col items-end text-right">
                                            <span className="text-cyan-400 font-medium">{p.remedy}</span>
                                            <span className="text-[8px] bg-green-500/10 text-green-400 px-1 rounded">{p.status}</span>
                                          </div>
                                        </div>
                                      ))
                                    ) : (
                                      <p className="text-[10px] font-mono text-slate-500 italic py-2 text-center">
                                        No patient entries matching query string.
                                      </p>
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* WIDGET CASE 2: JKC BILLING TAX & LEDGER CALCULATOR */}
                              {activePortfolioData.id === "jkc-billing" && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                  <div className="flex flex-col gap-2">
                                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">Dynamic Invoicing Parameters</span>
                                    <div className="grid grid-cols-3 gap-1">
                                      <div className="flex flex-col">
                                        <label className="text-[8px] font-mono text-slate-400">Amt (₹)</label>
                                        <input
                                          type="number"
                                          className="bg-[#05070a] border border-cyan-900/30 text-[10px] font-mono text-white p-1 rounded-sm focus:outline-none focus:border-cyan-400"
                                          value={billingAmount}
                                          onChange={(e) => setBillingAmount(e.target.value)}
                                        />
                                      </div>
                                      <div className="flex flex-col">
                                        <label className="text-[8px] font-mono text-slate-400">GST %</label>
                                        <input
                                          type="number"
                                          className="bg-[#05070a] border border-cyan-900/30 text-[10px] font-mono text-white p-1 rounded-sm focus:outline-none focus:border-cyan-400"
                                          value={billingTax}
                                          onChange={(e) => setBillingTax(e.target.value)}
                                        />
                                      </div>
                                      <div className="flex flex-col">
                                        <label className="text-[8px] font-mono text-slate-400">Disc %</label>
                                        <input
                                          type="number"
                                          className="bg-[#05070a] border border-cyan-900/30 text-[10px] font-mono text-white p-1 rounded-sm focus:outline-none focus:border-cyan-400"
                                          value={billingDiscount}
                                          onChange={(e) => setBillingDiscount(e.target.value)}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="bg-[#05070a]/60 border border-cyan-900/20 rounded-sm p-2.5 flex flex-col justify-between text-[10px] font-mono">
                                    <div className="flex justify-between border-b border-cyan-900/20 pb-1 mb-1">
                                      <span className="text-slate-400">Subtotal:</span>
                                      <span className="text-white">₹{calcSubtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-[9px] text-slate-500">
                                      <span>GST Addon (+{billingTax}%):</span>
                                      <span>₹{calcTaxAmount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-[9px] text-slate-500 border-b border-cyan-900/20 pb-1 mb-1">
                                      <span>Discount (-{billingDiscount}%):</span>
                                      <span>₹{calcDiscountAmount.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-white font-semibold pt-1">
                                      <span className="text-cyan-400">GRAND TOTAL:</span>
                                      <span>₹{calcTotal.toFixed(2)}</span>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* WIDGET CASE 3: SANGYA-KALAGURU ACADEMIC LOGS */}
                              {activePortfolioData.id === "sangya-academy" && (
                                <div className="flex flex-col gap-2">
                                  <div className="flex justify-between items-center bg-[#05070a] border border-cyan-900/20 p-2 rounded-sm text-[10px] font-mono">
                                    <span className="text-slate-400">Active Cohort Sync:</span>
                                    <span className="text-emerald-400 font-bold">1,240 Students (Synced)</span>
                                  </div>
                                  <div className="grid grid-cols-3 gap-2">
                                    <div className="bg-[#05070a]/30 border border-cyan-900/30 rounded-sm p-2 text-center">
                                      <span className="text-[8px] font-mono text-slate-500 block">TERM FEES</span>
                                      <span className="text-[11px] font-mono text-white font-bold">94.2% PAID</span>
                                    </div>
                                    <div className="bg-[#05070a]/30 border border-cyan-900/30 rounded-sm p-2 text-center">
                                      <span className="text-[8px] font-mono text-slate-500 block">TEACHER CORES</span>
                                      <span className="text-[11px] font-mono text-white font-bold">32/32 ACTIVE</span>
                                    </div>
                                    <div className="bg-[#05070a]/30 border border-cyan-900/30 rounded-sm p-2 text-center">
                                      <span className="text-[8px] font-mono text-slate-500 block">SYNC STATE</span>
                                      <span className="text-[11px] font-mono text-cyan-400 font-bold">100% OK</span>
                                    </div>
                                  </div>
                                  <div className="bg-[#05070a]/20 rounded-sm p-1.5 border border-cyan-900/20 text-[9px] font-mono text-slate-400 italic">
                                    Latest Broadcast Log: "Report cards compiled for Terminal Cohort B; fee schedules dispatching successfully."
                                  </div>
                                </div>
                              )}

                              {/* WIDGET CASE 4: BAVANYA WATER SOLUTION TELEMETRY */}
                              {activePortfolioData.id === "bavanya-water" && (
                                <div className="flex flex-col gap-2">
                                  <div className="flex items-center justify-between text-[10px] font-mono">
                                    <span className="text-slate-400">Guwahati Water Dispatch Tracker</span>
                                    <span className="text-cyan-400 font-bold">Live Flow Rate Active</span>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2">
                                    <div className="bg-[#05070a] border border-cyan-900/30 p-2 rounded-sm flex items-center justify-between">
                                      <div className="flex flex-col text-[10px] font-mono">
                                        <span className="text-slate-500 text-[8px]">DAILY TARGET</span>
                                        <span className="text-white font-semibold">480,000 Litres</span>
                                      </div>
                                      <span className="text-emerald-400 font-mono text-[10px] font-bold">99.8%</span>
                                    </div>
                                    <div className="bg-[#05070a] border border-cyan-900/30 p-2 rounded-sm flex items-center justify-between">
                                      <div className="flex flex-col text-[10px] font-mono">
                                        <span className="text-slate-500 text-[8px]">FLEET STATUS</span>
                                        <span className="text-white font-semibold">18 Dispatch units</span>
                                      </div>
                                      <span className="text-cyan-400 font-mono text-[10px] font-bold">OK</span>
                                    </div>
                                  </div>
                                  {/* Animated progress bar illustration */}
                                  <div className="bg-[#05070a]/40 rounded-sm p-2 border border-cyan-900/20 text-[9px] font-mono flex flex-col gap-1">
                                    <div className="flex justify-between text-slate-500">
                                      <span>Tank Alpha Level</span>
                                      <span>84% Capacity</span>
                                    </div>
                                    <div className="w-full bg-[#080a12] h-2 rounded-sm overflow-hidden border border-cyan-900/10">
                                      <div className="bg-cyan-500 h-full w-[84%] rounded-sm"></div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Console Sub-indicators */}
                              <div className="border-t border-cyan-900/20 pt-2.5 mt-2 flex justify-between items-center text-[9px] font-mono text-slate-500">
                                <span>Secure SSL Gateway Encrypted</span>
                                <span>Lat: 12ms</span>
                              </div>

                            </div>
                          </div>

                          {/* Integrated Key Operations List */}
                          <div>
                            <h5 className="text-[10px] font-mono text-slate-500 tracking-wider uppercase mb-2.5">
                              Integrated Key Operations
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {activePortfolioData.keyFeatures.map((feat, idx) => (
                                <span
                                  key={idx}
                                  className="bg-[#05070a] border border-cyan-900/30 text-cyan-400 font-mono text-[10px] px-3 py-1 rounded-sm"
                                >
                                  {feat}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                      </motion.div>
                    </AnimatePresence>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </section>

      {/* 6. CONTACT & FOOTER SECTION */}
      <section id="contact" className="py-20 md:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-[0.25em] mb-3 inline-block">
            CONNECT WITH ENGINES
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight mb-4">
            Contact & Consultation
          </h2>
          <p className="text-slate-400 font-light leading-relaxed">
            Axioscript is ready to bridge the digital gap for your enterprise. Send us your parameters and let us encode your workflow.
          </p>
        </div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Information block (Left 5 Columns) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#080a12] border border-cyan-900/30 rounded-sm p-6 sm:p-8 space-y-6">
              <h3 className="font-display font-bold text-lg text-white border-b border-cyan-900/20 pb-4 mb-4">
                Platform Coordinates
              </h3>

              {/* Physical Location */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">
                    Corporate Address
                  </span>
                  <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                    {CONTACT_INFO.address}
                  </p>
                </div>
              </div>

              {/* Contact Numbers */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">
                    Direct Connections
                  </span>
                  <p className="text-slate-300 text-xs sm:text-sm font-mono font-medium">
                    {CONTACT_INFO.numbers.join(" / ")}
                  </p>
                </div>
              </div>

              {/* Email Connection */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">
                    Electronic Mail
                  </span>
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="text-cyan-400 hover:underline text-xs sm:text-sm font-mono font-medium"
                  >
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-sm bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">
                    Operational Windows
                  </span>
                  <p className="text-slate-400 text-xs font-light">
                    {CONTACT_INFO.workingHours}
                  </p>
                </div>
              </div>
            </div>

            {/* Secure Email Mailbox Gateway Card */}
            <div className="bg-[#080a12] border border-cyan-900/30 rounded-sm p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between border-b border-cyan-900/20 pb-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-cyan-400" />
                  <h3 className="font-display font-bold text-sm sm:text-base text-white tracking-wide">
                    Secured Mailbox Gateway
                  </h3>
                </div>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-sm uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Connected
                </span>
              </div>

              <div className="space-y-4">
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  Message us directly or fill in the parameters on the right to auto-compose a structured consultation sheet in your local email client:
                </p>
                
                <div className="bg-[#05070a] border border-cyan-500/20 rounded-sm p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 rounded-sm border border-cyan-900/40 bg-cyan-500/5 flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div className="overflow-hidden">
                      <span className="text-[10px] font-mono text-slate-500 block">CORE SYSTEM MAILBOX</span>
                      <a 
                        href="mailto:axioscript@gmail.com" 
                        className="text-white text-xs sm:text-sm font-bold font-mono hover:text-cyan-400 flex items-center gap-1 overflow-hidden text-ellipsis whitespace-nowrap"
                      >
                        axioscript@gmail.com <ExternalLink className="w-3 h-3 text-cyan-500" />
                      </a>
                    </div>
                  </div>
                </div>

                <a
                  href="mailto:axioscript@gmail.com?subject=Axioscript%20General%20Inquiry"
                  className="w-full py-3 px-4 bg-[#05070a] border border-cyan-500/30 text-cyan-400 hover:bg-cyan-400 hover:text-black rounded-sm text-xs font-mono font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Mail className="w-4 h-4" /> Message Us Directly
                </a>

                <div className="p-3 bg-cyan-500/5 border border-cyan-500/10 rounded-sm text-[10px] font-mono text-slate-400 leading-relaxed">
                  <span className="text-cyan-400 font-bold block mb-1">ℹ️ SECURE MAILTO ROUTING</span>
                  All communication is composed locally inside your default mail app, giving you total sovereign oversight. No server-side storage or database relays are used.
                </div>
              </div>
            </div>

            {/* Aesthetic Tech Banner Card */}
            <div className="bg-[#0a0d18] border border-cyan-900/30 rounded-sm p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[radial-gradient(circle_at_top_right,rgba(8,145,178,0.02),transparent_70%)] pointer-events-none" />
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#05070a] border border-cyan-900/30 flex items-center justify-center text-cyan-400">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-display font-semibold text-sm text-white mb-1">
                    Sovereign Archival Commitment
                  </h4>
                  <p className="text-slate-400 text-[11px] leading-relaxed">
                    Axioscript enforces strict access control guidelines on all project proposals. Your organizational parameters remain confidential.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form Block (Right 7 Columns) */}
          <div className="lg:col-span-7">
            <div className="bg-[#080a12] border border-cyan-900/30 rounded-sm p-6 sm:p-8 shadow-2xl relative">
              <h3 className="font-display font-bold text-lg text-white border-b border-cyan-900/20 pb-4 mb-6">
                Consultation Request Parameters
              </h3>

              <form onSubmit={handleFormSubmit} className="space-y-5" id="contact-form">
                {/* Full Name & Email side by side on desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-slate-400">
                      Full Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. Jitul Barman"
                      value={formState.name}
                      onChange={handleFormChange}
                      className={`bg-[#05070a] border rounded-sm px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 ${
                        errors.name
                          ? "border-red-500 focus:ring-red-500"
                          : "border-cyan-900/30 focus:border-cyan-500 focus:ring-cyan-500"
                      }`}
                    />
                    {errors.name && <span className="text-red-500 text-[10px] font-mono mt-1">{errors.name}</span>}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-slate-400">
                      Email Address <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="e.g. name@enterprise.com"
                      value={formState.email}
                      onChange={handleFormChange}
                      className={`bg-[#05070a] border rounded-sm px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 ${
                        errors.email
                          ? "border-red-500 focus:ring-red-500"
                          : "border-cyan-900/30 focus:border-cyan-500 focus:ring-cyan-500"
                      }`}
                    />
                    {errors.email && <span className="text-red-500 text-[10px] font-mono mt-1">{errors.email}</span>}
                  </div>
                </div>

                {/* Phone & Service Interest side by side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-slate-400">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="e.g. +91 9365017343"
                      value={formState.phone}
                      onChange={handleFormChange}
                      className="bg-[#05070a] border border-cyan-900/30 focus:border-cyan-500 focus:ring-cyan-500 rounded-sm px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-mono text-slate-400">
                      Primary Target Ecosystem
                    </label>
                    <select
                      name="service"
                      value={formState.service}
                      onChange={handleFormChange}
                      className="bg-[#05070a] border border-cyan-900/30 focus:border-cyan-500 focus:ring-cyan-500 rounded-sm px-4 py-3 text-xs sm:text-sm text-slate-200 focus:outline-none focus:ring-1 select-none"
                    >
                      <option value="Custom Business Management Platforms">
                        Custom Business Management
                      </option>
                      <option value="Institutional & School Systems">
                        Institutional & School Systems
                      </option>
                      <option value="Social Infrastructure & Monitoring">
                        Social Infrastructure & Monitoring
                      </option>
                      <option value="Analog-to-Digital Migration">
                        Analog-to-Digital Migration
                      </option>
                    </select>
                  </div>
                </div>

                {/* Message Context */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-mono text-slate-400">
                    Project Parameters & Scope <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Provide a brief summary of the workflows, paperwork, or system interfaces you need Axioscript to digitize and automate."
                    value={formState.message}
                    onChange={handleFormChange}
                    className={`bg-[#05070a] border rounded-sm px-4 py-3 text-xs sm:text-sm text-white placeholder-slate-600 focus:outline-none focus:ring-1 resize-none ${
                      errors.message
                        ? "border-red-500 focus:ring-red-500"
                        : "border-cyan-900/30 focus:border-cyan-500 focus:ring-cyan-500"
                    }`}
                  />
                  {errors.message && <span className="text-red-500 text-[10px] font-mono mt-1">{errors.message}</span>}
                </div>

                {submitError && (
                  <div className="p-3.5 rounded-sm bg-red-950/30 border border-red-500/20 font-mono text-[11px] text-red-400 mb-4">
                    [ERROR] Transmission failed: {submitError}
                  </div>
                )}

                {/* Form submit with visual loading status */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-gradient-to-r from-[#0891b2] to-[#06b6d4] disabled:from-slate-800 disabled:to-slate-900 text-black disabled:text-slate-500 font-bold text-xs uppercase tracking-wider rounded-sm shadow-md hover:scale-[1.01] transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none"
                  id="contact-form-submit"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Transmitting Parameters...
                    </>
                  ) : (
                    <>
                      Transmit Parameters <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>

              {/* Form Success Animation Modal layer */}
              <AnimatePresence>
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-[#080a12]/95 rounded-sm p-6 sm:p-8 flex flex-col items-center justify-center text-center z-20 backdrop-blur-sm border border-cyan-500/30"
                    id="form-success-overlay"
                  >
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1 }}
                      className="w-16 h-16 rounded-sm bg-cyan-500/10 border border-cyan-500 flex items-center justify-center text-cyan-400 mb-5 shadow-[0_0_15px_rgba(8,145,178,0.3)]"
                    >
                      <FileCheck className="w-8 h-8" />
                    </motion.div>
                    <h4 className="font-display font-bold text-xl text-white mb-2">
                      Mail Client Launched
                    </h4>
                    <p className="text-slate-300 text-xs sm:text-sm font-light max-w-md leading-relaxed mb-6">
                      A pre-formatted consultation draft has been created and opened in your email program! Please complete and send the message to <span className="text-cyan-400 font-mono font-medium">axioscript@gmail.com</span> to submit your parameters.
                    </p>

                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="px-6 py-2.5 bg-[#05070a] border border-cyan-900/30 text-slate-300 hover:text-white rounded-sm text-xs font-mono font-medium hover:border-cyan-500/50 transition-all cursor-pointer"
                    >
                      Compose Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>

        {/* Footer Area */}
        <footer className="border-t border-cyan-900/20 mt-20 pt-10 text-center relative">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-8 border-b border-cyan-900/10">
            <div className="flex items-center gap-2">
              <Logo className="w-8 h-8" showText={true} />
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-500">
              <button onClick={() => scrollToSection("home")} className="hover:text-cyan-400 cursor-pointer">Home</button>
              <button onClick={() => scrollToSection("services")} className="hover:text-cyan-400 cursor-pointer">Services</button>
              <button onClick={() => scrollToSection("pillars")} className="hover:text-cyan-400 cursor-pointer">Structural Pillars</button>
              <button onClick={() => scrollToSection("portfolio")} className="hover:text-cyan-400 cursor-pointer">Portfolio</button>
              <button onClick={() => scrollToSection("contact")} className="hover:text-cyan-400 cursor-pointer">Contact Us</button>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-slate-600">
            <div>
              &copy; {new Date().getFullYear()} Axioscript. All rights reserved. Your vision, encoded.
            </div>
            <div className="flex gap-4">
              <span>PATHSALA_PIN_781325</span>
              <span>•</span>
              <span>VER_LEDGER_3.5</span>
            </div>
          </div>
        </footer>

      </section>

    </div>
  );
}
