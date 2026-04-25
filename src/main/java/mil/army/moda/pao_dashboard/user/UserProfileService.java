package mil.army.moda.pao_dashboard.user;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserProfileService {
    private final UserRepository userRepository;
    public UserProfileService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    public List<UserProfile> GetAllUsers(){
        return userRepository.findAll();
    }
    public Optional<UserProfile> GetUserById(Long id){
        return userRepository.findById(id);
    }
}
