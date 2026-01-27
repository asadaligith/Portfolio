import { test, expect } from "@playwright/test";

test.describe("Homepage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("loads all sections", async ({ page }) => {
    // Hero section
    await expect(page.locator("#hero")).toBeVisible();
    await expect(page.locator("h1")).toContainText("Asad Ali");

    // Skills section
    await expect(page.locator("#skills")).toBeVisible();
    await expect(
      page.locator("#skills").getByRole("heading", { level: 2 })
    ).toContainText("Skills");

    // Projects section
    await expect(page.locator("#projects")).toBeVisible();
    await expect(
      page.locator("#projects").getByRole("heading", { level: 2 })
    ).toContainText("Projects");

    // Contact section
    await expect(page.locator("#contact")).toBeVisible();
    await expect(
      page.locator("#contact").getByRole("heading", { level: 2 })
    ).toContainText("Get In Touch");
  });

  test("View Projects CTA scrolls to projects section", async ({ page }) => {
    // Get initial scroll position
    const initialScrollY = await page.evaluate(() => window.scrollY);

    // Click View Projects button
    await page.getByRole("link", { name: "View Projects" }).click();

    // Wait for smooth scroll to complete
    await page.waitForTimeout(1000);

    // Verify scroll position changed
    const newScrollY = await page.evaluate(() => window.scrollY);
    expect(newScrollY).toBeGreaterThan(initialScrollY);

    // Verify projects section is in viewport
    await expect(page.locator("#projects")).toBeInViewport();
  });

  test("external links have correct attributes", async ({ page }) => {
    // GitHub link
    const githubLink = page.getByRole("link", { name: /GitHub/i }).first();
    await expect(githubLink).toHaveAttribute("target", "_blank");
    await expect(githubLink).toHaveAttribute(
      "rel",
      expect.stringContaining("noopener")
    );
    await expect(githubLink).toHaveAttribute(
      "rel",
      expect.stringContaining("noreferrer")
    );

    // LinkedIn link (use .first() as it appears in both Hero and Contact sections)
    const linkedinLink = page.getByRole("link", { name: /LinkedIn/i }).first();
    await expect(linkedinLink).toHaveAttribute("target", "_blank");
    await expect(linkedinLink).toHaveAttribute(
      "rel",
      expect.stringContaining("noopener")
    );
    await expect(linkedinLink).toHaveAttribute(
      "rel",
      expect.stringContaining("noreferrer")
    );
  });

  test("mobile responsive layout at 375px viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Verify no horizontal overflow
    const documentWidth = await page.evaluate(
      () => document.documentElement.scrollWidth
    );
    const viewportWidth = await page.evaluate(() => window.innerWidth);
    expect(documentWidth).toBeLessThanOrEqual(viewportWidth);

    // Verify hero content is visible
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.getByRole("link", { name: "View Projects" })).toBeVisible();

    // Verify CTA buttons are visible and interactive
    const viewProjectsBtn = page.getByRole("link", { name: "View Projects" });
    await expect(viewProjectsBtn).toBeVisible();
    await expect(viewProjectsBtn).toBeEnabled();

    // Verify button has reasonable touch target size (at least 36px for mobile usability)
    const box = await viewProjectsBtn.boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(36);
    expect(box?.width).toBeGreaterThanOrEqual(100);
  });
});
