import type {EventResponseDto} from "~/types";
type gridRowProps = {
    event: EventResponseDto;
}

export default function EventGridRow({event}: gridRowProps) {
    return (
        <>
            <tr>
                <td>{event.name}</td>
                <td>{event.eventType}</td>
                <td>{event.lead}</td>
                <td>{event.unit}</td>
                <td>{event.description}</td>
                <td>{event.startDate}</td>
                <td>{event.endDate}</td>
            </tr>
        </>
    )
}