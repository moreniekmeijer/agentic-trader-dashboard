import { z } from 'zod'

export const rawAgentHealthSchema = z.object({
  id: z.union([z.string(), z.number()]),
  name: z.string(),
  status: z.enum(['healthy', 'degraded', 'down']),
  lastHeartbeat: z.string(),
  reason: z.string().optional(),
})

export const rawPositionSchema = z.object({
  id: z.union([z.string(), z.number()]),
  symbol: z.string(),
  side: z.enum(['long', 'short']),
  size: z.number(),
  entryPrice: z.number(),
  markPrice: z.number(),
  unrealizedPnl: z.number(),
  realizedPnl: z.number().optional().default(0),
})

export const rawTradeSchema = z.object({
  id: z.union([z.string(), z.number()]),
  symbol: z.string(),
  side: z.enum(['buy', 'sell']),
  qty: z.number(),
  price: z.number(),
  timestamp: z.string(),
})

export const rawAlertSchema = z.object({
  id: z.union([z.string(), z.number()]),
  severity: z.enum(['info', 'warning', 'critical']),
  message: z.string(),
  timestamp: z.string(),
})

export const rawAgentHealthListSchema = z.array(rawAgentHealthSchema)
export const rawPositionListSchema = z.array(rawPositionSchema)
export const rawTradeListSchema = z.array(rawTradeSchema)
export const rawAlertListSchema = z.array(rawAlertSchema)

export type RawAgentHealth = z.infer<typeof rawAgentHealthSchema>
export type RawPosition = z.infer<typeof rawPositionSchema>
export type RawTrade = z.infer<typeof rawTradeSchema>
export type RawAlert = z.infer<typeof rawAlertSchema>

