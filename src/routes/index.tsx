import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Code2, Layers, Menu, Minus, Monitor, Plus, ShieldCheck, Sparkles, Star, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import useEmblaCarousel from "embla-carousel-react";
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
import portrait4 from "@/assets/agency/portrait-4.jpg.asset.json";
import portrait5 from "@/assets/agency/portrait-5.jpg.asset.json";
import portrait6 from "@/assets/agency/portrait-6.jpg.asset.json";
import badgeLogo from "@/assets/agency/webild-logo.png.asset.json";

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
 { title: "Web Development", description: "Custom-built websites that are fast, responsive, and designed to convert." },
 { title: "SEO Optimization", description: "We optimize your website to rank higher on search engines and drive organic traffic." },
 { title: "Branding", description: "Build a memorable brand identity that resonates with your audience." },
];
const projects = [
 { title: "Vitality Wellness", description: "Health & wellbeing platform", image: project1.url, url: null as string | null },
 { title: "Mailflow AI", description: "AI-powered email marketing platform", image: project2.url, url: null as string | null },
 { title: "Kinetic Studios", description: "Motion graphics & visual effects", image: project3.url, url: null as string | null },
];
const faqs = [
 ["How long does a typical project take?", "Most projects are completed within 2-4 weeks depending on scope and complexity. We'll provide a detailed timeline during our initial consultation."],
 ["What is your pricing structure?", "We offer project-based pricing tailored to your needs. Every project includes design, development, SEO optimization, and post-launch support."],
 ["Do you offer ongoing maintenance?", "Yes! We provide ongoing support and maintenance packages to keep your website updated, secure, and performing at its best."],
 ["Can you redesign my existing website?", "Absolutely. We specialize in website redesigns that modernize your brand while preserving your existing content and SEO rankings."],
 ["What technologies do you use?", "We build with modern technologies including Next.js, React, and Tailwind CSS to ensure fast, scalable, and maintainable websites."],
];
const navigation: readonly (readonly [string, string])[] = [["Services", "services"], ["Work", "work"], ["About", "about"], ["Team", "team"], ["Contact", "contact"]];

function ServiceVisual({ index }: { index: number }) {
 if (index === 0) return <div className="agency-service-visual agency-timeline-visual" aria-label="Project timeline illustration"><div className="agency-timeline-orbits" /><div className="agency-timeline-label"><span><Sparkles /> Project Timeline</span><span>Week 1-2</span></div>{[0,1,2].map(row => <div className="agency-timeline-row" key={row}><i /></div>)}<div className="agency-timeline-live"><i /><i /><i /></div></div>;
 if (index === 1) return <div className="agency-service-visual agency-bars" aria-label="Search performance illustration">{[0,1,2,3,4,5,6,7].map(bar => <i key={bar} />)}</div>;
 return <div className="agency-service-visual agency-orbits" aria-label="Brand identity illustration"><div className="agency-orbit-lines"><i /><i /><i /></div><span className="agency-orbit-center"><Sparkles /></span><span className="agency-orbit-symbol agency-orbit-symbol-left"><Layers /></span><span className="agency-orbit-symbol agency-orbit-symbol-right"><Code2 /></span></div>;
}

function Metric({ value, suffix }: { value: number; suffix: string }) {
 const ref = useRef<HTMLElement>(null);
 const [count, setCount] = useState(value);
 useEffect(() => {
  const element = ref.current;
  if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let frame = 0;
  const observer = new IntersectionObserver(entries => {
   if (!entries.some(entry => entry.isIntersecting)) return;
   observer.disconnect(); const start = performance.now();
   const tick = (now: number) => { const progress = Math.min((now-start)/1200,1); setCount(Math.round(value*(1-Math.pow(1-progress,3)))); if (progress<1) frame=requestAnimationFrame(tick); };
   frame=requestAnimationFrame(tick);
  }, { threshold: .3 });
  observer.observe(element); return () => { observer.disconnect(); cancelAnimationFrame(frame); };
 }, [value]);
 return <strong ref={ref}>{count}{suffix}</strong>;
}

