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

test("getApprovedReadings() only returns public fields", () => {
    const approvedReadings = getApprovedReadings();
    expect(approvedReadings[0]).toHaveProperty("id");
    expect(approvedReadings[0]).toHaveProperty("siteId");
    expect(approvedReadings[0]).toHaveProperty("gageHeightFt");
    expect(approvedReadings[0]).toHaveProperty("observedAt");
    expect(approvedReadings[0]).toHaveProperty("weather");
    expect(approvedReadings[0]).toHaveProperty("conditions");
    expect(approvedReadings[0]).not.toHaveProperty("monitorName");
    expect(approvedReadings[0]).not.toHaveProperty("status");
    expect(approvedReadings[0]).not.toHaveProperty("notes");
    expect(approvedReadings[0]).not.toHaveProperty("photoUrl");
});

test("getApprovedReadings() only returns approved readings, newest first", () => {
    const allReadings = getReadings();
    const approvedReadings = getApprovedReadings();

    for (let i = 1; i < approvedReadings.length; i++) {
        expect(
            approvedReadings[i - 1].observedAt.getTime(),
        ).toBeGreaterThanOrEqual(approvedReadings[i].observedAt.getTime());
    }

    for (const reading of approvedReadings) {
        const sourceReading = allReadings.find(
            (allReading) => allReading.id === reading.id,
        );

        expect(sourceReading).toBeDefined();
        expect(sourceReading?.status).toBe("approved");
    }
});

test("getApprovedReadings(siteId) only returns approved readings for that site, newest first", () => {
    const siteId = "nashua";
    const allReadings = getReadings();
    const approvedReadings = getApprovedReadings(siteId);

    for (let i = 1; i < approvedReadings.length; i++) {
        expect(
            approvedReadings[i - 1].observedAt.getTime(),
        ).toBeGreaterThanOrEqual(approvedReadings[i].observedAt.getTime());
    }

    for (const reading of approvedReadings) {
        const sourceReading = allReadings.find(
            (allReading) => allReading.id === reading.id,
        );

        expect(sourceReading).toBeDefined();
        expect(sourceReading?.status).toBe("approved");
        expect(reading.siteId).toBe(siteId);
    }
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
