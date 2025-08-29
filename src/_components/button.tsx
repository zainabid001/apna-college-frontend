"use client";

import React from "react";
import clsx from "clsx";

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "danger";
    className?: string;
};

export default function Button({
    children,
    onClick,
    type = "button",
    variant = "primary",
    className,
}: ButtonProps) {
    const baseStyle =
        "px-5 py-2 rounded-lg font-medium transition shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variants = {
        primary: "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500",
        secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-400",
        danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={clsx(baseStyle, variants[variant], className)}
        >
            {children}
        </button>
    );
}
