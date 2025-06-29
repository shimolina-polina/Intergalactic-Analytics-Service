import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import UploadField from '../../components/AnalyticsComponents/FileUpload/UploadField/UploadField';
import { useUploadStore } from '../../store/useUploadStore';
import FileUploadField from '../../components/AnalyticsComponents/FileUpload/FileUpload';

describe('FileUpload', () => {
    afterEach(() => {
        cleanup();
        useUploadStore.getState().clear();
    });

    beforeAll(() => {
        const localStorageMock = (() => {
            let store: Record<string, string> = {};

            return {
                getItem(key: string) {
                    return store[key] || null;
                },
                setItem(key: string, value: string) {
                    store[key] = value.toString();
                },
                removeItem(key: string) {
                    delete store[key];
                },
                clear() {
                    store = {};
                },
            };
        })();

        Object.defineProperty(globalThis, 'localStorage', {
            value: localStorageMock,
        });
    });

    it('загружает файл через кнопку', () => {
        render(<UploadField />);

        const fileInput = screen.getByTestId('file-input');

        const file = new File(['file content'], 'test.csv', { type: 'text/csv' });

        fireEvent.change(fileInput, { target: { files: [file] } });

        expect(screen.getByText(/файл загружен!/i)).toBeInTheDocument();
    });

    it('загружает не csv файл через кнопку', async () => {
        render(<UploadField />);

        const fileInput = screen.getByTestId('file-input');

        const file = new File(['file content'], 'test.txt', { type: 'text' });

        fireEvent.change(fileInput, { target: { files: [file] } });

        await waitFor(() => {
            expect(screen.queryByText(/файл загружен!/i)).not.toBeInTheDocument();
        });
    });

    it('загружает файл через drag&drop', () => {
        render(<UploadField />);

        const dropArea = screen.getByTestId('drop-area');

        const file = new File(['file content'], 'test.csv', { type: 'text/csv' });

        fireEvent.drop(dropArea, {
            dataTransfer: {
                files: [file],
                items: [file],
                types: ['Files'],
            },
        });
        expect(screen.getByText(/файл загружен!/i)).toBeInTheDocument();
    });

    it('загружает не csv файл через drag&drop', () => {
        render(<UploadField />);

        const dropArea = screen.getByTestId('drop-area');

        const file = new File(['file content'], 'test.txt', { type: 'text' });

        fireEvent.drop(dropArea, {
            dataTransfer: {
                files: [file],
                items: [file],
                types: ['Files'],
            },
        });
        expect(screen.getByText(/загрузите csv файл!/i)).toBeInTheDocument();
    });

    it('показывает индикатор загрузки при загрузке файла', async () => {
        render(<FileUploadField />);

        const fileInput = screen.getByTestId('file-input');
        const file = new File(['file content'], 'test.csv', { type: 'text/csv' });

        fireEvent.change(fileInput, { target: { files: [file] } });

        const submitButton = screen.getByRole('button', { name: /отправить/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByTestId('loading-indicator')).toBeInTheDocument();
        });
    });
});
