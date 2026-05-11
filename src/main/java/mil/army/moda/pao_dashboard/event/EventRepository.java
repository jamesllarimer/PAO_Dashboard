package mil.army.moda.pao_dashboard.event;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface EventRepository extends JpaRepository<Event, Long> {
    public List<Event> findAllByLeadId(Long userId);
}