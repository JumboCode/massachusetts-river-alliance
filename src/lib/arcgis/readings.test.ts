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
import { getReadings, getApprovedReadings, createReading } from "./readings";

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

const testInput = {
    siteId: "charles",
    gageHeightFt: 3.5,
    observedAt: new Date("2026-11-09T14:30:00Z"),
    monitorName: "Test Monitor",
    weather: null,
    conditions: null,
    notes: null,
    photoUrl: null,
};

test("createReading assigns a new id and pending status", () => {
    const first = createReading(testInput);
    const second = createReading(testInput);

    expect(first.status).toBe("pending");
    expect(first.id).not.toBe(second.id);
});

test("the new reading appears in getReadings()", () => {
    const reading = createReading(testInput);

    expect(getReadings()).toContainEqual(reading);
});

test("the new reading does not appear in getApprovedReadings()", () => {
    const created = createReading(testInput);

    for (const reading of getApprovedReadings()) {
        expect(reading.id).not.toBe(created.id);
    }
});
