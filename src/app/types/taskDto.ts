import { Order } from "./order";

export interface TaskDto {
    id?: number | null;
    name?: string;
    assignee?: boolean | null;
    processInstanceId?: string;
    order?: Order;
}
