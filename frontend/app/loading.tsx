export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Cargando contenido"
      className="flex min-h-[60vh] flex-1 flex-col items-center justify-center px-6 py-20"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-[#f2685d]" />
        <p className="font-coralbold text-xs uppercase tracking-[0.2em] text-zinc-400">
          Cargando...
        </p>
      </div>
    </div>
  );
}
