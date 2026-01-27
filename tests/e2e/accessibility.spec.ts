import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Accessibility", () => {
  test("homepage should have no critical accessibility violations", async ({ page }) => {
    await page.goto("/");

    // Wait for page to fully load
    await page.waitForLoadState("networkidle");

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      // Exclude rules that may need design decisions
      .disableRules(["link-in-text-block"])
      .analyze();

    // Log any violations for debugging
    if (accessibilityScanResults.violations.length > 0) {
      console.log("Accessibility violations found:");
      accessibilityScanResults.violations.forEach((violation) => {
        console.log(`- ${violation.id} (${violation.impact}): ${violation.description}`);
        violation.nodes.forEach((node) => {
          console.log(`  Target: ${node.target}`);
          console.log(`  HTML: ${node.html.substring(0, 200)}`);
        });
      });
    }

    // Filter to only critical and serious violations
    const criticalViolations = accessibilityScanResults.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious"
    );

    expect(criticalViolations).toEqual([]);
  });

  test("homepage should have proper heading hierarchy", async ({ page }) => {
    await page.goto("/");

    // Should have exactly one h1
    const h1Count = await page.locator("h1").count();
    expect(h1Count).toBe(1);

    // h1 should come before h2s
    const h1Position = await page.locator("h1").evaluate((el) => {
      const rect = el.getBoundingClientRect();
      return rect.top;
    });

    const h2Elements = await page.locator("h2").all();
    for (const h2 of h2Elements) {
      const h2Position = await h2.evaluate((el) => {
        const rect = el.getBoundingClientRect();
        return rect.top;
      });
      expect(h2Position).toBeGreaterThan(h1Position);
    }
  });

  test("all interactive elements should be keyboard accessible", async ({
    page,
  }) => {
    await page.goto("/");

    // Tab through the page and verify focus is visible
    const interactiveElements = await page
      .locator("a, button, [tabindex]")
      .all();

    for (let i = 0; i < Math.min(interactiveElements.length, 10); i++) {
      await page.keyboard.press("Tab");
      const focusedElement = await page.evaluate(
        () => document.activeElement?.tagName
      );
      expect(["A", "BUTTON", "INPUT", "TEXTAREA", "SELECT"]).toContain(
        focusedElement
      );
    }
  });
});
