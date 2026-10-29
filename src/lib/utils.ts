/***************************************************************
 *
 *                src/lib/utils.ts
 *
 *         Author: Zander
 *           Date: 10/26/2026
 *
 *        Summary: Re-exports cn for shadcn's utils alias
 *
 **************************************************************/

import { createCn } from "cn/config";

// Teaches cn the custom class names in src/styles/theme.css.
export const cn = createCn({
    extend: {
        theme: {
            text: [
                "label",
                "field-label",
                "meta",
                "button",
                "ui",
                "body",
                "mobile-input",
                "section",
                "heading",
                "title",
                "display",
                "reading",
            ],
            radius: ["button", "control", "card"],
            shadow: ["overlay"],
            ease: ["standard"],
        },
        classGroups: {
            duration: [{ duration: ["fast", "base", "slow"] }],
            z: [
                {
                    z: ["overlay"],
                },
            ],
        },
    },
});
