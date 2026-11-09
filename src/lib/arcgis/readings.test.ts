/***************************************************************
 *
 *                src\lib\arcgis\readings.test.ts
 *
 *         Author: Caitlyn, Tanish
 *           Date: 11/10/2026
 *
 *        Summary: Tests for readings.ts
 *
 **************************************************************/

import { expect, test } from "vitest";
import { getReadings, getApprovedReadings } from "./readings";

test("the first reading from getReadings() is newer than the second", () => {
    const readings = getReadings();
    expect(readings[0].observedAt.getTime()).toBeGreaterThan(
        readings[1].observedAt.getTime(),
    );
});

test("getApprovedReadings() only returns approved readings", () => {
    const approvedReadings = getApprovedReadings();
    expect(approvedReadings.length).toBe(4);
});

test("getApprovedReadings() only returns public fields", () => {
    const approvedReadings = getApprovedReadings();
    expect(approvedReadings[0]).toHaveProperty("id");
    expect(approvedReadings[0]).toHaveProperty("siteId");
    expect(approvedReadings[0]).toHaveProperty("gageHeightFt");
    expect(approvedReadings[0]).toHaveProperty("observedAt");
    expect(approvedReadings[0]).toHaveProperty("weather");
    expect(approvedReadings[0]).toHaveProperty("conditions");
    expect(approvedReadings[0]).not.toHaveProperty("status");
    expect(approvedReadings[0]).not.toHaveProperty("notes");
    expect(approvedReadings[0]).not.toHaveProperty("photoUrl");
});

test("passing a siteId to getApprovedReadings() filters the results", () => {
    const approvedReadings = getApprovedReadings("nashua");
    expect(approvedReadings.length).toBe(1);
    expect(approvedReadings[0].siteId).toBe("nashua");
});
