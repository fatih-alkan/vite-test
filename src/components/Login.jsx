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

  // Anlık validasyon
  if (name === 'email') {
    setErrors(prev => ({
      ...prev,
      email: emailRegex.test(value) ? '' : 'Geçerli bir email girin.'
    }));
  } else if (name === 'password') {
    setErrors(prev => ({
      ...prev,
      password: passwordRegex.test(value)
        ? ''
        : 'Şifre en az 8 karakter olmalı, büyük harf, küçük harf, sayı ve özel karakter içermeli.'
    }));
  }
}


  function handleSubmit(e) {
  e.preventDefault();
  if (!errors.email && !errors.password && formData.email && formData.password && formData.checkbox) {
    console.log('Form gönderildi:', formData);
    history.push('/success');
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
          invalid={!!errors.email}
          onChange={handleChange}
        />
        <FormFeedback data-testid="email-error">{errors.email}</FormFeedback>
      </FormGroup>

      <FormGroup>
        <Label for="examplePassword">Password</Label>
        <Input
          id="examplePassword"
          name="password"
          placeholder="Enter your password"
          type="password"
          invalid={!!errors.password}
          onChange={handleChange}
        />
        <FormFeedback data-testid="password-error">{errors.password}</FormFeedback>
      </FormGroup>

      <FormGroup check>
        <Label check>
          <Input
            id="check"
            name="checkbox"
            type="checkbox"
            data-testid="rules-checkbox"
            onChange={handleChange}
            checked={formData.checkbox}
          />{' '}
          Kuralları kabul ediyorum
        </Label>
      </FormGroup>

      <Button color="primary" type="submit" disabled={isActive} data-testid="submit-button">
        Login
      </Button>
    </Form>
  );
}
