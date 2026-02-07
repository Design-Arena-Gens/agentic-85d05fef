import { NextRequest, NextResponse } from 'next/server'

interface TelegramMessage {
  message_id: number
  from: {
    id: number
    first_name: string
    username?: string
  }
  chat: {
    id: number
    type: string
  }
  text?: string
  date: number
}

interface TelegramUpdate {
  update_id: number
  message?: TelegramMessage
}

async function sendMessage(chatId: number, text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  if (!token) {
    console.error('TELEGRAM_BOT_TOKEN not set')
    return
  }

  const url = `https://api.telegram.org/bot${token}/sendMessage`

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown',
      }),
    })

    if (!response.ok) {
      console.error('Failed to send message:', await response.text())
    }
  } catch (error) {
    console.error('Error sending message:', error)
  }
}

async function handleMessage(message: TelegramMessage) {
  const chatId = message.chat.id
  const text = message.text || ''

  if (text.startsWith('/start')) {
    await sendMessage(
      chatId,
      `👋 Welcome to the Telegram Hosting Bot!\n\nI'm running on Vercel and ready to assist you.\n\nUse /help to see available commands.`
    )
  } else if (text.startsWith('/help')) {
    await sendMessage(
      chatId,
      `📚 *Available Commands:*\n\n` +
      `/start - Start the bot\n` +
      `/help - Show this help message\n` +
      `/info - Get bot information\n\n` +
      `You can also send me any message and I'll echo it back!`
    )
  } else if (text.startsWith('/info')) {
    await sendMessage(
      chatId,
      `ℹ️ *Bot Information:*\n\n` +
      `🤖 Name: Telegram Hosting Bot\n` +
      `☁️ Hosted on: Vercel\n` +
      `⚡ Type: Serverless\n` +
      `🔗 Webhook: Active\n\n` +
      `This bot is deployed using Next.js and processes messages via webhooks.`
    )
  } else if (text) {
    await sendMessage(
      chatId,
      `You said: "${text}"\n\n✨ Echo mode active!`
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as TelegramUpdate

    if (body.message) {
      await handleMessage(body.message)
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json({ ok: false, error: 'Internal error' }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    status: 'active',
    message: 'Telegram bot webhook is running',
    timestamp: new Date().toISOString()
  })
}
