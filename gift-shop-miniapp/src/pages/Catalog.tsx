import type { Product, Lang } from '../types'

interface Props {
  products: Product[]
  lang: Lang
  t: Record<string, string>
  onSelect: (p: Product) => void
}

export default function Catalog({ products, lang, t, onSelect }: Props) {
  if (products.length === 0) {
    return (
      <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-secondary)' }}>
        {t.noProducts}
      </div>
    )
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px',
      padding: '16px'
    }}>
      {products.map(product => (
        <div
          key={product.id}
          onClick={() => onSelect(product)}
          style={{
            background: 'var(--bg-card)',
            borderRadius: '16px',
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'transform 0.15s, background 0.15s',
          }}
          onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
          onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
          onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
        >
          <div style={{
            aspectRatio: '1',
            background: '#333',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <img
              src={product.photos[0] || 'https://via.placeholder.com/400'}
              alt={product.name[lang]}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
          <div style={{ padding: '10px 12px 12px' }}>
            <div style={{
              fontSize: '13px',
              fontWeight: 600,
              marginBottom: '2px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {product.name[lang]}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
              #{product.id}
            </div>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <div style={{
                flex: 1,
                background: 'var(--bg)',
                borderRadius: '8px',
                padding: '6px 8px',
                fontSize: '12px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <span style={{ color: 'var(--accent)' }}>★</span>
                {product.priceStars}
              </div>
              <div style={{
                background: 'var(--bg)',
                borderRadius: '8px',
                padding: '6px 8px',
                fontSize: '14px'
              }}>
                🛒
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
