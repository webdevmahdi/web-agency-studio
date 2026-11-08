import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, Code2, Download, Menu, Minus, Palette, Plus, Search, ShieldCheck, Smartphone, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import shot1 from "@/assets/agency/shot-1.webp.asset.json";
import shot2 from "@/assets/agency/shot-2.webp.asset.json";
import shot3 from "@/assets/agency/shot-3.webp.asset.json";
import shot4 from "@/assets/agency/shot-4.webp.asset.json";
import shot5 from "@/assets/agency/shot-5.webp.asset.json";
import shot6 from "@/assets/agency/shot-6.webp.asset.json";
import shot7 from "@/assets/agency/shot-7.webp.asset.json";
import shot8 from "@/assets/agency/shot-8.webp.asset.json";
import project1 from "@/assets/agency/projectnew1.webp.asset.json";
import project2 from "@/assets/agency/projectnew2.webp.asset.json";
import project3 from "@/assets/agency/projectnew3.webp.asset.json";
import team1 from "@/assets/agency/team-1.webp.asset.json";
import team2 from "@/assets/agency/team-2.webp.asset.json";
import team3 from "@/assets/agency/team-3.webp.asset.json";

export const Route = createFileRoute("/")({
 head: () => ({ meta: [
  { title: "Webild — Digital Design & Development Agency" },
  { name: "description", content: "Webild creates digital experiences through web development, branding, and SEO. Explore our work and start your project." },
  { property: "og:title", content: "Webild — Digital Design & Development Agency" },
  { property: "og:description", content: "Explore Webild's digital services, portfolio, and creative team." },
  { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
 ] }), component: Index,
});

// Agency copy and media are ordinary editable content, not a captured preview.
const services = [
 { title: "Web Development", description: "Custom-built websites that are fast, responsive, and designed to convert.", icon: Code2 },
 { title: "SEO Optimization", description: "We optimize your website to rank higher on search engines and drive organic traffic.", icon: Search },
 { title: "Branding", description: "Build a memorable brand identity that resonates with your audience.", icon: Palette },
];
const projects = [
 { title: "Vitality Wellness", description: "Health & wellbeing platform", image: project1.url },
 { title: "Mailflow AI", description: "AI-powered email marketing platform", image: project2.url },
 { title: "Kinetic Studios", description: "Motion graphics & visual effects", image: project3.url },
];
const faqs = [
 ["How long does a typical project take?", "Most projects are completed within 2-4 weeks depending on scope and complexity. We'll provide a detailed timeline during our initial consultation."],
 ["What is your pricing structure?", "We offer project-based pricing tailored to your needs. Every project includes design, development, SEO optimization, and post-launch support."],
 ["Do you offer ongoing maintenance?", "Yes! We provide ongoing support and maintenance packages to keep your website updated, secure, and performing at its best."],
 ["Can you redesign my existing website?", "Absolutely. We specialize in website redesigns that modernize your brand while preserving your existing content and SEO rankings."],
 ["What technologies do you use?", "We build with modern technologies including Next.js, React, and Tailwind CSS to ensure fast, scalable, and maintainable websites."],
];
const navigation: readonly (readonly [string, string])[] = [["Services", "services"], ["Work", "work"], ["About", "about"], ["Team", "team"], ["Contact", "contact"]];

function Index() {
 const [hydrated, setHydrated] = useState(false);
 const [menuOpen, setMenuOpen] = useState(false);
 const [scrolled, setScrolled] = useState(false);
 const [showCookies, setShowCookies] = useState(true);
 const [projectOffset, setProjectOffset] = useState(0);
 const [projectOpen, setProjectOpen] = useState<number | null>(null);
 const [faqOpen, setFaqOpen] = useState<number | null>(null);
 const [contactOpen, setContactOpen] = useState(false);
 const [email, setEmail] = useState("");
 const [briefReady, setBriefReady] = useState(false);
 const menuTrigger = useRef<HTMLButtonElement>(null);
 const closeControl = useRef<HTMLButtonElement>(null);
 const contactTrigger = useRef<HTMLButtonElement>(null);
 const projectTrigger = useRef<HTMLButtonElement | null>(null);
 const activeOverlay = menuOpen || contactOpen || projectOpen !== null;

 useEffect(() => {
  setHydrated(true);
  const onScroll = () => setScrolled(window.scrollY > 35);
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
   if (entry.isIntersecting) { entry.target.classList.add("is-revealed"); observer.unobserve(entry.target); }
  }), { threshold: .12 });
  document.querySelectorAll(".agency-reveal").forEach(el => observer.observe(el));
  return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
 }, []);

 useEffect(() => {
  if (!activeOverlay) return;
  const previous = document.activeElement;
  const previousOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
  closeControl.current?.focus();
  const onKey = (event: KeyboardEvent) => {
   if (event.key === "Escape") { setMenuOpen(false); setContactOpen(false); setProjectOpen(null); }
   if (event.key === "Tab") {
    const dialog = document.querySelector('[role="dialog"]');
    const controls = dialog?.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input,textarea');
    if (!controls?.length) return;
    const first = controls[0]; const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
   }
  };
  document.addEventListener("keydown", onKey);
  return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", onKey); if (previous instanceof HTMLElement) previous.focus(); };
 }, [activeOverlay]);

 const goTo = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }); window.history.replaceState(null, "", `#${id}`); };
 const selectedProject = projectOpen === null ? undefined : projects[projectOpen];

 return <div className="agency" id="top" data-ready={hydrated}>
  <header className={`agency-header ${scrolled ? "is-scrolled" : ""}`}>
   <a className="agency-brand" href="#top" onClick={e => { e.preventDefault(); goTo("top"); }}>Webild</a>
   <div className="agency-header-actions">
    <nav className="agency-desktop-nav" aria-label="Main navigation">{navigation.slice(0,3).map(([label,id]) => <a key={id} href={`#${id}`} onClick={e => { e.preventDefault(); goTo(id); }}>{label}</a>)}</nav>
    <Button asChild className="agency-button"><a href="#contact" onClick={e => { e.preventDefault(); goTo("contact"); }}>Start Project</a></Button>
    <Button ref={menuTrigger} className="agency-icon" aria-label="Open navigation" aria-expanded={menuOpen} aria-controls="agency-menu" onClick={() => setMenuOpen(true)} title="Open navigation"><Menu /></Button>
   </div>
  </header>
  <main>
   <section className="agency-hero" aria-label="Webild agency">
    <div className="agency-container agency-hero-inner">
     <div className="agency-hero-copy agency-reveal"><span className="agency-eyebrow">Award-Winning Agency</span><h1>We Build Digital Experiences</h1><p>Transform your brand with cutting-edge web design and development. We craft stunning websites that convert visitors into customers.</p>
      <div className="agency-hero-actions"><Button asChild className="agency-button"><a href="#contact" onClick={e => { e.preventDefault(); goTo("contact"); }}>Start Project <ArrowUpRight /></a></Button><Button asChild variant="secondary" className="agency-button"><a href="#work" onClick={e => { e.preventDefault(); goTo("work"); }}>View Work <ArrowDown /></a></Button></div>
     </div>
     <div className="agency-gallery" aria-label="Selected website designs">{[[shot1,shot4,shot6,shot7],[shot2,shot5,shot3,shot8]].map((column,i) => <div className="agency-gallery-track" key={i}>{[...column,...column].map((image,j) => <img className="agency-shot" key={j} src={image.url} alt={j<column.length ? `Webild website design ${i*4+j+1}` : ""} aria-hidden={j>=column.length} />)}</div>)}</div>
    </div>
   </section>
   <section id="services" className="agency-section"><div className="agency-container">
    <div className="agency-section-heading agency-reveal"><span className="agency-eyebrow">Services</span><h2>Services That Drive Results</h2><p>We offer a full suite of digital services to help your brand stand out online.</p></div>
    <div className="agency-grid">{services.map(service => <article key={service.title} className="agency-service agency-reveal"><service.icon /><h3>{service.title}</h3><p>{service.description}</p></article>)}</div>
    <div className="agency-timeline agency-reveal">{[["01","Discovery & Strategy","Day 1–3"],["02","Design & Prototype","Day 4–7"],["03","Development & Launch","Day 8–14"]].map(([number,title,time]) => <div key={number}><span>{number}</span><div><div><p>{title}</p></div><span>{time}</span></div></div>)}</div>
   </div></section>
   <section id="work" className="agency-section agency-work"><div className="agency-container">
    <div className="agency-work-top agency-reveal"><div className="agency-section-heading"><span className="agency-eyebrow">Our Work</span><h2>Work We're Proud Of</h2><p>A selection of projects we've crafted for clients across industries.</p></div><div className="agency-carousel-actions"><Button variant="outline" className="agency-icon" title="Previous projects" aria-label="Previous projects" onClick={() => setProjectOffset(i => (i+2)%3)}><ArrowLeft /></Button><Button variant="outline" className="agency-icon" title="Next projects" aria-label="Next projects" onClick={() => setProjectOffset(i => (i+1)%3)}><ArrowRight /></Button></div></div>
    <div className="agency-grid" aria-live="polite">{projects.map((_,position) => { const index=(projectOffset+position)%projects.length; const project=projects[index];if (!project) return null;return <article className="agency-project agency-reveal" key={project.title}><img src={project.image} alt={`${project.title} website`} loading="lazy" /><div className="agency-project-caption"><div><h3>{project.title}</h3><p>{project.description}</p></div><Button variant="secondary" className="agency-icon" aria-label={`View ${project.title}`} title={`View ${project.title}`} onClick={e => { projectTrigger.current=e.currentTarget;setProjectOpen(index); }}><ArrowUpRight /></Button></div></article>; })}</div>
   </div></section>
   <section id="about" className="agency-section"><div className="agency-container">
    <div className="agency-section-heading agency-reveal"><span className="agency-eyebrow">Our Promise</span><h2>Why Brands Choose Webild</h2><p>We deliver results that speak for themselves.</p></div>
    <div className="agency-grid">{[{icon:Smartphone,title:"Responsive Design",description:"Pixel-perfect websites that look stunning on every screen size and device."},{icon:Zap,title:"Fast Turnaround",description:"From concept to launch in record time without sacrificing quality."},{icon:ShieldCheck,title:"Secure Hosting",description:"Enterprise-grade security and 99.9% uptime for your website."}].map(item => <article className="agency-service agency-reveal" key={item.title}><item.icon /><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>
    <figure className="agency-quote agency-reveal"><blockquote>“Webild completely transformed our online presence. The team delivered a stunning website that exceeded our expectations and doubled our conversion rate.”</blockquote><figcaption>— Maria Santos, CEO at Luxuria Travel</figcaption></figure>
   </div></section>
   <section className="agency-section"><div className="agency-container"><div className="agency-section-heading agency-reveal"><span className="agency-eyebrow">Results</span><h2>Trusted by Industry Leaders</h2><p>Years of experience building digital products that drive real results.</p></div><div className="agency-grid agency-stats agency-reveal">{[["100+","Projects Delivered"],["99%","Client Satisfaction"],["8+","Years Experience"]].map(([value,label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></div></section>
   <section id="team" className="agency-section"><div className="agency-container"><div className="agency-section-heading agency-reveal"><span className="agency-eyebrow">Team</span><h2>The Team Behind the Work</h2><p>The creative minds behind your next project.</p></div><div className="agency-grid agency-team">{[["Sarah Miller","Lead Developer",team1.url],["Valentina Reyes","Creative Director",team2.url],["Carlos Mendoza","UX Designer",team3.url]].map(([name,role,image]) => <article className="agency-reveal" key={name}><img src={image} alt={name} loading="lazy" /><h3>{name}</h3><p>{role}</p></article>)}</div></div></section>
   <section id="faq" className="agency-section"><div className="agency-container"><div className="agency-section-heading agency-reveal"><span className="agency-eyebrow">FAQ</span><h2>Frequently Asked Questions</h2><p>Everything you need to know about working with us.</p></div><div className="agency-faq">{faqs.map(([question,answer],i) => <div className="agency-faq-item" key={question}><Button variant="ghost" className="agency-faq-trigger" aria-expanded={faqOpen===i} aria-controls={`faq-${i}`} onClick={() => setFaqOpen(current => current===i ? null : i)}>{question}{faqOpen===i ? <Minus /> : <Plus />}</Button>{faqOpen===i && <div id={`faq-${i}`} className="agency-faq-answer">{answer}</div>}</div>)}</div></div></section>
   <section id="contact" className="agency-contact"><div className="agency-container agency-reveal"><span className="agency-eyebrow">Get in Touch</span><h2>Ready to Transform Your Digital Presence?</h2><p>Let's build something extraordinary together. Get in touch and let's discuss your next project.</p><form className="agency-contact-form" onSubmit={e => { e.preventDefault();setBriefReady(false);setContactOpen(true); }}><input className="agency-input" aria-label="Email address" type="email" autoComplete="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required /><Button ref={contactTrigger} type="submit" className="agency-button">Start Your Project <ArrowUpRight /></Button></form></div></section>
  </main>
  <footer className="agency-footer"><div className="agency-container"><div className="agency-footer-top"><a className="agency-brand" href="#top" onClick={e => { e.preventDefault();goTo("top"); }}>Webild</a><nav className="agency-footer-nav" aria-label="Footer navigation">{navigation.map(([label,id]) => <a key={id} href={`#${id}`} onClick={e => { e.preventDefault();goTo(id); }}>{label}</a>)}</nav></div><div className="agency-footer-bottom">© 2026 Webild. All rights reserved.</div></div></footer>
  {showCookies && <aside className="agency-cookie" aria-label="Cookie preferences"><h3>Cookie preferences</h3><p>We use cookies to analyze how you use our site and improve your experience.</p><div className="agency-cookie-actions"><Button variant="secondary" onClick={() => setShowCookies(false)}>Decline</Button><Button onClick={() => setShowCookies(false)}>Accept</Button></div></aside>}
  {menuOpen && <div className="agency-menu-overlay" onClick={() => setMenuOpen(false)}><div className="agency-menu-panel" id="agency-menu" role="dialog" aria-modal="true" aria-labelledby="menu-title" onClick={e => e.stopPropagation()}><div className="agency-menu-top"><span className="agency-brand" id="menu-title">Webild</span><Button ref={closeControl} className="agency-icon" aria-label="Close navigation" title="Close navigation" onClick={() => setMenuOpen(false)}><X /></Button></div><nav className="agency-menu-links" aria-label="Expanded navigation">{[...navigation,["FAQ","faq"] as const].map(([label,id]) => <a href={`#${id}`} key={id} onClick={e => { e.preventDefault();goTo(id); }}>{label}<ArrowUpRight /></a>)}</nav><div className="agency-menu-bottom"><Button className="agency-button" onClick={() => goTo("contact")}>Start Project <ArrowUpRight /></Button></div></div></div>}
  {selectedProject && <div className="agency-modal" onClick={() => setProjectOpen(null)}><div className="agency-dialog" role="dialog" aria-modal="true" aria-labelledby="project-title" onClick={e => e.stopPropagation()}><div className="agency-dialog-top"><div><span className="agency-eyebrow">Selected Work</span><h2 id="project-title">{selectedProject.title}</h2></div><Button ref={closeControl} className="agency-icon" aria-label="Close project" title="Close project" onClick={() => setProjectOpen(null)}><X /></Button></div><img src={selectedProject.image} alt={`${selectedProject.title} website detail`} /><p>{selectedProject.description}</p><Button className="agency-button" onClick={() => { setProjectOpen(null);goTo("contact"); }}>Discuss a similar project <ArrowUpRight /></Button></div></div>}
  {contactOpen && <div className="agency-modal" onClick={() => setContactOpen(false)}><div className="agency-dialog" role="dialog" aria-modal="true" aria-labelledby="contact-title" onClick={e => e.stopPropagation()}><div className="agency-dialog-top"><div><span className="agency-eyebrow">Start a Conversation</span><h2 id="contact-title">Your next project</h2></div><Button ref={closeControl} className="agency-icon" aria-label="Close contact" title="Close contact" onClick={() => setContactOpen(false)}><X /></Button></div><form onSubmit={e => { e.preventDefault();const data=new FormData(e.currentTarget);const text=`Project brief\n\nName: ${data.get("name")}\nEmail: ${data.get("email")}\n\nProject: ${data.get("project")}`;const url=URL.createObjectURL(new Blob([text],{type:"text/plain"}));const link=document.createElement("a");link.href=url;link.download="webild-project-brief.txt";link.click();URL.revokeObjectURL(url);setBriefReady(true); }}><label>Your name<input className="agency-input" name="name" autoComplete="name" required /></label><label>Email address<input className="agency-input" name="email" type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} required /></label><label>Tell us about your project<textarea className="agency-input" name="project" placeholder="What would you like to create?" required /></label><p className="agency-dialog-note">Prepare a project brief to share. This form downloads your details; it does not send an enquiry.</p><Button type="submit" className="agency-button">{briefReady ? <Check /> : <Download />}{briefReady ? "Download again" : "Download project brief"}</Button>{briefReady && <p className="agency-dialog-note" role="status">Your project brief is ready. No enquiry has been sent.</p>}</form></div></div>}
 </div>;
}
