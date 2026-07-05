import { useState, useEffect, useRef } from "react"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "Хачапури по-аджарски",
    category: "Выпечка",
    location: "Сулугуни, яйцо, масло",
    year: "590 ₽",
    image: "https://cdn.poehali.dev/projects/47a0ae00-32ee-4a16-b0cf-b82a746af67f/files/5f0616f3-0125-47a6-926d-73645a354a10.jpg",
  },
  {
    id: 2,
    title: "Хинкали с мясом",
    category: "Горячее · 5 шт",
    location: "Говядина, свинина, специи",
    year: "450 ₽",
    image: "https://cdn.poehali.dev/projects/47a0ae00-32ee-4a16-b0cf-b82a746af67f/files/2fc52af3-43cf-4ae0-b325-8da997db4991.jpg",
  },
  {
    id: 3,
    title: "Шашлык из свинины",
    category: "Мангал",
    location: "С овощами и гранатом",
    year: "620 ₽",
    image: "https://cdn.poehali.dev/projects/47a0ae00-32ee-4a16-b0cf-b82a746af67f/files/95558dfb-a5da-4ea2-b5fd-34264d8debd7.jpg",
  },
  {
    id: 4,
    title: "Лобио с зеленью",
    category: "Закуски",
    location: "Фасоль, кинза, специи",
    year: "320 ₽",
    image: "https://cdn.poehali.dev/projects/47a0ae00-32ee-4a16-b0cf-b82a746af67f/files/87ecf04e-17b6-43fe-8700-739ad73665e2.jpg",
  },
]

export function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [revealedImages, setRevealedImages] = useState<Set<number>>(new Set())
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = imageRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) {
              setRevealedImages((prev) => new Set(prev).add(projects[index].id))
            }
          }
        })
      },
      { threshold: 0.2 },
    )

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="py-32 md:py-29 bg-secondary/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Хиты меню</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">Наше меню</h2>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            Всё меню — 30 блюд
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div ref={(el) => (imageRefs.current[index] = el)} className="relative overflow-hidden aspect-[4/3] mb-6">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredId === project.id ? "scale-105" : "scale-100"
                  }`}
                />
                <div
                  className="absolute inset-0 bg-primary origin-top"
                  style={{
                    transform: revealedImages.has(project.id) ? "scaleY(0)" : "scaleY(1)",
                    transition: "transform 1.5s cubic-bezier(0.76, 0, 0.24, 1)",
                  }}
                />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-medium mb-2 group-hover:underline underline-offset-4">{project.title}</h3>
                  <p className="text-muted-foreground text-sm">
                    {project.category} · {project.location}
                  </p>
                </div>
                <span className="text-lg font-medium text-primary whitespace-nowrap">{project.year}</span>
              </div>

              <a
                href="#contact"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 bg-primary text-primary-foreground px-5 py-3 text-sm tracking-wide hover:bg-primary/90 transition-colors duration-300"
              >
                В корзину
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}