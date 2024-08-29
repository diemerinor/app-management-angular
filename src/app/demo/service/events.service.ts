import {Injectable} from "@angular/core";
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {EventDTO} from "../api/event";

@Injectable()
export class EventsService {
    constructor(private http: HttpClient) { }
    getActiveEvents() {
        return this.http.post<any>(`http://localhost:3001/api/events`,null);
    }

    getAllEvents(){
        return this.http.get<any>(`http://localhost:3001/api/events`);
    }

    createEvent(event: EventDTO): Observable<Event> {
        return this.http.post<Event>(`http://localhost:3001/api/events/event/create`, event);
    }

    updateEvent(id: string, event: EventDTO): Observable<Event> {
        return this.http.put<Event>(`http://localhost:3001/api/events/${id}`, event);
    }

}
