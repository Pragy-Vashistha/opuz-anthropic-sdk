import { Check } from './types';

interface OpuzConfig {
    apiKey?: string;
    environment?: 'production' | 'development';
}

interface TraceRequest {
    request: any;
    response: any;
    duration: number;
    checks: Check[];
    metadata?: Record<string, any>;
}

export default class Opuz {
    private apiKey: string;
    private baseUrl: string;

    constructor(config?: OpuzConfig) {
        this.apiKey = config?.apiKey || process.env['OPUZ_API_KEY'] || '';
        if (!this.apiKey) {
            throw new Error('OPUZ_API_KEY is required. Set it in the environment or pass it in the config.');
        }

        this.baseUrl = config?.environment === 'development' 
            ? 'http://localhost:3000/api'
            : 'https://opuz.org/api';
    }

    private getTraceUrl(): string {
        return `${this.baseUrl}/trace`;
    }

    async trace(request: TraceRequest): Promise<any> {
        try {
            const response = await fetch(this.getTraceUrl(), {
                method: 'POST',
                headers: {
                    'x-api-key': this.apiKey,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(request)
            });

            if (!response.ok) {
                throw new Error(`Trace request failed: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error tracing request:', error);
            throw error;
        }
    }
}
