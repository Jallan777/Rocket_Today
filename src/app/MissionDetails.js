"use client";
import React, { useRef } from "react";

export default function MissionDetails({ description, isYesPage }) {
  const scrollRef = useRef(null);

  if (!description) return null;

  const missionDetailsBackground = "rgba(255, 255, 255, 0.1)"; // Match the background color of the mission details box

  return (
    <div className="border-t border-white/10 pt-3 text-left">
      <span className="font-bold block mb-1">Details</span>
      <div className="relative">
        <div
          ref={scrollRef}
          style={{
            maxHeight: "120px",
            minWidth: "0",
            width: "fit-content",
            maxWidth: "100%",
            overflowY: "auto",
            paddingTop: "6px",
            paddingBottom: "6px",
            scrollbarWidth: "thin",
            msOverflowStyle: "none",
            wordBreak: "break-word",
            whiteSpace: "pre-wrap",
          }}
          className="text-sm text-white/80 pr-2 mission-details-scroll"
        >
          {description}
        </div>
        {/* Fading overlays for elegance */}
        <div
          style={{
            pointerEvents: "none",
            position: "absolute",
            left: 0,
            right: 0,
            top: 0,
            height: "18px",
            background: isYesPage
              ? "linear-gradient(to bottom, rgba(55, 119, 229, 0.75), rgba(39, 89, 255, 0))"
              : `linear-gradient(to bottom, ${missionDetailsBackground}, rgba(0, 0, 0, 0))`,
          }}
        />
        <div
          style={{
            pointerEvents: "none",
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: "18px",
            background: isYesPage
              ? "linear-gradient(to top, rgba(55, 119, 229, 0.75), rgba(39, 89, 255, 0))"
              : `linear-gradient(to top, ${missionDetailsBackground}, rgba(0, 0, 0, 0))`,
          }}
        />
        <style>{`
          .mission-details-scroll::-webkit-scrollbar {
            width: 8px;
            border-radius: 8px;
            background: transparent;
          }
          .mission-details-scroll::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%);
            border-radius: 8px;
          }
          .mission-details-scroll {
            scrollbar-color: #295aa8 transparent;
            scrollbar-width: thin;
          }
        `}</style>
      </div>
    </div>
  );
}
