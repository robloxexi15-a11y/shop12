interface Props {
  t: Record<string, string>
  onAccept: () => void
  onDecline: () => void
}

export default function CookieBanner({ t, onAccept, onDecline }: Props) {
  return (
    <div style={{
      position: 'fixed',
      bottom: '70px',
      left: '12px',
      right: '12px',
      background: 'var(--cookie-bg)',
      borderRadius: '14px',
      padding: '14px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
      zIndex: 100,
      border: '1px solid var(--border)'
    }}>
      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
        {t.cookieText}
      </p>
      <div style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={onDecline}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '10px',
            background: 'transparent',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border)',
            fontSize: '14px'
          }}
        >
          {t.decline}
        </button>
        <button
          onClick={onAccept}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '10px',
            background: 'var(--accent)',
            color: '#fff',
            fontSize: '14px',
            fontWeight: 600
          }}
        >
          {t.accept}
        </button>
      </div>
    </div>
  )
}
