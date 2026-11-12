/***************************************************************
 *
 *                src/components/form-card.tsx
 *
 *         Author: Zander
 *           Date: 10/14/2026
 *         Edited by: Michele
 *           Date: 11/09/2026
 *
 *        Summary: Card centered on the page, shared by the form pages
 *
 **************************************************************/

export function FormCard({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex flex-1 items-center justify-center px-4 py-18.75">
            <div className="flex w-full max-w-125 flex-col gap-7.5 rounded-card bg-card p-6 sm:p-10">
                {children}
            </div>
        </main>
    );
}
