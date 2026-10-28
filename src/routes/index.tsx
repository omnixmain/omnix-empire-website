import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  Send, Download, Film, Tv, Trophy, Gauge, PictureInPicture2, MonitorSmartphone, LogIn,
  Gift, UserX, Globe, Users, PlayCircle, Smartphone, Flame, Crown, Shield, Camera as Instagram, PlaySquare as Youtube, X,
} from "lucide-react";
import logo from "@/assets/omnix-empire-logo.jpg.asset.json";
import ottLogo from "@/assets/omnix-ott-logo.png.asset.json";
import om18xLogo from "@/assets/om18x.jpg.asset.json";
import devices from "@/assets/OMNIX_Wireframe_TV_Mobile.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "OMNIX EMPIRE | Official Home of OMNIX OTT & OM18X" },
      { name: "description", content: "Official OMNIX EMPIRE website. Download OMNIX OTT v3.4.1 and OM18X, and join our Telegram channels." },
      { property: "og:title", content: "OMNIX EMPIRE | Rule Your Entertainment" },
      { property: "og:description", content: "Download OMNIX OTT & OM18X — official OMNIX EMPIRE apps for Android, TV and Firestick." },
    ],
  }),
  component: Index,
});

const TG_MAIN = "https://t.me/omnixempire";
const TG_OFFICIAL = "https://t.me/OmnixEmpireOfficial";

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Background() {
  const [stars, setStars] = useState<{ l: number; t: number; s: number; d: number }[]>([]);
  useEffect(() => {
    setStars(Array.from({ length: 70 }, () => ({ l: Math.random() * 100, t: Math.random() * 100, s: Math.random() * 2.5 + 1, d: Math.random() * 4 })));
  }, []);
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="animate-blob absolute -left-40 -top-40 h-[40rem] w-[40rem] rounded-full bg-primary/20 blur-[120px]" />
      <div className="animate-blob absolute -right-40 top-1/3 h-[36rem] w-[36rem] rounded-full bg-accent/15 blur-[120px] [animation-delay:-6s]" />
      <div className="animate-blob absolute bottom-0 left-1/3 h-[30rem] w-[30rem] rounded-full bg-gold-deep/20 blur-[120px] [animation-delay:-12s]" />
      <div className="animate-spin-slow absolute left-1/2 top-1/2 h-[140vmax] w-[140vmax] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/5" />
      {stars.map((s, i) => (
        <span key={i} className="star" style={{ left: `${s.l}%`, top: `${s.t}%`, width: s.s, height: s.s, animationDelay: `${s.d}s` }} />
      ))}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,var(--background)_100%)]" />
    </div>
  );
}

function Feature({ icon, title, text, hot }: { icon: ReactNode; title: string; text?: string | undefined; hot?: boolean | undefined }) {
  return (
    <div className="glass group rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:border-primary/50">
      <div className={`mb-3 grid h-11 w-11 place-items-center rounded-xl ${hot ? "bg-hot text-accent-foreground" : "bg-gold text-primary-foreground"}`}>{icon}</div>
      <div className="font-semibold">{title}</div>
      {text && <p className="mt-1 text-sm text-muted-foreground">{text}</p>}
    </div>
  );
}

