export default function AppStateView({
  icon = null,
  title,
  description = "",
  action = null,
  className = "",
}) {
  return (
    <div
      className={`
        flex flex-col items-center justify-center
        px-6 py-12 text-center
        ${className}
      `}
      style={{
        display: "flex",
        width: "100%",
        minWidth: 0,
        maxWidth: "100%",
        alignSelf: "stretch",
        flex: "1 1 100%",
        boxSizing: "border-box",
      }}
    >
      {icon ? (
        <div
          className="mb-4 shrink-0 text-[var(--color-on-surface-variant)] opacity-50"
          style={{
            display: "flex",
            flexShrink: 0,
          }}
        >
          {typeof icon === 'string' ? (
            <span className="material-symbols-outlined text-[48px]">{icon}</span>
          ) : (
            icon
          )}
        </div>
      ) : null}

      <div
        style={{
          display: "block",
          width: "100%",
          minWidth: 0,
          maxWidth: "448px",
          boxSizing: "border-box",
        }}
      >
        <h3
          className="
            text-lg font-semibold
            text-[var(--color-on-surface)]
          "
          style={{
            display: "block",
            width: "100%",
            minWidth: 0,
            whiteSpace: "normal",
            wordBreak: "normal",
            overflowWrap: "break-word",
          }}
        >
          {title}
        </h3>

        {description ? (
          <p
            className="
              mt-2 text-sm leading-6
              text-[var(--color-on-surface-variant)]
            "
            style={{
              display: "block",
              width: "100%",
              minWidth: 0,
              maxWidth: "448px",
              marginLeft: "auto",
              marginRight: "auto",
              whiteSpace: "normal",
              wordBreak: "normal",
              overflowWrap: "break-word",
              writingMode: "horizontal-tb",
              textOrientation: "mixed",
              boxSizing: "border-box",
            }}
          >
            {description}
          </p>
        ) : null}
      </div>

      {action ? (
        <div
          className="mt-6"
          style={{
            display: "flex",
            width: "100%",
            minWidth: 0,
            justifyContent: "center",
          }}
        >
          {action}
        </div>
      ) : null}
    </div>
  );
}
