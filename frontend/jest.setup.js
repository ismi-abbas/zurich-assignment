// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));
