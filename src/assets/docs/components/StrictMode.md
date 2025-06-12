# Khi nào sử dụng StrictMode
`React.StrictMode` là một thành phần trong React được sử dụng để giúp bạn phát hiện và chặn các hành vi không an toàn trong quá trình render, cũng như cảnh báo về các API sắp bị loại bỏ trong tương lai. Dưới đây là một số tình huống khi bạn có thể cần sử dụng `React.StrictMode`:

1. **Phát hiện và chặn các hành vi không an toàn:** Khi bạn muốn đảm bảo rằng ứng dụng React của bạn tuân theo các hành vi an toàn trong quá trình render, `React.StrictMode` sẽ cảnh báo về các hành vi không an toàn và giúp bạn chặn chúng.

    ```jsx
    import React from 'react';

    const MyApp = () => {
      return (
        <React.StrictMode>
          {/* Ứng dụng của bạn */}
          <App />
        </React.StrictMode>
      );
    };
    ```

2. **Cảnh báo về các API sắp bị loại bỏ:** Khi bạn muốn cảnh báo về việc sử dụng các API đã được đánh dấu để loại bỏ trong các phiên bản React sắp tới.

    ```jsx
    import React from 'react';

    const MyApp = () => {
      return (
        <React.StrictMode>
          {/* Ứng dụng của bạn */}
          <App />
        </React.StrictMode>
      );
    };
    ```

3. **Kiểm tra các side effect không mong muốn:** Khi bạn muốn kiểm tra các side effect không mong muốn trong quá trình render, như việc gọi API nhiều lần, `React.StrictMode` sẽ cảnh báo về những hành vi này.

    ```jsx
    import React from 'react';

    const MyApp = () => {
      return (
        <React.StrictMode>
          {/* Ứng dụng của bạn */}
          <App />
        </React.StrictMode>
      );
    };
    ```

Lưu ý rằng việc sử dụng `React.StrictMode` chỉ nên được thực hiện trong môi trường phát triển và không nên xuất hiện trong môi trường sản xuất. Nó có thể gây ra các cảnh báo không mong muốn trong một số tình huống và có thể ảnh hưởng đến trải nghiệm người dùng trong môi trường sản xuất.