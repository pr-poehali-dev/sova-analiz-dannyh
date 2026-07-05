import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Сколько стоит доставка и как быстро привезёте?",
    answer:
      "Доставка бесплатная при заказе от 1500 ₽, в остальных случаях — 200 ₽. Привозим горячие блюда за 60 минут по городу. В термосумках еда доедет к вам такой же, как из печи.",
  },
  {
    question: "Как оплатить заказ?",
    answer:
      "Можно оплатить онлайн банковской картой прямо на сайте или наличными и картой курьеру при получении — как вам удобнее.",
  },
  {
    question: "В какие районы вы доставляете?",
    answer:
      "Мы доставляем по всему городу и ближайшим пригородам. Если сомневаетесь, попадает ли ваш адрес в зону доставки — напишите нам, и мы подскажем.",
  },
  {
    question: "Есть ли акции и промокоды?",
    answer:
      "Да! Регулярно проводим акции: скидки на комбо-наборы, бесплатные соусы и специальные предложения на праздники. Подпишитесь на наш Телеграм, чтобы не пропустить.",
  },
  {
    question: "Можно ли заказать на большую компанию или банкет?",
    answer:
      "Конечно. Мы готовим большие грузинские застолья на любое количество гостей. Свяжитесь с нами заранее — подберём меню и рассчитаем стоимость под ваш праздник.",
  },
  {
    question: "Из каких продуктов вы готовите?",
    answer:
      "Только из свежих продуктов: отборное мясо, настоящий сыр сулугуни, ароматные грузинские специи. Тесто раскатываем вручную, а блюда готовим прямо перед доставкой.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}