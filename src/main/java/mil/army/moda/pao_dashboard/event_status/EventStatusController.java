package mil.army.moda.pao_dashboard.event_status;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/event_status")
public class EventStatusController {
    private final EventStatusService eventStatusService;
    public EventStatusController(EventStatusService eventStatusService) {
        this.eventStatusService = eventStatusService;
    }
    @GetMapping
    public List<EventStatus> findAll() {
        return this.eventStatusService.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EventStatus save(@RequestBody EventStatus eventStatus) {
        return this.eventStatusService.save(eventStatus);
    }
}
