import { render, screen, fireEvent } from '@testing-library/react';
import { useAggregationStore } from '../../store/useAggregationStore';
import AnalyticsPage from '../../pages/AnalyticsPage/AnalyticsPage';

describe('Highlights интеграционный тест', () => {
    beforeEach(() => {
        useAggregationStore.setState({
            metrics: {
                total_spend_galactic: '1000',
                rows_affected: '50',
                less_spent_at: 'Day 1',
                big_spent_civ: 'Civ A',
                less_spent_civ: 'Civ B',
                big_spent_at: 'Day 10',
                less_spent_value: '100',
                big_spent_value: '500',
                average_spend_galactic: '200',
            },
        });
    });

    afterEach(() => {
        useAggregationStore.setState({ metrics: null });
    });

    it('показывает хайлайты и при нажатии "Очистить" пропадают', () => {
        render(<AnalyticsPage />);

        const highlightsBefore = screen.queryAllByTestId('highlight');
        expect(highlightsBefore.length).toBeGreaterThan(0);

        const clearButton = screen.getByRole('button', { name: /очистить/i });
        fireEvent.click(clearButton);

        const highlightsAfter = screen.queryAllByTestId('highlight');
        expect(highlightsAfter.length).toBe(0);
        });
});
