import React from "react";

export const ETASVG = ({ p1, p2, p3, width, height }) => {
    const h = height || 15;

    if (!(p1 || p2 || p3)) return <span>N/A</span>

    p1 = p1 || 0;
    p2 = p2 || 0;
    p3 = p3 || 0;

    return (
        <svg width={width || 100} height={h} style={{ marginTop: "4px", border: "1px solid gray" }}>
            <rect width={`${p1}%`} height={h} fill="#FFAE34" />
            <rect width={`${p3}%`} x={`${p1}%`} height={h} fill="#55AD89" />
            <rect width={`${p2}%`} x={`${p1 + p3}%`} height={h} fill="#EF6F6A" />
        </svg>
    );
}