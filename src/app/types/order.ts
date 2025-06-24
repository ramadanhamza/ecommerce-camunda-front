export interface Order {
    id?: number | null;
    amountToBorrow?: number | null;
    decision?: boolean | null;
    signature?: string;
}
