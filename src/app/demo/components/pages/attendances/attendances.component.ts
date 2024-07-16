import { Component } from '@angular/core';
import {MessageService} from "primeng/api";
import {AttendanceService} from "../../../service/attendance.service";
import {DatePipe} from "@angular/common";


@Component({
    templateUrl: './attendances.component.html',
    providers: [MessageService, DatePipe]
})
export class AttendancesComponent {
    selectedDate: Date;
    attendanceList = [];
    constructor(
        private messageService: MessageService,
        private attendanceService: AttendanceService,
        private datePipe: DatePipe) { }

    onDateSelect(event: any) {
        console.log('Fecha seleccionada:', this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd'));
        let request = {
            date: this.datePipe.transform(this.selectedDate, 'yyyy-MM-dd')
        }
        this.attendanceService.getAttendanceByDate(request).subscribe(res=>{
            console.log(res)
            this.attendanceList = res;
        })

        // Aquí puedes agregar la lógica adicional que necesites
    }

    formatDate(date: string): string {
        return date ? this.datePipe.transform(date, 'dd-MM-yyyy HH:mm') : '';
    }
}
