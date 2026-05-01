ALTER TABLE theme_example
    ADD theme_id BIGINT;

ALTER TABLE theme_example
    ADD CONSTRAINT FK_THEME_EXAMPLE_ON_THEME FOREIGN KEY (theme_id) REFERENCES theme (id);