import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
//
import App from './App';

const setup = () => render(<App />);

const typeIntoForm = ({ email, password, confirmPassword }) => {
  const emailInputElement = screen.getByRole('textbox', { name: /email/i });
  const passwordInputElement = screen.getByLabelText('Password');
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);

  if (email) {
    userEvent.type(emailInputElement, email);
  }
  if (password) {
    userEvent.type(passwordInputElement, password);
  }
  if (confirmPassword) {
    userEvent.type(confirmPasswordInputElement, confirmPassword);
  }
  return {
    emailInputElement,
    passwordInputElement,
    confirmPasswordInputElement,
  };
};

const clickOnSubmitButton = () => {
  const submitBtnElement = screen.getByRole('button', { name: /submit/i });
  userEvent.click(submitBtnElement);
};

describe('App', () => {
  it('inputs should be initially empty', () => {
    setup();
    const emailInputElement = screen.getByRole('textbox');
    const passwordInputElement = screen.getByLabelText('Password');
    const confirmPasswordInputElement =
      screen.getByLabelText(/confirm password/i);

    expect(emailInputElement.value).toBe('');
    expect(passwordInputElement.value).toBe('');
    expect(confirmPasswordInputElement.value).toBe('');
  });

  it('should be able to type an email', () => {
    render(<App />);

    // const emailInputElement = screen.getByRole('textbox', { name: /email/i });
    // userEvent.type(emailInputElement, 'testEmail');
    const { emailInputElement } = typeIntoForm({ email: 'testEmail' });

    expect(emailInputElement.value).toBe('testEmail');
  });

  it('should be able to type a password', () => {
    render(<App />);

    // const passwordInputElement = screen.getByLabelText('Password');
    // userEvent.type(passwordInputElement, 'testPassword');
    const { passwordInputElement } = typeIntoForm({ password: 'testPassword' });

    expect(passwordInputElement.value).toBe('testPassword');
  });

  it('should be able to type a confirmed password', () => {
    render(<App />);

    const { confirmPasswordInputElement } = typeIntoForm({
      confirmPassword: 'confirm',
    });

    expect(confirmPasswordInputElement.value).toBe('confirm');
  });

  describe('error handling', () => {
    test('should not show error message on invalud email initially', () => {
      render(<App />);

      //const emailErrorElement = screen.queryByText(/the email is invalid/i);

      expect(
        screen.queryByText(/the email is invalid/i)
      ).not.toBeInTheDocument();
    });

    test('should not show error message on invalud password initially', () => {
      render(<App />);

      expect(
        screen.queryByText(/the password is too short/i)
      ).not.toBeInTheDocument();
    });

    test('should not show error message on invalud confirm password initially', () => {
      render(<App />);

      expect(
        screen.queryByText(/passwords are not equal/i)
      ).not.toBeInTheDocument();
    });

    test('should show error message on invalid email', () => {
      render(<App />);

      typeIntoForm({ email: 'wrongEmail' });

      clickOnSubmitButton();

      expect(screen.getByText(/the email is invalid/i)).toBeInTheDocument();
    });

    test('should show error message on invalid password', () => {
      render(<App />);

      typeIntoForm({
        email: 'test@test.com',
        password: 'four',
      });

      clickOnSubmitButton();

      expect(
        screen.getByText(/the password is too short/i)
      ).toBeInTheDocument();
    });

    test('should show error message on invalid confirm password', () => {
      render(<App />);

      typeIntoForm({
        email: 'test@test.com',
        password: 'password',
        confirmPassword: 'password1',
      });

      clickOnSubmitButton();

      expect(screen.getByText(/passwords are not equal/i)).toBeInTheDocument();
    });

    test('should not show error message if all inputs are valid', () => {
      render(<App />);

      typeIntoForm({
        email: 'test@test.com',
        password: 'password',
        confirmPassword: 'password',
      });

      clickOnSubmitButton();

      expect(
        screen.queryByText(/the email is invalid/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/the password is too short/i)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(/passwords are not equal/i)
      ).not.toBeInTheDocument();
    });
  });
});