function AppCard(props: {
  id: string; img: string; name: string; tag: string; desc: string; stats: [string, string][];
  link: string; hot?: boolean; badges: string[]; features: { icon: ReactNode; title: string; text?: string }[];
  onDownload?: (e: React.MouseEvent) => void;
}) {
  const { hot } = props;
  return (
    <section id={props.id} className="reveal mx-auto max-w-6xl px-5 py-20">
      <div className={`glass relative overflow-hidden rounded-[2rem] p-6 md:p-12 ${hot ? "shadow-hot" : "shadow-gold"}`}>
        <div className={`absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl ${hot ? "bg-accent/25" : "bg-primary/25"}`} />
        <div className="relative grid items-center gap-10 md:grid-cols-[auto_1fr]">
          <div className="animate-float mx-auto">
            <img src={props.img} alt={props.name} className={`h-40 w-40 rounded-[2rem] object-cover ring-2 md:h-52 md:w-52 ${hot ? "ring-accent shadow-hot" : "ring-primary shadow-gold"}`} />
          </div>
          <div className="text-center md:text-left">
            <div className="flex flex-wrap justify-center gap-2 md:justify-start">
              {props.badges.map((b) => (
                <span key={b} className={`rounded-full px-3 py-1 text-xs font-bold tracking-widest ${hot ? "bg-accent/15 text-accent" : "bg-primary/15 text-primary"}`}>{b}</span>
              ))}
            </div>
            <h2 className={`mt-4 font-display text-5xl font-extrabold md:text-6xl ${hot ? "text-accent" : "text-gold"}`}>{props.name}</h2>
            <p className="mt-2 text-lg font-semibold">{props.tag}</p>
            <p className="mt-3 max-w-2xl text-muted-foreground">{props.desc}</p>
            <div className={`mt-6 grid grid-cols-2 gap-3 ${props.stats.length >= 4 ? "sm:grid-cols-4" : "sm:grid-cols-3"}`}>
              {props.stats.map(([k, v]) => (
                <div key={k} className="rounded-xl border border-border bg-background/40 p-3">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{k}</div>
                  <div className="font-bold">{v}</div>
                </div>
              ))}
            </div>
            <a href={props.link} target="_blank" rel="noreferrer" onClick={props.onDownload}
              className={`mt-7 inline-flex items-center gap-3 rounded-full px-8 py-4 text-lg font-bold transition hover:scale-105 ${hot ? "bg-hot text-accent-foreground shadow-hot" : "bg-gold text-primary-foreground shadow-gold"}`}>
              <Download className="h-5 w-5" /> Download {props.name}
            </a>
          </div>
        </div>
        <div className="relative mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {props.features.map((f) => <Feature key={f.title} {...f} hot={hot} />)}
        </div>
      </div>
    </section>
  );
}

