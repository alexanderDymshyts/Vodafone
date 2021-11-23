export interface ITicket{
    woNum: number;
    woStatusText: string;
    cancelable: boolean;
    reopenable: boolean;
    creationDate: Date;
}