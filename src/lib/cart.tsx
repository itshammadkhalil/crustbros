import { createContext, useContext, useState, type ReactNode } from "react";

export type CartLine = {
  key: string;
  itemId: string;
  name: string;
  size: string;
  price: number;
  qty: number;
  image: string;
};

type Ctx = {
  lines: CartLine[];
  add: (l: Omit<CartLine, "key">) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
  count: number;
  subtotal: number;
};

const CartCtx = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

  const add: Ctx["add"] = (l) => {
    const key = `${l.itemId}__${l.size}`;
    setLines((cur) => {
      const i = cur.findIndex((x) => x.key === key);
      if (i >= 0) {
        const next = [...cur];
        next[i] = { ...next[i], qty: next[i].qty + l.qty };
        return next;
      }
      return [...cur, { ...l, key }];
    });
  };
  const remove = (key: string) => setLines((c) => c.filter((x) => x.key !== key));
  const setQty = (key: string, qty: number) =>
    setLines((c) => c.map((x) => (x.key === key ? { ...x, qty: Math.max(1, qty) } : x)));
  const clear = () => setLines([]);
  const count = lines.reduce((s, l) => s + l.qty, 0);
  const subtotal = lines.reduce((s, l) => s + l.qty * l.price, 0);

  return (
    <CartCtx.Provider value={{ lines, add, remove, setQty, clear, open, setOpen, count, subtotal }}>
      {children}
    </CartCtx.Provider>
  );
}

export function useCart() {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart outside provider");
  return c;
}

export function isOpenNow(d = new Date()) {
  // Convert to Pakistan Standard Time (Asia/Karachi, UTC+5) so status is
  // accurate regardless of the visitor's local timezone.
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Karachi",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  }).formatToParts(d);
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  const h = (hour % 24) + minute / 60;
  // Open 10:00 to 02:00 (next day)
  return h >= 10 || h < 2;
}
