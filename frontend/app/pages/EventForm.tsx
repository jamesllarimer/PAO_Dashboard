import {useForm} from "react-hook-form";
import * as Yup from "yup";
import {date, number, string} from "yup";
import {yupResolver} from "@hookform/resolvers/yup/src";
import {useUserContext} from "~/context/UserProfileContext";
import {useEffect, useState} from "react";
import type {EventRequest, EventStatus, EventType, PostingLocation, Theme, ProductType} from "~/types";

const validationSchema = Yup.object({
        name: string().required('Event name is required.'),
        description: string().required('Description is required.'),
        startDate: string().required('Start date is required.'),
        endDate: string().required('End date is required.'),
        leadId: number().optional(),
        eventStatusId: number().optional(),
        eventTypeId: number().optional(),
        productTypeId: number().optional(),
        postingLocationId: number().optional(),
        eventThemeId: number().optional(),
    }
);

export default function EventForm(eventid: number | undefined) {
    const {users} = useUserContext();
    const [eventTypes, setEventTypes] = useState<EventType[]>([]);
    const [postingLocations, setPostingLocations] = useState<PostingLocation[]>([]);
    const [eventStatuses, setEventStatuses] = useState<EventStatus[]>([]);
    const [eventThemes, setEventThemes] = useState<Theme[]>([])
    const [productTypes, setProductTypes] = useState<ProductType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    async function getPostingLocations(): Promise<PostingLocation[]> {
        try {
            const url = 'http://localhost:8080/api/v1/posting_locations'
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return await response.json();
        } catch (error: any) {
            console.log(error);
            return error;
        }
    }

    async function getEventStatuses(): Promise<EventStatus[]> {
        try {
            const url = 'http://localhost:8080/api/v1/event_status'
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return await response.json();
        } catch (error: any) {
            console.log(error);
            return error;
        }
    }

    async function getEventTypes(): Promise<EventType[]> {
        try {
            const url = 'http://localhost:8080/api/v1/event_type'
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return await response.json();
        } catch (error: any) {
            console.log(error);
            return error;
        }
    }

    async function getEventThemes(): Promise<Theme[]> {
        try {
            const url = 'http://localhost:8080/api/v1/theme'
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (!response.ok) {
                alert(response.statusText);
            }
            return await response.json();
        } catch (error: any) {
            alert(error);
            return error;
        }
    }

    async function getProductTypes(): Promise<ProductType[]> {
        try {
            const url = 'http://localhost:8080/api/v1/product_type'
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            if (!response.ok) {
                alert(response.statusText);
            }
            return await response.json();
        } catch (error: any) {
            alert(error);
            return error;
        }
    }

    const onSubmit = async (data: EventRequest) => {
        setLoading(true);
        try {
            const url = 'http://localhost:8080/api/v1/events'
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            let result = await response.json();
            console.log(result);
            setLoading(false);
            reset()

        } catch (error: any) {
            console.log(error);
            setLoading(false);
            return error;
        }
    }

    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm<EventRequest>({
        mode: "onBlur",
        resolver: yupResolver(validationSchema)
    });

    function getDataForDropdowns() {
        getEventTypes().then((types: EventType[]): void => setEventTypes(types));
        getPostingLocations().then((locations: PostingLocation[]): void => setPostingLocations(locations));
        getEventStatuses().then((eventStatuses: EventStatus[]): void => setEventStatuses(eventStatuses));
        getEventThemes().then((themes: Theme[]): void => setEventThemes(themes));
        getProductTypes().then((types: ProductType[]): void => setProductTypes(types));
    }

    useEffect(() => {
        getDataForDropdowns();
    }, [])

    return (
        <div className="w-1/2 mx-auto mt-2">
            <form onSubmit={handleSubmit(data => onSubmit(data))} method="post"
                  className={"p-5 border border-yellow-500"}>
                <div className={"space-y-12"}>
                    <h2 className="text-base/7 font-semibold text-white">Create a new event</h2>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="Name" className={"block text-sm/6 font-medium text-white"}>Event
                                Name</label>
                            <div className="mt-2">
                                <div
                                    className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                                    <input type="text" id="Name" placeholder="Enter Event Name"
                                           className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6" {...register('name')} />
                                </div>
                                {errors.name && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="Description"
                                   className={"block text-sm/6 font-medium text-white"}>Description</label>
                            <div className="mt-2">
                                <div
                                    className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                                <textarea id="Description" placeholder="Enter Event Description"
                                          className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6" {...register('description')} />
                                </div>
                                {errors.description && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.description.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="StartDate"
                                   className={"block text-sm/6 font-medium text-white"}>Start Date</label>
                            <div className="mt-2">
                                <div
                                    className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                                    <input type={"date"} id="StartDate" placeholder="The date the event starts"
                                           className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6" {...register('startDate')} />
                                </div>
                                {errors.startDate && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.startDate.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="EndDate"
                                   className={"block text-sm/6 font-medium text-white"}>End Date</label>
                            <div className="mt-2">
                                <div
                                    className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-500">
                                    <input type={"date"} id="EndDate" placeholder="The date the event ends if multi-day"
                                           className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6" {...register('endDate')} />
                                </div>
                                {errors.endDate && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.endDate.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="lead" className="block text-sm/6 font-medium text-white">
                            Assigned To
                        </label>
                        <div className="mt-2 grid grid-cols-1">
                            <select
                                id="Lead"
                                className="col-start-1 row-start-1 w-full  rounded-md bg-white/5 py-1.5 pr-8 pl-3 text-base
                                text-white outline-1 -outline-offset-1 outline-white/10 *:bg-gray-800 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-400 sm:text-sm/6"
                                {...register('leadId')}
                            >
                                {users?.map((user) => (
                                    <option key={user.id}
                                            value={user.id}>{`${user.rankAbbreviation} ${user.lastName}`}</option>
                                ))}
                            </select>
                        </div>
                        {errors.leadId && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.leadId.message}
                            </p>
                        )}
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="EventType" className="block text-sm/6 font-medium text-white">
                            Event Type
                        </label>
                        <div className="mt-2 grid grid-cols-1">
                            <select
                                id="EventType"
                                className="col-start-1 row-start-1 w-full  rounded-md bg-white/5 py-1.5 pr-8 pl-3 text-base text-white outline-1 -outline-offset-1 
                                outline-white/10 *:bg-gray-800 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-400 sm:text-sm/6"
                                {...register('eventTypeId')}
                            >
                                {eventTypes?.map((eventType: EventType) => (
                                    <option key={eventType.id}
                                            value={eventType.id}>{eventType.name}</option>
                                ))}
                            </select>
                            {errors.eventTypeId && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.eventTypeId.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="EventType" className="block text-sm/6 font-medium text-white">
                            Product Type
                        </label>
                        <div className="mt-2 grid grid-cols-1">
                            <select
                                id="EventType"
                                className="col-start-1 row-start-1 w-full  rounded-md bg-white/5 py-1.5 pr-8 pl-3 text-base text-white outline-1 -outline-offset-1
                                outline-white/10 *:bg-gray-800 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-400 sm:text-sm/6"
                                {...register('productTypeId')}
                            >
                                {productTypes?.map((productType: ProductType) => (
                                    <option key={productType.id}
                                            value={productType.id}>{productType.name}</option>
                                ))}
                            </select>
                            {errors.eventTypeId && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.eventTypeId.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="PostingLocation" className="block text-sm/6 font-medium text-white">
                            Posting Location
                        </label>
                        <div className="mt-2 grid grid-cols-1">
                            <select
                                id="PostingLocation"
                                className="col-start-1 row-start-1 w-full  rounded-md bg-white/5 py-1.5 pr-8 pl-3 text-base text-white outline-1 -outline-offset-1 outline-white/10 *:bg-gray-800 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-400 sm:text-sm/6"
                                {...register('postingLocationId')}
                            >
                                {postingLocations?.map((location: PostingLocation) => (
                                    <option key={location.id}
                                            value={location.id}>{location.name}</option>
                                ))}
                            </select>
                            {errors.postingLocationId && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.postingLocationId.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="EventStatus" className="block text-sm/6 font-medium text-white">
                            Event Status
                        </label>
                        <div className="mt-2 grid grid-cols-1">
                            <select
                                id="EventStatus"
                                className="col-start-1 row-start-1 w-full  rounded-md bg-white/5 py-1.5 pr-8 pl-3 text-base text-white outline-1 -outline-offset-1 outline-white/10 *:bg-gray-800 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-400 sm:text-sm/6"
                                {...register('eventStatusId')}
                            >
                                {eventStatuses?.map((status: EventStatus) => (
                                    <option key={status.id}
                                            value={status.id}>{status.name}</option>
                                ))}
                            </select>
                            {errors.eventStatusId && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.eventStatusId.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="EventTheme" className="block text-sm/6 font-medium text-white">
                            Event Theme
                        </label>
                        <div className="mt-2 grid grid-cols-1">
                            <select
                                id="EventTheme"
                                className="col-start-1 row-start-1 w-full  rounded-md bg-white/5 py-1.5 pr-8 pl-3 text-base text-white outline-1 -outline-offset-1 outline-white/10 *:bg-gray-800 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-400 sm:text-sm/6"
                                {...register('eventThemeId')}
                            >
                                {eventThemes?.map((theme: Theme) => (
                                    <option key={theme.id}
                                            value={theme.id}>{theme.name}</option>
                                ))}
                            </select>
                            {errors.eventThemeId && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.eventThemeId.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm/6 font-semibold text-white">
                        Cancel
                    </button>
                    {!loading ?
                        <button
                            type="submit"
                            className="rounded-md bg-amber-400 px-3 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
                        >
                            Save
                        </button> :
                        <button type="button"
                                className="rounded-md bg-amber-400 px-4 py-2 text-sm font-semibold text-white" disabled>
                            <svg className="mr-3 size-4 animate-spin -ml-1 h-5 w-5 text-white" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="12" stroke="currentColor"
                                        strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4z"></path>
                            </svg>
                            Saving…
                        </button>}
                </div>
            </form>
        </div>
    )
}