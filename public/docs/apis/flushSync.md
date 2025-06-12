# Khi nào sử dụng flushSync
`flushSync` là một hàm mà React cung cấp để đảm bảo việc thực hiện các side effects đồng bộ và trước khi trình duyệt repaint. Nó có thể được sử dụng trong những trường hợp cụ thể khi bạn cần đảm bảo một số thay đổi trong trạng thái của React được áp dụng ngay lập tức và không chờ đợi đến khi trình duyệt thực hiện các bước cập nhật tiếp theo.

Dưới đây là một số tình huống khi bạn có thể cần sử dụng `flushSync`:

1. **Đồng bộ trạng thái và DOM manipulation:**
   Khi bạn muốn đảm bảo rằng việc thay đổi trạng thái của React và việc thay đổi DOM manipulation xảy ra đồng thời, không chờ đợi.

   ```jsx
   import { flushSync } from 'react-dom';

   const handleClick = () => {
     flushSync(() => {
       // Cập nhật trạng thái của React
       setState(/*...*/);

       // Thực hiện DOM manipulation ngay lập tức
       document.getElementById('some-element').classList.add('active');
     });
   };
   ```

   Trong ví dụ này, `flushSync` đảm bảo rằng cả trạng thái React và DOM manipulation đều được cập nhật đồng thời.

2. **Đồng bộ với các sự kiện giao diện người dùng:**
   Khi bạn muốn đồng bộ hóa cập nhật trạng thái React với các sự kiện người dùng như `scroll`, `resize`, hoặc các sự kiện khác.

   ```jsx
   import { flushSync } from 'react-dom';

   const handleScroll = () => {
     flushSync(() => {
       // Cập nhật trạng thái của React
       setState(/*...*/);

       // Thực hiện các tác vụ khác liên quan đến sự kiện scroll
       // ...
     });
   };

   // ...

   window.addEventListener('scroll', handleScroll);
   ```

   Trong ví dụ này, `flushSync` đảm bảo rằng các cập nhật trạng thái React được xử lý ngay lập tức khi sự kiện scroll xảy ra.

`flushSync` không nên được sử dụng quá mức, và nên được sử dụng chỉ khi cần thiết. Thông thường, React sẽ tự động quản lý các side effects và cập nhật một cách hiệu quả. Tuy nhiên, khi bạn cần kiểm soát chặt chẽ hơn thời điểm cập nhật, `flushSync` có thể là một công cụ hữu ích.