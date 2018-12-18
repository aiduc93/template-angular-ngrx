import { Customer } from '../models/customer';
import { Actions, CREATE_CUSTOMER, DELETE_CUSTOMER } from '../actions/customer.actions';

const initialState: Customer = {
  id: '1',
  name: 'Duc',
  age: 26,
  active: true
};

export function reducer(
  state: Customer[] = [initialState],
  action: Actions) {
  switch (action.type) {
    case CREATE_CUSTOMER:
      return [...state, action.payload];
    case DELETE_CUSTOMER:
      return state.filter(({ id }) => id !== action.id);
    default:
      return state;
  }
}
