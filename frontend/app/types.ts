export type EventResponseDto = {
    id: number;
    name: string;
    description: string;
    eventType: string;
    eventTypeId: number;
    startDate: string;
    endDate: string;
    lead: string;
    leadId: number;
    unit: string;
    unitId: number;
    status: string;
    eventStatusId: number;
    theme: string;
    eventThemeId: number;
    postingLocation: string;
    postingLocationId: number;
    productType: string;
    productTypeId: number;
};

export type Theme = {
    id: number;
    name: string;
    theme_examples: ThemeExample[]
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

export type Event = {
    id: number;
    name: string;
    description: string;
    event_type: EventType;
    start_date: string; // ISO 8601 date string from Java Date serialization
    end_date: string;
    lead: UserProfile;
    eventStatus: EventStatus;
}

export type EventType = {
    id: number;
    name: string;
}

export type EventStatus = {
    id: number;
    name: string;
}

export type UserProfile = {
    id: number;
    rankAbbreviation: string;
    lastName: string;
    role: string;
}

export type PostingLocation = {
    id: number;
    name: string;
}

export type EventRequest = {
    name: string;
    description: string;
    eventTypeId: number;
    productTypeId: number;
    leadId: number;
    eventStatusId: number;
    postingLocationId: number;
    eventThemeId: number;
    startDate: string; // ISO date string
    endDate: string;   // ISO date string
};
export type ThemeExample = {
    id: number;
    name: string;
    description: string;
}
export type ThemeCardProps = {
    name: string;
    examples: ThemeExample[]
}
export type ProductType = {
    id: number;
    name: string;
    description: string;
}

