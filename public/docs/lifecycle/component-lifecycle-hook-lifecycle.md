# component lifecycle vs hook lifecycle

Trong React, "component lifecycle" thường liên quan đến lifecycle của một component class, trong khi "hook lifecycle" thường liên quan đến các hooks được sử dụng trong một functional component. Dưới đây là một so sánh giữa lifecycle của component và hooks trong React:
## Component Lifecycle:
* 		Mounting:
    * `constructor`(): Được gọi khi một instance của component được tạo.
    * `render`(): Phương thức này làm tạo ra cây component.
    * `componentDidMount`(): Gọi sau khi component đã được render lần đầu tiên.
* 		Updating:
    * `shouldComponentUpdate(nextProps, nextState)`: Cho phép bạn kiểm soát xem component có cần được render lại hay không dựa trên props và state mới.
    * `render()`: Gọi khi component cần được render lại.
    * `componentDidUpdate(prevProps, prevState)`: Được gọi sau khi component đã được render lại.
* 		Unmounting:
    * `componentWillUnmount()`: Được gọi trước khi component bị xóa khỏi DOM.
## Hook Lifecycle:
* 		Mounting:
    * `useState` và `useEffect`: Thay thế cho `constructor`, `componentDidMount`, và `componentWillUnmount`.
    * `useEffect(() => {}, [])`: Thực hiện các tác vụ sau khi component đã được render lần đầu tiên.
* 		Updating:
    * `useState` và `useEffect`: Thay thế cho `shouldComponentUpdate`, `componentDidUpdate`.
    * `useEffect(() => {})`: Thực hiện các tác vụ sau mỗi lần render.
* 		Unmounting:
    * `useEffect(() => { return () => {} }, [])`: Thực hiện các tác vụ trước khi component bị unmounted.

## So sánh chung:
* Component Lifecycle:
    * Cung cấp các phương thức như `componentDidMount`, `componentDidUpdate`, `componentWillUnmount` để quản lý side effects và lấy/lưu dữ liệu.
    * Có thể gây khó khăn trong việc tái sử dụng logic và làm cho code phức tạp hơn.
* Hook lifecycle:
    * `useEffect` là hook chủ yếu để thực hiện các tác vụ liên quan đến side effects.
    * Giúp tách biệt logic của các lifecycle và làm cho code dễ đọc hơn, tái sử dụng được hơn.

> Trong React, thường nên sử dụng functional component và hooks, vì chúng giúp giảm code boilerplate và làm cho quản lý trạng thái và side effects dễ dàng hơn so với component class và lifecycle methods.