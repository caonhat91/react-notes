# Khi nào sử dụng useLayoutEffect
`useLayoutEffect` là một hook trong React được sử dụng để thực hiện các thao tác có ảnh hưởng đến giao diện người dùng (UI) ngay sau khi DOM đã được render, trước khi trình duyệt thực hiện các vẽ lại (repaint) và tái tạo (reflow). Nó chủ yếu được sử dụng khi bạn cần đảm bảo rằng các thay đổi trạng thái được áp dụng ngay lập tức và trước khi người dùng thấy bất kỳ sự thay đổi nào.

Lưu ý rằng `useLayoutEffect` và `useEffect` đều giống nhau trong cách chúng hoạt động, nhưng `useLayoutEffect` sẽ chạy đồng bộ hơn và sẽ được kích hoạt ngay sau khi render, trong khi `useEffect` sẽ chạy bất đồng bộ và có thể chờ đến sau khi trình duyệt đã vẽ lại trang.

Dưới đây là một số trường hợp khi bạn có thể muốn sử dụng `useLayoutEffect`:

1. **Đo lường kích thước của phần tử:** Nếu bạn cần biết kích thước của một phần tử ngay sau khi nó được render để thực hiện một số logic dựa trên kích thước đó.

    ```jsx
    import { useLayoutEffect, useRef } from 'react';

    function MeasureElementSize() {
      const elementRef = useRef();

      useLayoutEffect(() => {
        const width = elementRef.current.clientWidth;
        const height = elementRef.current.clientHeight;

        // Thực hiện các thao tác dựa trên kích thước
        console.log(`Width: ${width}, Height: ${height}`);
      }, []);

      return <div ref={elementRef}>Content</div>;
    }
    ```

2. **Thực hiện các thay đổi trên DOM ngay sau khi render:** Nếu bạn cần áp dụng các thay đổi trực tiếp lên DOM, chẳng hạn như đặt trọng số cho một phần tử, và bạn muốn chúng có hiệu ứng ngay lập tức.

    ```jsx
    import { useLayoutEffect, useRef } from 'react';

    function ApplyStylesImmediately() {
      const elementRef = useRef();

      useLayoutEffect(() => {
        // Áp dụng các thay đổi trực tiếp lên DOM ngay sau khi render
        elementRef.current.style.color = 'red';
      }, []);

      return <div ref={elementRef}>Content</div>;
    }
    ```

Lưu ý rằng cần cẩn thận khi sử dụng `useLayoutEffect`, vì nó có thể làm giảm hiệu suất nếu không được sử dụng đúng cách. Thông thường, `useEffect` là sự lựa chọn an toàn hơn nếu không cần thiết phải chạy đồng bộ và có thể đợi cho việc vẽ lại xong.