import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const webhookUrl = process.env.WEBHOOK_URL || 'https://agentic-85d05fef.vercel.app'

  if (!token) {
    return NextResponse.json(
      { error: 'TELEGRAM_BOT_TOKEN not configured' },
      { status: 500 }
    )
  }

  try {
    // Set webhook
    const setWebhookUrl = `https://api.telegram.org/bot${token}/setWebhook`
    const response = await fetch(setWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: `${webhookUrl}/api/webhook`,
      }),
    })

    const data = await response.json()

    if (!data.ok) {
      return NextResponse.json(
        { error: 'Failed to set webhook', details: data },
        { status: 500 }
      )
    }

    // Get webhook info
    const getWebhookUrl = `https://api.telegram.org/bot${token}/getWebhookInfo`
    const infoResponse = await fetch(getWebhookUrl)
    const webhookInfo = await infoResponse.json()

    return NextResponse.json({
      success: true,
      message: 'Webhook configured successfully',
      webhookInfo: webhookInfo.result,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to setup webhook', details: String(error) },
      { status: 500 }
    )
  }
}
