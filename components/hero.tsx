export default function Hero() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center">
        <div className="inline-block mb-6 px-4 py-2 bg-secondary rounded-full">
          <span className="text-sm font-medium text-foreground">🍌 The AI model that outperforms Flux Context</span>
        </div>

        <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-balance">
          <span className="text-primary">Nano Banana</span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-balance">
          Transform any image with simple text prompts. Nano-banana's advanced model delivers consistent character
          editing and scene preservation that surpasses Flux Context. Experience the future of AI image editing.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold hover:opacity-90 transition">
            Start Editing
          </button>
          <button className="border-2 border-primary text-primary px-8 py-3 rounded-full font-semibold hover:bg-secondary transition">
            View Examples
          </button>
        </div>

        <div className="mt-16 flex justify-center gap-8 text-center">
          <div>
            <div className="text-2xl font-bold text-primary">⚡</div>
            <p className="text-sm text-muted-foreground mt-2">One-shot editing</p>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">🎨</div>
            <p className="text-sm text-muted-foreground mt-2">Multi-image support</p>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">💬</div>
            <p className="text-sm text-muted-foreground mt-2">Natural language</p>
          </div>
        </div>
      </div>
    </section>
  )
}
