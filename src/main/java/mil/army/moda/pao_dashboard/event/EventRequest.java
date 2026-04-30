package mil.army.moda.pao_dashboard.event;

import java.util.Date;

public class EventRequest {
    private String name;
    private String description;
    private Long eventTypeId;
    private Long leadId;
    private Long eventStatusId;
    private Date startDate;
    private Date endDate;

    public EventRequest(String name, String description, Long eventTypeId, Long leadId, Long eventStatusId, Date startDate, Date endDate) {
        this.name = name;
        this.description = description;
        this.eventTypeId = eventTypeId;
        this.leadId = leadId;
        this.eventStatusId = eventStatusId;
        this.startDate = startDate;
        this.endDate = endDate;
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

    public Long getEventTypeId() {
        return eventTypeId;
    }

    public void setEventTypeId(Long eventTypeId) {
        this.eventTypeId = eventTypeId;
    }

    public Long getLeadId() {
        return leadId;
    }

    public void setLeadId(Long leadId) {
        this.leadId = leadId;
    }

    public Long getEventStatusId() {
        return eventStatusId;
    }

    public void setEventStatusId(Long eventStatusId) {
        this.eventStatusId = eventStatusId;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
}