import type { Tab } from '../types'

interface Props {
  tab: Tab
  setTab: (t: Tab) => void
  t: Record<string, string>
  isAdmin: boolean
}

export default function BottomNav({ tab, setTab, t, isAdmin }: Props) {
  const items: { key: Tab; label: string }[] = [
    { key: 'catalog', label: t.catalog },
    { key: 'ai', label: t.ai },
  ]
  if (isAdmin) {
    items.push({ key: 'admin', label: t.admin })
  }

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'var(--bg-card)',
      borderTop: '1px solid var(--border)',
      display: 'flex',
      padding: '8px 0 calc(8px + env(safe-area-inset-bottom))',
      zIndex: 50
    }}>
      {items.map(item => (
        <button
          key={item.key}
          onClick={() => setTab(item.key)}
          style={{
            flex: 1,
            background: 'transparent',
            color: tab === item.key ? 'var(--accent)' : 'var(--text-secondary)',
            fontSize: '12px',
            fontWeight: tab === item.key ? 600 : 400,
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <span style={{ fontSize: '20px' }}>
            {item.key === 'catalog' ? '🎁' : item.key === 'ai' ? '🤖' : '⚙️'}
          </span>
          {item.label}
        </button>
      ))}
    </nav>
  )
}
