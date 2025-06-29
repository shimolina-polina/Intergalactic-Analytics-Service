import { describe, it, vi, expect, beforeEach } from 'vitest';
import { useHistoryService } from '../../services/historyService';
import { useHistoryStore } from '../../store/useHistoryStore';
import { render } from '@testing-library/react';

const clearMock = vi.fn();

vi.mock('../../store/useHistoryStore', () => ({
    useHistoryStore: vi.fn(),
}));

beforeEach(() => {
    vi.resetAllMocks();
    (useHistoryStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector: any) =>
        selector({
            history: [],
            clear: clearMock,
            add: vi.fn(),
            remove: vi.fn(),
            load: vi.fn(),
        }),
    );
});

describe('useHistoryService', () => {
    it('очищает историю при вызове clearHistory', () => {
        const { clearHistory } = useHistoryService();
        clearHistory();
        expect(clearMock).toHaveBeenCalled();
    });
    
});
