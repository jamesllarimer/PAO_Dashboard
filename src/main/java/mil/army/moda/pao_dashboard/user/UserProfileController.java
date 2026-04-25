package mil.army.moda.pao_dashboard.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/v1/user")
public class UserProfileController {
    private final UserProfileService userProfileService;

    public UserProfileController(UserProfileService userProfileService) {
        this.userProfileService = userProfileService;
    }
    @GetMapping
    public List<UserProfile> findAll() {
        return userProfileService.GetAllUsers();
    }

    @GetMapping("/{id}")
    public Optional<UserProfile> findOne(@PathVariable Long id) {
        return userProfileService.GetUserById(id);
    }
}
