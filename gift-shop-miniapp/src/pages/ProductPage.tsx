import { useState } from 'react'
import type { Product, Lang } from '../types'

interface Props {
  product: Product
  lang: Lang
  t: Record<string, string>
  onBack: () => void
  onBuy: () => void
}

export default function ProductPage({ product, lang, t, onBack, onBuy }: Props) {
  const [photoIndex, setPhotoIndex] = useState(0)

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        borderBottom: '1px solid var(--border)'
      }}>
        <button
          onClick={onBack}
          style={{
            background: 'var(--bg-card)',
            color: 'var(--text)',
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            fontSize: '18px'
          }}
        >
          ←
        </button>
        <span style={{ fontWeight: 600, fontSize: '16px' }}>{product.name[lang]}</span>
      </header>

      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '100px' }}>
        {/* Фото */}
        <div style={{ position: 'relative', background: '#222' }}>
          <img
            src={product.photos[photoIndex] || 'https://via.placeholder.com/400'}
            alt={product.name[lang]}
            style={{ width: '100%', aspectRatio: '1', objectFit: 'cover' }}
          />
          {product.photos.length > 1 && (
            <div style={{
              position: 'absolute',
              bottom: '12px',
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              gap: '6px'
            }}>
              {product.photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPhotoIndex(i)}
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: i === photoIndex ? 'var(--accent)' : 'rgba(255,255,255,0.4)'
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <div style={{ padding: '16px' }}>
          <h2 style={{ fontSize: '20px', marginBottom: '4px' }}>{product.name[lang]}</h2>
          <div style={{ color: 'var(--text-secondary)', fontSize: '13px', marginBottom: '16px' }}>
            #{product.id} · {product.stock > 0 ? `${t.stock}: ${product.stock}` : t.outOfStock}
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <div style={{
              flex: 1,
              background: 'var(--bg-card)',
              borderRadius: '12px',
              padding: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{t.stars}</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--accent)' }}>
                ★ {product.priceStars}
              </div>
            </div>
            <div style={{
              flex: 1,
              background: 'var(--bg-card)',
              borderRadius: '12px',
              padding: '12px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{t.ton}</div>
              <div style={{ fontSize: '18px', fontWeight: 700 }}>
                {product.priceTon} TON
              </div>
            </div>
          </div>

          <h3 style={{ fontSize: '14px', marginBottom: '8px', color: 'var(--text-secondary)' }}>
            {t.description}
          </h3>
          <p style={{ fontSize: '14px', lineHeight: 1.5, color: 'var(--text)' }}>
            {product.description[lang]}
          </p>
        </div>
      </div>

      {/* Кнопка Купить */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '12px 16px calc(12px + env(safe-area-inset-bottom))',
        background: 'var(--bg)',
        borderTop: '1px solid var(--border)'
      }}>
        <button
          onClick={onBuy}
          disabled={product.stock <= 0}
          style={{
            width: '100%',
            padding: '16px',
            borderRadius: '14px',
            background: product.stock > 0 ? 'var(--accent)' : 'var(--border)',
            color: '#fff',
            fontSize: '16px',
            fontWeight: 600,
            opacity: product.stock > 0 ? 1 : 0.5
          }}
        >
          {t.buy}
        </button>
      </div>
    </div>
  )
}
