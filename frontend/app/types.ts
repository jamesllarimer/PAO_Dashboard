export type EventResponseDto = {
    id: number;
    name: string;
    description: string;
    eventType: string;
    startDate: string;
    endDate: string;
    lead: string;
    unit: string;
    status: string;
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
    leadId: number;
    eventStatusId: number;
    postingLocationId: number;
    startDate: string; // ISO date string
    endDate: string;   // ISO date string
};



