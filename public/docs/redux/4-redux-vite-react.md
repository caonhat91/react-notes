# Làm thế nào tích hợp Redux với Vite + React
Để sử dụng Redux với Vite và React, bạn có thể tuân theo các bước sau:

1. **Cài đặt Redux và React-Redux:**
   - Sử dụng npm để cài đặt Redux và React-Redux:

     ```bash
     npm install redux react-redux
     ```

2. **Tạo Redux Store:**
   - Tạo một thư mục mới trong src, chẳng hạn như src/store.
   - Trong thư mục store, tạo một file index.js:

     ```javascript
     // src/store/index.js
     import { createStore } from 'redux';
     import rootReducer from './reducers';

     const store = createStore(rootReducer);

     export default store;
     ```

   - Tạo một thư mục reducers trong thư mục store và tạo các reducers cần thiết:

     ```javascript
     // src/store/reducers/index.js
     import { combineReducers } from 'redux';

     // Import your reducers here

     const rootReducer = combineReducers({
       // Add your reducers here
     });

     export default rootReducer;
     ```

3. **Kết nối Redux Store với Ứng dụng React:**
   - Mở file src/main.jsx hoặc src/main.js và thực hiện các bước sau:

     ```javascript
     // src/main.jsx
     import React from 'react';
     import ReactDOM from 'react-dom';
     import App from './App';
     import { Provider } from 'react-redux';
     import store from './store';

     ReactDOM.render(
       <Provider store={store}>
         <App />
       </Provider>,
       document.getElementById('app')
     );
     ```

4. **Sử dụng Redux Trong Component:**
   - Trong các component muốn sử dụng Redux, sử dụng hook `useDispatch` để dispatch actions và hook `useSelector` để truy cập trạng thái.

     ```javascript
     // ExampleComponent.jsx
     import React from 'react';
     import { useDispatch, useSelector } from 'react-redux';

     const ExampleComponent = () => {
       const dispatch = useDispatch();
       const counter = useSelector((state) => state.counter);

       const increment = () => {
         dispatch({ type: 'INCREMENT' });
       };

       return (
         <div>
           <p>Counter: {counter}</p>
           <button onClick={increment}>Increment</button>
         </div>
       );
     };

     export default ExampleComponent;
     ```

5. **Tạo Reducers và Actions:**
   - Trong thư mục reducers, tạo các file reducers cần thiết và định nghĩa các actions.

     ```javascript
     // src/store/reducers/counter.js
     const counterReducer = (state = 0, action) => {
       switch (action.type) {
         case 'INCREMENT':
           return state + 1;
         default:
           return state;
       }
     };

     export default counterReducer;
     ```

   - Thêm reducer này vào rootReducer trong src/store/reducers/index.js.

6. **Chạy Ứng Dụng:**
   - Chạy ứng dụng bằng lệnh:

     ```bash
     npm run dev
     ```

   - Mở trình duyệt và truy cập http://localhost:3000 để xem ứng dụng của bạn.

Nhớ rằng, đối với một ứng dụng lớn hơn, bạn có thể cần sắp xếp mã nguồn của mình thành các thư mục và modules phù hợp để duy trì dễ dàng hơn.