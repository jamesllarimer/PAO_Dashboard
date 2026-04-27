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
    public List<UserProfileResponseDto> findAll() {
        return userRepository.findAll().stream()
                .map(u -> new UserProfileResponseDto(
                        u.getId(),
                        u.getUsername(),
                        u.getFirstName(),
                        u.getLastName(),
                        u.getRole().toString(),
                        u.getUnit().getName(),
                        u.getRank().getAbbreviation()
                ))
                .toList();
    }
    public Optional<UserProfile> GetUserById(Long id){
        return userRepository.findById(id);
    }
}
