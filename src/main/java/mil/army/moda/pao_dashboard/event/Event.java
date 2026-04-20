package mil.army.moda.pao_dashboard.event;

import jakarta.persistence.*;
import mil.army.moda.pao_dashboard.event_type.Event_Type;
import mil.army.moda.pao_dashboard.rank.Rank;
import mil.army.moda.pao_dashboard.user.User_Profile;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Date;

@Entity
public class Event {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String description;
    @ManyToOne()
    @JoinColumn(name = "event_type_id")
    private Event_Type event_type;
    private Date start_date;
    private Date end_date;
    @ManyToOne()
    @JoinColumn(name = "user_id")
    private User_Profile lead;

    public Event() {
    }

    public Event(Long id, String name, String description, Event_Type event_type, Date start_date, Date end_date, User_Profile lead) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.event_type = event_type;
        this.start_date = start_date;
        this.end_date = end_date;
        this.lead = lead;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Event_Type getEvent_type() {
        return event_type;
    }

    public void setEvent_type(Event_Type event_type) {
        this.event_type = event_type;
    }

    public Date getStart_date() {
        return start_date;
    }

    public void setStart_date(Date start_date) {
        this.start_date = start_date;
    }

    public Date getEnd_date() {
        return end_date;
    }

    public void setEnd_date(Date end_date) {
        this.end_date = end_date;
    }

    public User_Profile getLead() {
        return lead;
    }

    public void setLead(User_Profile lead) {
        this.lead = lead;
    }
}

