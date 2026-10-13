import { useState, useRef, useEffect } from 'react'
import type { Lang } from '../types'

interface Props {
  lang: Lang
  t: Record<string, string>
}

interface Message {
  role: 'user' | 'assistant'
  text: string
}

// Простой локальный "ИИ" — отвечает только по теме магазина
function getReply(question: string, lang: Lang, t: Record<string, string>): string {
  const q = question.toLowerCase()

  const shopKeywords = [
    'товар', 'подарок', 'купить', 'цена', 'наличие', 'доставка', 'оплат', 'stars', 'ton',
    'product', 'gift', 'buy', 'price', 'stock', 'how', 'магазин', 'shop', 'набор', 'аксессуар'
  ]

  const isAboutShop = shopKeywords.some(k => q.includes(k))

  if (!isAboutShop) {
    return t.aiOfftopic
  }

  if (q.includes('куп') || q.includes('buy') || q.includes('как')) {
    return lang === 'ru'
      ? 'Чтобы купить товар — откройте его карточку и нажмите кнопку «Купить». Вас перенесёт в личные сообщения с продавцом @disndidbe, где можно уточнить детали и оплатить.'
      : 'To buy a product — open its card and press the «Buy» button. You will be redirected to a private chat with the seller @disndidbe to discuss details and pay.'
  }

  if (q.includes('цена') || q.includes('price') || q.includes('сколько') || q.includes('cost')) {
    return lang === 'ru'
      ? 'Цены указаны в Telegram Stars и TON прямо на карточке каждого товара. Актуальную стоимость смотрите в каталоге.'
      : 'Prices are shown in Telegram Stars and TON on each product card. Check the catalog for current prices.'
  }

  if (q.includes('налич') || q.includes('stock') || q.includes('есть')) {
    return lang === 'ru'
      ? 'Наличие отображается на карточке товара. Если товар закончился — кнопка «Купить» будет неактивна.'
      : 'Stock is shown on the product card. If an item is out of stock, the Buy button will be disabled.'
  }

  return lang === 'ru'
    ? 'Я могу рассказать о товарах, ценах, наличии и процессе покупки. Задайте более конкретный вопрос.'
    : 'I can tell you about products, prices, availability and the buying process. Please ask a more specific question.'
}

export default function AiTab({ lang, t }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: t.aiWelcome }
  ])
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Обновляем приветствие при смене языка
  useEffect(() => {
    setMessages([{ role: 'assistant', text: t.aiWelcome }])
  }, [lang])

  const send = () => {
    if (!input.trim()) return
    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: userMsg }])

    setTimeout(() => {
      const reply = getReply(userMsg, lang, t)
      setMessages(prev => [...prev, { role: 'assistant', text: reply }])
    }, 400)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 140px)' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={{
              marginBottom: '12px',
              display: 'flex',
              justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start'
            }}
          >
            <div style={{
              maxWidth: '80%',
              padding: '10px 14px',
              borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              background: m.role === 'user' ? 'var(--accent)' : 'var(--bg-card)',
              color: m.role === 'user' ? '#fff' : 'var(--text)',
              fontSize: '14px',
              lineHeight: 1.4
            }}>
              {m.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div style={{
        padding: '12px 16px',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        gap: '8px'
      }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && send()}
          placeholder={t.aiPlaceholder}
          style={{
            flex: 1,
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '12px 14px',
            color: 'var(--text)',
            fontSize: '14px',
            outline: 'none'
          }}
        />
        <button
          onClick={send}
          style={{
            background: 'var(--accent)',
            color: '#fff',
            borderRadius: '12px',
            padding: '0 16px',
            fontSize: '18px'
          }}
        >
          →
        </button>
      </div>
    </div>
  )
}
