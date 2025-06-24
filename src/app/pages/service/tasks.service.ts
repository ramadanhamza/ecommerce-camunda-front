import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class TasksService {
    constructor(private http: HttpClient) {}

    tasksApiUrl = 'http://localhost:8080/api/tasks';
    ordersApiUrl = 'http://localhost:8080/api/orders';

    getTasksByDefinitionKey(taskDefinitionKey: string): Observable<any> {
        return this.http.get(this.tasksApiUrl + "/taskDefinitionKey/" + taskDefinitionKey);
    }

    getTaskByProcessInstanceId(processInstanceId: string): Observable<any> {
        return this.http.get(this.tasksApiUrl + "/processInstance/" + processInstanceId);
    }

    completeDecisionTask(processInstanceId: string, decision: boolean): Observable<any> {
        return this.http.post(this.tasksApiUrl + "/complete/decision/" + processInstanceId + "/" + decision, {});
    }

    findAllOrders(): Observable<any> {
        return this.http.get(this.ordersApiUrl + "/all");
    }
}
