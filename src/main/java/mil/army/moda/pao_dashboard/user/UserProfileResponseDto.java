package mil.army.moda.pao_dashboard.user;

public record UserProfileResponseDto(
        Long id,
        String username,
        String firstName,
        String lastName,
        String role,
        String unitName,
        String rankAbbreviation
) {}