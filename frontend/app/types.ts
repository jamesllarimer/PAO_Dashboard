export interface CoverageEvent {
    id: number;
    name: string;
    description: string;
    endDate: Date;
    startDate: Date;
    eventType: string;
    owner: string;
}

export interface Theme {
    id: number;
    name: string;
}