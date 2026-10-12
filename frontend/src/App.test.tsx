import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import App from "./App";

describe("App", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: false,
        status: 401,
        json: async () => ({ detail: "Not authenticated." }),
      })
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders without crashing and shows the first screen's nav link", async () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    // getAllByText, not getByText: the first screen's page content may repeat
    // the text its nav link carries, and two matches must not fail the smoke test.
    await waitFor(() => {
      expect(screen.getAllByText("Sign in").length).toBeGreaterThan(0);
    });
  });
});
