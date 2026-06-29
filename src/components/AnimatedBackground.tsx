/**
 * Lightweight, GPU-friendly hero backdrop: a warm gradient mesh with a few
 * blurred floating "mango" orbs and a faint dot grid. Pure CSS animation so it
 * stays smooth on mobile and is fully disabled under prefers-reduced-motion.
 */
export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* base wash */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_-10%,#FFF6EE_0%,#F4ECE2_45%,#E7DDCF_100%)]" />

      {/* floating colour orbs */}
      <div className="absolute -left-24 top-10 h-80 w-80 animate-floatSlow rounded-full bg-mango-400/30 blur-3xl" />
      <div className="absolute right-[-6rem] top-24 h-96 w-96 animate-float rounded-full bg-mango-500/20 blur-3xl" />
      <div className="absolute bottom-[-4rem] left-1/3 h-72 w-72 animate-floatSlow rounded-full bg-leaf-400/20 blur-3xl [animation-delay:-3s]" />

      {/* dotted texture */}
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(120,98,70,0.10) 1px, transparent 0)',
          backgroundSize: '26px 26px',
          maskImage: 'radial-gradient(110% 80% at 50% 0%, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(110% 80% at 50% 0%, black 30%, transparent 75%)',
        }}
      />

      {/* soft horizon glow */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-sand-300 to-transparent" />
    </div>
  )
}
