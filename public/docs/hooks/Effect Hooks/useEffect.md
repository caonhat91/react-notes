# Khi nào sử dụng useEffect
Trong React, effect hooks được sử dụng để thực hiện các tác vụ liên quan đến side effects trong component functional. `useEffect` là một trong những effect hooks quan trọng nhất và được sử dụng phổ biến. Dưới đây là một số điều cơ bản về `useEffect`:

### Cơ bản về `useEffect`:

1. **Cú pháp cơ bản:**
   ```jsx
   import React, { useEffect } from 'react';

   const MyComponent = () => {
     useEffect(() => {
       // Effect code here
       return () => {
         // Cleanup code here (optional)
       };
     }, []); // Dependency array
     // ... rest of the component code ...
   };
   ```

   - `useEffect` nhận vào một hàm callback, được gọi sau mỗi lần component được render.
   - Nếu bạn muốn thực hiện một công việc cleanup khi component unmount hoặc khi các dependencies thay đổi, bạn có thể return một hàm cleanup từ callback.

2. **Chạy effect mỗi lần component render:**
   ```jsx
   useEffect(() => {
     // Effect code here
   });
   ```

   - Trong trường hợp này, effect sẽ chạy sau mỗi lần component được render.

3. **Chạy effect chỉ khi mount và unmount:**
   ```jsx
   useEffect(() => {
     // Effect code here
     return () => {
       // Cleanup code here (runs on unmount)
     };
   }, []);
   ```

   - Đặt dependencies là một mảng rỗng sẽ đảm bảo effect chỉ chạy một lần khi component được mount và cleanup chỉ chạy khi component unmount.

4. **Chạy effect khi dependencies thay đổi:**
   ```jsx
   useEffect(() => {
     // Effect code here
   }, [dependency1, dependency2]);
   ```

   - Đặt dependencies là một mảng với các giá trị, effect sẽ chạy khi bất kỳ giá trị trong danh sách dependencies thay đổi.

### Các trường hợp sử dụng:

1. **Gọi API và thao tác với dữ liệu:**
   ```jsx
   useEffect(() => {
     const fetchData = async () => {
       try {
         const result = await api.fetchData();
         setData(result);
       } catch (error) {
         setError(error);
       }
     };

     fetchData();
   }, [api]);
   ```

2. **Subscription và đăng ký sự kiện:**
   ```jsx
   useEffect(() => {
     const subscription = eventEmitter.subscribe(handleEvent);

     return () => {
       subscription.unsubscribe();
     };
   }, [eventEmitter]);
   ```

3. **Thực hiện cleanup:**
   ```jsx
   useEffect(() => {
     // Setup code

     return () => {
       // Cleanup code (runs on unmount or when dependencies change)
     };
   }, [dependency]);
   ```

4. **Tương tác với DOM:**
   ```jsx
   useEffect(() => {
     const updateDocumentTitle = () => {
       document.title = 'New Title';
     };

     window.addEventListener('scroll', updateDocumentTitle);

     return () => {
       window.removeEventListener('scroll', updateDocumentTitle);
     };
   }, []);
   ```

5. **Optimizing performance with useEffect:**
   ```jsx
   useEffect(() => {
     // Effect code here

     const cleanup = () => {
       // Cleanup code here
     };

     const debounceEffect = debounce(() => {
       cleanup();
     }, 500);

     return () => {
       // Cleanup code here (runs on unmount or when dependencies change)
       debounceEffect();
     };
   }, [dependency]);
   ```

   - Trong trường hợp cần thực hiện một số logic cleanup, bạn có thể sử dụng một hàm debounce để chờ một khoảng thời gian ngắn trước khi thực hiện cleanup.

Lưu ý rằng effect hooks được thiết kế để thực hiện các side effects và các tác vụ không đồng bộ trong component functional. Cố gắng giữ effect hooks đơn giản và tránh thực hiện quá nhiều công việc trong một effect để dễ dàng duy trì và hiểu mã nguồn của bạn.