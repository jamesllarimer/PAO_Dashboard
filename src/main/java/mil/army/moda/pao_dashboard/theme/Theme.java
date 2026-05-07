package mil.army.moda.pao_dashboard.theme;
import jakarta.persistence.*;
import mil.army.moda.pao_dashboard.theme_example.ThemeExample;

import java.util.ArrayList;
import java.util.List;

@Entity
public class Theme {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @OneToMany(mappedBy = "theme", cascade = CascadeType.ALL, fetch = FetchType.EAGER, orphanRemoval = true)
    private List<ThemeExample> theme_examples = new ArrayList<>();

    public Theme() {
    }

    public Theme(String name) {
        this.name = name;
    }

    public Theme(String name, List<ThemeExample> theme_examples) {
        this.name = name;
        this.theme_examples = theme_examples;
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

    public List<ThemeExample> getTheme_examples() {
        return theme_examples;
    }

    public void setTheme_examples(List<ThemeExample> theme_examples) {
        this.theme_examples = theme_examples;
        if (theme_examples != null) {
            for (ThemeExample example : theme_examples) {
                example.setTheme(this); // sets theme_id on each child row
            }
        }
    }
}
