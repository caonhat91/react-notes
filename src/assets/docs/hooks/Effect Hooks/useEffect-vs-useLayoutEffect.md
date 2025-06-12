# So sánh giữa useEffect và useLayoutEffect
Dưới đây là một so sánh giữa `useEffect` và `useLayoutEffect` trong React:

1. **Thời điểm thực thi**:

   - **`useEffect`**: Thực thi bất đồng bộ sau khi trình duyệt đã vẽ và người dùng thấy nội dung đã cập nhật. Nó không chặn quá trình vẽ màn hình và thích hợp cho các tác động phụ không cần đồng bộ với quá trình vẽ màn hình.

   - **`useLayoutEffect`**: Thực thi đồng bộ và chạy trước khi trình duyệt vẽ. Nó được thực thi ngay sau tất cả các biến đổi DOM và có thể chặn quá trình vẽ màn hình nếu mã bên trong nó mất thời gian.

2. **Sử dụng khi nào**:

   - **`useEffect`**: Phù hợp cho hầu hết các tình huống. Nếu tác động phụ của bạn không cần phải chạy ngay lập tức và không làm ảnh hưởng đến quá trình vẽ màn hình, sử dụng `useEffect`.

   - **`useLayoutEffect`**: Sử dụng trong các trường hợp đặc biệt khi bạn cần thực hiện các đo lường hoặc chỉnh sửa phụ thuộc vào bố cục của trang. Ví dụ, đo lường kích thước của một phần tử sau khi nó đã được vẽ.

3. **Hiệu suất**:

   - **`useEffect`**: Thực thi bất đồng bộ, không chặn quá trình vẽ màn hình, nên thích hợp cho các tác động phụ không cần đồng bộ.

   - **`useLayoutEffect`**: Thực thi đồng bộ và chạy ngay trước khi trình duyệt vẽ. Nếu mã bên trong nó mất nhiều thời gian, có thể gây chậm trễ trong việc cập nhật giao diện người dùng.

4. **Đối số dependencies**:

   - Cả hai hooks đều có một mảng dependencies, tuy nhiên, nếu không cung cấp dependencies cho `useLayoutEffect`, nó sẽ được thực thi mỗi khi component render, không phụ thuộc vào bất kỳ thay đổi dependencies nào.

**Ví dụ:**

```jsx
import React, { useEffect, useLayoutEffect, useState } from 'react';

const ExampleComponent = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    document.title = `Width: ${width}`;
  }, [width]);

  useLayoutEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 

  return <div>Current Width: {width}</div>;
};

export default ExampleComponent;
```

Trong ví dụ này, `useEffect` được sử dụng để cập nhật tiêu đề tài liệu một cách bất đồng bộ, trong khi `useLayoutEffect` được sử dụng để đo lường và đặt kích thước ban đầu của cửa sổ đồng bộ.