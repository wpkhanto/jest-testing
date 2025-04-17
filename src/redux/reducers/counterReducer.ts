import { INCREMENT, DECREMENT, RESET } from '../actions/types';

interface CounterState {
  count: number;
}

interface CounterAction {
  type: string;
  payload?: any;
}

const initialState: CounterState = {
  count: 0
};

const counterReducer = (state = initialState, action: CounterAction): CounterState => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1
      };
    case DECREMENT:
      return {
        ...state,
        count: state.count - 1
      };
    case RESET:
      return {
        ...state,
        count: 0
      };
    default:
      return state;
  }
};

export default counterReducer;