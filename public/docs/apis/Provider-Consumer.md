# Provider và Consumer

`Provider` và `Consumer` là hai thành phần quan trọng trong ***React context API***, giúp bạn chia sẻ dữ liệu giữa các component mà không cần truyền dữ liệu qua nhiều cấp component con.
## Provider:
* 		Provider là một component cha giữa, chịu trách nhiệm cung cấp dữ liệu thông qua Context API.
* 		Bạn sử dụng createContext để tạo một context và có thể cung cấp một giá trị mặc định cho nó.
* 		Provider nhận một prop là value, giá trị này sẽ được chia sẻ với tất cả các component con trong cây component.

Ví dụ:
```
import React, { createContext } from 'react';

const MyContext = createContext();

const MyProvider = ({ children }) => {
    const sharedValue = 'Hello from Context!';
    return <MyContext.Provider value={sharedValue}>{children}</MyContext.Provider>;
};

export { MyProvider, MyContext };
```
## Consumer:
* 		Consumer là một cách để các component con có thể đọc giá trị từ context.
* 		Bạn sử dụng MyContext.Consumer để bao bọc phần JSX muốn sử dụng giá trị từ context.
* 		Consumer sử dụng hàm render props để truyền giá trị từ context vào trong component con.
Ví dụ:
```
import React from 'react';
import { MyContext } from './MyProvider';

const MyConsumerComponent = () => (
  <MyContext.Consumer>
    {(value) => <p>{value}</p>}
  </MyContext.Consumer>
);

export default MyConsumerComponent;
```
## Sử dụng trong component cây:

Để sử dụng Provider, bạn wrap component cây với MyProvider.
Khi bạn muốn sử dụng giá trị từ context trong một component con, bạn chỉ cần sử dụng MyConsumerComponent.

Ví dụ:
```
import React from 'react';
import { MyProvider } from './MyProvider';
import MyConsumerComponent from './MyConsumerComponent';

const App = () => (
  <MyProvider>
    <div>
      <h1>My App</h1>
      <MyConsumerComponent />
    </div>
  </MyProvider>
);

export default App;
```
> Cả `Provider` và `Consumer` đều giúp tạo ra một ***hệ thống context***, nơi bạn có thể chia sẻ và truy cập dữ liệu một cách dễ dàng trong toàn bộ cây component mà không phải truyền qua nhiều cấp component con.