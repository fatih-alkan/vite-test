import { Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Success from './Success';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {
    const history = useHistory();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    checkbox: false, 
  });

  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isActive, setIsActive] = useState(true);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    let valid = true;
    const newErrors = { email: '', password: '' };

    if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Geçerli bir email girin.';
      valid = false;
    }

    if (!passwordRegex.test(formData.password)) {
      newErrors.password =
        'Şifre en az 8 karakter olmalı, büyük harf, küçük harf, sayı ve özel karakter içermeli.';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      console.log('Form gönderildi:', formData);
      history.push('/success')
    }
  }

  useEffect(() => {
  const isEmailValid = emailRegex.test(formData.email);
  const isPasswordValid = passwordRegex.test(formData.password);
  const isCheckboxChecked = formData.checkbox;

  setIsActive(!(isEmailValid && isPasswordValid && isCheckboxChecked));
}, [formData.email, formData.password, formData.checkbox]);


  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Label for="exampleEmail">Email</Label>
        <Input
          id="exampleEmail"
          name="email"
          placeholder="Enter your email"
          type="email"
          onChange={handleChange}
        />
        <FormFeedback>{errors.email}</FormFeedback>
      </FormGroup>

      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="Enter your password"
          type="password"
          onChange={handleChange}
        />
        <FormFeedback>{errors.password}</FormFeedback>
      </FormGroup>

      <FormGroup check>
        <Label check>
          <Input
            id="check"
            name="checkbox"
            type="checkbox"
            onChange={handleChange}
            checked={formData.checkbox}
          />{' '}
          Kuralları kabul ediyorum
        </Label>
      </FormGroup>

      <Button color="primary" type="submit" disabled={isActive}>
        Login
      </Button>
    </Form>
  );
}
