import React from "react";

export const ETAInfoTooltip = ({p1, p2, p3, total}) => {
    if (!(p1 || p2 || p3)) return null;

    p1 = p1 || 0;
    p2 = p2 || 0;
    p3 = p3 || 0;

    return (
        <span className="rm-tooltip">
            <table className="tooltip-table">
                <tbody>
                    <tr>
                        <td>Data Points</td>
                        <td>{total}</td>
                    </tr>
                    <tr>
                        <td>Accuracy</td>
                        <td>{`${p1}% ${p3}% ${p2}%`}</td>
                    </tr>
                </tbody>
            </table>
        </span>
    );
};