export function ReportExportActions() {
    return (
        <div className="flex items-center gap-2">
            <button
                type="button"
                className="inline-flex items-center justify-center h-9 px-3 gap-2 rounded-lg bg-[var(--color-surface-container)] hover:bg-[var(--color-surface-container-high)] text-[var(--color-on-surface)] text-sm font-label-md transition-colors border border-[var(--color-outline-variant)]"
                aria-label="Export PDF"
            >
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">picture_as_pdf</span>
                PDF
            </button>
            <button
                type="button"
                className="inline-flex items-center justify-center h-9 px-3 gap-2 rounded-lg bg-[var(--color-surface-container)] hover:bg-[var(--color-surface-container-high)] text-[var(--color-on-surface)] text-sm font-label-md transition-colors border border-[var(--color-outline-variant)]"
                aria-label="Export CSV"
            >
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">csv</span>
                CSV
            </button>
            <button
                type="button"
                className="inline-flex items-center justify-center h-9 px-3 gap-2 rounded-lg bg-[var(--color-surface-container)] hover:bg-[var(--color-surface-container-high)] text-[var(--color-on-surface)] text-sm font-label-md transition-colors border border-[var(--color-outline-variant)]"
                aria-label="Print Report"
            >
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">print</span>
                Print
            </button>
        </div>
    );
}
