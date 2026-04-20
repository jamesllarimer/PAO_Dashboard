package mil.army.moda.pao_dashboard.theme;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ThemeService {
    private final ThemeRepository themeRepository;

    public ThemeService(ThemeRepository themeRepository) {
        this.themeRepository = themeRepository;
    }

    public List<Theme> getAllThemes() {
        return themeRepository.findAll();
    }

    public Theme getTheme(Long id) {
        return themeRepository.findById(id).orElseThrow();
    }

    public void deleteTheme(Theme theme) {
        themeRepository.delete(theme);
    }

    public Theme updateTheme(Theme theme) {
        return themeRepository.save(theme);
    }

    public Theme createTheme(Theme theme) {
        return themeRepository.save(theme);
    }

}
