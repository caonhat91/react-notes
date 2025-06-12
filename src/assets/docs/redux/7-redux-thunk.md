# Cách sử dụng Redux Thunk
Để sử dụng Redux Thunk, bạn cần thực hiện một số bước sau:

### Bước 1: Cài đặt Redux và Redux Thunk

```bash
npm install redux-thunk
```

### Bước 2: Tạo Redux Store

1. **Tạo Reducer:**

   ```javascript
   // reducers/counterReducer.js
   const counterReducer = (state = 0, action) => {
     switch (action.type) {
       case 'INCREMENT':
         return state + 1;
       case 'DECREMENT':
         return state - 1;
       default:
         return state;
     }
   };

   export default counterReducer;
   ```

2. **Kết hợp các reducers:**

   ```javascript
   // reducers/index.js
   import { combineReducers } from 'redux';
   import counterReducer from './counterReducer';

   const rootReducer = combineReducers({
     counter: counterReducer,
     // Add other reducers here
   });

   export default rootReducer;
   ```

3. **Tạo Redux Store với Redux Thunk:**

   ```javascript
   // store/index.js
   import { createStore, applyMiddleware } from 'redux';
   import thunk from 'redux-thunk';
   import rootReducer from '../reducers';

   const store = createStore(rootReducer, applyMiddleware(thunk));

   export default store;
   ```

### Bước 3: Kết nối Redux Store với Ứng dụng React

1. **Bọc ứng dụng React trong `<Provider>`:**

   ```javascript
   // index.js hoặc App.js
   import React from 'react';
   import ReactDOM from 'react-dom';
   import App from './App';
   import { Provider } from 'react-redux';
   import store from './store';

   ReactDOM.render(
     <Provider store={store}>
       <App />
     </Provider>,
     document.getElementById('root')
   );
   ```

### Bước 4: Sử dụng Redux Thunk trong Component React

1. **Dispatch Actions sử dụng Redux Thunk:**

   ```javascript
   // components/CounterComponent.js
   import React from 'react';
   import { useDispatch, useSelector } from 'react-redux';
   import { increment, decrement, incrementAsync } from '../actions/counterActions';

   const CounterComponent = () => {
     const dispatch = useDispatch();
     const counter = useSelector((state) => state.counter);

     const handleIncrement = () => {
       dispatch(increment());
     };

     const handleDecrement = () => {
       dispatch(decrement());
     };

     const handleIncrementAsync = () => {
       dispatch(incrementAsync());
     };

     return (
       <div>
         <p>Counter: {counter}</p>
         <button onClick={handleIncrement}>Increment</button>
         <button onClick={handleDecrement}>Decrement</button>
         <button onClick={handleIncrementAsync}>Increment Async</button>
       </div>
     );
   };

   export default CounterComponent;
   ```

2. **Defining Thunk Action Creators:**

   ```javascript
   // actions/counterActions.js
   export const increment = () => ({
     type: 'INCREMENT',
   });

   export const decrement = () => ({
     type: 'DECREMENT',
   });

   export const incrementAsync = () => {
     return (dispatch) => {
       setTimeout(() => {
         dispatch(increment());
       }, 1000);
     };
   };
   ```

Redux Thunk cho phép bạn dispatch các actions không đồng bộ (async actions), giúp xử lý logic không đồng bộ trong ứng dụng Redux của bạn. Trong ví dụ trên, `incrementAsync` là một action creator sử dụng Redux Thunk để tạo ra một hàm dispatch không đồng bộ, giả lập một tác vụ độ trễ 1 giây trước khi dispatch action `increment`.


---

Đây là một ví dụ về cách sử dụng Redux Thunk khi call API:

```javascript
// action creator trả về một thunk
const fetchData = () => {
  return async (dispatch) => {
    dispatch({ type: 'FETCH_DATA_REQUEST' });

    try {
      // Gọi API hoặc thực hiện công việc bất đồng bộ khác ở đây
      const response = await fetch('https://api.example.com/data');
      const data = await response.json();

      dispatch({ type: 'FETCH_DATA_SUCCESS', payload: data });
    } catch (error) {
      dispatch({ type: 'FETCH_DATA_FAILURE', payload: error.message });
    }
  };
};
```

Sau đó, bạn có thể sử dụng middleware Redux Thunk để kích hoạt thunk khi dispatch action:

```javascript
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));
```

Khi bạn gọi `dispatch(fetchData())`, Redux Thunk sẽ bắt đầu xử lý thunk và cho phép bạn thực hiện các tác vụ bất đồng bộ trước khi dispatch các action tiếp theo.