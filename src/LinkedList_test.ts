import { LinkedList } from "./LinkedList.ts";
import { assertEquals } from "@std/assert";

Deno.test("Linked List", async (t) => {
  await t.step("empty array", () => {
    const list = new LinkedList([]);
    assertEquals(list.toArray(), []);
  });
  await t.step("number array", () => {
    const expected = [1, 2, 3, 4, 5];
    const list = new LinkedList(expected);
    assertEquals(list.toArray(), expected);
  });
  await t.step("string array", () => {
    const expected = ["a", "b", "c", "d", "e"];
    const list = new LinkedList(expected);
    assertEquals(list.toArray(), expected);
  });
  await t.step("object array", () => {
    const expected = [
      { a: "a" },
      { a: "b" },
      { a: "c" },
      { a: "d" },
      { a: "e" },
    ];
    const list = new LinkedList(expected);
    assertEquals(list.toArray(), expected);
  });
  await t.step("unshift", () => {
    const expected = [1, 2, 3, 4];
    const list = new LinkedList(expected);
    expected.unshift(0);
    list.unshift(0);
    assertEquals(list.toArray(), expected);
  });
  await t.step("push", () => {
    const expected = [1, 2, 3, 4];
    const list = new LinkedList(expected);
    expected.push(0);
    list.push(0);
    assertEquals(list.toArray(), expected);
  });
  await t.step("get", () => {
    const expected = 3;
    const list = new LinkedList([1, 2, expected, 4]);
    const actual = list.get(2);
    assertEquals(actual.value, expected);
  });
  await t.step("set`", () => {
    const expected = [1, 2, 3, 4];
    const list = new LinkedList([1, 2, 5, 4]);
    list.set(3, 2);
    assertEquals(list.toArray(), expected);
  });
  await t.step("insert after", () => {
    const expected = [1, 2, 3, 5, 4];
    const list = new LinkedList([1, 2, 3, 4]);
    list.insertAfter({ item: 5, after: list.get(2) });
    assertEquals(list.toArray(), expected);
  });
  await t.step("insert before", () => {
    const expected = [1, 2, 5, 3, 4];
    const list = new LinkedList([1, 2, 3, 4]);
    list.insertBefore({ item: 5, before: list.get(2) });
    assertEquals(list.toArray(), expected);
  });
});
