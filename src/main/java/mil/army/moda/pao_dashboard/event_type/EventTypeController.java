package mil.army.moda.pao_dashboard.event_type;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/event_type")
public class EventTypeController {
    private final EventTypeService eventTypeService;
    public EventTypeController(EventTypeService eventTypeService) {
        this.eventTypeService = eventTypeService;
    }

    @GetMapping
    public List<EventType> findAll() {
        return eventTypeService.findAll();
    }

    @PostMapping
    public EventType save(@RequestBody EventType eventType) {
        return eventTypeService.save(eventType);
    }

    @GetMapping("/{id}")
    public EventType findById(@PathVariable Long id) {
        return  eventTypeService.findById(id);
    }
}
