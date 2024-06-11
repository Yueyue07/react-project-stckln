import { SaleInfo } from './GetProductAPI';

export interface State {
  sales: SaleInfo[];
}

export type SortAction =
  | { type: 'ascend'; value: keyof SaleInfo }
  | {
      type: 'descend';
      value: keyof SaleInfo;
    };
export function ProductSalesTableReducer(state: State, action: SortAction) {
  let isAscend: boolean = true;
  let isValidDate = (dateString: string) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  };
  let predictor = (a: SaleInfo, b: SaleInfo) => {
    if (typeof a[action.value] === 'number') {
      return isAscend
        ? (a[action.value] as number) - (b[action.value] as number)
        : (b[action.value] as number) - (a[action.value] as number);
    }
    if (typeof a[action.value] === 'string') {
      if (isValidDate(a[action.value] as string)) {
        return isAscend
          ? new Date(a[action.value] as string).getTime() -
              new Date(b[action.value] as string).getTime()
          : new Date(b[action.value] as string).getTime() -
              new Date(a[action.value] as string).getTime();
      }
      return isAscend
        ? (a[action.value] as string).localeCompare(b[action.value] as string)
        : (b[action.value] as string).localeCompare(a[action.value] as string);
    }
  };
  switch (action.type) {
    case 'ascend': {
      isAscend = true;
      return {
        ...state,
        sales: [...state.sales.sort(predictor)],
      };
    }
    case 'descend': {
      isAscend = false;
      return {
        ...state,
        sales: [...state.sales.sort(predictor)],
      };
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
