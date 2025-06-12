# Custom Hooks là gì?
Custom Hooks là một cách mà bạn có thể tái sử dụng logic stateful và side effects trong các thành phần React. Điều này giúp giảm lặp lại mã và tạo ra một cách chia sẻ logic giữa các thành phần. Dưới đây là cách bạn có thể tạo và sử dụng Custom Hooks trong React:

### Tạo Custom Hook:

1. **Tên Custom Hook:**
   - Bắt đầu tên của hook của bạn với "use" để React hiểu rằng đây là một hook.

2. **Logic Hook:**
   - Bạn có thể sử dụng mọi hook có sẵn (ví dụ: `useState`, `useEffect`, `useContext`, vv.) để xây dựng logic hook của mình.

3. **Sử dụng Tham số (nếu cần):**
   - Nếu Custom Hook của bạn cần tham số, bạn có thể truyền chúng vào như bạn làm với bất kỳ hàm nào khác.

4. **Trả về Giá trị:**
   - Cuối cùng, hãy trả về giá trị mà bạn muốn các thành phần sử dụng hook của bạn có thể sử dụng.

Dưới đây là một ví dụ về một Custom Hook đơn giản:

```jsx
import { useState, useEffect } from 'react';

function useCustomHook(initialValue) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    // Logic side effect (nếu cần)
    console.log('Custom Hook side effect');
  }, [value]); // Dependency array

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return {
    value,
    handleChange,
  };
}
```

### Sử dụng Custom Hook:

Sau khi bạn đã tạo Custom Hook của mình, bạn có thể sử dụng nó trong bất kỳ thành phần React nào:

```jsx
import React from 'react';
import useCustomHook from './useCustomHook'; // Đường dẫn đến Custom Hook của bạn

function MyComponent() {
  const { value, handleChange } = useCustomHook('initialValue');

  return (
    <div>
      <p>Value: {value}</p>
      <input
        type="text"
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}
```

Lưu ý rằng bạn có thể sử dụng nhiều Custom Hooks trong một thành phần và thậm chí tạo ra các Custom Hooks sử dụng nhau để tạo ra các logic phức tạp hơn.

--
## Ví dụ thêm
Custom Hooks có thể được sử dụng để quản lý các logic liên quan đến việc gọi API, như sử dụng `fetch` để lấy dữ liệu từ máy chủ. Dưới đây là một ví dụ về cách bạn có thể tạo một Custom Hook để thực hiện việc này:

```jsx
import { useState, useEffect } from 'react';

function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
}
```

Trong ví dụ trên:

- `data`: Chứa dữ liệu từ API.
- `loading`: Xác định xem dữ liệu đang được tải hay không.
- `error`: Chứa lỗi nếu có bất kỳ vấn đề gì trong quá trình tải dữ liệu.

Bạn có thể sử dụng `useFetch` trong các thành phần React để gọi API và sử dụng dữ liệu trả về. Dưới đây là một ví dụ sử dụng:

```jsx
import React from 'react';
import useFetch from './useFetch'; // Đường dẫn đến Custom Hook useFetch

function MyComponent() {
  const { data, loading, error } = useFetch('https://api.example.com/data');

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      {/* Hiển thị dữ liệu từ API */}
      {data && (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

Lưu ý rằng bạn có thể thích nghi `useFetch` để thêm các tính năng như xử lý phương thức HTTP khác, thêm headers, và các logic khác phù hợp với ứng dụng của bạn.