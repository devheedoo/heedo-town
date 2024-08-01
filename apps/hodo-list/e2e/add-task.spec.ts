import { expect, test } from "@playwright/test";

test("add one task", async ({ page }) => {
  await page.goto("/");

  // Clear Tasks
  await page.evaluate(() => {
    localStorage.removeItem("tasks-today");
    localStorage.removeItem("tasks-yesterday");
  });

  await page.getByTestId("task-input").focus();
  await page.keyboard.type("HELLO WORLD");
  await page.keyboard.press("Enter");
  await page.waitForTimeout(500);

  expect(await page.getByTestId("task-title").innerText()).toContain(
    "HELLO WORLD"
  );
});
