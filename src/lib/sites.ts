/***************************************************************
 *
 *                src/lib/sites.ts
 *
 *         Author: Vienna, Helen
 *           Date: 10/16/2026
 *
 *        Summary: Monitoring sites volunteers can report from
 *
 **************************************************************/

export type Site = {
    id: string;
    name: string;
};

// Sample sites until we get MRA's real list.
export const SITES: Site[] = [
    { id: "mystic", name: "Mystic River at Medford" },
    { id: "charles", name: "Charles River at Waltham" },
    { id: "nashua", name: "Nashua River at Groton" },
    { id: "neponset", name: "Neponset River at Milton" },
    { id: "taunton", name: "Taunton River at Bridgewater" },
];

// Mystic River at Medford
// Charles River at Waltham
// Nashua River at Groton
// Neponset River at Milton
// Taunton River at Bridgewater
