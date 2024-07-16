import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttendancesRoutingModule } from './attendances-routing.module';
import { AttendancesComponent } from './attendances.component';
import {CalendarModule} from "primeng/calendar";
import {FormsModule} from "@angular/forms";
import {TableModule} from "primeng/table";
import {BadgeModule} from "primeng/badge";

@NgModule({
    imports: [
        CommonModule,
        AttendancesRoutingModule,
        CalendarModule,
        FormsModule,
        TableModule,
        BadgeModule
    ],
    declarations: [AttendancesComponent]
})
export class AttendancesModule { }
