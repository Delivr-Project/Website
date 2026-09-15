/// <reference types="bun-types/test.d.ts" />
import { describe, expect, test } from "bun:test";

describe("Basic Test", () => {
	test("should pass", () => {
		expect(true).toBe(true);
	});
});
