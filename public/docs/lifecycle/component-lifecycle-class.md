# Class Component Lifecycle trong React:

Về Component trong react tham khảo [Component](https://react.dev/reference/react/Component)
```
import React, { Component } from 'react';

class LifecycleExample extends Component {
  // Pha Mounting
  constructor(props) {
    super(props);
    console.log('Constructor');
    this.state = { data: 'Initial Data' };
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    console.log('getDerivedStateFromProps');
    return null;
  }

  componentDidMount() {
    console.log('componentDidMount');
  }

  // Pha Updating
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate');
    return true;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate');
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate');
  }

  // Pha Unmounting
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  // Pha Error Handling
  componentDidCatch(error, info) {
    console.log('componentDidCatch');
  }

  // Render phải được triển khai
  render() {
    console.log('Render');
    return <div>{this.state.data}</div>;
  }
}

export default LifecycleExample;
```
Trong ví dụ trên:

`Mounting Phase`:
* ***constructor***: Khởi tạo state và khởi tạo các biến.
* ***getDerivedStateFromProps***: Được gọi trước render, làm sạch state dựa trên props mới.
* ***render***: Render component.
* ***componentDidMount***: Được gọi sau khi component đã được render lần đầu tiên.

`Updating Phase`:
* ***shouldComponentUpdate***: Kiểm soát liệu component có cần được render lại hay không.
* ***getSnapshotBeforeUpdate***: Làm việc với DOM trước khi các thay đổi được áp dụng.
* ***componentDidUpdate***: Được gọi sau khi component đã được render lại.

`Unmounting Phase`:
* ***componentWillUnmount***: Được gọi trước khi component bị xóa khỏi DOM.

`Error Handling Phase`:
* ***componentDidCatch***: Được gọi khi một lỗi xuất hiện trong các phương thức con của component.

Mỗi phương thức trong lifecycle của component đều cung cấp function để thực hiện các hành động cụ thể trong mỗi giai đoạn.