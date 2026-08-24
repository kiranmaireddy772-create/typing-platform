"use client";

import React from "react";

interface AdSlotProps {
  slotId?: string;
  className?: string;
}

export function AdSlot({ slotId = "default-slot", className = "" }: AdSlotProps) {
  // Visually disabled / hidden in current MVP phase
  return (
    <div
      data-ad-slot-id={slotId}
      aria-hidden="true"
      className={`hidden ${className}`}
    >
      {/* Future Ad Unit Placement */}
    </div>
  );
}
