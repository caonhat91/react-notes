# Khi nào sử dụng Suspense
`<Suspense>` là một thành phần trong React được sử dụng để xử lý trạng thái chờ đợi (loading) trong quá trình tải dữ liệu hoặc các thành phần. Dưới đây là một số tình huống khi bạn có thể cần sử dụng `<Suspense>`:

1. **Tải dữ liệu trước khi render một thành phần:** Khi bạn muốn đảm bảo rằng dữ liệu cần thiết cho một thành phần đã được tải xong trước khi render thành phần đó.

    ```jsx
    import { Suspense } from 'react';

    const MyComponent = () => {
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <AsyncDataComponent />
        </Suspense>
      );
    };
    ```

2. **Handling multiple asynchronous operations:** Khi bạn có nhiều hoặc tuần tự các hoạt động không đồng bộ, bạn có thể sử dụng `<Suspense>` để làm cho quá trình xử lý chờ đợi trở nên dễ dàng hơn.

    ```jsx
    import { Suspense } from 'react';

    const MyComponent = () => {
      return (
        <Suspense fallback={<div>Loading...</div>}>
          <AsyncOperation1 />
          <AsyncOperation2 />
        </Suspense>
      );
    };
    ```

3. **Delaying rendering until certain conditions are met:** Khi bạn muốn trì hoãn việc render một thành phần cho đến khi một điều kiện cụ thể được đáp ứng, bạn có thể sử dụng `<Suspense>`.

    ```jsx
    import { Suspense } from 'react';

    const MyComponent = () => {
      const dataIsReady = // ... some condition ...

      return (
        <Suspense fallback={<div>Loading...</div>}>
          {dataIsReady && <AsyncDataComponent />}
        </Suspense>
      );
    };
    ```

Lưu ý rằng `<Suspense>` thường được sử dụng kết hợp với React.lazy để tải lười các thành phần. Cùng nhau, chúng giúp tạo ra trải nghiệm người dùng mượt mà hơn khi làm việc với các ứng dụng có nhiều dữ liệu hoặc thành phần cần phải được tải từ xa.