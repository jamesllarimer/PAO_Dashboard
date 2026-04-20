package mil.army.moda.pao_dashboard.theme_example;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/theme_example")
public class ThemeExampleController {
    private final ThemeExampleService themeExampleService;
    public ThemeExampleController(ThemeExampleService themeExampleService) {
        this.themeExampleService = themeExampleService;
    }
    @GetMapping
    public List<ThemeExample> getAll() {
        return themeExampleService.findAll();
    }
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ThemeExample save(@RequestBody ThemeExample themeExample) {
        return themeExampleService.save(themeExample);
    }
}
