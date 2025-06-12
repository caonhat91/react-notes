# Khi nào sử dụng memo
`React.memo` là một HOC (Higher Order Component) được cung cấp bởi React để tối ưu hóa rendering của các thành phần. Nó sử dụng shallow comparison để kiểm tra liệu các props đầu vào có thay đổi hay không và chỉ render lại thành phần nếu có sự thay đổi. Dưới đây là một số tình huống khi bạn có thể cần sử dụng `React.memo`:

1. **Thành phần không phụ thuộc vào props thay đổi:** Nếu một thành phần không phụ thuộc vào bất kỳ sự thay đổi nào của props hoặc state, bạn có thể sử dụng `React.memo` để tránh render lại không cần thiết.

    ```jsx
    const MyComponent = React.memo(() => {
      // ... component logic ...
    });
    ```

2. **Tránh render lại khi props không thay đổi:** Nếu bạn có một thành phần con nhận các props nhưng không cần render lại khi các props thay đổi, bạn có thể bọc nó trong `React.memo`.

    ```jsx
    const MemoizedChildComponent = React.memo(ChildComponent);
    ```

3. **Optimizing performance:** Khi bạn muốn tối ưu hóa hiệu suất bằng cách giảm bớt việc render lại không cần thiết của các thành phần.

    ```jsx
    const MyComponent = () => {
      const data = // ... some data ...
      return <MemoizedChildComponent data={data} />;
    };
    ```

4. **Tránh sự render lại không mong muốn trong các hàm render lớn:** Nếu bạn có một hàm render lớn với nhiều thành phần con, bạn có thể sử dụng `React.memo` để giảm bớt việc render lại không mong muốn.

    ```jsx
    const MyBigComponent = React.memo(() => {
      // ... lots of rendering logic ...
    });
    ```

Lưu ý rằng `React.memo` chỉ thực hiện shallow comparison trên props, nên nếu props chứa các đối tượng phức tạp, bạn có thể cần xem xét cách sâu rộng của so sánh để đảm bảo tính đúng đắn của việc memoization.