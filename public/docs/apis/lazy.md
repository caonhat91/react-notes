# Khi nào sử dụng lazy
Hook `React.lazy` được sử dụng để làm việc với việc tải lười (lazy loading) các thành phần React. Lazy loading là một chiến lược tải các thành phần chỉ khi chúng cần được render, giúp giảm thời gian tải trang ban đầu và tăng hiệu suất ứng dụng. Dưới đây là một số tình huống khi bạn có thể cần sử dụng `React.lazy`:

1. **Chia nhỏ ứng dụng lớn:** Nếu bạn có một ứng dụng lớn và muốn giảm thời gian tải trang ban đầu, bạn có thể sử dụng `React.lazy` để chia nhỏ ứng dụng thành các phần nhỏ có thể được tải lười.

    ```jsx
    const MyLazyComponent = React.lazy(() => import('./MyLazyComponent'));
    ```

2. **Tải lười cho các thành phần không chính yếu:** Nếu bạn có các thành phần trong ứng dụng của mình mà người dùng không chắc chắn có thể truy cập, bạn có thể sử dụng `React.lazy` để tải chúng lười.

    ```jsx
    const MyDynamicComponent = React.lazy(() => import('./MyDynamicComponent'));
    ```

3. **Tải lười cho các trang con trong định tuyến:** Nếu bạn sử dụng một thư viện định tuyến như React Router và muốn tải lười các thành phần của các trang con, bạn có thể sử dụng `React.lazy`.

    ```jsx
    const MyRoute = React.lazy(() => import('./MyRoute'));
    ```

4. **Tải lười trong các môi trường có độ trễ mạng cao:** Đối với ứng dụng web hoạt động trong các môi trường có độ trễ mạng cao, việc tải lười có thể giúp giảm thời gian tải trang ban đầu và cải thiện trải nghiệm người dùng.

    ```jsx
    const MyHighLatencyComponent = React.lazy(() => import('./MyHighLatencyComponent'));
    ```

Lưu ý rằng `React.lazy` chỉ hoạt động với các thành phần được export bằng cách sử dụng `export default` và không hoạt động với các thành phần được export thông qua tên (named exports). Đồng thời, nó chỉ hoạt động trong môi trường hỗ trợ ES6 (JavaScript hiện đại).