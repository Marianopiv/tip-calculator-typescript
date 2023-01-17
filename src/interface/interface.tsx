export interface State {
    bill: number;
    total?: number;
  }
export interface Errors {
    [key: string]:any;
    bill?: number;
    people?: number;
    percentage?: number;
    total?:number;
  }
  