"use client";

// ─── Feature card top icons ───────────────────────────────────────────────────

function IconGen() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <line
        x1="22"
        y1="5"
        x2="22"
        y2="39"
        stroke="url(#ig-v)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="5"
        y1="22"
        x2="39"
        y2="22"
        stroke="url(#ig-h)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="22" cy="6" r="3.2" fill="#fbbf24" />
      <circle cx="22" cy="38" r="2.6" fill="#a78bfa" />
      <circle cx="6" cy="22" r="3.2" fill="#4ade80" />
      <circle cx="38" cy="22" r="2.6" fill="#f472b6" />
      <circle cx="22" cy="22" r="5.5" fill="url(#ig-c)" />
      <defs>
        <linearGradient
          id="ig-v"
          x1="22"
          y1="5"
          x2="22"
          y2="39"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fbbf24" />
          <stop offset="1" stopColor="#a78bfa" />
        </linearGradient>
        <linearGradient
          id="ig-h"
          x1="5"
          y1="22"
          x2="39"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4ade80" />
          <stop offset="1" stopColor="#f472b6" />
        </linearGradient>
        <radialGradient id="ig-c" cx="50%" cy="50%" r="50%">
          <stop stopColor="#e879f9" />
          <stop offset="1" stopColor="#8b5cf6" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function IconChat() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <line
        x1="22"
        y1="5"
        x2="22"
        y2="39"
        stroke="url(#ic-v)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="5"
        y1="22"
        x2="39"
        y2="22"
        stroke="url(#ic-h)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="22" cy="6" r="3" fill="#a78bfa" />
      <circle cx="22" cy="38" r="2.6" fill="#e879f9" />
      <circle cx="6" cy="22" r="3" fill="#60a5fa" />
      <circle cx="38" cy="22" r="2.6" fill="#fbbf24" />
      <circle cx="22" cy="22" r="5.5" fill="url(#ic-c)" />
      <defs>
        <linearGradient
          id="ic-v"
          x1="22"
          y1="5"
          x2="22"
          y2="39"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#a78bfa" />
          <stop offset="1" stopColor="#e879f9" />
        </linearGradient>
        <linearGradient
          id="ic-h"
          x1="5"
          y1="22"
          x2="39"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#60a5fa" />
          <stop offset="1" stopColor="#fbbf24" />
        </linearGradient>
        <radialGradient id="ic-c" cx="50%" cy="50%" r="50%">
          <stop stopColor="#818cf8" />
          <stop offset="1" stopColor="#a78bfa" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function IconEdit() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      {/* Outward arrows */}
      <path
        d="M22 8V16M22 8L19 11M22 8L25 11"
        stroke="url(#ie-t)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 28V36M22 36L19 33M22 36L25 33"
        stroke="url(#ie-b)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 22H16M8 22L11 19M8 22L11 25"
        stroke="url(#ie-l)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28 22H36M36 22L33 19M36 22L33 25"
        stroke="url(#ie-r)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Tip dots */}
      <circle cx="22" cy="7" r="2.8" fill="#fbbf24" />
      <circle cx="22" cy="37" r="2.8" fill="#f472b6" />
      <circle cx="7" cy="22" r="2.8" fill="#a78bfa" />
      <circle cx="37" cy="22" r="2.8" fill="#4ade80" />
      {/* Center */}
      <circle cx="22" cy="22" r="5" fill="url(#ie-c)" />
      <defs>
        <linearGradient
          id="ie-t"
          x1="22"
          y1="8"
          x2="22"
          y2="16"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#fbbf24" />
          <stop offset="1" stopColor="#e879f9" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient
          id="ie-b"
          x1="22"
          y1="28"
          x2="22"
          y2="36"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#e879f9" stopOpacity="0.3" />
          <stop offset="1" stopColor="#f472b6" />
        </linearGradient>
        <linearGradient
          id="ie-l"
          x1="8"
          y1="22"
          x2="16"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#a78bfa" />
          <stop offset="1" stopColor="#e879f9" stopOpacity="0.3" />
        </linearGradient>
        <linearGradient
          id="ie-r"
          x1="28"
          y1="22"
          x2="36"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#e879f9" stopOpacity="0.3" />
          <stop offset="1" stopColor="#4ade80" />
        </linearGradient>
        <radialGradient id="ie-c" cx="50%" cy="50%" r="50%">
          <stop stopColor="#e879f9" />
          <stop offset="1" stopColor="#8b5cf6" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function IconExport() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
      <circle cx="22" cy="7" r="5.5" fill="#e879f9" />
      <circle cx="37" cy="22" r="5.5" fill="#60a5fa" />
      <circle cx="22" cy="37" r="5.5" fill="#fbbf24" />
      <circle cx="7" cy="22" r="5.5" fill="#a78bfa" />
      <line
        x1="22"
        y1="12"
        x2="22"
        y2="32"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
      />
      <line
        x1="12"
        y1="22"
        x2="32"
        y2="22"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="1"
      />
      <circle cx="22" cy="22" r="3" fill="rgba(232,121,249,0.3)" />
    </svg>
  );
}

