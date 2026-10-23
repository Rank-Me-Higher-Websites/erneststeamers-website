import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppProviders, AppRoutes } from "./App";
import { getSeo, renderSeoHead } from "./seo";

export function render(url: string) {
  const seo = getSeo(url);
  const html = renderToString(
    <AppProviders>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </AppProviders>,
  );
  return { html, head: renderSeoHead(seo) };
}
