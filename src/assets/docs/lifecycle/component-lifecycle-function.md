# Function Component Lifecycle (Hook Lifecycle) trong React:

Khi làm việc với functional components trong React, chúng ta thường sử dụng các hooks để thực hiện các tác vụ tương ứng với các pha trong lifecycle của một component class. Dưới đây là một ví dụ minh họa sử dụng các hooks để thực hiện các tác vụ trong lifecycle của một functional component:
```
import React, { useState, useEffect, useMemo, useCallback } from 'react';

const FunctionComponentLifecycleExample = () => {
  // Pha Mounting
  const [data, setData] = useState('Initial Data');

  useEffect(() => {
    console.log('useEffect (componentDidMount)');
    // Thực hiện các tác vụ sau khi component đã được render lần đầu tiên.
    return () => {
      console.log('useEffect Cleanup (componentWillUnmount)');
      // Thực hiện các tác vụ trước khi component bị unmounted.
    };
  }, []); // Mảng rỗng để đảm bảo chỉ chạy một lần sau khi mount

  // Pha Updating
  useEffect(() => {
    console.log('useEffect (componentDidUpdate)');
    // Thực hiện các tác vụ sau mỗi lần render.
  }, [data]); // Chỉ chạy khi giá trị data thay đổi

  // Pha Memoization (tối ưu performance)
  const memoizedValue = useMemo(() => {
    console.log('useMemo');
    // Thực hiện các tính toán và trả về một giá trị được memoized.
    return data.toUpperCase();
  }, [data]); // Chỉ tính toán lại khi giá trị data thay đổi

  // Pha Callback Memoization (tối ưu performance cho hàm callback)
  const handleClick = useCallback(() => {
    console.log('useCallback');
    // Thực hiện các hành động khi nút được nhấn.
  }, []); // Chỉ tạo lại hàm khi dependencies thay đổi

  // Render
  console.log('Render');
  return (
    <div>
      <p>{data}</p>
      <button onClick={() => setData('New Data')}>Change Data</button>
      <p>Memoized Value: {memoizedValue}</p>
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
};

export default FunctionComponentLifecycleExample;
```
Trong ví dụ này:

`Mounting Phase`:
* Sử dụng `useState` để khởi tạo state.
* Sử dụng `useEffect` với mảng dependencies rỗng để thực hiện các tác vụ sau khi component đã được render lần đầu tiên.

`Updating Phase`:
* Sử dụng `useEffect` với mảng dependencies chứa data để thực hiện các tác vụ sau mỗi lần render khi giá trị data thay đổi.

`Memoization Phase`:
* Sử dụng `useMemo` để tối ưu performance bằng cách memoize một giá trị được tính toán.

`Callback Memoization Phase`:
* Sử dụng `useCallback` để tối ưu performance bằng cách memoize một hàm callback.

Trong functional components, các hooks thay thế cho các phương thức lifecycle của class components, giúp chúng ta quản lý trạng thái và side effects trong các pha khác nhau của lifecycle một cách dễ dàng hơn.


---
The behaviors without the dependency array and with an empty [] dependency array are different:
```
useEffect(() => {
  // This runs after every render
});

useEffect(() => {
  // This runs only on mount (when the component appears)
}, []);

useEffect(() => {
  // This runs on mount *and also* if either a or b have changed since the last render
}, [a, b]);
```