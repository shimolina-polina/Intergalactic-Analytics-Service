import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import HistoryList from '../../components/HistoryComponents/HistoryList/HistoryList';
import { useHistoryStore } from '../../store/useHistoryStore';
import { MemoryRouter } from 'react-router-dom';
import HistoryPage from '../../pages/HistoryPage/HistoryPage';

const mockHistory = [
    {
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
    },
];

vi.mock('../../store/useHistoryStore', () => ({
    useHistoryStore: vi.fn(),
}));

beforeEach(() => {
    vi.resetAllMocks();

    (useHistoryStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector: any) =>
        selector({
            history: mockHistory,
            remove: vi.fn(),
            add: vi.fn(),
            clear: vi.fn(),
            load: vi.fn(),
        }),
    );
});

describe('HistoryList integration', () => {
    it('загружает список из стора при рендере', () => {
        const loadMock = vi.fn();

        (useHistoryStore as unknown as ReturnType<typeof vi.fn>).mockImplementation(
            (selector: any) =>
                selector({
                    history: [],
                    load: loadMock,
                    add: vi.fn(),
                    remove: vi.fn(),
                    clear: vi.fn(),
                }),
        );

        render(<HistoryList />);

        expect(loadMock).toHaveBeenCalled();
    });

    it('открывает модальное окно при клике на запись', async () => {
        render(
            <MemoryRouter>
                <HistoryList />
            </MemoryRouter>,
        );

        fireEvent.click(screen.getByRole('button', { name: /файл/i }));
        await waitFor(async () => {
            expect(await screen.findByTestId('modal')).toBeInTheDocument();
        });
    });

    it('удаляет запись при клике на кнопку удаления', () => {
        const removeMock = vi.fn();
        (useHistoryStore as unknown as ReturnType<typeof vi.fn>).mockImplementation(
            (selector: any) =>
                selector({
                    history: mockHistory,
                    remove: removeMock,
                    add: vi.fn(),
                    clear: vi.fn(),
                    load: vi.fn(),
                }),
        );

        render(
            <MemoryRouter>
                <HistoryPage />
            </MemoryRouter>,
        );
        const item = screen.getByTestId('history-item-1');
        const deleteButton = within(item).getByRole('button', { name: /удалить/i });

        fireEvent.click(deleteButton);
        expect(removeMock).toHaveBeenCalledWith('1');
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
        (useHistoryStore as unknown as ReturnType<typeof vi.fn>).mockImplementation(
            (selector: any) =>
                selector({
                    history: [],
                    remove: vi.fn(),
                    add: vi.fn(),
                    clear: vi.fn(),
                    load: vi.fn(),
                }),
        );

        render(
            <MemoryRouter>
                <HistoryPage />
            </MemoryRouter>,
        );

        const clearButton = screen.queryByRole('button', { name: /Очистить всё/i });
        screen.debug();
        expect(clearButton).not.toBeInTheDocument();
    });

    it('не открывает модальное окно, если result не "success"', async () => {
        const mockHistory = [
            {
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
            },
        ];

        (useHistoryStore as unknown as ReturnType<typeof vi.fn>).mockImplementation(
            (selector: any) =>
                selector({
                    history: mockHistory,
                    remove: vi.fn(),
                    add: vi.fn(),
                    clear: vi.fn(),
                    load: vi.fn(),
                }),
        );

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
