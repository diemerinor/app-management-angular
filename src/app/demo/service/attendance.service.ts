import {Injectable} from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AttendanceService {
    constructor(private http: HttpClient) { }
    getAttendanceByDate(date) {
        return this.http.post<any>(`http://localhost:3001/api/attendance`,date);
    }

    putUser(id:any,userDto){
        return this.http.put(`http://localhost:3001/api/users/${id}`,userDto);
    }

}
