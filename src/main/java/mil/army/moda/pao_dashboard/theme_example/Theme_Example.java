package mil.army.moda.pao_dashboard.theme_example;

import jakarta.persistence.*;
import mil.army.moda.pao_dashboard.event_type.Event_Type;
import mil.army.moda.pao_dashboard.theme.Theme;

@Entity
public class Theme_Example {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    @ManyToOne()
    @JoinColumn(name = "theme_id")
    private Theme theme;



    public Theme_Example() {
    }


    public Theme_Example(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public Theme_Example(String name, String description, Theme theme) {
        this.name = name;
        this.description = description;
        this.theme = theme;
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

    public Theme getTheme() {
        return theme;
    }

    public void setTheme(Theme theme) {
        this.theme = theme;
    }
}
