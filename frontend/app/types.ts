export type EventResponseDto = {
    id: number;
    name: string;
    description: string;
    eventType: string;
    startDate: string;
    endDate: string;
    lead: string;
    unit: string;
};

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
    role: string;
    unitName: string;
    rankAbbreviation: string;
}


