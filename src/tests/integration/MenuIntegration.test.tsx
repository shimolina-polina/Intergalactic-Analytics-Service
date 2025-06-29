import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from '../../AppRoutes';

describe('MenuButton', () => {

    it('подсвечивает активную кнопку меню при навигации', () => {
        render(
            <MemoryRouter initialEntries={['/generator']}>
                <AppRoutes />
            </MemoryRouter>,
        );

        const generatorLink = screen.getByRole('link', { name: /генератор/i });
        expect(generatorLink.className).toContain('selected');
    });

    it('переходит на History при клике', async () => {
        const user = userEvent.setup();

        render(
            <MemoryRouter initialEntries={['/analytics']}>
                <AppRoutes />
            </MemoryRouter>,
        );

        const link = screen.getByRole('link', { name: /история/i });
        await user.click(link);

        expect(await screen.findByTestId('history-page')).toBeInTheDocument();
    });
});
