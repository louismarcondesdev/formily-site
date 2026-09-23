"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const SPRING = { type: "spring", stiffness: 200, damping: 50 } as const;
const INSTANT = { duration: 0 } as const;

type WithVisible = { visible?: boolean };

export const Navbar = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => setVisible(latest > 40));

  return (
    <div className={cn("sticky inset-x-0 top-0 z-40 w-full px-3 pb-2 pt-2 sm:px-4", className)}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child as React.ReactElement<WithVisible>, { visible })
          : child,
      )}
    </div>
  );
};

export const NavBody = ({
  children,
  className,
  visible,
}: {
  children: React.ReactNode;
  className?: string;
} & WithVisible) => {
  const reduce = useReducedMotion();
  // Altura 76px no topo; ao rolar reduz 8px (68px) e o fundo/sombra ficam levemente mais firmes.
  return (
    <motion.div
      animate={{ height: visible ? 68 : 76 }}
      transition={reduce ? INSTANT : SPRING}
      className={cn(
        "site-header relative z-[60] mx-auto hidden w-full max-w-[1200px] flex-row items-center justify-between rounded-[22px] px-5 lg:flex",
        visible && "is-sticky",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({
  items,
  className,
  onItemClick,
}: {
  items: readonly { name: string; link: string }[];
  className?: string;
  onItemClick?: () => void;
}) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navegação principal"
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "pointer-events-none absolute inset-0 hidden flex-row items-center justify-center lg:flex",
        className,
      )}
    >
      <ul className="pointer-events-auto flex items-center">
        {items.map((item, idx) => {
          // Item ativo: só links de página (sem #âncora) que correspondem à rota atual.
          const active = !item.link.includes("#") && pathname === item.link;
          return (
          <li key={item.link}>
            <Link
              href={item.link}
              aria-current={active ? "page" : undefined}
              onMouseEnter={() => setHovered(idx)}
              onFocus={() => setHovered(idx)}
              onBlur={() => setHovered(null)}
              onClick={onItemClick}
              className="relative block px-4 py-2.5 text-[0.95rem] font-semibold text-brand-950 transition-colors hover:text-fm-green-dark"
            >
              {hovered === idx && (
                <motion.span
                  layoutId="navbar-hovered"
                  className="absolute inset-0 rounded-xl bg-fm-mint-soft"
                />
              )}
              <span className="relative z-20">{item.name}</span>
              {active && <span aria-hidden="true" className="absolute inset-x-4 bottom-0.5 z-20 h-0.5 rounded-full bg-fm-green" />}
            </Link>
          </li>
          );
        })}
      </ul>
    </nav>
  );
};

export const MobileNav = ({
  children,
  className,
  visible,
}: {
  children: React.ReactNode;
  className?: string;
} & WithVisible) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      animate={{ paddingTop: visible ? 6 : 10, paddingBottom: visible ? 6 : 10 }}
      transition={reduce ? INSTANT : SPRING}
      className={cn(
        "site-header relative z-50 mx-auto flex w-full max-w-[1200px] flex-col items-center justify-between rounded-[20px] px-3 lg:hidden",
        visible && "is-sticky",
        className,
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex w-full flex-row items-center justify-between", className)}>
    {children}
  </div>
);

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}) => {
  // Escape fecha o menu (acessibilidade por teclado).
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="menu-mobile"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className={cn(
            "absolute inset-x-0 top-full z-50 mt-2 flex max-h-[calc(100dvh-6rem)] w-full flex-col items-stretch gap-1 overflow-y-auto rounded-2xl border border-fm-line bg-white px-4 py-6 shadow-lift",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
    aria-expanded={isOpen}
    aria-controls="menu-mobile"
    className="inline-flex size-11 items-center justify-center rounded-full text-fm-indigo hover:bg-fm-indigo/5"
  >
    {isOpen ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
  </button>
);

export const NavbarLogo = ({ className }: { className?: string }) => (
  <Link
    href="/"
    aria-label="Formily Farmácia de Manipulação – página inicial"
    className={cn("relative z-20 mr-4 inline-flex items-center", className)}
  >
    <Image
      src="/images/formily_logo.webp"
      alt="Formily Farmácia de Manipulação"
      width={2069}
      height={760}
      priority
      className="h-12 w-auto lg:h-14"
    />
  </Link>
);
