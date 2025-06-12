# Khi nào sử dụng useState
`useState` là một hook trong React được sử dụng để quản lý state trong các functional components. Bạn sử dụng `useState` khi bạn muốn giữ và cập nhật giá trị của một biến state trong component của bạn.

Dưới đây là một số tình huống khi bạn thường sử dụng `useState`:

1. **Lưu trữ và cập nhật state:**
   Khi bạn cần theo dõi và cập nhật giá trị của một biến trong component. Ví dụ, một trạng thái có thể là kết quả của một tác vụ bất đồng bộ, giá trị người dùng nhập vào một ô input, hoặc bất cứ dữ liệu nào có thể thay đổi trong quá trình thực thi ứng dụng.

   ```jsx
   import React, { useState } from 'react';

   const ExampleComponent = () => {
     const [count, setCount] = useState(0);

     return (
       <div>
         <p>You clicked {count} times</p>
         <button onClick={() => setCount(count + 1)}>
           Click me
         </button>
       </div>
     );
   };
   ```

2. **Quản lý trạng thái mở/đóng của một component hoặc modal:**
   Khi bạn muốn theo dõi trạng thái hiển thị/ẩn của một phần tử trong giao diện người dùng.

   ```jsx
   import React, { useState } from 'react';

   const Modal = () => {
     const [isOpen, setIsOpen] = useState(false);

     return (
       <div>
         <button onClick={() => setIsOpen(!isOpen)}>
           {isOpen ? 'Close Modal' : 'Open Modal'}
         </button>
         {isOpen && <div>This is a modal</div>}
       </div>
     );
   };
   ```

3. **Form handling:**
   Khi bạn muốn theo dõi giá trị người dùng nhập vào các ô input trong một form.

   ```jsx
   import React, { useState } from 'react';

   const MyForm = () => {
     const [inputValue, setInputValue] = useState('');

     const handleChange = (e) => {
       setInputValue(e.target.value);
     };

     return (
       <form>
         <input
           type="text"
           value={inputValue}
           onChange={handleChange}
         />
         <p>You typed: {inputValue}</p>
       </form>
     );
   };
   ```

Nhớ rằng `useState` chỉ sử dụng được trong functional components và không thể sử dụng trong các class components. Nếu bạn đang làm việc với class components, bạn sẽ sử dụng `this.state` và `this.setState`.