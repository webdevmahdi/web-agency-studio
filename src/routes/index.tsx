import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import capturedCSS from "../styles/site.css?raw";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Web Agency Template | Webild" },
    { name: "description", content: "Webild's web agency template preview for digital design and development." },
    { property: "og:title", content: "Web Agency Template | Webild" },
    { property: "og:description", content: "Webild's web agency template preview for digital design and development." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  staticData: { importedDocument: { html: { "lang": "en" }, body: { "className": "inter_tight_79f009b9-module__4loMJa__className \x61ntialiased \x66lex \x68-dvh \x6dd:\x68-screen \x6fverflow-hidden" } } },
  component: Index,
});

function Index() {
  const [showCookies, setShowCookies] = useState(true);
  return (
    <>
      <style>{capturedCSS}</style>
      <div hidden />
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        <div />
        <section aria-label="Notifications alt+T" tabIndex={-1} aria-live="polite" aria-relevant="additions text" aria-atomic="false" />
        {showCookies && <div className={"\x66ixed! flex flex-col z-100 gap-4 p-5 bottom-5 right-5 md:left-auto md:right-5 w-75 md:w-25 card \x72ounded transition-all duration-300 opacity-100 \x74ranslate-y-0"}>
          <div className="flex flex-col gap-2">
            <h3 className="text-base font-medium text-black leading-snug">Cookie preferences</h3>
            <p className="text-sm text-black leading-snug">We use cookies to analyze how you use our site and improve your experience. <a className="underline" href="/cookies">Learn more about our cookie policy</a></p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={() => setShowCookies(false)} className={"button text-sm font-medium \x6futline-none \x66ocus:\x6futline-none \x66ocus-visible:\x6futline-none transition-all duration-200 button-secondary"} type="button">Decline</button>
            <button onClick={() => setShowCookies(false)} className={"button text-sm font-medium \x6futline-none \x66ocus:\x6futline-none \x66ocus-visible:\x6futline-none transition-all duration-200 button-accent"} type="button">Accept</button>
          </div>
        </div>}
        <div className="flex-1 min-h-0 overflow-y-auto" id="signed-out-content">
          <div className="w-full h-screen relative bg-background">
            <div className="absolute inset-0 flex items-center justify-center bg-background transition-opacity duration-300 z-10 opacity-0 pointer-events-none">
              <div className="aspect-square w-50 md:w-20 opacity-100">
                <div className="" style={{ width: "100%", height: "100%" }}>
                  <picture style={{ display: "contents" }}>
                    <source media="(max-width: 767px)" srcSet="data:image/webp;base64,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" />
                    <img style={{ verticalAlign: "top", width: "307px", height: "307px" }} width="307" height="307" data-site-import-responsive="23" src="data:image/webp;base64,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" data-site-import-static-fallback="canvas" alt="" />
                  </picture>
                </div>
              </div>
            </div>
            <img className={"absolute inset-0 w-full h-full \x62order-0"} style={{ width: "1536px", maxWidth: "100%", height: "auto" }} alt="Web Agency preview" src="/site-assets/19d4895814203058.png" data-site-import-static-fallback="video" />
          </div>
        </div>
      </div>
      <div id="clerk-components" />
    </>
  );
}
