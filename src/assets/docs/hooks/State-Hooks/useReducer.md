# Khi nào sử dụng useReducer
Hook `useReducer` trong React được sử dụng khi bạn có một logic state phức tạp và cần quản lý state theo một cách có tổ chức hơn, đặc biệt là khi state phụ thuộc vào trạng thái trước đó và các hành động được thực hiện. Dưới đây là một số tình huống khi bạn thường sử dụng `useReducer`:

1. **Quản lý state phức tạp:**
   Khi state của bạn trở nên phức tạp và có nhiều biến liên quan đến nhau, sử dụng `useReducer` có thể giúp tạo ra một cơ chế quản lý state hiệu quả hơn.

   ```jsx
   import React, { useReducer } from 'react';

   const initialState = { count: 0 };

   const reducer = (state, action) => {
     switch (action.type) {
       case 'increment':
         return { count: state.count + 1 };
       case 'decrement':
         return { count: state.count - 1 };
       default:
         return state;
     }
   };

   const Counter = () => {
     const [state, dispatch] = useReducer(reducer, initialState);

     return (
       <div>
         Count: {state.count}
         <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
         <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
       </div>
     );
   };
   ```

2. **Các hành động phức tạp:**
   Khi có nhiều hành động và mỗi hành động cần có một logic xử lý riêng, sử dụng `useReducer` có thể giúp tách rời logic xử lý ra khỏi component và giữ cho code dễ đọc hơn.

   ```jsx
   import React, { useReducer } from 'react';

   const initialState = { count: 0, step: 1 };

   const reducer = (state, action) => {
     switch (action.type) {
       case 'increment':
         return { ...state, count: state.count + state.step };
       case 'decrement':
         return { ...state, count: state.count - state.step };
       case 'setStep':
         return { ...state, step: action.payload };
       default:
         return state;
     }
   };

   const Counter = () => {
     const [state, dispatch] = useReducer(reducer, initialState);

     return (
       <div>
         Count: {state.count}
         <input
           type="number"
           value={state.step}
           onChange={(e) => dispatch({ type: 'setStep', payload: parseInt(e.target.value) })}
         />
         <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
         <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
       </div>
     );
   };
   ```

3. **Performance optimization:**
   Khi cần performance optimization vì `useReducer` có thể giúp giảm số lần render và re-render của component trong trường hợp state phức tạp.

   ```jsx
   import React, { useReducer, useMemo } from 'react';

   const initialState = { count: 0 };

   const reducer = (state, action) => {
     switch (action.type) {
       case 'increment':
         return { count: state.count + 1 };
       case 'decrement':
         return { count: state.count - 1 };
       default:
         return state;
     }
   };

   const Counter = () => {
     const [state, dispatch] = useReducer(reducer, initialState);

     // Memorize the result of the component to prevent unnecessary renders
     const memoizedComponent = useMemo(() => (
       <div>
         Count: {state.count}
         <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
         <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
       </div>
     ), [state.count]);

     return memoizedComponent;
   };
   ```

Lưu ý rằng việc sử dụng `useReducer` hay `useState` phụ thuộc vào tình huống cụ thể và sự thoải mái của bạn với cách quản lý state trong React. Cả hai đều có thể được sử dụng để quản lý state trong React, nhưng `useReducer` thường được ưa chuộng khi logic state phức tạp hơn.