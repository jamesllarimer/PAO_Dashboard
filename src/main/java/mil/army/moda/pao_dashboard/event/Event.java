package mil.army.moda.pao_dashboard.event;

import jakarta.persistence.*;
import mil.army.moda.pao_dashboard.event_status.EventStatus;
import mil.army.moda.pao_dashboard.event_type.EventType;
import mil.army.moda.pao_dashboard.posting_location.PostingLocation;
import mil.army.moda.pao_dashboard.theme.Theme;
import mil.army.moda.pao_dashboard.user.UserProfile;

import java.util.Date;

@Entity
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    @ManyToOne()
    @JoinColumn(name = "event_type_id")
    private EventType event_type;
    private Date start_date;
    private Date end_date;
    @ManyToOne()
    @JoinColumn(name = "user_id")
    private UserProfile lead;
    @ManyToOne()
    @JoinColumn(name = "event_status_id")
    private EventStatus eventStatus;
    @ManyToOne()
    private Theme theme;
    @ManyToOne()
    private PostingLocation postingLocation;
    public Event() {
    }

    public Event(Long id, String name, String description, EventType event_type, Date start_date, Date end_date, UserProfile lead, EventStatus eventStatus, Theme theme, PostingLocation postingLocation) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.event_type = event_type;
        this.start_date = start_date;
        this.end_date = end_date;
        this.lead = lead;
        this.eventStatus = eventStatus;
        this.theme = theme;
        this.postingLocation = postingLocation;
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

    public EventType getEvent_type() {
        return event_type;
    }

    public void setEvent_type(EventType event_type) {
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

    public UserProfile getLead() {
        return lead;
    }

    public void setLead(UserProfile lead) {
        this.lead = lead;
    }

    public EventStatus getEventStatus() {
        return eventStatus;
    }

    public void setEventStatus(EventStatus eventStatus) {
        this.eventStatus = eventStatus;
    }

    public Theme getTheme() {
        return theme;
    }

    public void setTheme(Theme theme) {
        this.theme = theme;
    }

    public PostingLocation getPostingLocation() {
        return postingLocation;
    }

    public void setPostingLocation(PostingLocation postingLocation) {
        this.postingLocation = postingLocation;
    }
}

