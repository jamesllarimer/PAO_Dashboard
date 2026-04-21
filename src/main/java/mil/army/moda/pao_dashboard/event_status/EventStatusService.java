package mil.army.moda.pao_dashboard.event_status;

import mil.army.moda.pao_dashboard.theme.Theme;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventStatusService {
    private final EventStatusRepository eventStatusRepository;
    public EventStatusService(EventStatusRepository eventStatusRepository) {
        this.eventStatusRepository = eventStatusRepository;
    }

    public List<EventStatus> findAll() {
        return this.eventStatusRepository.findAll();
    }

    public EventStatus findById(Long id) {
        return this.eventStatusRepository.findById(id).orElse(null);
    }

    public EventStatus save(EventStatus eventStatus) {
        return this.eventStatusRepository.save(eventStatus);
    }
}
