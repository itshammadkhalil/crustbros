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
  // Open 10:00 to 02:00 (next day)
  const h = d.getHours() + d.getMinutes() / 60;
  return h >= 10 || h < 2;
}
