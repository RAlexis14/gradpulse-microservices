import clsx from "clsx";
import type { PropsWithChildren } from "react";

export function Card({ className, children }: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={clsx("rounded-2xl bg-slate-900/60 border border-slate-800 shadow-soft", className)}>
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="p-5 border-b border-slate-800">
      <div className="text-lg font-semibold">{title}</div>
      {subtitle ? <div className="text-sm text-slate-400 mt-1">{subtitle}</div> : null}
    </div>
  );
}

export function CardBody({ className, children }: PropsWithChildren<{ className?: string }>) {
  return <div className={clsx("p-5", className)}>{children}</div>;
}

export function Badge({ variant, label }: { variant: "success" | "warn" | "danger" | "neutral"; label: string }) {
  const styles: Record<string, string> = {
    success: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    warn: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    danger: "bg-rose-500/15 text-rose-300 border-rose-500/30",
    neutral: "bg-slate-500/15 text-slate-300 border-slate-500/30"
  };

  return (
    <span className={clsx("inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs", styles[variant])}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {label}
    </span>
  );
}

export function Button(
  props: PropsWithChildren<{
    onClick?: () => void;
    type?: "button" | "submit";
    disabled?: boolean;
    className?: string;
  }>
) {
  const { children, className, ...rest } = props;
  return (
    <button
      {...rest}
      className={clsx(
        "px-4 py-2 rounded-xl bg-slate-100 text-slate-900 font-medium hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition",
        className
      )}
    >
      {children}
    </button>
  );
}

export function Input(props: {
  label: string;
  type?: string;
  value: string | number;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <div className="text-xs text-slate-400 mb-1">{props.label}</div>
      <input
        type={props.type ?? "text"}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={props.placeholder}
        className="w-full rounded-xl bg-slate-950/40 border border-slate-800 px-3 py-2 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500/40"
      />
    </label>
  );
}

export function Select(props: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  options: Array<{ value: string | number; label: string }>;
}) {
  return (
    <label className="block">
      <div className="text-xs text-slate-400 mb-1">{props.label}</div>
      <select
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        className="w-full rounded-xl bg-slate-950/40 border border-slate-800 px-3 py-2 text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-500/40"
      >
        {props.options.map((o) => (
          <option key={String(o.value)} value={o.value} className="bg-slate-950">
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export function Spinner({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 text-slate-300">
      <div className="h-4 w-4 rounded-full border-2 border-slate-600 border-t-transparent animate-spin" />
      {label ? <div className="text-sm">{label}</div> : null}
    </div>
  );
}

export function Table({ children }: PropsWithChildren) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-800">
      <table className="w-full text-sm">{children}</table>
    </div>
  );
}

export function Th({ children }: PropsWithChildren) {
  return <th className="text-left px-4 py-3 bg-slate-900/60 text-slate-300 font-medium">{children}</th>;
}

export function Td({ children }: PropsWithChildren) {
  return <td className="px-4 py-3 border-t border-slate-800 text-slate-200">{children}</td>;
}
