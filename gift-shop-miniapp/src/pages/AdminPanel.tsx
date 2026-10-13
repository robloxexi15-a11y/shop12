import { useState } from 'react'
import type { Product, Lang } from '../types'

interface Props {
  products: Product[]
  setProducts: (p: Product[]) => void
  lang: Lang
  t: Record<string, string>
}

const emptyForm = {
  nameRu: '',
  nameEn: '',
  descRu: '',
  descEn: '',
  priceStars: '',
  priceTon: '',
  stock: '',
  category: '',
  photo: ''
}

export default function AdminPanel({ products, setProducts, lang, t }: Props) {
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [editId, setEditId] = useState<string | null>(null)

  const openAdd = () => {
    setForm(emptyForm)
    setEditId(null)
    setShowForm(true)
  }

  const openEdit = (p: Product) => {
    setForm({
      nameRu: p.name.ru,
      nameEn: p.name.en,
      descRu: p.description.ru,
      descEn: p.description.en,
      priceStars: String(p.priceStars),
      priceTon: String(p.priceTon),
      stock: String(p.stock),
      category: p.category,
      photo: p.photos[0] || ''
    })
    setEditId(p.id)
    setShowForm(true)
  }

  const save = () => {
    const product: Product = {
      id: editId || String(Date.now()),
      name: { ru: form.nameRu || 'Без названия', en: form.nameEn || 'Untitled' },
      description: { ru: form.descRu, en: form.descEn },
      photos: form.photo ? [form.photo] : ['https://via.placeholder.com/400'],
      priceStars: Number(form.priceStars) || 0,
      priceTon: Number(form.priceTon) || 0,
      stock: Number(form.stock) || 0,
      category: form.category || 'other'
    }

    if (editId) {
      setProducts(products.map(p => p.id === editId ? product : p))
    } else {
      setProducts([...products, product])
    }
    setShowForm(false)
  }

  const remove = (id: string) => {
    if (confirm('Удалить товар?')) {
      setProducts(products.filter(p => p.id !== id))
    }
  }

  if (showForm) {
    return (
      <div style={{ padding: '16px' }}>
        <h2 style={{ marginBottom: '16px' }}>{editId ? t.editProduct : t.addProduct}</h2>
        
        {(['nameRu', 'nameEn', 'descRu', 'descEn', 'priceStars', 'priceTon', 'stock', 'category', 'photo'] as const).map(key => (
          <div key={key} style={{ marginBottom: '12px' }}>
            <label style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
              {key}
            </label>
            <input
              value={form[key]}
              onChange={e => setForm({ ...form, [key]: e.target.value })}
              style={{
                width: '100%',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                padding: '10px 12px',
                color: 'var(--text)',
                fontSize: '14px'
              }}
            />
          </div>
        ))}

        <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
          <button
            onClick={() => setShowForm(false)}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '10px',
              background: 'var(--bg-card)',
              color: 'var(--text)'
            }}
          >
            {t.cancel}
          </button>
          <button
            onClick={save}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '10px',
              background: 'var(--accent)',
              color: '#fff',
              fontWeight: 600
            }}
          >
            {t.save}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ padding: '16px' }}>
      <button
        onClick={openAdd}
        style={{
          width: '100%',
          padding: '14px',
          borderRadius: '12px',
          background: 'var(--accent)',
          color: '#fff',
          fontWeight: 600,
          marginBottom: '16px'
        }}
      >
        + {t.addProduct}
      </button>

      {products.map(p => (
        <div
          key={p.id}
          style={{
            background: 'var(--bg-card)',
            borderRadius: '12px',
            padding: '12px',
            marginBottom: '10px',
            display: 'flex',
            gap: '12px',
            alignItems: 'center'
          }}
        >
          <img
            src={p.photos[0]}
            alt=""
            style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }}
          />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 600, fontSize: '14px' }}>{p.name[lang]}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              ★{p.priceStars} · {p.priceTon} TON · stock: {p.stock}
            </div>
          </div>
          <button
            onClick={() => openEdit(p)}
            style={{ background: 'transparent', color: 'var(--accent)', fontSize: '13px' }}
          >
            ✎
          </button>
          <button
            onClick={() => remove(p.id)}
            style={{ background: 'transparent', color: '#f87171', fontSize: '13px' }}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}
