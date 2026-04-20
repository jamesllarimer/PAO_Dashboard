package mil.army.moda.pao_dashboard.theme;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/theme")
public class ThemeController {
    private final ThemeService themeService;
    public ThemeController(ThemeService themeService) {
        this.themeService = themeService;
    }

    @GetMapping
    public List<Theme> getAllThemes() {
        return themeService.getAllThemes();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Theme createTheme(@RequestBody Theme theme) {
        return themeService.createTheme(theme);
    }

    @GetMapping("/{id}")
    public Theme getTheme(@PathVariable Long id) {
        return themeService.getTheme(id);
    }
}
