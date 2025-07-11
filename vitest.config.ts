import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './setupTests.ts',
        include: ['src/tests/**/*.test.ts', 'src/tests/**/*.test.tsx'],
    },
});
