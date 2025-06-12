# Form và Validate
Trong React, việc quản lý form và validation có thể được thực hiện bằng cách sử dụng các state, xử lý sự kiện và hiển thị thông báo lỗi tương ứng. Dưới đây là một hướng dẫn cơ bản về cách bạn có thể thực hiện điều này:

### Quản lý State của Form:

Sử dụng hook `useState` để quản lý state của các trường form. Dưới đây là một ví dụ đơn giản:

```jsx
import React, { useState } from 'react';

function MyForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Thực hiện xử lý submit ở đây
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Validation:

Thêm validation cho các trường form bằng cách kiểm tra điều kiện và hiển thị thông báo lỗi tương ứng. Dưới đây là một ví dụ sử dụng validation đơn giản cho trường username:

```jsx
import React, { useState } from 'react';

function MyForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let newErrors = {};

    if (formData.username.trim() === '') {
      newErrors.username = 'Username is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Thực hiện xử lý submit ở đây
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        {errors.username && <p>{errors.username}</p>}
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}
```

Trong ví dụ trên, một state `errors` được sử dụng để lưu trữ thông báo lỗi và hiển thị chúng dưới mỗi trường form khi có lỗi. Hàm `validateForm` được sử dụng để kiểm tra các điều kiện và cập nhật state `errors`.


Ngoài ra, tham khảo thêm về [useFormState](https://react.dev/reference/react-dom/hooks/useFormState)

## Có thể sử dụng thư viện bên thứ 3 như: `react-hook-form`

1. **Cài đặt react-hook-form:**

   Trước hết, bạn cần cài đặt thư viện `react-hook-form`. Bạn có thể làm điều này bằng cách chạy lệnh sau trong terminal:

   ```bash
   npm install react-hook-form
   ```

   hoặc sử dụng Yarn:

   ```bash
   yarn add react-hook-form
   ```

2. **Sử dụng `useForm` trong Component:**

   Dưới đây là một ví dụ cơ bản về cách bạn có thể sử dụng `useForm`:

   ```jsx
   import React from 'react';
   import { useForm } from 'react-hook-form';

   function MyForm() {
     const { register, handleSubmit, formState } = useForm();

     const onSubmit = (data) => {
       console.log(data);
     };

     return (
       <form onSubmit={handleSubmit(onSubmit)}>
         <label>
           Username:
           <input {...register('username', { required: 'Username is required' })} />
           {formState.errors.username && <p>{formState.errors.username.message}</p>}
         </label>
         <br />
         <label>
           Password:
           <input {...register('password', { required: 'Password is required' })} />
           {formState.errors.password && <p>{formState.errors.password.message}</p>}
         </label>
         <br />
         <button type="submit">Submit</button>
       </form>
     );
   }
   ```

   - `useForm` trả về một số phương thức và thông tin như `register` để đăng ký trường form, `handleSubmit` để xử lý sự kiện submit, và `formState` để theo dõi trạng thái của form.

   - Trong ví dụ trên, chúng ta sử dụng `register` để đăng ký các trường form và `formState.errors` để hiển thị thông báo lỗi.

   - `onSubmit` là hàm được gọi khi form được submit.
