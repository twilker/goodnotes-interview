//User, Events, Schedules

type User = {
    id: string;
    events: Event[];
};

type Event = {
    id: string;
    userId: string;
    user: User;
    createdAt: number;
    schedule: 'Daily' | 'Weekly';
    skips: number[];
};

//getAllEventsBeforeEndDate
//foreach event
//checkOccured(event, timeframe)

type Daily = {
    id: string;
    event: Event;
};

type Weekly = {
    id: string;
    event: Event;
};
