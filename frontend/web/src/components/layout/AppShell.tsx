import type { PropsWithChildren } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { MobileNav } from "./MobileNav";

export function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-slate-950 pb-24 lg:pb-0">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 min-w-0">
          <Topbar />
          <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
        </div>
      </div>
      <MobileNav />
    </div>
  );
}
