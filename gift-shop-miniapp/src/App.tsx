import { useState, useEffect } from 'react'
import { translations } from './i18n/translations'
import type { Lang, Tab, Product, UserInfo } from './types'
import Catalog from './pages/Catalog'
import ProductPage from './pages/ProductPage'
import AiTab from './pages/AiTab'
import AdminPanel from './pages/AdminPanel'
import CookieBanner from './components/CookieBanner'
import BottomNav from './components/BottomNav'

// ========== НАСТРОЙКИ ==========
const ADMIN_USERNAME = 'disndidbe'
// ==============================

const DEMO_PRODUCTS: Product[] = [
  {
    id: '1',
    name: { ru: 'Подарочный набор Premium', en: 'Premium Gift Set' },
    description: {
      ru: 'Элегантный набор для особенного случая. Включает всё необходимое для идеального подарка.',
      en: 'Elegant set for a special occasion. Includes everything needed for the perfect gift.'
    },
    photos: ['https://via.placeholder.com/400x400/7c6bff/ffffff?text=Gift+1'],
    priceStars: 150,
    priceTon: 2.5,
    stock: 5,
    category: 'sets'
  },
  {
    id: '2',
    name: { ru: 'Стильный аксессуар', en: 'Stylish Accessory' },
    description: {
      ru: 'Уникальный аксессуар ручной работы. Отличный выбор для себя или в подарок.',
      en: 'Unique handmade accessory. Great choice for yourself or as a gift.'
    },
    photos: ['https://via.placeholder.com/400x400/4ade80/ffffff?text=Gift+2'],
    priceStars: 80,
    priceTon: 1.2,
    stock: 12,
    category: 'accessories'
  },
  {
    id: '3',
    name: { ru: 'Коллекционная вещь', en: 'Collectible Item' },
    description: {
      ru: 'Редкая коллекционная позиция. Количество ограничено.',
      en: 'Rare collectible item. Limited quantity.'
    },
    photos: ['https://via.placeholder.com/400x400/f59e0b/ffffff?text=Gift+3'],
    priceStars: 300,
    priceTon: 5.0,
    stock: 2,
    category: 'collectibles'
  },
  {
    id: '4',
    name: { ru: 'Минималистичный подарок', en: 'Minimalist Gift' },
    description: {
      ru: 'Простой и стильный подарок для тех, кто ценит минимализм.',
      en: 'Simple and stylish gift for those who appreciate minimalism.'
    },
    photos: ['https://via.placeholder.com/400x400/ec4899/ffffff?text=Gift+4'],
    priceStars: 50,
    priceTon: 0.8,
    stock: 20,
    category: 'minimal'
  }
]

declare global {
  interface Window {
    Telegram?: { WebApp: any }
  }
}

export default function App() {
  const [lang, setLang] = useState<Lang>('ru')
  const [tab, setTab] = useState<Tab>('catalog')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [products, setProducts] = useState<Product[]>(DEMO_PRODUCTS)
  const [user, setUser] = useState<UserInfo | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [cookieAccepted, setCookieAccepted] = useState<boolean | null>(null)

  const t = translations[lang]

  useEffect(() => {
    const tg = window.Telegram?.WebApp
    if (tg) {
      tg.ready()
      tg.expand()
      tg.setHeaderColor('#1e1e24')
      tg.setBackgroundColor('#1e1e24')

      const unsafe = tg.initDataUnsafe
      if (unsafe?.user) {
        setUser(unsafe.user)
        if (unsafe.user.username === ADMIN_USERNAME) {
          setIsAdmin(true)
        }
      }
      if (unsafe?.user?.language_code?.startsWith('en')) {
        setLang('en')
      }
    }

    const saved = localStorage.getItem('cookie_accepted')
    if (saved !== null) {
      setCookieAccepted(saved === 'true')
    }
  }, [])

  const handleCookieAccept = () => {
    setCookieAccepted(true)
    localStorage.setItem('cookie_accepted', 'true')
    const tg = window.Telegram?.WebApp
    const data = {
      user,
      platform: tg?.platform || 'unknown',
      acceptedAt: new Date().toISOString()
    }
    console.log('Cookie accepted → send to @disndidbe:', data)
    // TODO: fetch('/api/cookie-accept', { method: 'POST', body: JSON.stringify(data) })
  }

  const handleCookieDecline = () => {
    setCookieAccepted(false)
    localStorage.setItem('cookie_accepted', 'false')
  }

  const openBuy = () => {
    const tg = window.Telegram?.WebApp
    if (tg) {
      tg.openTelegramLink('https://t.me/disndidbe')
    } else {
      window.open('https://t.me/disndidbe', '_blank')
    }
  }

  if (selectedProduct) {
    return (
      <ProductPage
        product={selectedProduct}
        lang={lang}
        t={t}
        onBack={() => setSelectedProduct(null)}
        onBuy={openBuy}
      />
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <header style={{
        padding: '16px 16px 12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid var(--border)'
      }}>
        <h1 style={{ fontSize: '18px', fontWeight: 600 }}>Gift Shop</h1>
        <button
          onClick={() => setLang(lang === 'ru' ? 'en' : 'ru')}
          style={{
            background: 'var(--bg-card)',
            color: 'var(--text)',
            padding: '6px 12px',
            borderRadius: '8px',
            fontSize: '13px'
          }}
        >
          {lang === 'ru' ? 'EN' : 'RU'}
        </button>
      </header>

      <main style={{ flex: 1, overflowY: 'auto', paddingBottom: '80px' }}>
        {tab === 'catalog' && (
          <Catalog products={products} lang={lang} t={t} onSelect={setSelectedProduct} />
        )}
        {tab === 'ai' && <AiTab lang={lang} t={t} />}
        {tab === 'admin' && (
          isAdmin ? (
            <AdminPanel products={products} setProducts={setProducts} lang={lang} t={t} />
          ) : (
            <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-secondary)' }}>
              {t.onlyAdmin}
            </div>
          )
        )}
      </main>

      <BottomNav tab={tab} setTab={setTab} t={t} isAdmin={isAdmin} />

      {cookieAccepted === null && (
        <CookieBanner t={t} onAccept={handleCookieAccept} onDecline={handleCookieDecline} />
      )}
    </div>
  )
}
