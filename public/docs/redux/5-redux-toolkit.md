# Redux Toolkit
Redux Toolkit là một bộ công cụ (toolkit) chính thức được cung cấp bởi Redux để giúp đơn giản hóa và tăng cường quá trình phát triển với Redux. Redux Toolkit giúp giảm bớt cú pháp boilerplate và cung cấp một số tiện ích hữu ích để làm cho việc sử dụng Redux trở nên dễ dàng hơn. Các tính năng chính của Redux Toolkit bao gồm:

1. **`configureStore` Function:**
   - Redux Toolkit cung cấp một hàm `configureStore` thay thế cho `createStore` của Redux. Hàm này giúp tự động cấu hình một số middleware và các tùy chọn mặc định, giảm bớt cần phải cấu hình Redux store thủ công.

   ```javascript
   import { configureStore } from '@reduxjs/toolkit';
   import rootReducer from './reducers';

   const store = configureStore({
     reducer: rootReducer,
     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(myCustomMiddleware),
     devTools: process.env.NODE_ENV !== 'production',
   });

   export default store;
   ```

2. **`createSlice` Function:**
   - `createSlice` là một hàm giúp tạo ra reducers và action creators một cách dễ dàng và hiệu quả hơn. Nó giúp giảm boilerplate code và giúp code trở nên rõ ràng hơn.

   ```javascript
   import { createSlice } from '@reduxjs/toolkit';

   const counterSlice = createSlice({
     name: 'counter',
     initialState: 0,
     reducers: {
       increment: state => state + 1,
       decrement: state => state - 1,
     },
   });

   export const { increment, decrement } = counterSlice.actions;
   export default counterSlice.reducer;
   ```

3. **Immer Integration:**
   - Redux Toolkit tích hợp Immer để giúp xử lý trạng thái của ứng dụng Redux một cách dễ dàng hơn bằng cách sử dụng cú pháp mutable.

4. **`createAsyncThunk` Function:**
   - Redux Toolkit cung cấp `createAsyncThunk` để giúp quản lý logic không đồng bộ trong ứng dụng Redux một cách thuận tiện. Nó giúp tạo action creators cho các trạng thái "pending," "fulfilled," và "rejected" mà không cần phải viết boilerplate code.

   ```javascript
   import { createAsyncThunk } from '@reduxjs/toolkit';

   export const fetchData = createAsyncThunk('data/fetchData', async (endpoint) => {
     const response = await fetch(endpoint);
     const data = await response.json();
     return data;
   });
   ```

5. **`createEntityAdapter` Function:**
   - `createEntityAdapter` giúp quản lý trạng thái của mảng entities một cách hiệu quả và tự động tạo ra các reducers và selectors liên quan.

   ```javascript
   import { createEntityAdapter } from '@reduxjs/toolkit';

   const usersAdapter = createEntityAdapter();

   const initialState = usersAdapter.getInitialState();

   const usersReducer = (state = initialState, action) => {
     // Handle actions
   };
   ```

Redux Toolkit giúp giảm bớt boilerplate code, làm cho mã nguồn rõ ràng hơn và giúp tăng tốc quá trình phát triển ứng dụng Redux. Nó không yêu cầu bạn sử dụng tất cả các tính năng của nó; bạn có thể chọn sử dụng những tính năng mà bạn cảm thấy hữu ích trong dự án của mình.

---

# Cách sử dụng Redux Toolkit
Để sử dụng Redux Toolkit, bạn có thể thực hiện các bước sau:

### Bước 1: Cài đặt Redux Toolkit

Sử dụng npm hoặc yarn để cài đặt Redux Toolkit:

```bash
npm install @reduxjs/toolkit
```

### Bước 2: Tạo Redux Store

1. Tạo các slice bằng cách sử dụng `createSlice`:

   ```javascript
   // slices/counterSlice.js
   import { createSlice } from '@reduxjs/toolkit';

   const counterSlice = createSlice({
     name: 'counter',
     initialState: 0,
     reducers: {
       increment: (state) => state + 1,
       decrement: (state) => state - 1,
     },
   });

   export const { increment, decrement } = counterSlice.actions;
   export default counterSlice.reducer;
   ```

2. Kết hợp các slice vào rootReducer:

   ```javascript
   // reducers/index.js
   import { combineReducers } from 'redux';
   import counterReducer from '../slices/counterSlice';

   const rootReducer = combineReducers({
     counter: counterReducer,
     // Add other reducers here
   });

   export default rootReducer;
   ```

3. Tạo Redux store sử dụng `configureStore`:

   ```javascript
   // store/index.js
   import { configureStore } from '@reduxjs/toolkit';
   import rootReducer from '../reducers';

   const store = configureStore({
     reducer: rootReducer,
   });

   export default store;
   ```

### Bước 3: Kết nối Redux Store với Ứng dụng React

1. Sử dụng `Provider` từ thư viện `react-redux` để bọc ứng dụng React:

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

### Bước 4: Sử dụng Redux Toolkit trong Component React

1. Sử dụng `useDispatch` và `useSelector` từ thư viện `react-redux` để dispatch actions và truy cập trạng thái:

   ```javascript
   // CounterComponent.js
   import React from 'react';
   import { useDispatch, useSelector } from 'react-redux';
   import { increment, decrement } from '../slices/counterSlice';

   const CounterComponent = () => {
     const dispatch = useDispatch();
     const counter = useSelector((state) => state.counter);

     const handleIncrement = () => {
       dispatch(increment());
     };

     const handleDecrement = () => {
       dispatch(decrement());
     };

     return (
       <div>
         <p>Counter: {counter}</p>
         <button onClick={handleIncrement}>Increment</button>
         <button onClick={handleDecrement}>Decrement</button>
       </div>
     );
   };

   export default CounterComponent;
   ```

Với Redux Toolkit, bạn không cần phải tạo action types hoặc action creators một cách rời rạc, và cú pháp của bạn trở nên ngắn gọn hơn. Slice giúp tổ chức và giảm boilerplate code trong ứng dụng Redux của bạn.