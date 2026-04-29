package mil.army.moda.pao_dashboard.event;

import java.util.Date;

public record EventResponseDto(
    Long id,
    String name,
    String description,
    String eventType,
    Date startDate,
    Date endDate,
    String lead,
    String unit
){}