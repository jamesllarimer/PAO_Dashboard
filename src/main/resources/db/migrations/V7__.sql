ALTER TABLE event
    ADD posting_location_id BIGINT;

ALTER TABLE event
    ADD CONSTRAINT FK_EVENT_ON_POSTINGLOCATION FOREIGN KEY (posting_location_id) REFERENCES posting_location (id);