export const generationApi = {
    async getReport(
        size: number = 0.1,
        withErrors: 'on' | 'off' = 'off',
        maxSpend: string = '1000',
    ): Promise<Blob> {
        const params = new URLSearchParams({
            size: String(size),
            withErrors,
            maxSpend,
        });

        const response = await fetch(
            `${import.meta.env.VITE_BASE_URL}/report?${params.toString()}`,
            {
                method: 'GET',
            },
        );

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`${response.status}: ${errorText}`);
        }
        return await response.blob();
    },
};
