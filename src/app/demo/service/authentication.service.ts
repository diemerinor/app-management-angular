import {Injectable} from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }
    login(request) {
        return this.http.post<any>(`http://localhost:3001/api/auth/login`,request);
    }


}
