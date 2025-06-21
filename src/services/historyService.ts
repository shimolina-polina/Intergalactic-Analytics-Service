import { useHistoryStore } from '../store/useHistoryStore';
import type { HistoryItem } from '../api/historyApi';
import type { NormalizedResult } from '../utils/normalizeMetrics';

export const useHistoryService = () => {
  const add = useHistoryStore((s) => s.add);
  const remove = useHistoryStore((s) => s.remove);
  const clear = useHistoryStore((s) => s.clear);
  const load = useHistoryStore((s) => s.load);
  const history = useHistoryStore((s) => s.history);

  const createItem = (title: string, result: 'success' | 'fail', metrics: NormalizedResult | undefined): HistoryItem => ({
    id: crypto.randomUUID(),
    title,
    createdAt: Intl.DateTimeFormat('ru-RU').format(new Date()),
    result,
    metrics
  });

  return {
    history,
    addItem: (title: string, result: 'success' | 'fail', metrics: NormalizedResult | undefined) => add(createItem(title, result, metrics)),
    removeItem: remove,
    clearHistory: clear,
    reload: load,
  };
};
