# Khi nào sử dụng forwardRef
`forwardRef` là một hàm trong React giúp bạn chuyển prop `ref` qua component con trong cây component. Điều này hữu ích khi bạn muốn có thể trực tiếp thao tác với một instance của component con từ component cha.

Dưới đây là một số trường hợp khi bạn có thể sử dụng `forwardRef`:

1. **Chuyển Ref Điều Khiển Focus:**
   - Khi bạn muốn tạo một component con có khả năng tự chủ động focus và muốn điều khiển focus từ component cha.

   ```jsx
   const MyInput = React.forwardRef((props, ref) => (
     <input {...props} ref={ref} />
   ));

   // Sử dụng
   const ParentComponent = () => {
     const inputRef = useRef();

     const focusInput = () => {
       inputRef.current.focus();
     };

     return (
       <div>
         <MyInput ref={inputRef} />
         <button onClick={focusInput}>Focus Input</button>
       </div>
     );
   };
   ```

2. **Wrapper Component Cho Thư Viện UI:**
   - Khi bạn viết một wrapper component cho một thư viện UI và muốn chuyển `ref` từ component wrapper sang component con của thư viện.

   ```jsx
   const FancyButton = React.forwardRef((props, ref) => (
     <button className="FancyButton" ref={ref}>
       {props.children}
     </button>
   ));

   // Sử dụng
   const ParentComponent = () => {
     const buttonRef = useRef();

     useEffect(() => {
       buttonRef.current.style.backgroundColor = 'red';
     }, []);

     return <FancyButton ref={buttonRef}>Click me!</FancyButton>;
   };
   ```

3. **HOC (Higher Order Component) Chuyển Prop `ref`:**
   - Khi bạn viết một Higher Order Component và muốn chuyển prop `ref` qua component bên trong.

   ```jsx
   const withLogging = (WrappedComponent) => {
     class WithLogging extends React.Component {
       // ... some logic

       render() {
         return <WrappedComponent {...this.props} ref={this.props.forwardedRef} />;
       }
     }

     return React.forwardRef((props, ref) => (
       <WithLogging {...props} forwardedRef={ref} />
     ));
   };

   // Sử dụng
   const MyComponent = withLogging(SomeComponent);

   // Sau đó, bạn có thể sử dụng MyComponent và truyền ref qua nó.
   ```

Lưu ý rằng khi sử dụng `forwardRef`, bạn cũng cần truyền `ref` thông qua các props hoặc thuộc tính khác (thông qua `forwardedRef` chẳng hạn) để chuyển `ref` từ component cha sang component con.