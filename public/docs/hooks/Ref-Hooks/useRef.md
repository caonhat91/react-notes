# Khi nào sử dụng useRef
Hook `useRef` trong React được sử dụng để tham chiếu đến một DOM element hoặc để lưu trữ các giá trị mà không gây ra việc rendering lại component khi giá trị thay đổi. Dưới đây là một số tình huống khi bạn thường sử dụng `useRef`:

1. **Truy cập và thao tác trực tiếp với DOM elements:**
   Khi bạn muốn thực hiện các thao tác trực tiếp với các phần tử trong DOM, chẳng hạn như focus vào một ô input, đo lường kích thước của một phần tử, hoặc thực hiện các hành động không gây ảnh hưởng đến re-rendering.

   ```jsx
   import React, { useRef, useEffect } from 'react';

   const MyComponent = () => {
     const inputRef = useRef();

     useEffect(() => {
       // Focus on the input element when the component mounts
       inputRef.current.focus();
     }, []);

     return <input ref={inputRef} />;
   };
   ```

2. **Lưu trữ giá trị mà không gây re-render:**
   Khi bạn muốn lưu trữ một giá trị mà khi thay đổi không làm kích thích việc rendering lại component.

   ```jsx
   import React, { useRef, useEffect } from 'react';

   const MyComponent = () => {
     const countRef = useRef(0);

     useEffect(() => {
       // This effect runs after every render
       console.log('Render count:', countRef.current);
       // Update the count without triggering re-render
       countRef.current += 1;
     });

     return <div>Check the console for render count</div>;
   };
   ```

3. **Lưu trữ giá trị của biến mà không làm re-render component:**
   Khi bạn muốn lưu trữ giá trị của một biến mà khi giá trị thay đổi không gây ra việc rendering lại component.

   ```jsx
   import React, { useRef, useState } from 'react';

   const MyComponent = () => {
     const timerId = useRef(null);
     const [isRunning, setIsRunning] = useState(false);

     const startTimer = () => {
       setIsRunning(true);
       timerId.current = setInterval(() => {
         console.log('Timer is running...');
       }, 1000);
     };

     const stopTimer = () => {
       setIsRunning(false);
       clearInterval(timerId.current);
     };

     return (
       <div>
         <button onClick={startTimer} disabled={isRunning}>
           Start Timer
         </button>
         <button onClick={stopTimer} disabled={!isRunning}>
           Stop Timer
         </button>
       </div>
     );
   };
   ```

Nhớ rằng giá trị của `ref` không thay đổi sau mỗi render, và nó không gây ra re-render khi giá trị thay đổi. Nó thường được sử dụng trong các trường hợp bạn muốn lưu trữ một giá trị mà không muốn kích thích việc rendering lại.