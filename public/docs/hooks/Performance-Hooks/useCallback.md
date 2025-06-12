# Khi nào sử dụng useCallback
`useCallback` là một hook trong React được sử dụng để memoize (lưu trữ) một hàm callback và trả về hàm callback được memoized đó khi dependencies thay đổi. Việc sử dụng `useCallback` giúp tránh tình trạng tạo ra một hàm mới mỗi lần render, đặc biệt là khi hàm đó được truyền vào các thành phần con, có thể dẫn đến việc render lại không cần thiết của các thành phần con.

Dưới đây là một số tình huống khi bạn có thể cần sử dụng `useCallback`:

1. **Truyền hàm vào các thành phần con:** Nếu bạn truyền một hàm callback vào một thành phần con và hàm này được tạo mới mỗi lần render, thành phần con đó có thể render lại không cần thiết.

    ```jsx
    const MyComponent = () => {
      const handleClick = useCallback(() => {
        // ... handle click logic ...
      }, []); // dependencies là mảng trống, nghĩa là hàm không phụ thuộc vào bất kỳ giá trị nào

      return <ChildComponent onClick={handleClick} />;
    };
    ```

2. **Optimizing performance:** Khi một hàm callback được sử dụng trong một `useEffect` và có dependencies, bạn có thể sử dụng `useCallback` để tránh việc tạo hàm mới mỗi lần render.

    ```jsx
    useEffect(() => {
      const fetchData = useCallback(() => {
        // ... fetch data logic ...
      }, [/* dependencies */]);

      fetchData();
    }, [/* dependencies */]);
    ```

3. **Tránh việc render lại không cần thiết:** Khi bạn muốn tránh việc các thành phần con render lại không cần thiết do sự thay đổi của các props callback.

    ```jsx
    const memoizedCallback = useCallback(() => {
      // ... callback logic ...
    }, [/* dependencies */]);

    return <ChildComponent callback={memoizedCallback} />;
    ```

Lưu ý rằng việc sử dụng `useCallback` không phải luôn là tốt đối với mọi trường hợp. Hãy sử dụng nó khi bạn cần tối ưu hiệu suất và muốn tránh việc tạo lại hàm callback mỗi lần render không cần thiết.