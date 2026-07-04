import { useEffect, useMemo, useState } from "react";
import {
  ShoppingCart, Menu as MenuIcon, X, Plus, Minus, Trash2, Snowflake,
  Sparkles, Leaf, Clock, MapPin, Flame, Shield, ChefHat, Moon,
  Star, Search, Facebook, Instagram, Phone,
} from "lucide-react";
import logo from "@/assets/logo.png";
import hero from "@/assets/hero.jpg";
import { CartProvider, useCart, isOpenNow, type CartLine } from "@/lib/cart";
import { MENU, CATEGORIES, DEAL_FILTERS, type MenuItem } from "@/data/menu";
import { cn } from "@/lib/utils";

const WA_NUMBER = "923276003399";
const FB_URL = "https://www.facebook.com/crustbrosjahanian/";

// ============== NAV ==============
function Navbar({ onCart }: { onCart: () => void }) {
  const { count } = useCart();
  const [mobile, setMobile] = useState(false);
  const links = [
    ["Home", "#home"], ["Menu", "#menu"],
    ["About", "#about"], ["Reviews", "#reviews"], ["Contact", "#contact"],
  ];
  return (
    <header className="sticky top-0 z-40 w-full bg-[var(--charcoal-deep)]/95 backdrop-blur border-b border-white/5">
      <div className="mx-auto max-w-7xl px-4 md:px-6 flex items-center justify-between h-16 md:h-20">
        <a href="#home" className="flex items-center gap-2 md:gap-3">
          <img src={logo} alt="Crust Bros" className="h-11 w-11 md:h-14 md:w-14 object-contain drop-shadow" />
          <span className="font-display text-xl md:text-2xl text-[var(--cream)] tracking-wide">Crust Bros</span>
        </a>
        <nav className="hidden lg:flex items-center gap-7">
          {links.map(([l, h]) => (
            <a key={h} href={h} className="text-sm font-medium text-[var(--cream)]/85 hover:text-[var(--brand-yellow)] transition-colors">{l}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={onCart} aria-label="Cart" className="relative h-10 w-10 grid place-items-center rounded-full bg-[var(--brand-yellow)] text-[var(--charcoal-deep)] hover:scale-105 transition">
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-[var(--brand-red)] text-white text-[11px] font-bold grid place-items-center">{count}</span>
            )}
          </button>
          <button onClick={() => setMobile(!mobile)} aria-label="Menu" className="lg:hidden h-10 w-10 grid place-items-center rounded-full bg-white/10 text-[var(--cream)]">
            {mobile ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {mobile && (
        <div className="lg:hidden border-t border-white/10 bg-[var(--charcoal-deep)]">
          <div className="px-4 py-3 flex flex-col">
            {links.map(([l, h]) => (
              <a key={h} href={h} onClick={() => setMobile(false)} className="py-3 text-[var(--cream)]/90 border-b border-white/5 hover:text-[var(--brand-yellow)]">{l}</a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

// ============== HERO ==============
function Hero({ onClosedClick }: { onClosedClick: () => void }) {
  const [open, setOpen] = useState(isOpenNow());
  useEffect(() => {
    const t = setInterval(() => setOpen(isOpenNow()), 60_000);
    return () => clearInterval(t);
  }, []);
  return (
    <section id="home" className="relative isolate min-h-[88vh] flex items-center bg-[var(--charcoal-deep)] overflow-hidden">
      <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-65" width={1920} height={1280} />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--charcoal-deep)] via-[var(--charcoal-deep)]/85 to-[var(--charcoal-deep)]/20" />
      <div className="relative mx-auto max-w-7xl w-full px-5 md:px-8 py-20 md:py-28">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/10 text-xs md:text-sm text-[var(--cream)]">
            <span className={cn("h-2 w-2 rounded-full", open ? "bg-emerald-400 animate-pulse" : "bg-red-500")} />
            {open ? "Open Now" : "Closed"}
          </span>
          <h1 className="mt-5 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] text-white">
            Crust <span className="text-gradient-brand">Bros</span>
          </h1>
          <p className="mt-5 text-base md:text-lg text-[var(--cream)]/85 max-w-xl">
            Wood-fired pizzas, juicy burgers, sizzling broast and the deals everyone in Jahanian is talking about. Made fresh, delivered hot.
          </p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            <a href="#menu" className="inline-flex items-center justify-center min-h-[40px] px-4 py-2 rounded-full bg-[var(--brand-yellow)] text-[var(--charcoal-deep)] text-[13px] font-semibold hover:brightness-110 transition shadow-lg shadow-yellow-500/20">
              View Menu
            </a>
            <button
              type="button"
              onClick={() => {
                if (!isOpenNow()) {
                  onClosedClick();
                  return;
                }
                window.open(
                  "https://wa.me/923276003399?text=Hi%20Crust%20Bros!%20I%27d%20like%20to%20place%20an%20order%20%F0%9F%8D%95",
                  "_blank",
                  "noopener,noreferrer"
                );
              }}
              className="inline-flex items-center justify-center min-h-[40px] px-4 py-2 rounded-full border border-[var(--cream)]/40 text-[var(--cream)] text-[13px] font-semibold hover:bg-white/10 transition"
            >
              💬 WhatsApp Us
            </button>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              [Snowflake, "Air Condition Hall"],
              [Sparkles, "Hygienic Kitchen"],
              [Leaf, "Fresh Food"],
            ].map(([Icon, label], i) => {
              const I = Icon as typeof Snowflake;
              return (
                <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[var(--cream)] text-xs md:text-sm">
                  <span className="h-7 w-7 grid place-items-center rounded-full bg-[var(--brand-yellow)]/20 text-[var(--brand-yellow)]">
                    <I className="h-3.5 w-3.5" />
                  </span>
                  {label as string}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============== MENU CARD ==============
function ItemCard({ item, onAdd }: { item: MenuItem; onAdd: (item: MenuItem) => void }) {
  const startPrice = item.sizes[0]?.price ?? 0;
  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--muted)]">
        <img src={item.image} alt={item.name} loading="lazy" className="h-full w-full object-cover group-hover:scale-105 transition duration-500" />
        {item.type && (
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[var(--charcoal-deep)]/85 text-[10px] uppercase tracking-wider text-[var(--brand-yellow)] font-semibold">{item.type}</span>
        )}
        {item.dealGroup && (
          <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[var(--brand-red)]/95 text-[10px] uppercase tracking-wider text-white font-semibold">{item.dealGroup}</span>
        )}
      </div>
      <div className="p-3 md:p-4 flex flex-col gap-2 flex-1">
        <h3 className="text-sm md:text-base font-semibold leading-snug text-[var(--charcoal)] line-clamp-2">{item.name}</h3>
        {item.description && (
          <p className="text-xs text-[var(--muted-foreground)] leading-relaxed flex-1">{item.description}</p>
        )}
        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <div className="text-sm md:text-base font-bold text-[var(--brand-red)]">
            {startPrice > 0 ? (<>From <span className="text-[var(--charcoal)]">Rs {startPrice}</span></>) : <span className="text-[var(--muted-foreground)] text-xs">Ask price</span>}
          </div>
          <button onClick={() => onAdd(item)} className="px-3 py-1.5 rounded-full bg-[var(--charcoal-deep)] text-[var(--brand-yellow)] text-xs font-semibold hover:bg-[var(--brand-yellow)] hover:text-[var(--charcoal-deep)] transition">
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

// ============== ADD POPUP ==============
function AddPopup({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  const { add } = useCart();
  const [sizeIdx, setSizeIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const size = item.sizes[sizeIdx];
  const total = size.price * qty;
  const submit = () => {
    add({ itemId: item.id, name: item.name, size: size.size, price: size.price, qty, image: item.image });
    onClose();
  };
  return (
    <div className="fixed inset-0 z-[60] flex items-end md:items-center justify-center bg-black/60 p-0 md:p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="relative w-full md:max-w-md bg-white rounded-t-3xl md:rounded-3xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-8 duration-300">
        <button onClick={onClose} aria-label="Close" className="absolute top-3 right-3 z-10 h-9 w-9 grid place-items-center rounded-full bg-black/60 text-white hover:bg-black">
          <X className="h-4 w-4" />
        </button>
        <div className="md:hidden h-1.5 w-12 rounded-full bg-black/20 mx-auto mt-2" />
        <div className="aspect-[16/10] overflow-hidden bg-[var(--muted)]">
          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
        </div>
        <div className="p-5 space-y-4">
          {item.type && <span className="inline-block px-2 py-0.5 rounded-full bg-[var(--charcoal-deep)] text-[10px] uppercase tracking-wider text-[var(--brand-yellow)] font-semibold">{item.type}</span>}
          <h3 className="text-xl font-bold text-[var(--charcoal)]">{item.name}</h3>
          {item.description && <p className="text-sm text-[var(--muted-foreground)]">{item.description}</p>}
          {item.sizes.length > 1 && (
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-2">Choose Size</div>
              <div className="grid grid-cols-2 gap-2">
                {item.sizes.map((s, i) => (
                  <button key={s.size} onClick={() => setSizeIdx(i)} className={cn(
                    "px-3 py-2.5 rounded-xl border text-sm font-medium flex items-center justify-between transition",
                    i === sizeIdx ? "border-[var(--brand-yellow)] bg-[var(--brand-yellow)]/15 text-[var(--charcoal)]" : "border-black/10 text-[var(--charcoal)] hover:border-[var(--brand-yellow)]"
                  )}>
                    <span>{s.size}</span>
                    <span className="font-bold">Rs {s.price}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-[var(--charcoal)]">Quantity</span>
            <div className="flex items-center gap-3 bg-[var(--muted)] rounded-full p-1">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="h-8 w-8 grid place-items-center rounded-full bg-white"><Minus className="h-3.5 w-3.5" /></button>
              <span className="w-6 text-center font-bold">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="h-8 w-8 grid place-items-center rounded-full bg-white"><Plus className="h-3.5 w-3.5" /></button>
            </div>
          </div>
          <button onClick={submit} className="w-full py-3 rounded-full bg-[var(--brand-yellow)] text-[var(--charcoal-deep)] font-bold hover:brightness-110 transition">
            Add to Cart — Rs {total}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============== MENU SECTION ==============
function MenuSection({ onAdd }: { onAdd: (i: MenuItem) => void }) {
  const [cat, setCat] = useState<string>("Pizza");
  const [dealFilter, setDealFilter] = useState<string>("All");
  const [q, setQ] = useState("");

  const items = useMemo(() => {
    let list = MENU.filter((m) => m.category === cat);
    if (cat === "Deals" && dealFilter !== "All") list = list.filter((m) => m.dealGroup === dealFilter);
    if (q.trim()) {
      const s = q.toLowerCase();
      list = MENU.filter((m) => m.name.toLowerCase().includes(s) || (m.description?.toLowerCase().includes(s)));
    }
    return list;
  }, [cat, dealFilter, q]);

  return (
    <section id="menu" className="relative py-16 md:py-24 bg-[var(--cream)]">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
          <span className="text-xs font-bold tracking-[0.3em] text-[var(--brand-red)]">OUR MENU</span>
          <h2 className="mt-2 font-display text-4xl md:text-6xl text-[var(--charcoal)]">
            Made <span className="text-gradient-brand">Fresh,</span> Served Hot
          </h2>
        </div>

        <div className="max-w-md mx-auto mb-6 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
          <input
            value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Search any item…"
            className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-black/10 text-sm focus:outline-none focus:border-[var(--brand-yellow)]"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {CATEGORIES.map((c) => (
            <button key={c} onClick={() => { setCat(c); setQ(""); }} className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition border",
              cat === c && !q
                ? "bg-[var(--charcoal-deep)] text-[var(--brand-yellow)] border-[var(--charcoal-deep)]"
                : "bg-white text-[var(--charcoal)] border-black/10 hover:border-[var(--brand-yellow)]"
            )}>{c}</button>
          ))}
        </div>

        {cat === "Deals" && !q && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {DEAL_FILTERS.map((d) => (
              <button key={d} onClick={() => setDealFilter(d)} className={cn(
                "px-3 py-1.5 rounded-full text-xs font-semibold border transition",
                dealFilter === d ? "bg-[var(--brand-red)] text-white border-[var(--brand-red)]" : "bg-white text-[var(--charcoal)] border-black/10"
              )}>{d}</button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5 auto-rows-fr">
          {items.map((it) => <ItemCard key={it.id} item={it} onAdd={onAdd} />)}
        </div>
        {items.length === 0 && (
          <p className="text-center text-[var(--muted-foreground)] py-12">No items found.</p>
        )}
      </div>
    </section>
  );
}


// ============== ABOUT ==============
function About() {
  const quality = [
    [Leaf, "Natural Ingredients"],
    [Flame, "Fresh, Never Frozen"],
    [Shield, "Zero Preservatives"],
    [ChefHat, "Made Fresh to Order"],
  ] as const;
  const detail = [
    [Clock, "Opening Hours", "10:00 AM to 02:00 AM"],
    [Snowflake, "Indoor Dining", "Air Conditioned Hall"],
    [MapPin, "Delivery", "Free within 3km · Outside city available"],
    [MapPin, "Branch", "Loha Bazar, Jahanian"],
  ] as const;
  return (
    <section id="about" className="py-16 md:py-24 bg-[var(--cream)]">
      <div className="mx-auto max-w-7xl px-4 md:px-6 grid lg:grid-cols-2 gap-12 items-start">
        <div>
          <span className="text-xs font-bold tracking-[0.3em] text-[var(--brand-red)]">OUR STORY</span>
          <h2 className="mt-2 font-display text-4xl md:text-6xl text-[var(--charcoal)]">
            Cooked with Love,<br />
            <span className="text-gradient-brand">Served with Pride</span>
          </h2>
          <p className="mt-5 text-[var(--charcoal)]/80 leading-relaxed">
            Crust Bros began with a simple promise: feed Jahanian the way we'd feed our own family — fresh, generous, and made with genuine care. Every pizza, burger, and broast that leaves our kitchen carries that same promise, whether you're dining in our air-conditioned hall or welcoming us to your doorstep.
          </p>
          <p className="mt-4 text-[var(--charcoal)]/80 leading-relaxed">
            No shortcuts, no compromises — just real ingredients, cooked to order, the same way since day one. From our wood-fired pizzas to the signature Crust Bros burger, every dish is made fresh because that's the only way we know how to cook.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            {quality.map(([Icon, label]) => (
              <div key={label} className="flex items-center gap-3 p-3 rounded-xl bg-white border border-black/5">
                <span className="h-9 w-9 grid place-items-center rounded-full bg-[var(--brand-yellow)]/20 text-[var(--brand-red)]"><Icon className="h-4 w-4" /></span>
                <span className="text-sm font-semibold text-[var(--charcoal)]">{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 lg:gap-4 lg:mt-16">
          {detail.map(([Icon, label, val]) => (
            <div key={label} className="p-4 md:p-5 rounded-2xl bg-[var(--charcoal-deep)] text-[var(--cream)] border border-white/5">
              <span className="h-9 w-9 grid place-items-center rounded-full bg-[var(--brand-yellow)]/20 text-[var(--brand-yellow)]"><Icon className="h-4 w-4" /></span>
              <div className="mt-3 text-[11px] uppercase tracking-wider text-[var(--cream)]/60">{label}</div>
              <div className="mt-1 text-sm font-semibold leading-snug">{val}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============== REVIEWS ==============
type Review = { name: string; rating: number; comment: string };
const SEED_REVIEWS: Review[] = [
  { name: "Ahmed K.", rating: 5, comment: "The Lazania pizza is unreal. Best in Jahanian, hands down." },
  { name: "Sara M.", rating: 5, comment: "Free delivery + hot food = repeat customer. Their broast is legendary." },
  { name: "Bilal R.", rating: 4, comment: "Pizza Burger combo deal is fantastic value. Service is quick." },
  { name: "Fatima A.", rating: 5, comment: "Air-conditioned hall is clean and the family deal fed all six of us!" },
];
function Reviews() {
  const [list, setList] = useState<Review[]>(SEED_REVIEWS);
  const [form, setForm] = useState<Review>({ name: "", rating: 5, comment: "" });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.comment.trim()) return;
    setList([{ ...form }, ...list]);
    setForm({ name: "", rating: 5, comment: "" });
  };
  return (
    <section id="reviews" className="py-16 md:py-24 bg-[var(--cream)]">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-[0.3em] text-[var(--brand-red)]">REVIEWS</span>
          <h2 className="mt-2 font-display text-4xl md:text-6xl text-[var(--charcoal)]">What People <span className="text-gradient-brand">Say</span></h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {list.map((r, i) => (
            <div key={i} className="p-5 rounded-2xl bg-white border border-black/5 shadow-sm">
              <div className="flex gap-0.5 text-[var(--brand-yellow)] mb-3">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className={cn("h-4 w-4", j < r.rating ? "fill-current" : "opacity-30")} />
                ))}
              </div>
              <p className="text-sm text-[var(--charcoal)]/85 leading-relaxed">"{r.comment}"</p>
              <p className="mt-3 text-sm font-semibold text-[var(--charcoal)]">— {r.name}</p>
            </div>
          ))}
        </div>
        <form onSubmit={submit} className="mt-10 max-w-2xl mx-auto p-6 rounded-2xl bg-white border border-black/5 shadow-sm space-y-4">
          <h3 className="font-display text-2xl text-[var(--charcoal)]">Leave a Review</h3>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="w-full px-4 py-2.5 rounded-lg border border-black/10 text-sm focus:outline-none focus:border-[var(--brand-yellow)]" />
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[var(--charcoal)]">Rating:</span>
            {[1, 2, 3, 4, 5].map((n) => (
              <button type="button" key={n} onClick={() => setForm({ ...form, rating: n })}>
                <Star className={cn("h-6 w-6", n <= form.rating ? "fill-[var(--brand-yellow)] text-[var(--brand-yellow)]" : "text-black/20")} />
              </button>
            ))}
          </div>
          <textarea value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} rows={3} placeholder="Tell us about your meal…" className="w-full px-4 py-2.5 rounded-lg border border-black/10 text-sm focus:outline-none focus:border-[var(--brand-yellow)]" />
          <button className="px-5 py-2.5 rounded-full bg-[var(--brand-yellow)] text-[var(--charcoal-deep)] font-bold text-sm hover:brightness-110">Submit Review</button>
        </form>
      </div>
    </section>
  );
}

// ============== FOOTER ==============
function Footer() {
  return (
    <footer id="contact" className="bg-[var(--charcoal-deep)] text-[var(--cream)] pt-14 pb-6">
      <div className="mx-auto max-w-7xl px-4 md:px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2">
            <img src={logo} alt="Crust Bros" className="h-12 w-12 object-contain" />
            <span className="font-display text-2xl">Crust Bros</span>
          </div>
          <p className="mt-3 text-sm text-[var(--cream)]/70">Where Every Bite Tells a Story</p>
          <div className="mt-4 flex gap-2">
            <a href={FB_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="h-9 w-9 grid place-items-center rounded-full bg-white/10 hover:bg-[var(--brand-yellow)] hover:text-[var(--charcoal-deep)] transition"><Facebook className="h-4 w-4" /></a>
            <a href="#" aria-label="Instagram" className="h-9 w-9 grid place-items-center rounded-full bg-white/10 hover:bg-[var(--brand-yellow)] hover:text-[var(--charcoal-deep)] transition"><Instagram className="h-4 w-4" /></a>
          </div>
        </div>
        <div>
          <h4 className="font-display text-lg mb-3 text-[var(--brand-yellow)]">Quick Links</h4>
          <ul className="space-y-2 text-sm text-[var(--cream)]/80">
            {[["Menu","#menu"],["Deals","#deals"],["About","#about"],["Reviews","#reviews"]].map(([l,h]) => (
              <li key={h}><a href={h} className="hover:text-[var(--brand-yellow)]">{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg mb-3 text-[var(--brand-yellow)]">Contact</h4>
          <ul className="space-y-2 text-sm text-[var(--cream)]/80">
            <li className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /><a href="tel:03276003399" className="hover:text-[var(--brand-yellow)]">0327-6003399</a></li>
            <li className="flex items-center gap-2"><Phone className="h-3.5 w-3.5" /><a href="tel:03286003399" className="hover:text-[var(--brand-yellow)]">0328-6003399</a></li>
            <li className="flex items-center gap-2"><Clock className="h-3.5 w-3.5" />10:00 AM to 02:00 AM</li>
            <li className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" />Loha Bazar, Jahanian</li>
          </ul>
        </div>
        <div>
          <h4 className="font-display text-lg mb-3 text-[var(--brand-yellow)]">Delivery</h4>
          <p className="text-sm text-[var(--cream)]/80">Free delivery</p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 md:px-6 mt-10 pt-5 border-t border-white/10 text-xs text-[var(--cream)]/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <p>© 2026 Crust Bros. All rights reserved.</p>
        <p>Made by <a href="https://novastackltd.com" target="_blank" rel="noopener noreferrer" className="text-[var(--brand-yellow)] hover:underline font-semibold">NovaStack</a></p>
      </div>
    </footer>
  );
}

// ============== CART DRAWER ==============
function CartDrawer({ onCheckout }: { onCheckout: () => void }) {
  const { lines, open, setOpen, setQty, remove, subtotal } = useCart();
  if (!open) return null;
  const delivery = subtotal > 0 && subtotal < 600 ? 50 : 0;
  return (
    <div className="fixed inset-0 z-[55] flex justify-end bg-black/60" onClick={() => setOpen(false)}>
      <aside onClick={(e) => e.stopPropagation()} className="w-full max-w-md h-full bg-white flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
        <div className="p-5 border-b flex items-center justify-between bg-[var(--charcoal-deep)] text-[var(--cream)]">
          <h3 className="font-display text-2xl">Your Cart</h3>
          <button onClick={() => setOpen(false)} className="h-9 w-9 grid place-items-center rounded-full bg-white/10"><X className="h-4 w-4" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {lines.length === 0 && (
            <div className="text-center py-16 text-[var(--muted-foreground)]">
              <ShoppingCart className="h-10 w-10 mx-auto mb-3 opacity-40" />
              <p>Your cart is empty.</p>
            </div>
          )}
          {lines.map((l: CartLine) => (
            <div key={l.key} className="flex gap-3 p-2 rounded-xl border border-black/5 bg-[var(--cream)]">
              <img src={l.image} alt="" className="h-16 w-16 rounded-lg object-cover" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-[var(--charcoal)] leading-tight">{l.name}</div>
                <div className="text-xs text-[var(--muted-foreground)]">{l.size} · Rs {l.price}</div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 bg-white rounded-full p-1 border border-black/10">
                    <button onClick={() => setQty(l.key, l.qty - 1)} className="h-6 w-6 grid place-items-center"><Minus className="h-3 w-3" /></button>
                    <span className="text-sm font-bold w-5 text-center">{l.qty}</span>
                    <button onClick={() => setQty(l.key, l.qty + 1)} className="h-6 w-6 grid place-items-center"><Plus className="h-3 w-3" /></button>
                  </div>
                  <button onClick={() => remove(l.key)} className="text-[var(--brand-red)]"><Trash2 className="h-4 w-4" /></button>
                </div>
              </div>
              <div className="text-sm font-bold text-[var(--charcoal)]">Rs {l.price * l.qty}</div>
            </div>
          ))}
        </div>
        {lines.length > 0 && (
          <div className="p-5 border-t bg-white space-y-2">
            <div className="flex justify-between text-sm"><span>Subtotal</span><span className="font-semibold">Rs {subtotal}</span></div>
            <div className="flex justify-between text-sm"><span>Delivery</span><span className="font-semibold">{delivery === 0 ? "Free" : `Rs ${delivery}`}</span></div>
            <div className="flex justify-between text-base font-bold pt-2 border-t"><span>Total</span><span className="text-[var(--brand-red)]">Rs {subtotal + delivery}</span></div>
            <button onClick={onCheckout} className="mt-3 w-full py-3 rounded-full bg-[var(--brand-yellow)] text-[var(--charcoal-deep)] font-bold hover:brightness-110">Proceed to Checkout</button>
          </div>
        )}
      </aside>
    </div>
  );
}

// ============== CLOSED POPUP ==============
function ClosedPopup({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-black/70 p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="max-w-sm w-full bg-white rounded-3xl p-6 text-center shadow-2xl animate-in zoom-in-95">
        <span className="mx-auto h-14 w-14 grid place-items-center rounded-full bg-[var(--charcoal-deep)] text-[var(--brand-yellow)]"><Moon className="h-7 w-7" /></span>
        <h3 className="mt-4 font-display text-2xl text-[var(--charcoal)]">We've Closed for the Night 🌙</h3>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">Aw, you just missed us! Our kitchen is resting right now, but we're already excited to make your food fresh when we open again at 10:00 AM. Your cart is safe — we'll be right here waiting for you. 💛</p>
        <button onClick={onClose} className="mt-5 w-full py-2.5 rounded-full bg-[var(--brand-yellow)] text-[var(--charcoal-deep)] font-bold">Okay, I'll Come Back</button>
      </div>
    </div>
  );
}

// ============== CHECKOUT ==============
type OrderType = "Home Delivery" | "Take Away" | "Dine-in";
function Checkout({ onClose }: { onClose: () => void }) {
  const { lines, subtotal, clear, setOpen } = useCart();
  const [type, setType] = useState<OrderType>("Home Delivery");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [addr, setAddr] = useState("");
  const [notes, setNotes] = useState("");
  const [done, setDone] = useState(false);

  const delivery = type === "Home Delivery" ? (subtotal >= 600 ? 0 : 50) : 0;
  const total = subtotal + delivery;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    if (type === "Home Delivery" && !addr.trim()) return;
    const lineItems = lines
      .map((l, i) => `${i + 1}. ${l.name}${l.size && l.size !== "Regular" ? ` (${l.size})` : ""} x${l.qty} — Rs. ${l.price * l.qty}`)
      .join("\n");
    const deliveryLine =
      type === "Home Delivery"
        ? `Delivery: Rs. ${delivery === 0 ? "0 (Free)" : delivery}`
        : `Delivery: N/A (${type})`;
    const msg =
`🍕 *NEW ORDER - CRUST BROS* 🍕

━━━━━━━━━━━━━━━━━━━

👤 *Customer Details*

Name: ${name}

Phone: ${phone}
${type === "Home Delivery" ? `\nAddress: ${addr}\n` : `\nOrder Type: ${type}\n`}${notes.trim() ? `\nNotes: ${notes}\n` : ""}
🛒 *Order Items*

${lineItems}

━━━━━━━━━━━━━━━━━━━

💰 *Bill Summary*

Subtotal: Rs. ${subtotal}

${deliveryLine}

*Total: Rs. ${total}*

━━━━━━━━━━━━━━━━━━━

🙏 Thank you for choosing Crust Bros!

We'll confirm your order shortly. 🔥`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    setDone(true);
    setTimeout(() => {
      clear();
      setOpen(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-[65] grid place-items-end md:place-items-center bg-black/70 p-0 md:p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="w-full md:max-w-lg bg-white rounded-t-3xl md:rounded-3xl max-h-[92vh] overflow-y-auto shadow-2xl">
        <div className="p-5 border-b flex items-center justify-between sticky top-0 bg-white">
          <h3 className="font-display text-2xl text-[var(--charcoal)]">Checkout</h3>
          <button onClick={onClose} className="h-9 w-9 grid place-items-center rounded-full bg-black/5"><X className="h-4 w-4" /></button>
        </div>
        {done ? (
          <div className="p-10 text-center">
            <div className="mx-auto h-14 w-14 grid place-items-center rounded-full bg-emerald-500 text-white">✓</div>
            <h4 className="mt-4 font-display text-2xl text-[var(--charcoal)]">Order Sent!</h4>
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">We've opened WhatsApp with your order. We'll confirm shortly.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="p-5 space-y-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] mb-2">Order Type</div>
              <div className="grid grid-cols-3 gap-2">
                {(["Home Delivery","Take Away","Dine-in"] as OrderType[]).map((t) => (
                  <button type="button" key={t} onClick={() => setType(t)} className={cn(
                    "px-2 py-2 rounded-xl text-xs font-semibold border",
                    type === t ? "bg-[var(--charcoal-deep)] text-[var(--brand-yellow)] border-[var(--charcoal-deep)]" : "bg-white text-[var(--charcoal)] border-black/10"
                  )}>{t}</button>
                ))}
              </div>
            </div>
            <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className="w-full px-4 py-2.5 rounded-lg border border-black/10 text-sm focus:outline-none focus:border-[var(--brand-yellow)]" />
            <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" className="w-full px-4 py-2.5 rounded-lg border border-black/10 text-sm focus:outline-none focus:border-[var(--brand-yellow)]" />
            {type === "Home Delivery" && (
              <textarea required value={addr} onChange={(e) => setAddr(e.target.value)} rows={2} placeholder="Delivery Address" className="w-full px-4 py-2.5 rounded-lg border border-black/10 text-sm focus:outline-none focus:border-[var(--brand-yellow)]" />
            )}
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={2} placeholder="Order Notes (optional)" className="w-full px-4 py-2.5 rounded-lg border border-black/10 text-sm focus:outline-none focus:border-[var(--brand-yellow)]" />
            <div className="p-4 rounded-xl bg-[var(--cream)] space-y-1 text-sm">
              <div className="flex justify-between"><span>Subtotal</span><span className="font-semibold">Rs {subtotal}</span></div>
              {type === "Home Delivery" && (
                <div className="flex justify-between"><span>Delivery</span><span className="font-semibold">{delivery === 0 ? "Free" : `Rs ${delivery}`}</span></div>
              )}
              <div className="flex justify-between pt-1 border-t text-base font-bold"><span>Total</span><span className="text-[var(--brand-red)]">Rs {total}</span></div>
            </div>
            <button type="submit" className="w-full py-3 rounded-full bg-[var(--brand-yellow)] text-[var(--charcoal-deep)] font-bold hover:brightness-110">Place Order via WhatsApp</button>
          </form>
        )}
      </div>
    </div>
  );
}

// ============== ROOT ==============
function Inner() {
  const { setOpen, add } = useCart();
  const [adding, setAdding] = useState<MenuItem | null>(null);
  const [closedOpen, setClosedOpen] = useState(false);
  const [checkout, setCheckout] = useState(false);

  const handleAdd = (item: MenuItem) => {
    if (item.sizes.length > 1) {
      setAdding(item);
    } else {
      const s = item.sizes[0];
      add({ itemId: item.id, name: item.name, size: s.size, price: s.price, qty: 1, image: item.image });
    }
  };

  const handleCheckout = () => {
    if (!isOpenNow()) { setClosedOpen(true); return; }
    setCheckout(true);
  };

  return (
    <div className="min-h-screen">
      <Navbar onCart={() => setOpen(true)} />
      <Hero onClosedClick={() => setClosedOpen(true)} />
      <MenuSection onAdd={handleAdd} />
      
      <About />
      <Reviews />
      <Footer />
      <CartDrawer onCheckout={handleCheckout} />
      {adding && <AddPopup item={adding} onClose={() => setAdding(null)} />}
      {closedOpen && <ClosedPopup onClose={() => setClosedOpen(false)} />}
      {checkout && <Checkout onClose={() => setCheckout(false)} />}
    </div>
  );
}

export default function CrustBrosSite() {
  return (
    <CartProvider>
      <Inner />
    </CartProvider>
  );
}
