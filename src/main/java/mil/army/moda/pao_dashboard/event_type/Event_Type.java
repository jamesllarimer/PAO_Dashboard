package mil.army.moda.pao_dashboard.event_type;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Event_Type {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String description;

    public Event_Type() {
    }

    public Event_Type(String name) {
        this.name = name;
    }

    public Event_Type(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
