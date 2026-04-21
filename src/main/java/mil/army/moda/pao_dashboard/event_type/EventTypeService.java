package mil.army.moda.pao_dashboard.event_type;

import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class EventTypeService {
    private final EventTypeRepository eventTypeRepository;
    public EventTypeService(EventTypeRepository eventTypeRepository) {
        this.eventTypeRepository = eventTypeRepository;
    }

    public List<EventType> findAll() {
        return eventTypeRepository.findAll();
    }
    public EventType findById(Long id) {
        return eventTypeRepository.findById(id).orElseThrow();
    }

    public EventType save(EventType eventType) {
        return eventTypeRepository.save(eventType);
    }
}
