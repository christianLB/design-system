import React, { useState } from "react";
import { spacing, tokens } from "../tokens";
import { cn } from "../utils";

export interface AccordionItem {
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
}

export const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggleExpanded = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => {
        const isExpanded = expanded === index;
        return (
          <div
            key={index}
            className={cn("border", tokens.radius.md)}
            style={{ borderColor: tokens.colors.border }}
          >
            <button
              type="button"
              onClick={() => toggleExpanded(index)}
              className={cn(
                "flex w-full items-center justify-between cursor-pointer",
                spacing(4, "x"),
                spacing(2, "y"),
              )}
              style={{
                backgroundColor: tokens.colors.backgroundMuted,
              }}
              aria-expanded={isExpanded}
              aria-controls={`accordion-content-${index}`}
              id={`accordion-header-${index}`}
            >
              <h3 className="text-lg font-medium">{item.title}</h3>
              <svg
                className={cn(
                  "w-4 h-4 transition-transform",
                  isExpanded && "rotate-180",
                )}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isExpanded && (
              <div
                id={`accordion-content-${index}`}
                role="region"
                aria-labelledby={`accordion-header-${index}`}
                className={cn(spacing(4))}
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
