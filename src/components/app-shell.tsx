"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  BarChart3,
  ChevronRight,
  CloudSun,
  FlaskConical,
  LayoutDashboard,
  Leaf,
  Map,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Settings,
  Sprout,
  X,
} from "lucide-react";
import { navigation, ui } from "@/lib/locale";
import type { ReactNode } from "react";
import type { Garden } from "@/types/garden";

const icons = {
  dashboard: LayoutDashboard,
  garden: Map,
  weather: CloudSun,
  analytics: BarChart3,
  settings: Settings,
};
const sidebarStorageKey = "grandma-garden-watch.sidebar-collapsed";
const sidebarChangeEvent = "grandma-garden-watch:sidebar-change";
let temporaryCollapsed = false;
let storageWriteFailed = false;

function getSidebarSnapshot(): boolean {
  if (storageWriteFailed) return temporaryCollapsed;
  try {
    return window.localStorage.getItem(sidebarStorageKey) === "true";
  } catch {
    // Navigation must remain usable when browser storage is unavailable.
    return temporaryCollapsed;
  }
}

function subscribeToSidebar(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key === sidebarStorageKey || event.key === null) onChange();
  };
  window.addEventListener("storage", onStorage);
  window.addEventListener(sidebarChangeEvent, onChange);
  return () => {
    window.removeEventListener("storage", onStorage);
    window.removeEventListener(sidebarChangeEvent, onChange);
  };
}

// The server and first hydration render always use the expanded state.
const getServerSidebarSnapshot = () => false;

