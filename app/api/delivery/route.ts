export const runtime = 'edge'

import { NextResponse } from "next/server"

/**
 * Auto Card Key Delivery Logic
 * 
 * When a payment webhook triggers (payment success callback):
 * 1. Look up the order by orderId
 * 2. Find the associated product
 * 3. Pull N pending card keys from that product (oldest first)
 * 4. Mark those card keys as "sold" and link them to the order
 * 5. Delete sold card keys from available pool
 * 6. Return the card keys to be displayed on the customer's order page
 * 
 * TODO: Connect to Cloudflare D1 database for real implementation
 */

interface DeliveryRequest {
  orderId: string
  productId: string
  quantity: number
}

// Simulated in-memory card key pool (will be replaced by D1 database)
const cardKeyPool: Record<string, { id: string; content: string; status: "pending" | "sold"; createdAt: string }[]> = {
  "1": [
    { id: "ck1", content: "user1:pass1:email1@gmail.com:2fa_code1", status: "pending", createdAt: "2026-02-01 10:00:00" },
    { id: "ck2", content: "user2:pass2:email2@gmail.com:2fa_code2", status: "pending", createdAt: "2026-02-01 10:01:00" },
    { id: "ck3", content: "user3:pass3:email3@gmail.com:2fa_code3", status: "pending", createdAt: "2026-02-01 10:02:00" },
  ],
}

export async function POST(request: Request) {
  try {
    const body: DeliveryRequest = await request.json()
    const { orderId, productId, quantity } = body

    if (!orderId || !productId || !quantity) {
      return NextResponse.json({ error: "Missing required fields: orderId, productId, quantity" }, { status: 400 })
    }

    // Get available (pending) card keys for this product, sorted by createdAt (oldest first)
    const availableKeys = (cardKeyPool[productId] || [])
      .filter((k) => k.status === "pending")
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())

    if (availableKeys.length < quantity) {
      return NextResponse.json(
        { error: `Insufficient stock. Available: ${availableKeys.length}, Requested: ${quantity}` },
        { status: 400 }
      )
    }

    // Pick the first N card keys (oldest first - FIFO)
    const deliveredKeys = availableKeys.slice(0, quantity)

    // Mark them as sold and associate with order
    // TODO: In production, this should be an atomic database transaction
    // await db.prepare(`
    //   UPDATE card_keys 
    //   SET status = 'sold', order_id = ?, sold_at = datetime('now') 
    //   WHERE id IN (${deliveredKeys.map(() => '?').join(',')})
    // `).bind(orderId, ...deliveredKeys.map(k => k.id)).run()

    // Simulate marking as sold in memory
    for (const key of deliveredKeys) {
      const pool = cardKeyPool[productId]
      if (pool) {
        const idx = pool.findIndex((k) => k.id === key.id)
        if (idx !== -1) {
          pool[idx].status = "sold"
        }
      }
    }

    // Remove sold keys from the available pool (auto-delete after delivery)
    // TODO: In production, sold keys remain in DB for record keeping but are excluded from available pool
    // The front-end stock count is calculated from pending keys only

    return NextResponse.json({
      success: true,
      orderId,
      deliveredCount: deliveredKeys.length,
      cardKeys: deliveredKeys.map((k) => k.content),
      message: `Successfully delivered ${deliveredKeys.length} card keys for order ${orderId}`,
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

/**
 * GET: Check delivery status for an order
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const orderId = searchParams.get("orderId")

  if (!orderId) {
    return NextResponse.json({ error: "orderId is required" }, { status: 400 })
  }

  // TODO: Query database for order and associated card keys
  // const order = await db.prepare('SELECT * FROM orders WHERE order_id = ?').bind(orderId).first()
  // const keys = await db.prepare('SELECT content FROM card_keys WHERE order_id = ?').bind(orderId).all()

  return NextResponse.json({
    orderId,
    status: "placeholder",
    message: "Connect to Cloudflare D1 database to enable real order lookup",
  })
}
