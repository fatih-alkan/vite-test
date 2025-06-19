import { Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Login(){
    const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({ email: '', password: '' });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    const [isActive, setIsActive] = useState(true)
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
    }
  }
  useEffect(() => {
    const isEmailValid = emailRegex.test(formData.email);
    const isPasswordValid = passwordRegex.test(formData.password);
    setIsActive(!(isEmailValid && isPasswordValid));
  }, [formData]);
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
      <Button color="primary" type="submit" disabled={isActive}>
        Login
      </Button>
    </Form>
    )
}