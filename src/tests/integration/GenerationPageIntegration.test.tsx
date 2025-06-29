import { render, screen, fireEvent } from '@testing-library/react';
import Generator from '../../components/GeneratorComponents/Generator/Generator';
import { useGenerationService } from '../../services/generationService';
import { vi } from 'vitest';

vi.mock('../../services/generationService');

describe('Generator', () => {
    it('вызывает handleStartGeneration при клике на кнопку', () => {
        const handleStartGeneration = vi.fn();
        const handleClear = vi.fn();

        (useGenerationService as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
            handleStartGeneration,
            handleClear,
        });

        render(<Generator />);

        const button = screen.getByRole('button', { name: /начать генерацию/i });

        fireEvent.click(button);

        expect(handleStartGeneration).toHaveBeenCalled();
    });
});
