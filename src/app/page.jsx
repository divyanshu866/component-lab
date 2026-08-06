"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Landing/Navbar";
import Card from "@/components/Landing/Card";
import SupportedTech from "@/components/Landing/SupportedTech";
import {
  Sparkles,
  Zap,
  Code2,
  Layers,
  ArrowRight,
  Check,
  MousePointer,
} from "lucide-react";
import Link from "next/link";

// ─── Typewriter hook ────────────────────────────────────────────────────────

function useTypewriter(text, speed = 36, startDelay = 300) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);

    let i = 0;

    let interval;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));

        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

// ─── Component Previews ──────────────────────────────────────────────────────

function BrutalistPreview() {
  const [hover, setHover] = useState(false);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0b0b0b",
      }}
    >
      <div
        style={{
          width: 230,
          background: "#F8F8F8",
          color: "#000",
          border: "4px solid black",
          boxShadow: "10px 10px black",
        }}
      >
        <div
          style={{
            padding: 14,
            borderBottom: "4px solid black",
            fontWeight: 900,
            fontSize: 18,
          }}
        >
          PROJECT
        </div>

        <div style={{ padding: 14 }}>
          {["Landing Page", "Dashboard", "Navbar"].map((item) => (
            <div
              key={item}
              style={{
                padding: "10px",
                border: "3px solid black",
                marginBottom: 10,
                fontWeight: 700,
              }}
            >
              {item}
            </div>
          ))}

          <button
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
              width: "100%",
              padding: 12,
              fontWeight: 900,
              background: hover ? "#ff3131" : "#FFD600",
              border: "3px solid black",
              cursor: "pointer",
              transform: hover ? "translate(-3px,-3px)" : "translate(0)",
              boxShadow: hover ? "5px 5px black" : "none",
              transition: ".15s",
            }}
          >
            DEPLOY →
          </button>
        </div>
      </div>
    </div>
  );
}

