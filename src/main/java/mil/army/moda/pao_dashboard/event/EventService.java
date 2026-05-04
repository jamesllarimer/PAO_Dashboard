package mil.army.moda.pao_dashboard.event;

import jakarta.persistence.EntityNotFoundException;
import mil.army.moda.pao_dashboard.event_status.EventStatus;
import mil.army.moda.pao_dashboard.event_status.EventStatusRepository;
import mil.army.moda.pao_dashboard.event_type.EventType;
import mil.army.moda.pao_dashboard.event_type.EventTypeRepository;
import mil.army.moda.pao_dashboard.theme.Theme;
import mil.army.moda.pao_dashboard.theme.ThemeRepository;
import mil.army.moda.pao_dashboard.user.UserProfile;
import mil.army.moda.pao_dashboard.user.UserRepository;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    private final EventRepository eventRepository;
    private final EventStatusRepository eventStatusRepository;
    private final UserRepository userRepository;
    private final EventTypeRepository eventTypeRepository;
    private final ThemeRepository themeRepository;

    public EventService(EventRepository eventRepository, EventStatusRepository eventStatusRepository, UserRepository userRepository, EventTypeRepository eventTypeRepository, ThemeRepository themeRepository) {
        this.eventRepository = eventRepository;
        this.eventStatusRepository = eventStatusRepository;
        this.userRepository = userRepository;
        this.eventTypeRepository = eventTypeRepository;
        this.themeRepository = themeRepository;
    }

    public List<EventResponseDto> findAll() {
        return eventRepository.findAll().stream()
                .map(e -> new EventResponseDto(
                        e.getId(),
                        e.getName(),
                        e.getDescription(),
                        e.getEvent_type().getName(),
                        e.getStart_date(),
                        e.getEnd_date(),
                        e.getLead().getRank().getAbbreviation() + " " + e.getLead().getLastName(),
                        e.getLead().getUnit().getName(),
                        e.getEventStatus().getName(),
                        e.getTheme().getName()
                )).toList();
    }

    public Event findById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Event not found with id: " + id));
    }

    public Event create(EventRequest request) {
        Event event = new Event();

        event.setName(request.getName());
        event.setDescription(request.getDescription());
        event.setStart_date(request.getStartDate());
        event.setEnd_date(request.getEndDate());

        // Fetch related entities by ID
        EventType eventType = eventTypeRepository.findById(request.getEventTypeId())
                .orElseThrow(() -> new RuntimeException("Invalid event type"));

        UserProfile lead = userRepository.findById(request.getLeadId())
                .orElseThrow(() -> new RuntimeException("Invalid user"));

        EventStatus status = eventStatusRepository.findById(request.getEventStatusId())
                .orElseThrow(() -> new RuntimeException("Invalid status"));

        Theme theme = themeRepository.findById(request.getEventThemeId())
                        .orElseThrow(() -> new RuntimeException("Invalid theme"));

        event.setEvent_type(eventType);
        event.setLead(lead);
        event.setEventStatus(status);
        event.setTheme(theme);

        return eventRepository.save(event);
    }

    public Event update(Long id, Event updated) {
        Event existing = findById(id);
        existing.setName(updated.getName());
        existing.setDescription(updated.getDescription());
        existing.setStart_date(updated.getStart_date());
        existing.setEnd_date(updated.getEnd_date());
        return eventRepository.save(existing);
    }

    public void delete(Long id) {
        findById(id);
        eventRepository.deleteById(id);
    }
}