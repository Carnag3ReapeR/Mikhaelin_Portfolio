// src/components/ui/AuroraBackground.jsx
//
// Renders the fixed, full-viewport animated gradient backdrop ("aurora")
// that sits behind every section. Mount this once near the root of the
// app (see App.jsx) — it uses position: fixed so it never scrolls.

function AuroraBackground() {
  return (
    <div className="aurora-bg" aria-hidden="true">
      <div className="aurora-blob aurora-blob--1" />
      <div className="aurora-blob aurora-blob--2" />
      <div className="aurora-blob aurora-blob--3" />
    </div>
  );
}

export default AuroraBackground;
