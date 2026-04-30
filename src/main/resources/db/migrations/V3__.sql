ALTER TABLE event
    ADD event_status_id BIGINT;

ALTER TABLE event
    ADD CONSTRAINT FK_EVENT_ON_EVENT_STATUS FOREIGN KEY (event_status_id) REFERENCES event_status (id);