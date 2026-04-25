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

export type  Unit = {
    id: number;
    name: string;
    parentId: number | null;
}
export type Rank = {
    id: number;
    name: string;
    abbreviation: string;
}
export type User = {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    rank: Rank;
    unit: Unit;
}