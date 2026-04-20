package mil.army.moda.pao_dashboard.theme_example;

import mil.army.moda.pao_dashboard.theme_example.ThemeExampleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ThemeExampleService {
    private final ThemeExampleRepository themeExampleRepository;
    public ThemeExampleService(ThemeExampleRepository themeExampleRepository) {
        this.themeExampleRepository = themeExampleRepository;
    }
    public ThemeExample findById(Long id) {
        return themeExampleRepository.findById(id).orElse(null);
    }
    public List<ThemeExample> findAll() {
        return themeExampleRepository.findAll();
    }
    public ThemeExample save(ThemeExample themeExample) {
        return themeExampleRepository.save(themeExample);
    }
}