function Index() {
  useReveal();
  const [scrolled, setScrolled] = useState(false);
  const [dmca, setDmca] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", f);
    return () => window.removeEventListener("scroll", f);
  }, []);
  const ageGate = (e: React.MouseEvent) => {
    if (!window.confirm("OM18X is for adults only. Are you 18 years or older?")) e.preventDefault();
  };

  return (
    <div className="relative min-h-screen text-foreground">
      <Background />

      <nav className={`fixed inset-x-0 top-0 z-50 transition ${scrolled ? "glass py-3" : "py-5"}`}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5">
          <a href="#" className="flex items-center gap-2">
            <img src={logo.url} alt="" className="h-9 w-9 rounded-full" />
            <span className="font-display text-lg font-extrabold text-gold">OMNIX EMPIRE</span>
          </a>
          <div className="hidden items-center gap-7 text-sm md:flex">
            <a href="#ott" className="hover:text-primary">OMNIX OTT</a>
            <a href="#om18x" className="font-semibold text-accent">OM18X 18+</a>
            <a href="#channels" className="hover:text-primary">Channels</a>
          </div>
          <a href={TG_MAIN} target="_blank" rel="noreferrer" className="bg-gold inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold text-primary-foreground">
            <Send className="h-4 w-4" /> Join
          </a>
        </div>
      </nav>

      <header className="flex min-h-screen flex-col items-center justify-center px-5 pt-24 text-center">
        <div className="animate-rise relative">
          <div className="absolute inset-0 rounded-full bg-primary/30 blur-3xl" />
          <img src={logo.url} alt="OMNIX EMPIRE" className="animate-float relative h-44 w-44 rounded-full ring-1 ring-primary/40 md:h-56 md:w-56" />
        </div>
        <p className="animate-rise mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.4em] text-primary [animation-delay:.15s]">
          <Crown className="h-4 w-4" /> The Official Empire
        </p>
        <h1 className="animate-rise mt-4 font-display text-5xl font-extrabold leading-tight md:text-7xl [animation-delay:.3s]">
          <span className="text-gold">Rule Your</span><br />Entertainment
        </h1>
        <p className="animate-rise mt-6 max-w-xl text-lg text-muted-foreground [animation-delay:.45s]">
          Movies, Live TV, Sports & more — premium streaming apps by OMNIX EMPIRE.
        </p>
        <div className="animate-rise mt-9 flex flex-wrap justify-center gap-4 [animation-delay:.6s]">
          <a href="#ott" className="bg-gold shadow-gold inline-flex items-center gap-2 rounded-full px-7 py-4 font-bold text-primary-foreground transition hover:scale-105">
            <Download className="h-5 w-5" /> OMNIX OTT
          </a>
          <a href="#om18x" className="inline-flex items-center gap-2 rounded-full border border-accent/60 px-7 py-4 font-bold text-accent transition hover:scale-105 hover:bg-accent/10">
            <Flame className="h-5 w-5" /> OM18X (18+)
          </a>
          <a href={TG_MAIN} target="_blank" rel="noreferrer" className="glass inline-flex items-center gap-2 rounded-full px-7 py-4 font-bold transition hover:scale-105">
            <Send className="h-5 w-5" /> Telegram
          </a>
        </div>
      </header>

      <section className="reveal mx-auto max-w-5xl px-5 py-16 text-center">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Multi-Platform</span>
        <h2 className="mt-3 font-display text-4xl font-extrabold">Seamless on Every Screen</h2>
        <p className="mt-3 text-muted-foreground">Mobile • Tablet • Firestick • Android TV</p>
        <img src={devices.url} alt="OMNIX OTT on TV and mobile" className="animate-float mx-auto mt-10 w-full drop-shadow-2xl" />
      </section>

      <AppCard
        id="ott" img={ottLogo.url} name="OMNIX OTT" tag="The Ultimate All-in-One Entertainment Hub"
        desc="Movies, TV Shows, Live TV, Sports, Anime and more — on Mobile, Tablet, Firestick and Android TV."
        badges={["LIVE NOW", "FEATURED"]}
        stats={[["Size", "31.5 MB"], ["Version", "3.4.1 (37)"], ["Update", "29-10-2026"]]}
        link="https://www.mediafire.com/file/akfi9qi27tpwiq3/OMNIX_OTT_v37_3.4.1_Release_29-10-2026.apk/file"
        features={[
          { icon: <Film className="h-5 w-5" />, title: "15000+ Movies, Series & Shows" },
          { icon: <Tv className="h-5 w-5" />, title: "Live TV Channels & Events" },
          { icon: <Trophy className="h-5 w-5" />, title: "Live Sports Coverage" },
          { icon: <Gauge className="h-5 w-5" />, title: "Adaptive Streaming Quality" },
          { icon: <PictureInPicture2 className="h-5 w-5" />, title: "Picture-in-Picture" },
          { icon: <MonitorSmartphone className="h-5 w-5" />, title: "Cross-Platform" },
          { icon: <LogIn className="h-5 w-5" />, title: "IPTV Login Support" },
        ]}
      />

      <AppCard
        id="om18x" hot img={om18xLogo.url} name="OM18X" tag="100% Free • No Subscription • No Login"
        desc="Fully free video streaming with top models and worldwide categories in high quality. Adults only (18+)."
        badges={["18+ ONLY", "NEW RELEASE", "100% FREE"]}
        stats={[["Size", "11.37 MB"], ["Version", "v1.0"], ["Release", "15-10-2026"], ["Access", "Free"]]}
        link="https://www.mediafire.com/file/twmh7cbxd35n7nq/OM18X_v1.0_2026-10-15.apk/file"
        onDownload={ageGate}
        features={[
          { icon: <Gift className="h-5 w-5" />, title: "100% Fully Free", text: "No subscriptions, no fees." },
          { icon: <UserX className="h-5 w-5" />, title: "No Login Required", text: "One-tap stream, no sign-up." },
          { icon: <Globe className="h-5 w-5" />, title: "Worldwide Categories", text: "Rich international variety." },
          { icon: <Users className="h-5 w-5" />, title: "Many Models", text: "Diverse models and stars." },
          { icon: <PlayCircle className="h-5 w-5" />, title: "Smooth Playback", text: "High-speed servers." },
          { icon: <Smartphone className="h-5 w-5" />, title: "Lightweight", text: "Only 11.37 MB on Android." },
        ]}
      />

      <section id="channels" className="reveal mx-auto max-w-5xl px-5 py-20 text-center">
        <span className="text-xs font-bold uppercase tracking-[0.3em] text-primary">Community</span>
        <h2 className="mt-3 font-display text-4xl font-extrabold">Join the <span className="text-gold">Official Network</span></h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">Latest updates, movies, apps and IPTV access — straight from OMNIX EMPIRE.</p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {[
            { href: TG_MAIN, icon: <Shield className="h-7 w-7" />, title: "OMNIX Official About", text: "Official information and all links." },
            { href: TG_OFFICIAL, icon: <Crown className="h-7 w-7" />, title: "OMNIX EMPIRE", text: "New apps, website updates & major announcements." },
          ].map((c) => (
            <a key={c.href} href={c.href} target="_blank" rel="noreferrer"
              className="glass group flex items-center gap-5 rounded-2xl p-6 text-left transition hover:-translate-y-1 hover:shadow-gold">
              <div className="bg-gold grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-primary-foreground">{c.icon}</div>
              <div className="flex-1">
                <div className="text-lg font-bold">{c.title}</div>
                <div className="text-sm text-muted-foreground">{c.text}</div>
              </div>
              <Send className="h-5 w-5 text-primary transition group-hover:translate-x-1" />
            </a>
          ))}
        </div>
      </section>

      <footer className="border-t border-border px-5 py-12 text-center">
        <div className="flex justify-center gap-4">
          {[[TG_MAIN, <Send key="t" className="h-5 w-5" />], ["https://www.instagram.com/omnix_ott/", <Instagram key="i" className="h-5 w-5" />], ["https://www.youtube.com/@omnixgaming28", <Youtube key="y" className="h-5 w-5" />]].map(([h, ic]) => (
            <a key={h as string} href={h as string} target="_blank" rel="noreferrer" className="glass grid h-11 w-11 place-items-center rounded-full transition hover:text-primary">{ic}</a>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
          {["Terms", "Privacy", "About Us", "DMCA", "Contact"].map((l) => (
            <button key={l} onClick={() => setDmca(true)} className="hover:text-primary">{l}</button>
          ))}
        </div>
        <p className="mt-6 text-xs text-muted-foreground">OMNIX is not affiliated with any third-party brands mentioned in the app.</p>
        <p className="mt-1 text-xs text-muted-foreground">© 2026 All rights reserved • Designed & Developed by <span className="text-gold font-bold">OMNIX EMPIRE</span></p>
      </footer>

      {dmca && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-background/80 p-5 backdrop-blur" onClick={() => setDmca(false)}>
          <div className="glass relative max-w-lg rounded-2xl p-7 text-sm text-muted-foreground" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setDmca(false)} className="absolute right-4 top-4 hover:text-primary"><X className="h-5 w-5" /></button>
            <h3 className="mb-4 font-display text-xl font-bold text-gold">DMCA & Fair Use Disclaimer</h3>
            <p><strong className="text-foreground">Omnix OTT</strong> is an independent aggregation platform. We only index, share, and organize content and links already freely and publicly available on the internet. We do not host any copyrighted media on our own servers.</p>
            <p className="mt-3"><strong className="text-foreground">Notice and Takedown:</strong> Copyright owners or authorities with objections must contact the Omnix Empire administration directly first. Upon a valid removal request, we will promptly take down the disputed data.</p>
          </div>
        </div>
      )}
    </div>
  );
}