function GlassPreview() {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "radial-gradient(circle at top,#5b21b620,#111827,#09090b)",
      }}
    >
      <div
        style={{
          width: 220,
          padding: 22,
          borderRadius: 24,
          background: "rgba(255,255,255,0.05)",
          backdropFilter: "blur(30px)",
          border: "1px solid rgba(255,255,255,.08)",
          boxShadow:
            "0 20px 60px rgba(0,0,0,.45), inset 0 1px rgba(255,255,255,.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 18,
          }}
        >
          <div>
            <div
              style={{
                color: "#a1a1aa",
                fontSize: 11,
                letterSpacing: 1,
              }}
            >
              Revenue
            </div>

            <div
              style={{
                color: "white",
                fontWeight: 700,
                fontSize: 30,
                marginTop: 4,
              }}
            >
              $24.5k
            </div>
          </div>

          <div
            style={{
              color: "#4ade80",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            +18%
          </div>
        </div>

        <div
          style={{
            height: 70,
            borderRadius: 16,
            background:
              "linear-gradient(180deg,#8b5cf610,transparent), #111827",
            display: "flex",
            alignItems: "end",
            gap: 8,
            padding: 12,
            marginBottom: 18,
          }}
        >
          {[40, 60, 35, 75, 52, 90, 68].map((h) => (
            <div
              key={h}
              style={{
                flex: 1,
                height: h + "%",
                borderRadius: 20,
                background: "linear-gradient(to top,#8b5cf6,#c084fc)",
              }}
            />
          ))}
        </div>

        <button
          style={{
            width: "100%",
            padding: "11px",
            borderRadius: 14,
            border: "none",
            background: "linear-gradient(135deg,#8b5cf6,#6366f1)",
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          View Analytics
        </button>
      </div>
    </div>
  );
}

function NeonPreview() {
  const [focused, setFocused] = useState(false);
  const [val, setVal] = useState("");

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "radial-gradient(circle,#312e8140,#09090b)",
      }}
    >
      <div
        style={{
          width: 240,
          padding: 18,
          borderRadius: 18,
          background: "#0b0b12",
          border: "1px solid #27272a",
          boxShadow: "0 0 60px rgba(139,92,246,.12)",
        }}
      >
        <div
          style={{
            color: "#c084fc",
            fontWeight: 700,
            fontSize: 13,
            marginBottom: 14,
          }}
        >
          AI Search
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "12px 14px",
            borderRadius: 14,
            background: "#111118",
            border: focused ? "1px solid #a855f7" : "1px solid #27272a",
            boxShadow: focused ? "0 0 30px rgba(168,85,247,.3)" : "none",
          }}
        >
          <span
            style={{
              color: "#8b5cf6",
              marginRight: 10,
            }}
          >
            ⌕
          </span>

          <input
            value={val}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(e) => setVal(e.target.value)}
            placeholder="Generate dashboard..."
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "white",
              width: "100%",
              fontSize: 13,
            }}
          />
        </div>

        <div
          style={{
            marginTop: 18,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {["Dashboard generated", "Tailwind detected", "Preview ready"].map(
            (item) => (
              <div
                key={item}
                style={{
                  padding: "10px 12px",
                  borderRadius: 10,
                  background: "#13131b",
                  color: "#d4d4d8",
                  fontSize: 12,
                  border: "1px solid #27272a",
                }}
              >
                ✓ {item}
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}

const DEMOS = [
  {
    prompt: "Build a brutalist button with red hover state",
    preview: BrutalistPreview,
    label: "BrutalistButton",
  },
  {
    prompt: "Design a glassmorphism pricing card",
    preview: GlassPreview,
    label: "GlassCard",
  },
  {
    prompt: "Create a neon-bordered search input with dropdown",
    preview: NeonPreview,
    label: "NeonSearch",
  },
];

// ─── Animated Demo Card ──────────────────────────────────────────────────────

function DemoCard() {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState("typing"); // typing | rendering | preview
  const demo = DEMOS[idx];
  const { displayed, done } = useTypewriter(demo.prompt, 36, 400);
  const Preview = demo.preview;

  useEffect(() => {
    if (!done) {
      setPhase("typing");
      return;
    }
    const t1 = setTimeout(() => setPhase("rendering"), 300);
    const t2 = setTimeout(() => setPhase("preview"), 1100);
    const t3 = setTimeout(() => {
      setPhase("typing");
      setIdx((i) => (i + 1) % DEMOS.length);
    }, 4600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [done]);

  return (
    <div
      style={{
        background: "#0d0d10",
        border: "1px solid #1e1e22",
        borderRadius: 16,
        overflow: "hidden",
        width: "100%",
        height: "100%",
        maxWidth: 460,
        boxShadow:
          "0 0 100px rgba(168,85,247,0.1), 0 30px 60px rgba(0,0,0,0.6)",
      }}
    >
      {/* Title bar */}
      <div
        style={{
          background: "#0a0a0c",
          borderBottom: "1px solid #1c1c20",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#ef4444",
            opacity: 0.7,
          }}
        />
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#f59e0b",
            opacity: 0.7,
          }}
        />
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: "#22c55e",
            opacity: 0.7,
          }}
        />
        <span
          style={{
            marginLeft: 10,
            fontSize: 11,
            color: "#3f3f46",
            fontFamily: "monospace",
          }}
        >
          ComponentLab — workspace
        </span>
      </div>

      {/* Prompt input */}
      <div
        style={{
          padding: "14px 18px",
          borderBottom: "1px solid #1c1c20",
          background: "#0c0c0f",
        }}
      >
        <div
          style={{
            fontSize: 10,
            color: "#6d28d9",
            fontWeight: 700,
            letterSpacing: 2.5,
            textTransform: "uppercase",
            marginBottom: 7,
          }}
        >
          Prompt
        </div>
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 13,
            color: "#d4d4d8",
            lineHeight: 1.6,
            minHeight: 42,
          }}
        >
          {displayed}
          {phase === "typing" && (
            <span
              style={{
                display: "inline-block",
                width: 2,
                height: "0.9em",
                background: "#e879f9",
                marginLeft: 1,
                verticalAlign: "middle",
                animation: "blink 1s step-end infinite",
              }}
            />
          )}
        </div>
      </div>

      {/* Preview window */}
      <div
        style={{
          height: 394,
          position: "relative",
          overflow: "hidden",
          background: "#090910",
        }}
      >
        {/* Rendering spinner */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            opacity: phase === "rendering" ? 1 : 0,
            transition: "opacity 0.3s",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              border: "2px solid #27272a",
              borderTopColor: "#e879f9",
              animation: "spin 0.8s linear infinite",
            }}
          />
          <div
            style={{
              color: "#3f3f46",
              fontSize: 11,
              fontFamily: "monospace",
              marginTop: 12,
            }}
          >
            rendering component…
          </div>
        </div>
        {/* Component preview */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: phase === "preview" ? 1 : 0,
            transform: phase === "preview" ? "scale(1)" : "scale(0.97)",
            transition: "all 0.45s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >
          <Preview />
        </div>
      </div>

      {/* Footer bar */}
      <div
        style={{
          padding: "8px 18px",
          background: "#0a0a0c",
          borderTop: "1px solid #1c1c20",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background:
                phase === "typing"
                  ? "#f59e0b"
                  : phase === "rendering"
                    ? "#e879f9"
                    : "#22c55e",
              boxShadow: `0 0 6px ${phase === "typing" ? "#f59e0b" : phase === "rendering" ? "#e879f9" : "#22c55e"}`,
            }}
          />
          <span
            style={{ fontSize: 11, fontFamily: "monospace", color: "#52525b" }}
          >
            {phase === "typing"
              ? "waiting…"
              : phase === "rendering"
                ? "generating…"
                : `${demo.label}.jsx`}
          </span>
        </div>
        {phase === "preview" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              fontSize: 10,
              color: "#22c55e",
              fontFamily: "monospace",
            }}
          >
            <Check style={{ width: 10, height: 10 }} /> ready
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Feature Cards ───────────────────────────────────────────────────────────

const FEATURES = [
  {
    icon: Zap,
    title: "Instant generation",
    desc: "Describe any component in plain English. ComponentLab streams production-ready HTML and CSS in under two seconds.",
    accent: "#e879f9",
  },
  {
    icon: Layers,
    title: "Iterate with AI",
    desc: "Make changes in natural language. The AI understands your component's context and modifies only what you asked.",
    accent: "#a78bfa",
  },
  {
    icon: Code2,
    title: "Clean, portable code",
    desc: "Every component ships as framework-agnostic HTML, CSS, and vanilla JS — drop it anywhere with zero dependencies.",
    accent: "#818cf8",
  },
];

const STEPS = [
  {
    label: "Describe",
    title: "Type what you need",
    desc: "Plain English. Style, behaviour, layout — describe it exactly how you'd explain it to a developer.",
  },
  {
    label: "Preview",
    title: "Watch it appear",
    desc: "Your component streams into a live sandbox in real time. Interact with it before touching a single line of code.",
  },
  {
    label: "Ship",
    title: "Copy and go",
    desc: "Grab clean, framework-agnostic code and paste it straight into your project. Nothing to install.",
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] text-white overflow-x-hidden">
      <style>{`
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes spin  { to   { transform: rotate(360deg); } }
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-14px); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes orb { 0%,100% { transform:scale(1) translate(0,0); } 40% { transform:scale(1.08) translate(14px,-14px); } 70% { transform:scale(0.95) translate(-8px,8px); } }
        @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }

        .fu  { animation: fadeUp 0.75s cubic-bezier(0.22,1,0.36,1) both; }
        .d1  { animation-delay: 0.05s; }
        .d2  { animation-delay: 0.12s; }
        .d3  { animation-delay: 0.2s; }
        .d4  { animation-delay: 0.28s; }
        .d5  { animation-delay: 0.36s; }

        .feat-card { transition: transform 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease; }
        .feat-card:hover { transform: translateY(-5px); border-color: rgba(168,85,247,0.25) !important; box-shadow: 0 0 40px rgba(168,85,247,0.07); }

        .primary-btn { transition: transform 0.18s ease, box-shadow 0.18s ease; }
        .primary-btn:hover { transform: scale(1.04); box-shadow: 0 0 40px rgba(232,121,249,0.35); }

        .ghost-btn { transition: background 0.18s ease, color 0.18s ease; }
        .ghost-btn:hover { background: rgba(255,255,255,0.06) !important; }

        .step-card { transition: border-color 0.22s ease; }
        .step-card:hover { border-color: rgba(232,121,249,0.2) !important; }

        @media (prefers-reduced-motion: reduce) {
          .fu, .feat-card:hover, .primary-btn:hover { animation: none !important; transform: none !important; }
        }
      `}</style>

      {/* Nav ─────────────────────────────────────────────────────────────── */}
      <Navbar />

      {/* Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative z-10 px-6 lg:px-12 pt-16 pb-20 mt-20 lg:pt-20">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <div>
            <div
              className="fu d1 inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8"
              style={{
                background: "rgba(232,121,249,0.08)",
                border: "1px solid rgba(232,121,249,0.18)",
                color: "#e879f9",
              }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI-powered UI generation
            </div>

            <h1 className="fu d2  text-5xl lg:text-6xl xl:text-6xl font-semibold leading-[1.04] tracking-tight mb-6">
              <span
                style={{
                  background:
                    "linear-gradient(130deg,#c7005b 0%,#a78bfa 45%,#8200da 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Build UI Components with AI.
              </span>

              <span className="text-zinc-50"> Ship Instantly</span>
            </h1>

            <p className="fu d3 text-[1.05rem] text-zinc-400 leading-relaxed mb-10 max-w-max">
              Describe your idea in plain English and watch Al generate
              production-ready components with clean code, live preview, and
              full control.
            </p>

            <div className="fu d4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href="/workspace"
                className="primary-btn inline-flex items-center gap-2.5 px-7 py-4 bg-gradient-to-r from-pink-700 to-purple-700 rounded-lg font-bold text-base"
              >
                Start building free
                <ArrowRight className="w-4 h-4" />
              </Link>
              <span className="text-sm text-zinc-500 flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500 shrink-0" />3 free
                prompts — no sign-up needed
              </span>
            </div>
          </div>

          {/* Demo card */}
          <div
            className="fu d5 h-140 flex justify-center lg:justify-end"
            style={{
              animation:
                "fadeUp 0.75s cubic-bezier(0.22,1,0.36,1) 0.36s both, float 7s ease-in-out 1.2s infinite",
            }}
          >
            <DemoCard />
          </div>
        </div>
      </section>

      {/* Stats bar ──────────────────────────────────────────────────────── */}
      {/* <div
        className="relative z-10 py-8"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-wrap justify-center gap-x-14 gap-y-5">
          {[
            { val: "10k+", label: "Components generated" },
            { val: "< 2s", label: "Average generation time" },
            { val: "100%", label: "Framework agnostic" },
            { val: "Free", label: "To get started" },
          ].map(({ val, label }) => (
            <div key={label} className="text-center">
              <div
                className="text-2xl font-black"
                style={{
                  background: "linear-gradient(135deg,#c7005b,#8200da)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {val}
              </div>
              <div className="text-xs text-zinc-500 mt-0.5 font-medium">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div> */}
      <SupportedTech />

      {/* Features ───────────────────────────────────────────────────────── */}
      <section className="relative z-10 px-6 lg:px-12 pt-18">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="text-xs font-bold tracking-[0.2em] text-zinc-600 uppercase mb-4">
              Why ComponentLab
            </div>
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight">
              Everything you need.
              <br />
              <span className="text-zinc-400 font-semibold">
                Nothing you don't.
              </span>
            </h2>
          </div>
          <Card />
        </div>
      </section>

      {/* How it works ───────────────────────────────────────────────────── */}
      <section className="relative z-10 px-6 lg:px-12 py-24 border border-y-white/5 border-x-0">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <div className="text-xs font-bold tracking-[0.2em] text-zinc-600 uppercase mb-4">
              The process
            </div>
            <h2 className="text-3xl lg:text-4xl font-black tracking-tight">
              From idea to code
              <br />
              <span className="text-zinc-400 font-semibold">
                in three steps.
              </span>
            </h2>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div
              className="absolute left-[30px] top-10 bottom-10 w-px hidden sm:block"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(232,121,249,0.3), rgba(129,140,248,0.3))",
              }}
            />

            <div className="space-y-4">
              {STEPS.map(({ label, title, desc }, i) => (
                <div
                  key={label}
                  className="step-card flex gap-6 p-6 rounded-2xl relative bg-[#101011] border border-white/5"
                >
                  <div className="shrink-0 w-15 flex flex-col items-center">
                    <div
                      className="w-3.5 h-3.5 rounded-full mt-1.5 shrink-0"
                      style={{
                        background: `linear-gradient(135deg,#e879f9,#818cf8)`,
                        boxShadow: "0 0 12px rgba(232,121,249,0.4)",
                      }}
                    />
                    <div
                      className="text-[10px] font-bold tracking-widest mt-2"
                      style={{ color: "#52525b" }}
                    >
                      {label}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1.5 text-[15px]">
                      {title}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive try-it hint ─────────────────────────────────────────── */}
      <section className="relative z-10 px-6 lg:px-12 py-16 border border-y-white/5 border-x-0">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-2xl bg-neutral-950/20 overflow-hidden border border-white/5">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-10 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-5">
                  <MousePointer
                    className="w-4 h-4"
                    style={{ color: "#e879f9" }}
                  />
                  <span className="text-xs font-bold tracking-widest text-zinc-500 uppercase">
                    Live demo
                  </span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-black tracking-tight mb-4">
                  See it work
                  <br />
                  in real time.
                </h2>
                <p className="text-sm text-zinc-400 leading-relaxed mb-7 max-w-xs">
                  The animated card above is a real preview of the ComponentLab
                  experience — typewriter prompt, live rendering, interactive
                  output.
                </p>
                <Link
                  href="/workspace"
                  className="primary-btn self-start inline-flex items-center gap-2.5 px-6 py-3 bg-linear-to-r from-pink-700 to-purple-700 rounded-full font-bold text-sm"
                >
                  Try it yourself <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div
                className="p-8 lg:p-10 flex items-center justify-center"
                style={{ borderLeft: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="space-y-3 w-full max-w-70">
                  {[
                    "Build a brutalist button",
                    "Create a glass card",
                    "Design a neon search input",
                    "Make a responsive navbar",
                    "Add a dark mode toggle",
                  ].map((prompt, i) => (
                    <div
                      key={prompt}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-mono text-zinc-400 cursor-default"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        animationDelay: `${i * 0.08}s`,
                        opacity: 1,
                      }}
                    >
                      <span style={{ color: "#6d28d9" }}>›</span>
                      {prompt}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA ─────────────────────────────────────────────────────────────── */}
      <section
        className="relative z-10 px-6 lg:px-12 py-28"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="max-w-xl mx-auto text-center">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-8"
            style={{
              background:
                "linear-gradient(135deg,rgba(232,121,249,0.15),rgba(129,140,248,0.15))",
              border: "1px solid rgba(232,121,249,0.2)",
            }}
          >
            <Sparkles className="w-6 h-6" style={{ color: "#e879f9" }} />
          </div>
          <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-4">
            <span className="text-zinc-50">Ready to build</span>
            <br />
            <span
              style={{
                background: "linear-gradient(130deg,#e879f9,#a78bfa,#818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              something great?
            </span>
          </h2>
          <p className="text-zinc-500 mb-10 text-[15px]">
            Start with 3 free prompts. No account, no credit card.
          </p>
          <Link
            href="/workspace"
            className="primary-btn inline-flex items-center gap-2.5 px-9 py-4 bg-linear-to-r from-pink-800 to-purple-700 rounded-full font-bold text-base"
          >
            <Zap className="w-5 h-5" />
            Open the workspace
          </Link>
        </div>
      </section>

      {/* Footer ──────────────────────────────────────────────────────────── */}
      <footer
        className="relative z-10 px-6 lg:px-12 py-8"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="flex items-center justify-start w-max gap-0 group"
            >
              <img src="/newlogo.svg" alt="Logo" className="w-12 h-12" />
              <img src="/name.svg" alt="Logo" className="h-9 mb-1" />
            </Link>
          </div>
          <span className="text-xs text-zinc-700">
            Built with AI. Shipped by you.
          </span>
        </div>
      </footer>
    </div>
  );
}
