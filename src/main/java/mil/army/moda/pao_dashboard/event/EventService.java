package mil.army.moda.pao_dashboard.event;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
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
                        e.getLead().getUnit().getName()
                )).toList();
    }

    public Event findById(Long id) {
        return eventRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Event not found with id: " + id));
    }

    public Event create(Event event) {
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