function Index() {
 const [hydrated, setHydrated] = useState(false);
 const [menuOpen, setMenuOpen] = useState(false);
 const [scrolled, setScrolled] = useState(false);
 const [projectOffset, setProjectOffset] = useState(0);
 const [carouselRef, carouselApi] = useEmblaCarousel({ loop: true, align: "center", duration: 28, breakpoints: { "(prefers-reduced-motion: reduce)": { duration: 0 } } });
 const [projectOpen, setProjectOpen] = useState<number | null>(null);
 const [faqOpen, setFaqOpen] = useState<number[]>([]);
 const [email, setEmail] = useState("");
 const [contactFeedback, setContactFeedback] = useState(false);
 const menuTrigger = useRef<HTMLButtonElement>(null);
 const closeControl = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
 const projectTrigger = useRef<HTMLButtonElement | null>(null);
 const activeOverlay = projectOpen !== null;

 useEffect(() => {
  if (!carouselApi) return;
  const onSelect = () => setProjectOffset(carouselApi.selectedScrollSnap());
  onSelect();
  carouselApi.on("select", onSelect).on("reInit", onSelect);
  return () => { carouselApi.off("select", onSelect).off("reInit", onSelect); };
 }, [carouselApi]);

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
   if (event.key === "Escape") { setProjectOpen(null); }
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

  useEffect(() => {
   if (!menuOpen) return;
   const outside = (event: PointerEvent) => { if (event.target instanceof Node && !headerRef.current?.contains(event.target)) setMenuOpen(false); };
   const key = (event: KeyboardEvent) => { if (event.key === "Escape") { setMenuOpen(false); menuTrigger.current?.focus(); } };
   document.addEventListener("pointerdown", outside); document.addEventListener("keydown", key);
   return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", key); };
  }, [menuOpen]);

 const goTo = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" }); window.history.replaceState(null, "", `#${id}`); };
 const selectedProject = projectOpen === null ? undefined : projects[projectOpen];

 return <div className="agency" id="top" data-ready={hydrated}>
  <header ref={headerRef} className={`agency-header ${scrolled ? "is-scrolled" : ""}`}>
   <a className="agency-brand" href="#top" onClick={e => { e.preventDefault(); goTo("top"); }}>Webild</a>
   <div className="agency-header-actions">

    <Button asChild className="agency-button"><a href="#contact" onClick={e => { e.preventDefault(); goTo("contact"); }}>Start Project</a></Button>
    <Button ref={menuTrigger} className="agency-icon" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="agency-menu" onClick={() => setMenuOpen(open => !open)} title={menuOpen ? "Close navigation" : "Open navigation"}>{menuOpen ? <X /> : <Menu />}</Button>
   </div>
    {menuOpen && <nav className="agency-dropdown" id="agency-menu" aria-label="Expanded navigation">{navigation.filter(([,id]) => id !== "about").map(([label,id]) => <a href={`#${id}`} key={id} onClick={e => { e.preventDefault();goTo(id); }}>{label}<ArrowRight /></a>)}</nav>}
   </header>
  <main>
   <section className="agency-hero" aria-label="Webild agency">
    <div className="agency-container agency-hero-inner">
     <div className="agency-hero-copy agency-reveal"><span className="agency-eyebrow">Award-Winning Agency</span><h1>We Build Digital Experiences</h1><p>Transform your brand with cutting-edge web design and development. We craft stunning websites that convert visitors into customers.</p>
      <div className="agency-hero-actions"><Button asChild className="agency-button"><a href="#contact" onClick={e => { e.preventDefault(); goTo("contact"); }}>Start Project</a></Button><Button asChild variant="secondary" className="agency-button"><a href="#work" onClick={e => { e.preventDefault(); goTo("work"); }}>View Work</a></Button></div>
     </div>
     <div className="agency-gallery" aria-label="Selected website designs">{[[shot1,shot4,shot6,shot7],[shot2,shot5,shot3,shot8]].map((column,i) => <div className="agency-gallery-track" key={i}>{[...column,...column].map((image,j) => <img className="agency-shot" key={j} src={image.url} alt={j<column.length ? `Webild website design ${i*4+j+1}` : ""} aria-hidden={j>=column.length} />)}</div>)}</div>
    </div>
   </section>
   <section id="services" className="agency-section"><div className="agency-container">
    <div className="agency-section-heading agency-reveal"><span className="agency-eyebrow">Services</span><h2>Services That Drive Results</h2><p>We offer a full suite of digital services to help your brand stand out online.</p></div>
    <div className="agency-grid">{services.map((service,index) => <article key={service.title} className="agency-service agency-reveal"><ServiceVisual index={index} /><div className="agency-service-copy"><h3>{service.title}</h3><p>{service.description}</p></div></article>)}</div>

   </div></section>
   <section id="work" className="agency-section agency-work"><div className="agency-container">
     <div className="agency-section-heading agency-reveal"><span className="agency-eyebrow">Our Work</span><h2>Work We're Proud Of</h2><p>A selection of projects we've crafted for clients across industries.</p></div>
     <div className="agency-work-carousel agency-reveal" role="region" aria-roledescription="carousel" aria-label="Featured projects" onKeyDown={e => { if (e.key === "ArrowLeft") { e.preventDefault();carouselApi?.scrollPrev(); } else if (e.key === "ArrowRight") { e.preventDefault();carouselApi?.scrollNext(); } }}>
      <div className="agency-work-viewport" ref={carouselRef}><div className="agency-work-track">{projects.map((project,index) => <article className={`agency-work-slide ${projectOffset===index ? "is-active" : ""}`} key={project.title} role="group" aria-roledescription="slide" aria-label={`${index+1} of ${projects.length}: ${project.title}`}>
       <div className="agency-project"><img src={project.image} alt={`${project.title} website`} loading={index===0 ? "eager" : "lazy"} draggable={false} /><div className="agency-project-caption"><div className="min-w-0"><h3>{project.title}</h3><p>{project.description}</p></div>{project.url ? <Button asChild className="agency-icon" title={`Visit ${project.title}`} tabIndex={projectOffset===index ? 0 : -1}><a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${project.title}`}><ArrowUpRight /></a></Button> : <Button className="agency-icon" aria-label={`View ${project.title}`} title={`View ${project.title}`} tabIndex={projectOffset===index ? 0 : -1} onClick={e => { projectTrigger.current=e.currentTarget;setProjectOpen(index); }}><ArrowUpRight /></Button>}</div></div>
      </article>)}</div></div>
      <Button className="agency-icon agency-work-prev" title="Previous projects" aria-label="Previous projects" onClick={() => carouselApi?.scrollPrev()}><ArrowLeft /></Button><Button className="agency-icon agency-work-next" title="Next projects" aria-label="Next projects" onClick={() => carouselApi?.scrollNext()}><ArrowRight /></Button>
      <span className="sr-only" aria-live="polite" aria-atomic="true">{projects[projectOffset]?.title}</span>
     </div>
   </div></section>
   <section id="about" className="agency-section"><div className="agency-container">
    <div className="agency-section-heading agency-reveal"><span className="agency-eyebrow">Our Promise</span><h2>Why Brands Choose Webild</h2><p>We deliver results that speak for themselves.</p></div>
    <div className="agency-grid">{[{icon:Monitor,title:"Responsive Design",description:"Pixel-perfect websites that look stunning on every screen size and device."},{icon:Zap,title:"Fast Turnaround",description:"From concept to launch in record time without sacrificing quality."},{icon:ShieldCheck,title:"Secure Hosting",description:"Enterprise-grade security and 99.9% uptime for your website."}].map(item => <article className="agency-service agency-promise agency-reveal" key={item.title}><span className="agency-promise-icon"><item.icon /></span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>
    </div></section>
    <section className="agency-testimonial"><figure className="agency-quote agency-reveal"><div className="agency-rating" aria-label="5 out of 5 stars">{[0,1,2,3,4].map(star => <Star key={star} />)}</div><blockquote>“Webild completely transformed our online presence. The team delivered a stunning website that exceeded our expectations and doubled our conversion rate.”</blockquote><figcaption>— Maria Santos, CEO at Luxuria Travel</figcaption><div className="agency-avatars">{[team1,team2,team3,portrait4,portrait5,portrait6].map((portrait,i) => <img src={portrait.url} alt="" key={i} loading="lazy" />)}</div></figure></section>
   <section className="agency-section"><div className="agency-container"><div className="agency-section-heading agency-reveal"><span className="agency-eyebrow">Results</span><h2>Trusted by Industry Leaders</h2><p>Years of experience building digital products that drive real results.</p></div><div className="agency-grid agency-stats agency-reveal">{[{value:100,suffix:"+",label:"Projects Delivered",rows:["E-commerce platforms","Corporate websites","SaaS applications","Mobile-first designs"]},{value:99,suffix:"%",label:"Client Satisfaction",rows:["On-time delivery","Clear communication","Post-launch support","Ongoing partnerships"]},{value:8,suffix:"+",label:"Years Experience",rows:["Industry expertise","Award-winning work","Global clientele","Proven methodology"]}].map(({value,suffix,label,rows}) => <article key={label}><Metric value={value} suffix={suffix} /><span>{label}</span><ul>{rows.map(row => <li key={row}><span className="agency-check"><Check /></span>{row}</li>)}</ul></article>)}</div></div></section>
   <section id="team" className="agency-section"><div className="agency-container"><div className="agency-section-heading agency-reveal"><span className="agency-eyebrow">Team</span><h2>The Team Behind the Work</h2><p>The creative minds behind your next project.</p></div><div className="agency-grid agency-team">{[["Sarah Miller","Lead Developer",team1.url],["Valentina Reyes","Creative Director",team2.url],["Carlos Mendoza","UX Designer",team3.url]].map(([name,role,image]) => <article className="agency-reveal" key={name}><img src={image} alt={name} loading="lazy" /><h3>{name}</h3><p>{role}</p></article>)}</div></div></section>
   <section id="faq" className="agency-section"><div className="agency-container"><div className="agency-section-heading agency-reveal"><span className="agency-eyebrow">FAQ</span><h2>Frequently Asked Questions</h2><p>Everything you need to know about working with us.</p></div><div className="agency-faq">{faqs.map(([question,answer],i) => <div className="agency-faq-item" key={question}><Button variant="ghost" className="agency-faq-trigger" aria-expanded={faqOpen.includes(i)} aria-controls={`faq-${i}`} onClick={() => setFaqOpen(current => current.includes(i) ? current.filter(item => item!==i) : [...current,i])}>{question}<span className="agency-faq-icon">{faqOpen.includes(i) ? <Minus /> : <Plus />}</span></Button><div id={`faq-${i}`} className={`agency-faq-answer ${faqOpen.includes(i) ? "is-open" : ""}`} aria-hidden={!faqOpen.includes(i)}><div>{answer}</div></div></div>)}</div></div></section>
    <section id="contact" className="agency-contact"><div className="agency-container agency-reveal"><span className="agency-eyebrow">Get in Touch</span><h2>Ready to Transform Your Digital Presence?</h2><p>Let's build something extraordinary together. Get in touch and let's discuss your next project.</p><form className="agency-contact-form" onSubmit={e => { e.preventDefault();setContactFeedback(true); }}><input className="agency-input" aria-label="Email address" type="email" autoComplete="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required /><Button type="submit" className="agency-button">Start Your Project</Button></form></div></section>
  </main>
  <footer className="agency-footer"><div className="agency-container"><div className="agency-footer-top"><a className="agency-brand" href="#top" onClick={e => { e.preventDefault();goTo("top"); }}>Webild</a><div className="agency-footer-columns"><nav aria-label="Company"><h3>Company</h3>{[["About","about"],["Services","services"],["Work","work"],["Contact","contact"]].map(([label,id]) => <a key={label} href={`#${id}`} onClick={e => {e.preventDefault();goTo(id);}}>{label}</a>)}</nav><nav aria-label="Services"><h3>Services</h3>{["Web Development","SEO","Branding","UI/UX Design"].map(label => <a key={label} href="#services" onClick={e => {e.preventDefault();goTo("services");}}>{label}</a>)}</nav><div><h3>Connect</h3>{["Twitter","LinkedIn","Instagram","Dribbble"].map(label => <span key={label} title="Destination not provided by the reference">{label}</span>)}</div></div></div><div className="agency-footer-bottom"><span>© 2026 Webild. All rights reserved.</span><div><span title="Policy URL not provided">Privacy Policy</span><span title="Terms URL not provided">Terms &amp; Conditions</span></div></div></div></footer>
   <a className="agency-webild-badge" href="https://webild.io/templates/web-agency" target="_blank" rel="noopener noreferrer"><img src={badgeLogo.url} alt="" />Made with Webild</a>
  {selectedProject && <div className="agency-modal" onClick={() => setProjectOpen(null)}><div className="agency-dialog" role="dialog" aria-modal="true" aria-labelledby="project-title" onClick={e => e.stopPropagation()}><div className="agency-dialog-top"><div><span className="agency-eyebrow">Selected Work</span><h2 id="project-title">{selectedProject.title}</h2></div><Button ref={closeControl} className="agency-icon" aria-label="Close project" title="Close project" onClick={() => setProjectOpen(null)}><X /></Button></div><img src={selectedProject.image} alt={`${selectedProject.title} website detail`} /><p>{selectedProject.description}</p><Button className="agency-button" onClick={() => { setProjectOpen(null);goTo("contact"); }}>Discuss a similar project <ArrowUpRight /></Button></div></div>}

 </div>;
}
