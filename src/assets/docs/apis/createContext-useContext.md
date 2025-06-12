# createContext và useContext

`createContext` và `useContext` là hai phần quan trọng của ***React Context API***, giúp bạn quản lý trạng thái ở mức global trong ứng dụng React mà không cần truyền props qua nhiều cấp component. Dưới đây là giải thích về cách chúng hoạt động:

## createContext:
* 		createContext là một hàm trong React giúp bạn tạo một context mới. Nó trả về một đối tượng với hai thuộc tính: Provider và Consumer.
* 		Bạn thường sử dụng createContext khi bạn muốn chia sẻ một giá trị (ví dụ: một đối tượng, một hàm, một trạng thái) giữa các component mà không cần truyền qua props.

Ví dụ:
```jsx
// Tạo một context mới
const MyContext = createContext();

// MyContext.Provider và MyContext.Consumer được tạo và trả về
```
# useContext:
* 		useContext là một hook trong React giúp bạn dễ dàng truy cập giá trị từ một context.
* 		Bạn sử dụng useContext trong function component để lấy giá trị được cung cấp bởi MyContext.Provider trong cây component.

Ví dụ:
```jsx
import React, { useContext } from 'react';
import { MyContext } from './MyProvider'; // Import context từ file khác

const MyComponent = () => {
  // Lấy giá trị từ context bằng cách sử dụng useContext
  const contextValue = useContext(MyContext);

  return <p>{contextValue}</p>;
};
```
# Sử dụng cả hai cùng nhau:
* 		createContext giúp bạn tạo context và cung cấp một giá trị mặc định (nếu cần).
* 		useContext giúp bạn lấy giá trị từ context trong component con một cách thuận tiện.

Ví dụ:
```jsx
// Tạo context
const MyContext = createContext('Default Value');

// MyContext.Provider được sử dụng ở cấp cao nhất của ứng dụng
const App = () => (
  <MyContext.Provider value="Hello from Context">
    {/* ... */}
  </MyContext.Provider>
);

// Ở bất kỳ component con nào, bạn có thể sử dụng useContext để lấy giá trị
const MyComponent = () => {
  const contextValue = useContext(MyContext);
  return <p>{contextValue}</p>;
};
```
> Với cách sử dụng `createContext` và `useContext`, bạn có thể dễ dàng chia sẻ dữ liệu giữa các component mà không cần phải truyền qua props qua nhiều cấp component con.