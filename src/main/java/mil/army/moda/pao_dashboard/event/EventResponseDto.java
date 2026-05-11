package mil.army.moda.pao_dashboard.event;

import java.util.Date;

public record EventResponseDto(
    Long id,
    String name,
    String description,
    String eventType,
    Long eventTypeId,
    Date startDate,
    Date endDate,
    String lead,
    Long leadId,
    String unit,
    Long unitId,
    String status,
    Long eventStatusId,
    String theme,
    Long eventThemeId,
    String postingLocation,
    Long postingLocationId,
    String productType,
    Long productTypeId
){}