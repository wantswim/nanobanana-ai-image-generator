export default function Features() {
  const features = [
    {
      icon: "⚡",
      title: "One-shot Editing",
      description: "Transform your images with a single prompt. No complex workflows needed.",
    },
    {
      icon: "🎨",
      title: "Multi-image Support",
      description: "Process multiple images at once with batch processing capabilities.",
    },
    {
      icon: "💬",
      title: "Natural Language",
      description: "Describe what you want in plain English. Our AI understands your vision.",
    },
    {
      icon: "🎯",
      title: "Precise Control",
      description: "Fine-tune every detail with advanced editing parameters.",
    },
    {
      icon: "⚙️",
      title: "Smart Models",
      description: "Choose from multiple AI models optimized for different tasks.",
    },
    {
      icon: "🚀",
      title: "Lightning Fast",
      description: "Get results in seconds, not minutes. Optimized for speed.",
    },
  ]

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-balance">Powerful Features</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-background p-6 rounded-lg border border-border hover:border-primary transition"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
