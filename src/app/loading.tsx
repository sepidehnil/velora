export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-charcoal border-t-transparent" />
        <p className="text-xs font-medium uppercase tracking-widest text-stone">
          Loading
        </p>
      </div>
    </div>
  );
}
