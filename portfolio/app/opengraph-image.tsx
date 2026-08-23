import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = "Shantanu Chandra — AI Transformation Leader: Signal, System, Scale";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const stages = [
  ["01", "Signal", "Find the valuable problem"],
  ["02", "System", "Design workflow and controls"],
  ["03", "Scale", "Drive adoption and measure"],
];

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#F4F1EA",
        color: "#151A18",
        padding: "62px 70px 56px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 58, height: 58, borderRadius: 12, background: "#0E5A55", color: "#F7F3EA", fontSize: 25, fontWeight: 700 }}>SC</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 29, fontWeight: 700 }}>{siteConfig.name}</div>
            <div style={{ marginTop: 3, fontSize: 19, color: "#5B6561" }}>{siteConfig.descriptor}</div>
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 16, fontWeight: 700, letterSpacing: "0.12em", color: "#0E5A55", textTransform: "uppercase" }}>AI transformation</div>
      </div>

      <div style={{ display: "flex", maxWidth: 990, fontSize: 64, lineHeight: 1.03, letterSpacing: "-0.035em", fontWeight: 650 }}>
        Turning complex AI opportunities into adopted, measurable systems.
      </div>

      <div style={{ display: "flex", gap: 16 }}>
        {stages.map(([number, label, description], index) => (
          <div
            key={label}
            style={{
              display: "flex",
              flex: 1,
              alignItems: "center",
              gap: 16,
              minHeight: 106,
              border: "2px solid #CDD2CC",
              borderTop: index === 0 ? "8px solid #9A5134" : index === 1 ? "8px solid #D9C6A2" : "8px solid #0E5A55",
              borderRadius: 12,
              background: "#FCFBF7",
              padding: "18px 20px",
            }}
          >
            <div style={{ display: "flex", color: "#9A5134", fontSize: 19, fontWeight: 700 }}>{number}</div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 27, fontWeight: 700 }}>{label}</div>
              <div style={{ marginTop: 3, fontSize: 15, color: "#5B6561" }}>{description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>,
    size,
  );
}
