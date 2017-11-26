import {Component} from "@angular/core";
import {ApiService} from "../../../common/api.service";
import {OrderService} from "../../../common/service/order.service";
import {MessageType} from "../../../dx-ui/dx-ui.model";
import {NotificationService} from "../../../dx-ui/common/notification.service";

@Component({
    selector: 'app-calendar-planner',
    template: require('./calendar-planner.component.html')
})
export class CalendarPlannerComponent {
    calendarOptions: any = {
        height: 'parent',
        fixedWeekCount : false,
        editable: true,
        eventLimit: true, // allow "more" link when too many events
        defaultView: 'agendaWeek',
        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
        },
        events: [],
        eventDrop: (event: any) => { this.save(event) },
        eventResize: (event: any) => { this.save(event) }
    };

    constructor(private api: ApiService,
            private notifications: NotificationService,
            private orders: OrderService) {
        this.calendarOptions.events = api.calendar;
    }

    save(event: any) {
        this.orders.saveCalendarChange(event, (result: MessageType) => {
            if (result == MessageType.Fail) {
                this.notifications.error('dashboard.calendar.saveFailed');
            }
        });
    }
}
