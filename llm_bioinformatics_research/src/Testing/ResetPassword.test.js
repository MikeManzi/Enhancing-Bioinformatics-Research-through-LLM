/*

Reset Password Page Testing:

This file tests the functionality of Reset Password page: 
~ tests that the page renders
~ tests that the form submits correctly when criteria for the new password are met
~ tests that there is an error when the password does not meet the necessary criteria
~ tests that there is an error when the new password matches the old password

*/

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import ResetPassword from '../Components/ResetPassword/ResetPassword';
import { BrowserRouter } from 'react-router-dom';

global.fetch = jest.fn();
const setup = () => render(
  <BrowserRouter>
    <ResetPassword />
  </BrowserRouter>
);

describe("ResetPassword Component", () => {
  beforeEach(() => {
    fetch.mockClear();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("submits form with valid password and displays success message, then redirects", async () => {
    fetch.mockResolvedValueOnce({
      status: 200,
      json: async () => ({ message: "Password reset successful!" }),
    });

    setup();
    const newPasswordInput = screen.getByLabelText("New Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const resetButton = screen.getByRole("button", { name: /reset password/i });

    userEvent.type(newPasswordInput, "ValidPass123!");
    userEvent.type(confirmPasswordInput, "ValidPass123!");
    fireEvent.click(resetButton);

    await waitFor(() => expect(screen.getByText("Password reset successful!")).toBeInTheDocument());
    jest.advanceTimersByTime(3000);
    expect(window.location.pathname).toBe("/login");
  });
});

describe("ResetPassword Component - Password Validation", () => {
  beforeEach(() => {
    setup();
  });

  it("shows error when password is less than 8 characters", () => {
    const newPasswordInput = screen.getByLabelText("New Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const resetButton = screen.getByRole("button", { name: /reset password/i });

    userEvent.type(newPasswordInput, "Short1!");
    userEvent.type(confirmPasswordInput, "Short1!");
    fireEvent.click(resetButton);

    expect(screen.getByText("Password must be at least 8 characters long.")).toBeInTheDocument();
  });

  it("shows error when password does not contain an uppercase letter", () => {
    const newPasswordInput = screen.getByLabelText("New Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const resetButton = screen.getByRole("button", { name: /reset password/i });

    userEvent.type(newPasswordInput, "lowercase1!");
    userEvent.type(confirmPasswordInput, "lowercase1!");
    fireEvent.click(resetButton);

    expect(screen.getByText("Password must include at least one uppercase letter.")).toBeInTheDocument();
  });

  it("shows error when password does not contain a lowercase letter", () => {
    const newPasswordInput = screen.getByLabelText("New Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const resetButton = screen.getByRole("button", { name: /reset password/i });

    userEvent.type(newPasswordInput, "UPPERCASE1!");
    userEvent.type(confirmPasswordInput, "UPPERCASE1!");
    fireEvent.click(resetButton);

    expect(screen.getByText("Password must include at least one lowercase letter.")).toBeInTheDocument();
  });

  it("shows error when password does not contain a number", () => {
    const newPasswordInput = screen.getByLabelText("New Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const resetButton = screen.getByRole("button", { name: /reset password/i });

    userEvent.type(newPasswordInput, "NoNumber!");
    userEvent.type(confirmPasswordInput, "NoNumber!");
    fireEvent.click(resetButton);

    expect(screen.getByText("Password must include at least one number.")).toBeInTheDocument();
  });

  it("shows error when password does not contain a special character", () => {
    const newPasswordInput = screen.getByLabelText("New Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const resetButton = screen.getByRole("button", { name: /reset password/i });

    userEvent.type(newPasswordInput, "NoSpecial1");
    userEvent.type(confirmPasswordInput, "NoSpecial1");
    fireEvent.click(resetButton);

    expect(screen.getByText("Password must include at least one special character.")).toBeInTheDocument();
  });

  it("shows error when passwords do not match", () => {
    const newPasswordInput = screen.getByLabelText("New Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const resetButton = screen.getByRole("button", { name: /reset password/i });

    userEvent.type(newPasswordInput, "ValidPass123!");
    userEvent.type(confirmPasswordInput, "DifferentPass123!");
    fireEvent.click(resetButton);

    expect(screen.getByText("Passwords do not match.")).toBeInTheDocument();
  });

  it("shows error when new password matches the old password", async () => {
    fetch.mockResolvedValueOnce({
      status: 400,
      json: async () => ({ message: "New password must be different from the old password." }),
    });

    const newPasswordInput = screen.getByLabelText("New Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const resetButton = screen.getByRole("button", { name: /reset password/i });

    await userEvent.type(newPasswordInput, "OldPassword123!");
    await userEvent.type(confirmPasswordInput, "OldPassword123!");
    fireEvent.click(resetButton);

    await waitFor(() =>
      expect(screen.getByText("New password must be different from the old password.")).toBeInTheDocument()
    );
  });

  it("does not show error when password meets all criteria", async () => {
    const newPasswordInput = screen.getByLabelText("New Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const resetButton = screen.getByRole("button", { name: /reset password/i });

    userEvent.type(newPasswordInput, "ValidPass123!");
    userEvent.type(confirmPasswordInput, "ValidPass123!");
    fireEvent.click(resetButton);

    expect(screen.queryByText(/Password must/i)).toBeNull();
    expect(screen.queryByText(/Passwords do not match/i)).toBeNull();
  });
});
