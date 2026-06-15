export interface TodoRequest {
    title: string;
    completed?: boolean;   // optional — defaults to false if not provided
    userId?: number;        // optional — which user this todo belongs to
}
