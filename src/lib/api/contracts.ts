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

export const rawDecisionSchema = z.object({
  id: z.union([z.string(), z.number()]),
  symbol: z.string(),
  timestamp: z.string(),
  signal: z.string(),
  confidence: z.number(),
  reasoning: z.array(z.string()),
  executed: z.boolean(),
  blocked_reason: z.string().nullable().optional(),
  votes: z.array(
    z.object({
      agent: z.string(),
      signal: z.string(),
      confidence: z.number(),
      weight: z.number(),
      reasoning: z.array(z.string()),
    }),
  ),
})

export const rawAlertSchema = z.object({
  id: z.union([z.string(), z.number()]),
  severity: z.enum(['info', 'warning', 'critical']),
  source: z.string().optional().default('system'),
  message: z.string(),
  timestamp: z.string(),
})

export const rawOperationalLogSchema = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  timestamp: z.string(),
  source: z.string().optional().default('system'),
  level: z.enum(['debug', 'info', 'warning', 'error']).optional().default('info'),
  message: z.string(),
})

export const rawAgentHealthListSchema = z.array(rawAgentHealthSchema)
export const rawPositionListSchema = z.array(rawPositionSchema)
export const rawTradeListSchema = z.array(rawTradeSchema)
export const rawAlertListSchema = z.array(rawAlertSchema)
export const rawOperationalLogListSchema = z.array(rawOperationalLogSchema)
export const rawDecisionListSchema = z.array(rawDecisionSchema)

export type RawAgentHealth = z.infer<typeof rawAgentHealthSchema>
export type RawPosition = z.infer<typeof rawPositionSchema>
export type RawTrade = z.infer<typeof rawTradeSchema>
export type RawAlert = z.infer<typeof rawAlertSchema>
export type RawOperationalLog = z.infer<typeof rawOperationalLogSchema>
export type RawDecision = z.infer<typeof rawDecisionSchema>
