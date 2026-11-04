import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import bodyHtml from "../portfolio/body.html?raw";

const TITLE = "Gajjala Sandeep | Web Developer Portfolio";
const DESC =
  "Professional portfolio of Gajjala Sandeep, a web developer and B.Tech student showcasing web development experience, projects, education and certificates.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: "/portfolio.css" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.1 },
    );
    els.forEach((el) => io.observe(el));

    const btn = document.querySelector<HTMLButtonElement>('[aria-controls="mobile-navigation"]');
    const header = document.querySelector(".site-header");
    const onMenu = () => {
      let nav = document.getElementById("mobile-navigation");
      if (nav) {
        nav.remove();
        btn?.setAttribute("aria-expanded", "false");
        return;
      }
      nav = document.createElement("nav");
      nav.id = "mobile-navigation";
      nav.className = "container-site flex flex-col gap-3 pb-5 lg:hidden";
      document.querySelectorAll(".site-header nav a").forEach((a) => {
        const c = a.cloneNode(true) as HTMLAnchorElement;
        c.addEventListener("click", () => onMenu());
        nav!.appendChild(c);
      });
      header?.appendChild(nav);
      btn?.setAttribute("aria-expanded", "true");
    };
    btn?.addEventListener("click", onMenu);
    return () => {
      io.disconnect();
      btn?.removeEventListener("click", onMenu);
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />;
}
