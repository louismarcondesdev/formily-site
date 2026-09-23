"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { nav } from "@/config/site";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavBody,
  NavItems,
  Navbar,
  NavbarLogo,
} from "@/components/ui/resizable-navbar";
import { WhatsAppButton } from "./WhatsAppButton";

const items = nav.map((item) => ({ name: item.label, link: item.href }));

export function SiteNavbar() {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);

  return (
    <Navbar>
      <NavBody>
        <NavbarLogo />
        <NavItems items={items} />
        <WhatsAppButton event="whatsapp_click_header" className="relative z-20">
          Solicitar orçamento
        </WhatsAppButton>
      </NavBody>

      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo className="mr-0" />
          <MobileNavToggle isOpen={open} onClick={() => setOpen((v) => !v)} />
        </MobileNavHeader>

        <MobileNavMenu isOpen={open} onClose={close}>
          {items.map((item) => (
            <Link
              key={item.link}
              href={item.link}
              onClick={close}
              className="block rounded-xl px-2 py-3.5 text-lg font-semibold text-fm-indigo hover:bg-fm-mint-soft"
            >
              {item.name}
            </Link>
          ))}
          <WhatsAppButton
            event="whatsapp_click_header"
            size="lg"
            className="mt-4 w-full"
            eventParams={{ placement: "mobile_menu" }}
          >
            Solicitar orçamento
          </WhatsAppButton>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
