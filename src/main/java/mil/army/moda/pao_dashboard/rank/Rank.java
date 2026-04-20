package mil.army.moda.pao_dashboard.rank;

import jakarta.persistence.*;

@Entity
public class Rank {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String abbreviation;

    public Rank() {
    }

    public Rank(String name, String abbreviation) {
        this.name = name;
        this.abbreviation = abbreviation;
    }
}
