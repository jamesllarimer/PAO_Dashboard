package mil.army.moda.pao_dashboard.posting_location;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Posting_Location {
    @Id
    @GeneratedValue
    private Long id;
    private String name;

    public Posting_Location() {
    }

    public Posting_Location(String name) {
        this.name = name;
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
}
