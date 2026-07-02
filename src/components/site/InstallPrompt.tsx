import { useEffect, useState } from "react";
import { onInstallAvailability, promptInstall } from "@/lib/pwa";
import { Button } from "@/components/ui/button";
import { X, Download } from "lucide-react";

const DISMISS_KEY = "cb_install_dismissed_at";
const DISMISS_DAYS = 7;

export function InstallPrompt() {
  const [available, setAvailable] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const unsub = onInstallAvailability(setAvailable);
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    if (!available) {
      setVisible(false);
      return;
    }
    try {
      const raw = localStorage.getItem(DISMISS_KEY);
      if (raw) {
        const ts = Number(raw);
        if (Date.now() - ts < DISMISS_DAYS * 864e5) return;
      }
    } catch {}
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, [available]);

  if (!visible) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {}
    setVisible(false);
  };

  const install = async () => {
    const outcome = await promptInstall();
    if (outcome !== "unavailable") setVisible(false);
  };

  return (
    <div className="fixed bottom-4 left-1/2 z-[80] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-white/10 bg-neutral-900/95 p-4 shadow-2xl backdrop-blur">
      <div className="flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow-400/15 text-yellow-400">
          <Download className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-white">Install Crust Bros</p>
          <p className="mt-0.5 text-xs text-neutral-400">
            Add our app to your home screen for quick ordering, even offline.
          </p>
          <div className="mt-3 flex gap-2">
            <Button size="sm" onClick={install} className="bg-yellow-400 text-neutral-900 hover:bg-yellow-300">
              Install
            </Button>
            <Button size="sm" variant="ghost" onClick={dismiss} className="text-neutral-300 hover:text-white">
              Not now
            </Button>
          </div>
        </div>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="rounded-md p-1 text-neutral-500 hover:bg-white/5 hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
