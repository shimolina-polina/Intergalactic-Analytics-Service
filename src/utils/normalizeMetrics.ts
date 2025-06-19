import type { AggregatedResult } from "../services/aggregateService";

export const normalizeMetrics = (data: Partial<AggregatedResult>): AggregatedResult => ({
  total_spend_galactic: data.total_spend_galactic ?? 0,
  rows_affected: data.rows_affected ?? 0,
  less_spent_at: data.less_spent_at ?? 0,
  big_spent_at: data.big_spent_at ?? 0,
  less_spent_value: data.less_spent_value ?? 0,
  big_spent_value: data.big_spent_value ?? 0,
  average_spend_galactic: data.average_spend_galactic ?? 0,
  big_spent_civ: data.big_spent_civ ?? '',
  less_spent_civ: data.less_spent_civ ?? '',
});
