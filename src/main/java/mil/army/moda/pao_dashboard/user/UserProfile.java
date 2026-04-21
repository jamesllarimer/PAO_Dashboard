package mil.army.moda.pao_dashboard.user;

import jakarta.persistence.*;
import mil.army.moda.pao_dashboard.rank.Rank;
import mil.army.moda.pao_dashboard.unit.Unit;

@Entity
@Table(name = "user_profile")
public class UserProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

   private String username;
   private String firstName;
   private String lastName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role role;

    @ManyToOne
    @JoinColumn(name = "unit_id", nullable = false)
    private Unit unit;

    public enum Role {
        PAO_UNIT, HQ_VIEWER
    }
    @ManyToOne()
    @JoinColumn(name = "rank_id")
    private Rank rank;

    public UserProfile() {
    }

    public UserProfile(String username, String firstName, String lastName, Unit unit, Rank rank) {
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.unit = unit;
        this.rank = rank;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Unit getUnit() {
        return unit;
    }

    public void setUnit(Unit unit) {
        this.unit = unit;
    }

    public Rank getRank() {
        return rank;
    }

    public void setRank(Rank rank) {
        this.rank = rank;
    }
}
