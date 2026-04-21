package mil.army.moda.pao_dashboard.posting_location;

import jakarta.persistence.*;

@Entity
@Table(name = "posting_location")
public class PostingLocation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;

    public PostingLocation() {
    }

    public PostingLocation(String name) {
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
