import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import HistoryList from '../../components/HistoryComponents/HistoryList/HistoryList';
import { useHistoryStore } from '../../store/useHistoryStore';
import { MemoryRouter } from 'react-router-dom';
import HistoryPage from '../../pages/HistoryPage/HistoryPage';
import type { HistoryItem } from '../../api/historyApi';

const mockHistory: HistoryItem = {
    id: '1',
    title: 'Отчёт 1',
    createdAt: '01.01.2025',
    result: 'success',
    metrics: {
        total_spend_galactic: '1000',
        rows_affected: '10',
        less_spent_at: '01.01.2025',
        big_spent_at: '01.02.2025',
        less_spent_value: '50',
        big_spent_value: '500',
        average_spend_galactic: '100',
        big_spent_civ: 'Civ X',
        less_spent_civ: 'Civ Y',
    },
};

beforeEach(() => {
    useHistoryStore.getState().clear();
    useHistoryStore.getState().add(mockHistory);

    useHistoryStore.getState().add({
        id: '2',
        title: 'Ошибка отчёта',
        createdAt: '02.02.2025',
        result: 'fail',
        metrics: {
            total_spend_galactic: '0',
            rows_affected: '0',
            less_spent_at: '—',
            big_spent_at: '—',
            less_spent_value: '—',
            big_spent_value: '—',
            average_spend_galactic: '—',
            big_spent_civ: '—',
            less_spent_civ: '—',
        },
    });
});

describe('HistoryList integration', () => {
    it('загружает список из стора при рендере', () => {
        render(<HistoryList />);

        expect(screen.getByTestId('history-item-1')).toBeInTheDocument();
    });

    it('открывает модальное окно при клике на запись', async () => {
        render(
            <MemoryRouter>
                <HistoryList />
            </MemoryRouter>,
        );

        fireEvent.click(screen.getByTestId('button-item-1'));
        await waitFor(async () => {
            expect(await screen.findByTestId('modal')).toBeInTheDocument();
        });
    });

    it('удаляет запись при клике на кнопку удаления', async () => {
        render(
            <MemoryRouter>
                <HistoryPage />
            </MemoryRouter>,
        );
        const item = screen.getByTestId('history-item-1');
        const deleteButton = within(item).getByRole('button', { name: /удалить/i });

        fireEvent.click(deleteButton);
        await waitFor(() => {
            expect(screen.queryByTestId('history-item-1')).not.toBeInTheDocument();
        });
    });

    it('удаляет записи при клике на кнопку "Очистить всё"', async () => {
        render(
            <MemoryRouter>
                <HistoryPage />
            </MemoryRouter>,
        );

        fireEvent.click(screen.getByText(/Очистить всё/i));

        await waitFor(() => {
            expect(screen.queryByTestId('button-item-1')).not.toBeInTheDocument();
        });
    });

    it('редиректит на генерацию при клике на "сгенерировать больше"', async () => {
        render(
            <MemoryRouter initialEntries={['/history']}>
                <HistoryPage />
            </MemoryRouter>,
        );
        fireEvent.click(screen.getByText(/сгенерировать больше/i));
        expect(await screen.findByTestId('history-page')).toBeInTheDocument();
    });

    it('не отображает кнопку "очистить все" при пустой истории', () => {
        render(
            <MemoryRouter>
                <HistoryPage />
            </MemoryRouter>,
        );

        const clearButton = screen.queryByRole('button', { name: /Очистить всё/i });
        fireEvent.click(screen.getByText(/Очистить всё/i));
        expect(clearButton).not.toBeInTheDocument();
    });

    it('не открывает модальное окно, если result не "success"', async () => {
        render(
            <MemoryRouter>
                <HistoryList />
            </MemoryRouter>,
        );

        const button = screen.getByTestId('button-item-2');
        fireEvent.click(button);

        await waitFor(() => {
            expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
        });
    });
});
