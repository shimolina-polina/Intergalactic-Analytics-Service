import type { AggregatedResult } from '../api/aggregationApi';
import { daysToDate } from './daysToDate';

export type NormalizedResult = Omit<AggregatedResult, 'less_spent_at' | 'big_spent_at'> & {
    less_spent_at: string;
    big_spent_at: string;
};

export const normalizeMetrics = (data: Partial<AggregatedResult>): NormalizedResult => ({
    total_spend_galactic: Math.round(data.total_spend_galactic ?? 0),
    rows_affected: data.rows_affected ?? 0,
    less_spent_at: data.less_spent_at ? daysToDate(data.less_spent_at) : '',
    big_spent_at: data.big_spent_at ? daysToDate(data.big_spent_at) : '',
    less_spent_value: Math.round(data.less_spent_value ?? 0),
    big_spent_value: Math.round(data.big_spent_value ?? 0),
    average_spend_galactic: Math.round(data.average_spend_galactic ?? 0),
    big_spent_civ: data.big_spent_civ ?? '',
    less_spent_civ: data.less_spent_civ ?? '',
});
