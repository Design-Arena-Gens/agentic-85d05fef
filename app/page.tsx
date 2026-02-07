export default function Home() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '20px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        maxWidth: '600px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          marginBottom: '20px',
          color: '#333',
          textAlign: 'center'
        }}>
          🤖 Telegram Hosting Bot
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: '#666',
          lineHeight: '1.6',
          marginBottom: '20px'
        }}>
          This is a Telegram bot hosting service. The bot is running and ready to receive messages!
        </p>

        <div style={{
          background: '#f5f5f5',
          padding: '20px',
          borderRadius: '10px',
          marginTop: '30px'
        }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '15px', color: '#333' }}>
            Features:
          </h2>
          <ul style={{ color: '#666', lineHeight: '1.8' }}>
            <li>✅ Webhook-based message handling</li>
            <li>✅ /start command support</li>
            <li>✅ /help command support</li>
            <li>✅ /info command support</li>
            <li>✅ Echo messages back to users</li>
            <li>✅ Serverless deployment ready</li>
          </ul>
        </div>

        <div style={{
          marginTop: '30px',
          padding: '15px',
          background: '#e3f2fd',
          borderRadius: '10px',
          borderLeft: '4px solid #2196f3'
        }}>
          <p style={{ margin: 0, color: '#1976d2' }}>
            <strong>Status:</strong> Bot webhook is active and listening for messages
          </p>
        </div>
      </div>
    </div>
  )
}
