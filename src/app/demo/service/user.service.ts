import {Injectable} from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }
    getAllUsers() {
        return this.http.get<any>('http://localhost:3001/api/users');
    }

    putUser(id:any,userDto){
        return this.http.put(`http://localhost:3001/api/users/${id}`,userDto);
    }

}
