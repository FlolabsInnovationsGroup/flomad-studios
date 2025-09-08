'use client';

export default function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating glass orbs with pure CSS animations */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-primary rounded-full blur-3xl opacity-20 animate-float" />
      <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-secondary rounded-full blur-3xl opacity-30 animate-float [animation-delay:2s]" />
      <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-gradient-accent rounded-full blur-3xl opacity-15 animate-float [animation-delay:4s]" />
      <div className="absolute top-1/2 right-20 w-28 h-28 bg-gradient-primary rounded-full blur-3xl opacity-25 animate-float [animation-delay:1s]" />
      <div className="absolute bottom-40 right-1/4 w-36 h-36 bg-gradient-secondary rounded-full blur-3xl opacity-20 animate-float [animation-delay:3s]" />
      <div className="absolute top-32 left-1/2 w-20 h-20 bg-gradient-accent rounded-full blur-3xl opacity-35 animate-float [animation-delay:5s]" />
    </div>
  );
}
