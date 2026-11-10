/***************************************************************
 *
 *                src/app/page.tsx
 *
 *         Author: Zander
 *           Date: 10/6/2026
 *
 *         Updated by Grant and Micah 11/1/2026
 *
 *        Summary: Home page
 *
 **************************************************************/

import { SiteMap } from "@/components/site-map";

export default function Home() {
    return (
        <main className="h-dvh">
            <SiteMap />
        </main>
    );
}

// export default function Home() {
//     return (
//         <main className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
//             <h1 className="text-title">Massachusetts Rivers Alliance</h1>
//             <p className="text-body text-muted-foreground">Hello, world!</p>
//         </main>
//     );
// }
