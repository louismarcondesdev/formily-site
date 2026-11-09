import { TopBar } from "./TopBar";
import { SiteNavbar } from "./SiteNavbar";

/** Cabeçalho das páginas internas: o mesmo da home (barra superior + navbar com o logo oficial). */
export function Header() {
  return (
    <>
      <TopBar />
      <SiteNavbar />
    </>
  );
}
