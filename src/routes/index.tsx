import { createFileRoute } from "@tanstack/react-router";
import CrustBrosSite from "@/components/site/CrustBros";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Crust Bros — Wood-Fired Pizzas, Burgers & Broast in Jahanian" },
      { name: "description", content: "Crust Bros Jahanian — wood-fired pizzas, juicy burgers, broast, deals & free delivery. Order now, open 10 AM – 2 AM daily." },
      { property: "og:title", content: "Crust Bros — Jahanian's Favourite Food Stop" },
      { property: "og:description", content: "Pizzas, burgers, broast and unbeatable deals. Free delivery. Open 10 AM – 2 AM." },
    ],
  }),
  component: () => <CrustBrosSite />,
});
