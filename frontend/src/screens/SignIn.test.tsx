import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import App from "@/App";

function jsonResponse(status: number, body: unknown) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  };
}

describe("SignIn", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("signs in successfully and navigates to /chat", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockImplementation((url: string, init?: RequestInit) => {
      if (url.endsWith("/api/me")) return Promise.resolve(jsonResponse(401, { detail: "Not authenticated." }));
      if (url.endsWith("/api/auth/login") && init?.method === "POST")
        return Promise.resolve(jsonResponse(200, { email: "ada@northbridge.co.uk", is_admin: true }));
      throw new Error(`unexpected fetch: ${url}`);
    });
    vi.stubGlobal("fetch", fetchMock);

    render(
      <MemoryRouter initialEntries={["/sign-in"]}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByLabelText("Work email")).toBeInTheDocument());
    await user.type(screen.getByLabelText("Work email"), "ada@northbridge.co.uk");
    await user.type(screen.getByLabelText("Password"), "Northbridge!24");
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    await waitFor(() => {
      const calledLogin = fetchMock.mock.calls.some(
        ([url, init]) => String(url).endsWith("/api/auth/login") && init?.method === "POST"
      );
      expect(calledLogin).toBe(true);
    });

    const [, loginInit] = fetchMock.mock.calls.find(([url]) => String(url).endsWith("/api/auth/login"))!;
    expect(loginInit?.credentials).toBe("include");
  });

  it("renders the server's generic error text verbatim on login failure, with no field attribution", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockImplementation((url: string, init?: RequestInit) => {
      if (url.endsWith("/api/me")) return Promise.resolve(jsonResponse(401, { detail: "Not authenticated." }));
      if (url.endsWith("/api/auth/login") && init?.method === "POST")
        return Promise.resolve(jsonResponse(401, { detail: "Incorrect email or password." }));
      throw new Error(`unexpected fetch: ${url}`);
    });
    vi.stubGlobal("fetch", fetchMock);

    render(
      <MemoryRouter initialEntries={["/sign-in"]}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByLabelText("Work email")).toBeInTheDocument());
    await user.type(screen.getByLabelText("Work email"), "ada@northbridge.co.uk");
    await user.type(screen.getByLabelText("Password"), "wrong-password");
    await user.click(screen.getByRole("button", { name: "Sign in" }));

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("Incorrect email or password.");
    expect(screen.queryByText(/enter your password/i)).not.toBeInTheDocument();
  });

  it("creates an account, signs in, and navigates to /chat", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockImplementation((url: string, init?: RequestInit) => {
      if (url.endsWith("/api/me")) return Promise.resolve(jsonResponse(401, { detail: "Not authenticated." }));
      if (url.endsWith("/api/auth/signup") && init?.method === "POST")
        return Promise.resolve(jsonResponse(200, { email: "new.user@northbridge.co.uk", is_admin: false }));
      throw new Error(`unexpected fetch: ${url}`);
    });
    vi.stubGlobal("fetch", fetchMock);

    render(
      <MemoryRouter initialEntries={["/sign-in"]}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByRole("tab", { name: "Create account" })).toBeInTheDocument());
    await user.click(screen.getByRole("tab", { name: "Create account" }));
    await user.type(screen.getByLabelText("Work email"), "new.user@northbridge.co.uk");
    await user.type(screen.getByLabelText("Password"), "supersecret1");
    await user.type(screen.getByLabelText("Confirm password"), "supersecret1");
    await user.click(screen.getByRole("button", { name: "Create account and sign in" }));

    await waitFor(() => {
      const calledSignup = fetchMock.mock.calls.some(
        ([url, init]) => String(url).endsWith("/api/auth/signup") && init?.method === "POST"
      );
      expect(calledSignup).toBe(true);
    });
  });

  it("shows the server's duplicate-email error on signup", async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockImplementation((url: string, init?: RequestInit) => {
      if (url.endsWith("/api/me")) return Promise.resolve(jsonResponse(401, { detail: "Not authenticated." }));
      if (url.endsWith("/api/auth/signup") && init?.method === "POST")
        return Promise.resolve(jsonResponse(409, { detail: "An account already exists for that email." }));
      throw new Error(`unexpected fetch: ${url}`);
    });
    vi.stubGlobal("fetch", fetchMock);

    render(
      <MemoryRouter initialEntries={["/sign-in"]}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByRole("tab", { name: "Create account" })).toBeInTheDocument());
    await user.click(screen.getByRole("tab", { name: "Create account" }));
    await user.type(screen.getByLabelText("Work email"), "ada@northbridge.co.uk");
    await user.type(screen.getByLabelText("Password"), "supersecret1");
    await user.type(screen.getByLabelText("Confirm password"), "supersecret1");
    await user.click(screen.getByRole("button", { name: "Create account and sign in" }));

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent("An account already exists for that email.");
  });

  it("does not show the stale pilot-credential panel", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(jsonResponse(401, { detail: "Not authenticated." }))
    );

    render(
      <MemoryRouter initialEntries={["/sign-in"]}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByLabelText("Work email")).toBeInTheDocument());
    expect(screen.queryByText(/pilot environment/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/northbridge!24/i)).not.toBeInTheDocument();
  });
});

describe("route guard", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockImplementation((url: string) => {
        if (url.endsWith("/api/me"))
          return Promise.resolve(jsonResponse(200, { email: "ada@northbridge.co.uk", is_admin: true }));
        return Promise.resolve(jsonResponse(200, {}));
      })
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("redirects a signed-in user away from /sign-in to /chat", async () => {
    render(
      <MemoryRouter initialEntries={["/sign-in"]}>
        <App />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.queryByLabelText("Work email")).not.toBeInTheDocument();
    });
  });
});
