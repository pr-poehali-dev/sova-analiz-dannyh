import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./HighlightedText"

const philosophyItems = [
  {
    title: "Рецепты из Грузии",
    description:
      "Готовим по традиционным рецептам, которые передаются из поколения в поколение. Настоящий вкус Кавказа без компромиссов.",
  },
  {
    title: "Свежие продукты каждый день",
    description:
      "Отбираем лучшие мясо, сыр сулугуни и специи. Тесто раскатываем вручную, а хачапури пекут прямо перед доставкой.",
  },
  {
    title: "Быстрая доставка",
    description:
      "Привозим горячие блюда за 60 минут в термосумках. Хинкали и хачапури доедут к вам такими же, как из печи.",
  },
  {
    title: "Гостеприимство во всём",
    description: "В Грузии стол — это праздник. Мы дарим это тепло каждому заказу, чтобы вы почувствовали себя дорогим гостем.",
  },
]

export function Philosophy() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.3 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column - Title and image */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">О нас</p>
            <h2 className="text-6xl md:text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
              Готовим с
              <br />
              <HighlightedText>душой</HighlightedText>
            </h2>

            <div className="relative hidden lg:block rounded-2xl overflow-hidden">
              <img
                src="https://cdn.poehali.dev/projects/47a0ae00-32ee-4a16-b0cf-b82a746af67f/files/471bd447-7a47-4a3f-93a1-15c09e4c6116.jpg"
                alt="Интерьер грузинского ресторана"
                className="opacity-95 relative z-10 w-auto"
              />
            </div>
          </div>

          {/* Right column - Description and Philosophy items */}
          <div className="space-y-6 lg:pt-48">
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md mb-12">
              Грузинская кухня — это больше, чем еда. Это тепло дома, щедрость застолья и любовь к гостям. Мы привозим этот вкус прямо к вашему столу.
            </p>

            {philosophyItems.map((item, index) => (
              <div
                key={item.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-6">
                  <span className="text-muted-foreground/50 text-sm font-medium">0{index + 1}</span>
                  <div>
                    <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}