export interface State {
    bill: number|string;
    percentage: number|string;
    people:number|string;
    total?: number;
  }
export interface Errors {
    [key: string]:any;
    bill?: number|string;
    people?: number|string;
    percentage?: number|string;
    total?:number;
  }
