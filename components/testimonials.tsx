export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Professional Photographer",
      content: "Nano Banana has revolutionized my editing workflow. The AI understands my vision perfectly.",
      avatar: "👩‍💼",
    },
    {
      name: "Marcus Johnson",
      role: "Content Creator",
      content: "The quality is incredible. I can create stunning visuals in minutes instead of hours.",
      avatar: "👨‍💼",
    },
    {
      name: "Emma Rodriguez",
      role: "Designer",
      content: "Finally, an AI tool that actually delivers on its promises. Highly recommended!",
      avatar: "👩‍🎨",
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12 text-balance">What Users Say</h2>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, idx) => (
          <div key={idx} className="bg-secondary border border-border rounded-lg p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl">{testimonial.avatar}</div>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
            <p className="text-foreground italic">"{testimonial.content}"</p>
          </div>
        ))}
      </div>
    </section>
  )
}
