export type CoverageEvent = {
    id: number;
    name: string;
    description: string;
    endDate: Date;
    startDate: Date;
    eventType: string;
    owner: string;
}

export type Theme = {
    id: number | null;
    name: string;
}