package mil.army.moda.pao_dashboard.unit;

import jakarta.persistence.*;

@Entity
@Table(name = "unit")
public class Unit {
    @Id
    @GeneratedValue
    private Long id;
    @Column(unique = true)
    private String name;
    private Long parentId;

    public Unit() {
    }

    public Unit(String name) {
        this.name = name;
    }

    public Unit(String name, Long parentId) {
        this.name = name;
        this.parentId = parentId;
    }
}
