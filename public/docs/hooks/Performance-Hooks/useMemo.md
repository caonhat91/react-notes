# Khi nào sử dụng useMemo
`useMemo` là một trong những hooks trong React được sử dụng để memoize (lưu trữ giá trị được tính toán trước đó) một giá trị và trả về giá trị được memoized đó khi dependencies (các phụ thuộc) thay đổi. Việc sử dụng `useMemo` giúp tối ưu hiệu suất bằng cách tránh tính toán lại giá trị mỗi khi có sự thay đổi không cần thiết.

Đối với các trường hợp sử dụng `useMemo`, bạn có thể xem xét những tình huống sau:

1. **Tính toán đắt đỏ:** Khi bạn có một hàm tính toán hoặc biểu thức có thể mất nhiều tài nguyên tính toán, bạn có thể sử dụng `useMemo` để lưu trữ giá trị tính toán trước đó và chỉ tính toán lại khi các phụ thuộc thay đổi.

    ```jsx
    const memoizedValue = useMemo(() => expensiveCalculation(dep1, dep2), [dep1, dep2]);
    ```

2. **Render optimizations:** Nếu bạn muốn tránh việc render lại một thành phần con khi không cần thiết, bạn có thể sử dụng `useMemo` để memoize giá trị đầu vào của thành phần con.

    ```jsx
    const childComponent = useMemo(() => <ChildComponent prop={propValue} />, [propValue]);
    ```

3. **Tránh truyền props không cần thiết:** Khi bạn truyền props vào một thành phần con và các props này có thể thay đổi thường xuyên, bạn có thể sử dụng `useMemo` để tránh việc truyền props không cần thiết.

    ```jsx
    const memoizedProps = useMemo(() => ({ prop1, prop2 }), [prop1, prop2]);

    return <ChildComponent {...memoizedProps} />;
    ```

Lưu ý rằng việc sử dụng `useMemo` không phải luôn là tốt đối với mọi trường hợp. Nói chung, nếu ứng dụng của bạn không gặp vấn đề về hiệu suất, bạn có thể không cần phải quá lo lắng về việc sử dụng `useMemo`. Hãy sử dụng nó khi cần thiết để tối ưu hiệu suất và tránh tính toán không cần thiết.