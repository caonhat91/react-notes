# Khi nào sử dụng createPortal
`createPortal` là một phương thức trong React được sử dụng để render một phần tử React ở nơi khác nằm ngoài cây DOM chính của ứng dụng React. Điều này giúp bạn kiểm soát hơn về cách các phần tử được render và cách chúng tương tác với DOM.

Dưới đây là một số tình huống khi bạn có thể cần sử dụng `createPortal`:

1. **Modal và Overlay:**
   Khi bạn muốn render một modal hoặc overlay mà không muốn chúng nằm trong cây DOM chính, để tránh ảnh hưởng đến styling và sự tương tác với các thành phần khác.

   ```jsx
   const Modal = ({ children, onClose }) => {
     const modalRoot = document.getElementById('modal-root');

     if (!modalRoot) return null;

     return ReactDOM.createPortal(
       <div className="modal-overlay" onClick={onClose}>
         <div className="modal-content" onClick={(e) => e.stopPropagation()}>
           {children}
         </div>
       </div>,
       modalRoot
     );
   };
   ```

   Trong ví dụ trên, `modal-root` là một phần tử trong DOM, nhưng `Modal` component được render bởi `createPortal` nằm ngoài cây DOM chính.

2. **Tooltip:**
   Khi bạn muốn render một tooltip ở một vị trí xác định trên trang và không muốn nó ảnh hưởng đến việc xác định vị trí của các phần tử khác.

   ```jsx
   const Tooltip = ({ text, position, children }) => {
     const tooltipRoot = document.getElementById('tooltip-root');

     if (!tooltipRoot) return null;

     return ReactDOM.createPortal(
       <div className={`tooltip tooltip-${position}`}>
         {text}
         {children}
       </div>,
       tooltipRoot
     );
   };
   ```

3. **Render trong một phần tử khác với DOM chính:**
   Khi bạn muốn render một phần của ứng dụng React ở một vị trí khác trong DOM mà không ảnh hưởng đến DOM chính.

   ```jsx
   const App = () => {
     return (
       <div>
         <Header />
         <div>
           <MainContent />
           {ReactDOM.createPortal(
             <Sidebar />,
             document.getElementById('sidebar-root')
           )}
         </div>
       </div>
     );
   };
   ```

   Trong ví dụ này, `Sidebar` được render tới một phần tử với `id` là `sidebar-root`, nằm ngoài cây DOM của component `App`.

Lưu ý rằng bạn cần tạo ra phần tử với `id` tương ứng trước khi sử dụng `createPortal`, và đảm bảo rằng nó đã tồn tại trong cây DOM trước khi component cần render vào đó được mount.