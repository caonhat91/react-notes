# TDD là gì?
TDD là viết tắt của "Test-Driven Development," một phương pháp phát triển phần mềm mà bạn viết các bài kiểm thử trước khi triển khai mã nguồn chính thức. Quá trình này giúp đảm bảo rằng mã nguồn của bạn hoạt động đúng và đáp ứng các yêu cầu, cũng như tạo ra mã linh hoạt và dễ bảo trì.

## Làm thế nào để áp dụng TDD?

Các bước cơ bản để triển khai Test-Driven Development (TDD):

1. **Chọn một Chức năng/Chức năng Con:** Lựa chọn một phần nhỏ của dự án bạn muốn triển khai và tập trung vào nó.

2. **Viết Bài Kiểm Thử Đầu Tiên:** Bắt đầu bằng việc viết một bài kiểm thử đơn giản, mô tả một tính năng hoặc hành vi của phần mềm bạn đang phát triển.

3. **Chạy Bài Kiểm Thử - Bài Kiểm Thử Sẽ Thất Bại (RED):** Chắc chắn rằng bài kiểm thử thất bại, vì chức năng mà bạn chưa triển khai.

4. **Viết Mã Nguồn:** Bắt đầu triển khai mã nguồn cần thiết để làm cho bài kiểm thử của bạn chạy đúng.

5. **Chạy Lại Bài Kiểm Thử - Bài Kiểm Thử Sẽ Chạy Đúng (GREEN):** Chạy bài kiểm thử để đảm bảo rằng mã nguồn bạn vừa triển khai hoạt động như mong đợi.

6. **Tối ưu hóa Mã Nguồn (Refactor):** Cải thiện mã nguồn của bạn mà không làm thay đổi hành vi của nó, đảm bảo mã luôn sạch sẽ và dễ bảo trì.

7. **Lặp Lại Quá Trình:** Lặp lại các bước trên cho các chức năng tiếp theo hoặc các phần của dự án.

Áp dụng TDD giúp đảm bảo rằng mã nguồn của bạn được kiểm thử một cách tự động và liên tục, giúp giảm thiểu lỗi và tăng tính ổn định của hệ thống.


### Ví dụ với JavaScript


1. **Bước 1: Viết Bài Kiểm Thử (RED):**
   ```javascript
   // test_calculator.js
   const { subtract } = require('./calculator');

   test('subtraction', () => {
       const result = subtract(7, 3);
       expect(result).toBe(4);
   });
   ```

   Ở đây, `calculator.js` chưa được triển khai và `subtract` là một hàm không tồn tại.

2. **Bước 2: Chạy Bài Kiểm Thử (RED):**
   Chạy bài kiểm thử và bạn sẽ thấy lỗi vì hàm `subtract` chưa được triển khai.

3. **Bước 3: Viết Mã Nguồn (GREEN):**
   ```javascript
   // calculator.js
   function subtract(a, b) {
       return a - b;
   }

   module.exports = { subtract };
   ```

   Viết mã nguồn để hàm `subtract` thực hiện phép trừ.

4. **Bước 4: Chạy Lại Bài Kiểm Thử (GREEN):**
   Chạy lại bài kiểm thử và đảm bảo rằng nó chạy đúng mà không có lỗi.

5. **Bước 5: Tối ưu hóa Mã Nguồn (Refactor):**
   Bạn có thể tối ưu hóa mã nguồn của `calculator.js` sau khi đã chạy thành công bài kiểm thử.

Lặp lại quy trình này cho các chức năng khác hoặc mở rộng bài kiểm thử để đảm bảo tính đầy đủ và đúng đắn của mã nguồn. TDD giúp đảm bảo rằng mã nguồn của bạn được kiểm thử một cách tự động và liên tục.

---
### Ví dụ với React
Cách áp dụng Test-Driven Development (TDD) cho một thành phần React sử dụng thư viện kiểm thử Jest và thư viện kiểm thử giao diện người dùng React Testing Library.

1. **Bước 1: Viết Bài Kiểm Thử (RED):**
   ```jsx
   // Counter.test.js
   import { render, screen, fireEvent } from '@testing-library/react';
   import Counter from './Counter';

   test('renders initial count', () => {
       render(<Counter />);
       const countElement = screen.getByText(/count/i);
       expect(countElement).toBeInTheDocument();
       expect(countElement.textContent).toBe('Count: 0');
   });

   test('increments count on button click', () => {
       render(<Counter />);
       const buttonElement = screen.getByText(/increment/i);
       fireEvent.click(buttonElement);
       const countElement = screen.getByText(/count/i);
       expect(countElement.textContent).toBe('Count: 1');
   });
   ```

   Ở đây, `Counter.js` chưa được triển khai và bài kiểm thử đang kiểm tra xem thành phần Counter có hiển thị đúng và có thể tăng giá trị đúng không.

2. **Bước 2: Chạy Bài Kiểm Thử (RED):**
   Chạy bài kiểm thử và bạn sẽ thấy lỗi vì `Counter` chưa được triển khai.

3. **Bước 3: Viết Mã Nguồn (GREEN):**
   ```jsx
   // Counter.js
   import React, { useState } from 'react';

   function Counter() {
       const [count, setCount] = useState(0);

       const increment = () => {
           setCount(count + 1);
       };

       return (
           <div>
               <p>Count: {count}</p>
               <button onClick={increment}>Increment</button>
           </div>
       );
   }

   export default Counter;
   ```

   Viết mã nguồn để `Counter` thực hiện đúng theo yêu cầu kiểm thử.

4. **Bước 4: Chạy Lại Bài Kiểm Thử (GREEN):**
   Chạy lại bài kiểm thử và đảm bảo rằng nó chạy đúng mà không có lỗi.

5. **Bước 5: Tối ưu hóa Mã Nguồn (Refactor):**
   Bạn có thể tối ưu hóa mã nguồn của `Counter.js` sau khi đã chạy thành công bài kiểm thử.

Lặp lại quy trình này cho các thành phần React khác hoặc mở rộng bài kiểm thử để đảm bảo tính đầy đủ và đúng đắn của mã nguồn. TDD trong React giúp đảm bảo rằng các thành phần của ứng dụng của bạn hoạt động đúng và có thể bảo trì một cách hiệu quả.


[MyCustomComponent]