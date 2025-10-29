export default function Showcase() {
  const examples = [
    {
      title: "Portrait Enhancement",
      description: "Transform portraits with professional lighting and effects",
    },
    {
      title: "Scene Transformation",
      description: "Change backgrounds and environments seamlessly",
    },
    {
      title: "Style Transfer",
      description: "Apply artistic styles to your images",
    },
  ]

  return (
    <section id="showcase" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 text-balance">Case Studies</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {examples.map((example, idx) => (
            <div
              key={idx}
              className="bg-background rounded-lg overflow-hidden border border-border hover:border-primary transition"
            >
              <div className="bg-gradient-to-br from-primary/20 to-primary/5 h-48 flex items-center justify-center">
                <span className="text-6xl">🍌</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{example.title}</h3>
                <p className="text-muted-foreground">{example.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
