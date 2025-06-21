import { normalizeMetrics } from "../utils/normalizeMetrics";

export type AggregatedResult = {
    total_spend_galactic: number;
    rows_affected: number;
    less_spent_at: number;
    big_spent_at: number;
    less_spent_value: number;
    big_spent_value: number;
    average_spend_galactic: number;
    big_spent_civ: string;
    less_spent_civ: string;
};




export const aggregationApi = {
    async streamAggregation(
        file: File,
        onData: (data: AggregatedResult) => void,
        onComplete?: (data: AggregatedResult) => void,
    ): Promise<void> {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/aggregate?rows=10000`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                let errorText = '';
                try {
                    const errorJson = await response.json();
                    errorText = JSON.stringify(errorJson);
                } catch (e) {
                    errorText = await response.text();
                }

                throw new Error(`${response.status}: ${errorText}`);
            }

            if (!response.body) {
                throw new Error('Ответ пустой');
            }

            const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();

            let buffer = '';
            let result: AggregatedResult = {
                total_spend_galactic: 0,
                rows_affected: 0,
                less_spent_at: 0,
                big_spent_at: 0,
                less_spent_value: 0,
                big_spent_value: 0,
                average_spend_galactic: 0,
                big_spent_civ: '',
                less_spent_civ: '',
            };
            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                if (value) {
                    buffer += value;

                    const lines = buffer.split('\n');
                    buffer = lines.pop() ?? '';

                    for (const line of lines) {
                        if (line.trim()) {
                            try {
                                result = JSON.parse(line);
                                onData(result);
                            } catch (e) {
                                console.error('Ошибка парсинга строки JSON:', e);
                            }
                        }
                    }
                }
            }
            onComplete?.(result);
        } catch (err) {
            throw new Error('Ошибка:' + err);
        }
    },
};
