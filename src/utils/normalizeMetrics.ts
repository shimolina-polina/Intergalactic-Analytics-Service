import type { AggregatedResult } from '../api/aggregationApi';
import { daysToDate } from './daysToDate';

export type NormalizedResult = Omit<
    AggregatedResult,
    | 'less_spent_at'
    | 'big_spent_at'
    | 'total_spend_galactic'
    | 'rows_affected'
    | 'less_spent_value'
    | 'big_spent_value'
    | 'average_spend_galactic'
> & {
    less_spent_at: string;
    big_spent_at: string;
    total_spend_galactic: string;
    rows_affected: string;
    less_spent_value: string;
    big_spent_value: string;
    average_spend_galactic: string;
};

export const normalizeMetrics = (data: Partial<AggregatedResult>): NormalizedResult => ({
    total_spend_galactic: Intl.NumberFormat('ru-RU').format(
        Math.round(data.total_spend_galactic ?? 0),
    ),
    rows_affected: Intl.NumberFormat('ru-RU').format(data.rows_affected ?? 0),
    less_spent_at: data.less_spent_at ? daysToDate(data.less_spent_at) : '',
    big_spent_at: data.big_spent_at ? daysToDate(data.big_spent_at) : '',
    less_spent_value: Intl.NumberFormat('ru-RU').format(Math.round(data.less_spent_value ?? 0)),
    big_spent_value: Intl.NumberFormat('ru-RU').format(Math.round(data.big_spent_value ?? 0)),
    average_spend_galactic: Intl.NumberFormat('ru-RU').format(
        Math.round(data.average_spend_galactic ?? 0),
    ),
    big_spent_civ: data.big_spent_civ ?? '',
    less_spent_civ: data.less_spent_civ ?? '',
});