// ─── Card illustrations ───────────────────────────────────────────────────────

function IllustrationGen() {
  return (
    <div
      style={{
        position: "relative",
        height: 148,
        marginTop: 28,
        overflow: "hidden",
      }}
    >
      {/* Sparkle glyphs */}
      <span
        style={{
          position: "absolute",
          top: 6,
          right: 24,
          fontSize: 11,
          color: "rgba(232,121,249,0.65)",
          pointerEvents: "none",
        }}
      >
        ✦
      </span>
      <span
        style={{
          position: "absolute",
          top: 36,
          left: 6,
          fontSize: 8,
          color: "rgba(167,139,250,0.55)",
          pointerEvents: "none",
        }}
      >
        ✦
      </span>
      <span
        style={{
          position: "absolute",
          bottom: 22,
          left: 28,
          fontSize: 7,
          color: "rgba(255,255,255,0.3)",
          pointerEvents: "none",
        }}
      >
        ✦
      </span>

      {/* Back card */}
      <div
        style={{
          position: "absolute",
          top: 8,
          left: "2%",
          width: "72%",
          padding: "13px 15px",
          background:
            "linear-gradient(135deg, rgba(50,28,90,0.9), rgba(30,15,60,0.95))",
          border: "1px solid rgba(139,92,246,0.22)",
          borderRadius: 14,
          boxShadow:
            "0 8px 28px rgba(0,0,0,0.45), 0 0 40px rgba(139,92,246,0.06)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            marginBottom: 10,
          }}
        >
          <div
            style={{
              width: 16,
              height: 16,
              borderRadius: 5,
              background: "linear-gradient(135deg,#e879f9,#8b5cf6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: 7, color: "white" }}>✦</span>
          </div>
          <div
            style={{
              height: 6,
              width: 62,
              borderRadius: 3,
              background: "rgba(255,255,255,0.14)",
            }}
          />
          <div
            style={{
              marginLeft: "auto",
              height: 5,
              width: 14,
              borderRadius: 2,
              background: "rgba(255,255,255,0.06)",
            }}
          />
        </div>
        <div
          style={{
            height: 1,
            background: "rgba(255,255,255,0.06)",
            marginBottom: 9,
          }}
        />
        <div
          style={{
            height: 26,
            borderRadius: 7,
            background: "rgba(139,92,246,0.12)",
            border: "1px solid rgba(139,92,246,0.2)",
            display: "flex",
            alignItems: "center",
            paddingLeft: 10,
            gap: 6,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "rgba(232,121,249,0.55)",
            }}
          />
          <div
            style={{
              height: 5,
              width: 58,
              borderRadius: 3,
              background: "rgba(255,255,255,0.09)",
            }}
          />
        </div>
      </div>

      {/* Front card */}
      <div
        style={{
          position: "absolute",
          bottom: 8,
          right: "0%",
          width: "62%",
          padding: "11px 13px",
          background:
            "linear-gradient(135deg, rgba(60,32,100,0.92), rgba(40,20,75,0.97))",
          border: "1px solid rgba(139,92,246,0.2)",
          borderRadius: 12,
          boxShadow: "0 8px 24px rgba(139,92,246,0.12)",
        }}
      >
        <div
          style={{
            height: 5,
            width: "82%",
            borderRadius: 3,
            background: "rgba(255,255,255,0.1)",
            marginBottom: 6,
          }}
        />
        <div
          style={{
            height: 5,
            width: "58%",
            borderRadius: 3,
            background: "rgba(255,255,255,0.06)",
            marginBottom: 6,
          }}
        />
        <div
          style={{
            height: 5,
            width: "70%",
            borderRadius: 3,
            background: "rgba(255,255,255,0.05)",
          }}
        />
      </div>
    </div>
  );
}

function IllustrationConversational() {
  return (
    <div style={{ position: "relative", height: 148, marginTop: 28 }}>
      <span
        style={{
          position: "absolute",
          top: 6,
          right: 14,
          fontSize: 11,
          color: "rgba(232,121,249,0.65)",
        }}
      >
        ✦
      </span>
      <span
        style={{
          position: "absolute",
          bottom: 18,
          left: 12,
          fontSize: 9,
          color: "rgba(255,255,255,0.3)",
        }}
      >
        ✦
      </span>
      <span
        style={{
          position: "absolute",
          bottom: 8,
          right: 32,
          fontSize: 7,
          color: "rgba(167,139,250,0.55)",
        }}
      >
        ✦
      </span>

      {/* Top bubble */}
      <div
        style={{
          position: "absolute",
          top: 12,
          left: "0%",
          width: "76%",
          padding: "11px 14px",
          background: "linear-gradient(135deg, #4c1d95, #5b21b6, #6d28d9)",
          borderRadius: "14px 14px 14px 4px",
          boxShadow: "0 4px 20px rgba(109,40,217,0.3)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 6,
          }}
        >
          <div
            style={{
              height: 4,
              width: 52,
              borderRadius: 3,
              background: "linear-gradient(90deg,#e879f9,#a78bfa)",
            }}
          />
          <div
            style={{
              height: 4,
              flex: 1,
              borderRadius: 3,
              background: "rgba(255,255,255,0.14)",
            }}
          />
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontSize: 9,
                color: "rgba(255,255,255,0.7)",
                fontWeight: 700,
              }}
            >
              →
            </span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              height: 4,
              width: 38,
              borderRadius: 3,
              background: "linear-gradient(90deg,#60a5fa,#34d399)",
            }}
          />
          <div
            style={{
              height: 4,
              width: 28,
              borderRadius: 3,
              background: "rgba(255,255,255,0.09)",
            }}
          />
        </div>
      </div>

      {/* Bottom bubble (larger) */}
      <div
        style={{
          position: "absolute",
          bottom: 8,
          right: "0%",
          width: "82%",
          padding: "13px 14px",
          background: "linear-gradient(135deg, #312e81, #3730a3, #4338ca)",
          borderRadius: "14px 14px 4px 14px",
          boxShadow: "0 4px 24px rgba(67,56,202,0.3)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 6,
          }}
        >
          <div
            style={{
              height: 4,
              width: 68,
              borderRadius: 3,
              background: "linear-gradient(90deg,#fbbf24,#f472b6)",
            }}
          />
          <div
            style={{
              height: 4,
              flex: 1,
              borderRadius: 3,
              background: "rgba(255,255,255,0.12)",
            }}
          />
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                fontSize: 9,
                color: "rgba(255,255,255,0.65)",
                fontWeight: 700,
              }}
            >
              →
            </span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              height: 4,
              width: 44,
              borderRadius: 3,
              background: "linear-gradient(90deg,#4ade80,#60a5fa)",
            }}
          />
          <div
            style={{
              height: 4,
              width: 58,
              borderRadius: 3,
              background: "rgba(255,255,255,0.07)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

const CODE_LINES = [
  [{ w: 28, c: "#e879f9" }, { w: 8 }, { w: 44, c: "#fbbf24" }],
  [{ w: 58, c: "#60a5fa" }],
  [{ w: 78, c: "#4ade80" }],
  [{ w: 46, c: "#fb923c" }],
  [{ w: 30, c: "#fbbf24" }],
  [{ w: 64, c: "#a78bfa" }],
];

function IllustrationEdit() {
  return (
    <div
      style={{
        marginTop: 28,
        background: "#080812",
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Tab bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "0 10px",
          gap: 0,
        }}
      >
        <div
          style={{
            padding: "7px 10px",
            fontSize: 10,
            fontWeight: 600,
            color: "#a78bfa",
            borderBottom: "1.5px solid #a78bfa",
            marginBottom: "-1px",
          }}
        >
          edit
        </div>
        <div
          style={{
            width: 1,
            height: 18,
            background: "rgba(255,255,255,0.06)",
            margin: "0 4px",
          }}
        />
        <div
          style={{
            padding: "7px 10px",
            fontSize: 10,
            color: "rgba(255,255,255,0.2)",
          }}
        >
          preview
        </div>
      </div>
      {/* Code rows */}
      <div
        style={{
          padding: "10px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        {CODE_LINES.map((segments, i) => (
          <div
            key={i}
            style={{ display: "flex", alignItems: "center", gap: 6 }}
          >
            {/* Line number dot */}
            <div
              style={{
                width: 10,
                height: 4,
                borderRadius: 2,
                background: "rgba(255,255,255,0.07)",
                flexShrink: 0,
              }}
            />
            {segments.map((seg, j) =>
              seg.c ? (
                <div
                  key={j}
                  style={{
                    height: 4,
                    width: seg.w,
                    borderRadius: 2,
                    background: seg.c,
                    opacity: 0.82,
                    flexShrink: 0,
                  }}
                />
              ) : (
                <div key={j} style={{ width: seg.w, flexShrink: 0 }} />
              ),
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ReactLogo() {
  return (
    <svg width="46" height="46" viewBox="0 0 46 46" fill="none">
      <ellipse
        cx="23"
        cy="23"
        rx="21"
        ry="8"
        stroke="#61dafb"
        strokeWidth="1.8"
        fill="none"
      />
      <ellipse
        cx="23"
        cy="23"
        rx="21"
        ry="8"
        stroke="#61dafb"
        strokeWidth="1.8"
        fill="none"
        transform="rotate(60 23 23)"
      />
      <ellipse
        cx="23"
        cy="23"
        rx="21"
        ry="8"
        stroke="#61dafb"
        strokeWidth="1.8"
        fill="none"
        transform="rotate(120 23 23)"
      />
      <circle cx="23" cy="23" r="3.2" fill="#61dafb" />
    </svg>
  );
}

function HTML5Logo() {
  return (
    <svg width="40" height="46" viewBox="0 0 40 46" fill="none">
      <polygon points="2,0 38,0 34.5,40 20,44 5.5,40" fill="#e34f26" />
      <polygon points="20,40.5 31.5,37.5 34.5,4 20,4" fill="#ef652a" />
      <text
        x="20"
        y="31"
        textAnchor="middle"
        fill="white"
        fontSize="19"
        fontWeight="800"
        fontFamily="system-ui"
      >
        5
      </text>
    </svg>
  );
}

function VueLogo() {
  return (
    <svg width="46" height="40" viewBox="0 0 46 40" fill="none">
      <path d="M23 0L42 0L23 40L4 0H14L23 20L32 0H23" fill="#42b883" />
      <path d="M23 0L32 0L23 20L14 0H23" fill="#35495e" />
    </svg>
  );
}

function IllustrationExport() {
  return (
    <div
      style={{
        marginTop: 28,
        display: "flex",
        alignItems: "center",
        gap: 14,
        flexWrap: "nowrap",
      }}
    >
      <ReactLogo />
      <HTML5Logo />
      <VueLogo />
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: 10,
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.09)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            color: "rgba(255,255,255,0.35)",
            fontSize: 16,
            letterSpacing: 2,
          }}
        >
          •••
        </span>
      </div>
    </div>
  );
}

// ─── Feature data ─────────────────────────────────────────────────────────────

const FEATURES = [
  //   {
  //     Icon: IconGen,
  //     title: "AI Component Generation",
  //     desc: "Describe anything. Get clean, production-ready code and a live preview in seconds.",
  //     Illustration: IllustrationGen,
  //   },
  {
    Icon: IconChat,
    title: "Conversational Editing",
    desc: "Refine your component through natural conversation. AI understands context and iterates instantly.",
    Illustration: IllustrationConversational,
  },
  {
    Icon: IconEdit,
    title: "Edit & Customize",
    desc: "Tweak the generated code in our powerful editor with autocomplete, syntax highlighting and more.",
    Illustration: IllustrationEdit,
  },
  {
    Icon: IconExport,
    title: "Export Anywhere",
    desc: "Copy code or export to your favorite stack. Works with any framework or setup.",
    Illustration: IllustrationExport,
  },
];

// ─── Section ──────────────────────────────────────────────────────────────────

export default function FeaturesSection() {
  return (
    <section className="py-24 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        {/* <h2 className="mb-12 text-center text-3xl font-bold tracking-tight text-white lg:text-4xl">
          Everything you need to build{" "}
          <span
            style={{
              background: "linear-gradient(135deg,#ec4899,#e879f9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            better
          </span>
          {", "}
          <span
            style={{
              background: "linear-gradient(135deg,#a78bfa,#818cf8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            faster
          </span>
        </h2> */}

        {/* Cards grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ Icon, title, desc, Illustration }) => (
            <div
              key={title}
              className="group flex flex-col rounded-[20px] p-6 transition-all duration-300 bg-neutral-950/20 hover:-translate-y-1"
              style={{
                border: "1px solid rgba(255,255,255,0.055)",
                boxShadow: "0 2px 24px rgba(0,0,0,0.3)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "rgba(139,92,246,0.22)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "rgba(255,255,255,0.055)")
              }
            >
              {/* Icon */}
              <div className="mb-5 self-start">
                <Icon />
              </div>

              {/* Text */}
              <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
              <p className="text-md leading-relaxed text-neutral-500">{desc}</p>

              {/* Illustration — pushes to bottom */}
              <div className="mt-auto">
                <Illustration />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
