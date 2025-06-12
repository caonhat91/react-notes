# Khi nào sử dụng useImperativeHandle
`useImperativeHandle` là một trong những hooks trong React, được sử dụng để tùy chỉnh giá trị mà một thành phần cha chuyển đến thành phần con khi sử dụng `forwardRef`. Nó hữu ích khi bạn muốn kiểm soát cách một thành phần con expose (tiết lộ) các phương thức hoặc thuộc tính của nó cho thành phần cha.

Dưới đây là một số tình huống khi bạn có thể cần sử dụng `useImperativeHandle`:

1. **Tạo ra một API rõ ràng cho thành phần con:** Khi bạn muốn đảm bảo rằng thành phần con tiết lộ một API rõ ràng cho thành phần cha và không tiết lộ mọi thứ một cách mù mờ.

    ```jsx
    const ChildComponent = React.forwardRef((props, ref) => {
      const inputRef = useRef();

      // Expose specific methods or properties to the parent component
      useImperativeHandle(ref, () => ({
        focusInput: () => {
          inputRef.current.focus();
        },
        getValue: () => {
          return inputRef.current.value;
        },
      }), [inputRef]);

      return <input ref={inputRef} />;
    });

    const ParentComponent = () => {
      const childRef = useRef();

      const handleButtonClick = () => {
        // Access methods exposed by the child component
        childRef.current.focusInput();
        const value = childRef.current.getValue();
        console.log('Value from child:', value);
      };

      return (
        <>
          <ChildComponent ref={childRef} />
          <button onClick={handleButtonClick}>Focus Input</button>
        </>
      );
    };
    ```

2. **Tối ưu hóa hiệu suất của thành phần con:** Khi bạn muốn chỉ expose (tiết lộ) những phương thức hoặc thuộc tính cần thiết để tránh việc re-render không cần thiết của thành phần cha khi các dependency thay đổi.

    ```jsx
    const ChildComponent = React.forwardRef((props, ref) => {
      const data = // ... some data that doesn't affect the parent component ...

      // Expose only necessary properties to the parent component
      useImperativeHandle(ref, () => ({
        getData: () => data,
      }), [data]);

      return // ... render logic ...
    });
    ```

3. **Giao tiếp với thư viện ngoại vi:** Khi bạn tích hợp thành phần React với một thư viện ngoại vi và muốn tiếp cận các chức năng cụ thể của nó từ thành phần cha.

    ```jsx
    const ExternalLibraryComponent = React.forwardRef((props, ref) => {
      const externalLibraryRef = useRef();

      useEffect(() => {
        // Initialize the external library
        externalLibraryRef.current = initializeExternalLibrary();
      }, []);

      // Expose specific methods of the external library to the parent component
      useImperativeHandle(ref, () => ({
        performAction: () => {
          externalLibraryRef.current.doSomething();
        },
      }), [externalLibraryRef]);

      return // ... render logic ...
    });

    const ParentComponent = () => {
      const externalLibraryRef = useRef();

      const handleButtonClick = () => {
        // Access methods exposed by the external library component
        externalLibraryRef.current.performAction();
      };

      return (
        <>
          <ExternalLibraryComponent ref={externalLibraryRef} />
          <button onClick={handleButtonClick}>Perform Action</button>
        </>
      );
    };
    ```

Lưu ý rằng `useImperativeHandle` thường kết hợp tốt với `forwardRef` để tạo ra một giao diện dễ sử dụng và mô đun hóa giữa các thành phần trong cây React.