export function AppShell({
  children,
  garden,
}: {
  children: ReactNode;
  garden: Garden;
}) {
  const pathname = usePathname();
  const collapsed = useSyncExternalStore(
    subscribeToSidebar,
    getSidebarSnapshot,
    getServerSidebarSnapshot,
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [tooltip, setTooltip] = useState<{ label: string; top: number } | null>(
    null,
  );
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sidebarButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const active = navigation.find((item) => item.href === pathname);

  function toggleSidebar() {
    const next = !collapsed;
    temporaryCollapsed = next;
    try {
      window.localStorage.setItem(sidebarStorageKey, String(next));
    } catch {
      // Keep the preference for this session if persistent storage is blocked.
      storageWriteFailed = true;
    }
    window.dispatchEvent(new Event(sidebarChangeEvent));
    setTooltip(null);
  }

  useEffect(() => {
    if (!menuOpen) return;
    const drawer = drawerRef.current;
    if (!drawer) return;
    const bodyOverflow = document.body.style.overflow;
    const rootOverflow = document.documentElement.style.overflow;
    const trigger = menuButtonRef.current;
    const desktopTrigger = sidebarButtonRef.current;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    // Native modal dialog keeps background content inert and traps keyboard focus.
    drawer.showModal();
    closeButtonRef.current?.focus();
    const desktop = window.matchMedia("(min-width: 768px)");
    const onViewportChange = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    desktop.addEventListener("change", onViewportChange);
    return () => {
      desktop.removeEventListener("change", onViewportChange);
      drawer.close();
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = rootOverflow;
      if (desktop.matches) desktopTrigger?.focus();
      else trigger?.focus();
    };
  }, [menuOpen]);

  function navigationLinks(mobile: boolean) {
    return navigation.map((item) => {
      const Icon = icons[item.icon];
      const iconOnly = collapsed && !mobile;
      return (
        <Link
          key={item.href}
          href={item.href}
          aria-label={item.label}
          aria-current={pathname === item.href ? "page" : undefined}
          aria-describedby={
            iconOnly && tooltip?.label === item.label
              ? "sidebar-tooltip"
              : undefined
          }
          className={`nav-link ${pathname === item.href ? "active" : ""}`}
          onClick={() => {
            setMenuOpen(false);
            setTooltip(null);
          }}
          onMouseEnter={(event) => {
            if (iconOnly) {
              const rect = event.currentTarget.getBoundingClientRect();
              setTooltip({
                label: item.label,
                top: rect.top + rect.height / 2,
              });
            }
          }}
          onFocus={(event) => {
            if (iconOnly) {
              const rect = event.currentTarget.getBoundingClientRect();
              setTooltip({
                label: item.label,
                top: rect.top + rect.height / 2,
              });
            }
          }}
          onMouseLeave={() => setTooltip(null)}
          onBlur={() => setTooltip(null)}
          onKeyDown={(event) => {
            if (event.key === "Escape") setTooltip(null);
          }}
        >
          <Icon size={20} strokeWidth={1.8} aria-hidden="true" />
          <span className="nav-label">{item.label}</span>
          {pathname === item.href && (
            <span className="nav-dot" aria-hidden="true" />
          )}
        </Link>
      );
    });
  }

  return (
    <div className={`app-shell ${collapsed ? "sidebar-collapsed" : ""}`}>
      <a className="skip-link" href="#main-content">
        ข้ามไปเนื้อหาหลัก
      </a>
      <aside
        id="desktop-sidebar"
        className="sidebar"
        aria-label="เมนูด้านข้าง"
        onScroll={() => setTooltip(null)}
      >
        <div className="sidebar-top">
          <Link className="brand" href="/" aria-label={ui.th.appName}>
            <span className="brand-icon">
              <Sprout size={26} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span className="brand-text">
              Grandma<span className="brand-secondary">Garden Watch</span>
            </span>
          </Link>
          <button
            ref={sidebarButtonRef}
            type="button"
            className="sidebar-toggle"
            onClick={toggleSidebar}
            aria-label={collapsed ? ui.th.expandSidebar : ui.th.collapseSidebar}
            aria-expanded={!collapsed}
            aria-controls="desktop-navigation"
            title={collapsed ? ui.th.expandSidebar : ui.th.collapseSidebar}
          >
            {collapsed ? (
              <PanelLeftOpen size={20} strokeWidth={1.8} aria-hidden="true" />
            ) : (
              <PanelLeftClose size={20} strokeWidth={1.8} aria-hidden="true" />
            )}
          </button>
        </div>
        <div className="sidebar-label">พื้นที่ดูแลสวน</div>
        <nav
          id="desktop-navigation"
          aria-label="เมนูหลัก"
          className="desktop-nav"
        >
          {navigationLinks(false)}
        </nav>
        <div className="sidebar-garden">
          <span className="small-icon">
            <Leaf size={20} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <div>
            <strong>{garden.name}</strong>
            <p>{garden.location}</p>
          </div>
        </div>
        <div className="sidebar-bottom">
          <div className="sidebar-note">
            <strong>ใกล้สวน แม้อยู่ไกล</strong>
            <p>
              ดูแลสวนด้วยความเข้าใจ
              <br />
              และข้อมูลที่เข้าถึงง่าย
            </p>
          </div>
          <span className="version">Frontend foundation · v0.1</span>
        </div>
      </aside>
      {collapsed && tooltip && (
        <span
          id="sidebar-tooltip"
          role="tooltip"
          className="nav-tooltip"
          style={{ top: tooltip.top }}
        >
          {tooltip.label}
        </span>
      )}
      <div className="main-shell">
        <header className="topbar">
          <div className="breadcrumb">
            <Leaf size={20} strokeWidth={1.8} aria-hidden="true" />
            <span>พื้นที่ดูแลสวน</span>
            <ChevronRight size={16} strokeWidth={1.8} aria-hidden="true" />
            <strong>{active?.label ?? ui.th.appName}</strong>
          </div>
          <div className="topbar-right">
            <span className="demo-pill">
              <FlaskConical size={16} strokeWidth={1.8} aria-hidden="true" />
              โหมดสาธิต
            </span>
            <span className="avatar" aria-hidden="true">
              ย
            </span>
            <button
              ref={menuButtonRef}
              type="button"
              className="menu-button"
              onClick={() => setMenuOpen(true)}
              aria-label={ui.th.openNavigation}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-haspopup="dialog"
            >
              <Menu size={22} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
        </header>
        <main id="main-content" className="main-content">
          <div className="demo-banner">
            <FlaskConical size={20} strokeWidth={1.8} aria-hidden="true" />
            <p>
              <strong>{ui.th.demo}</strong>
              <span>{ui.th.demoDescription}</span>
            </p>
            <span className="phase-tag">PHASE 01</span>
          </div>
          {children}
          <footer className="footer">
            <span>
              Grandma Garden Watch <span className="footer-dot">·</span>{" "}
              เติบโตไปด้วยกัน
            </span>
            <span>สร้างด้วยความใส่ใจ เพื่อสวนของคุณยาย</span>
          </footer>
        </main>
      </div>
      <dialog
        ref={drawerRef}
        id="mobile-navigation"
        className="mobile-drawer"
        aria-labelledby="drawer-title"
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const controls = event.currentTarget.querySelectorAll<
            HTMLAnchorElement | HTMLButtonElement
          >("a[href], button:not([disabled])");
          const first = controls.item(0);
          const last = controls.item(controls.length - 1);
          if (!first || !last) return;
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
          }
        }}
        onCancel={(event) => {
          event.preventDefault();
          setMenuOpen(false);
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) setMenuOpen(false);
        }}
      >
        <div className="drawer-panel">
          <div className="drawer-heading">
            <div>
              <span className="eyebrow">GRANDMA GARDEN WATCH</span>
              <h2 id="drawer-title">{ui.th.navigationTitle}</h2>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              className="drawer-close"
              onClick={() => setMenuOpen(false)}
              aria-label={ui.th.closeNavigation}
            >
              <X size={22} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </div>
          <nav className="drawer-nav" aria-label="เมนูสำหรับมือถือ">
            {navigationLinks(true)}
          </nav>
          <div className="drawer-garden">
            <strong>{garden.name}</strong>
            <p>{garden.location}</p>
            <span className="badge badge-yellow">ข้อมูลตัวอย่าง</span>
          </div>
        </div>
      </dialog>
    </div>
  );
}
