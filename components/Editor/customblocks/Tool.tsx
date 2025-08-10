import {
  BlockNoteEditor,
  BlockNoteSchema,
  defaultBlockSpecs,
} from "@blocknote/core";
import { createReactBlockSpec } from "@blocknote/react";
import React, { useState } from "react";


interface ToolDetailsProps {
  toolType: "Generative AI" | "Deep Research" | "Text-to-Speech";
  onClose: () => void;
}

const ToolDetailsComponent: React.FC<ToolDetailsProps> = ({
  toolType,
  onClose,
}) => {
  const toolDetails = {
    "Generative AI": {
      title: "Generative AI",
      description:
        "Advanced AI models that can generate text, images, and code based on prompts.",
      features: [
        "Natural language processing",
        "Content generation",
        "Code assistance",
        "Creative writing support",
      ],
      // icon: "🤖",
      color: "#3b82f6",
      bgColor: "#eff6ff",
    },
    "Deep Research": {
      title: "Deep Research",
      description:
        "Comprehensive research tools that analyze and synthesize information from multiple sources.",
      features: [
        "Multi-source analysis",
        "Citation tracking",
        "Data visualization",
        "Report generation",
      ],
      // icon: "🔍",
      color: "#10b981",
      bgColor: "#f0fdf4",
    },
    "Text-to-Speech": {
      title: "Text-to-Speech",
      description:
        "Convert written text into natural-sounding speech with various voice options.",
      features: [
        "Multiple voice options",
        "Speed control",
        "Language support",
        "Audio export",
      ],
      // icon: "🔊",
      color: "#f59e0b",
      bgColor: "#fffbeb",
    },
  };

  const tool = toolDetails[toolType];

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          padding: "32px",
          maxWidth: "500px",
          width: "90%",
          maxHeight: "80vh",
          overflow: "auto",
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "none",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            color: "#6b7280",
            padding: "4px",
            borderRadius: "4px",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = "#f3f4f6";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor =
              "transparent";
          }}
        >
          ×
        </button>

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "24px",
            paddingBottom: "16px",
            borderBottom: "2px solid #f3f4f6",
          }}
        >
          {/* <div
            style={{
              fontSize: "48px",
              backgroundColor: tool.bgColor,
              padding: "12px",
              borderRadius: "12px",
            }}
          >
            {tool.icon}
          </div> */}
          <div>
            <h2
              style={{
                margin: 0,
                color: tool.color,
                fontSize: "28px",
                fontWeight: "bold",
              }}
            >
              {tool.title}
            </h2>
          </div>
        </div>

        {/* Description */}
        <p
          style={{
            color: "#374151",
            fontSize: "16px",
            lineHeight: "1.6",
            marginBottom: "24px",
          }}
        >
          {tool.description}
        </p>

        {/* Features */}
        <div style={{ marginBottom: "24px" }}>
          <h3
            style={{
              color: "#374151",
              fontSize: "18px",
              fontWeight: "600",
              marginBottom: "12px",
            }}
          >
            Key Features:
          </h3>
          <ul style={{ margin: 0, paddingLeft: "20px" }}>
            {tool.features.map((feature, index) => (
              <li
                key={index}
                style={{
                  color: "#6b7280",
                  fontSize: "14px",
                  marginBottom: "8px",
                  lineHeight: "1.5",
                }}
              >
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Action buttons */}
        <div
          style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}
        >
          <button
            onClick={onClose}
            style={{
              padding: "10px 20px",
              backgroundColor: "#f3f4f6",
              color: "#374151",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            Close
          </button>
          <button
            onClick={() => {
              alert(`Starting ${tool.title}...`);
              // Here you could redirect to the actual tool or trigger its functionality
              onClose();
            }}
            style={{
              padding: "10px 20px",
              backgroundColor: tool.color,
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "500",
            }}
          >
            Launch Tool
          </button>
        </div>
      </div>
    </div>
  );
};

export const ToolBadgeBlock = createReactBlockSpec(
  {
    type: "tool",
    propSchema: {
      toolType: {
        default: "Generative AI" as const,
        values: ["Generative AI", "Deep Research", "Text-to-Speech"] as const,
      },
      size: {
        default: "medium" as const,
        values: ["small", "medium", "large"] as const,
      },  
      variant: {
        default: "default" as const,
        values: ["default", "outlined", "filled"] as const,
      },
    },
    content: "none", // No editable content
  },
  {
    render: (props) => {
      const { block, editor } = props;
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [isHovered, setIsHovered] = useState(false);

      // Define styling for different tools
      const toolConfigs = {
        "Generative AI": {
          color: "#3b82f6",
          bgColor: "#eff6ff",
          borderColor: "#93c5fd",
        },
        "Deep Research": {
          color: "#10b981",
          bgColor: "#f0fdf4",
          borderColor: "#86efac",
        },
        "Text-to-Speech": {
          color: "#f59e0b",
          bgColor: "#fffbeb",
          borderColor: "#fde68a",
        },
      };

      const config = toolConfigs[block.props.toolType];

      // Size configurations
      const sizeConfigs = {
        small: {
          padding: "6px 12px",
          fontSize: "12px",
          iconSize: "14px",
          borderRadius: "6px",
        },
        medium: {
          padding: "8px 16px",
          fontSize: "14px",
          iconSize: "16px",
          borderRadius: "8px",
        },
        large: {
          padding: "12px 20px",
          fontSize: "16px",
          iconSize: "20px",
          borderRadius: "10px",
        },
      };

      const sizeConfig = sizeConfigs[block.props.size];

      // Variant configurations
      const getVariantStyles = (): React.CSSProperties => {
        const baseStyles: React.CSSProperties = {
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          fontWeight: "600",
          cursor: "pointer",
          transition: "all 0.2s ease",
          fontFamily: "system-ui, -apple-system, sans-serif",
          userSelect: "none",
          ...sizeConfig,
        };

        switch (block.props.variant) {
          case "outlined":
            return {
              ...baseStyles,
              backgroundColor: "white",
              color: config.color,
              border: `2px solid ${config.color}`,
            };
          case "filled":
            return {
              ...baseStyles,
              backgroundColor: config.color,
              color: "white",
              border: `2px solid ${config.color}`,
            };
          default: // default variant
            return {
              ...baseStyles,
              backgroundColor: config.bgColor,
              color: config.color,
              border: `2px solid ${config.borderColor}`,
            };
        }
      };

      const getHoverStyles = (): React.CSSProperties => {
        if (!isHovered) return {};

        switch (block.props.variant) {
          case "outlined":
            return {
              backgroundColor: config.bgColor,
              transform: "translateY(-1px)",
              boxShadow: `0 4px 12px ${config.color}20`,
            };
          case "filled":
            return {
              transform: "translateY(-1px)",
              boxShadow: `0 4px 12px ${config.color}40`,
              filter: "brightness(110%)",
            };
          default:
            return {
              transform: "translateY(-1px)",
              boxShadow: `0 4px 12px ${config.color}30`,
              borderColor: config.color,
            };
        }
      };

      const handleClick = () => {
        setIsModalOpen(true);
      };

      const handleCloseModal = () => {
        setIsModalOpen(false);
      };

      return (
        <>
          {/* Badge */}
          <div style={{ margin: "8px 0", display: "inline-block" }}>
            <span
                style={{
                  ...getVariantStyles(),
                  ...getHoverStyles(),
                }}
              className=""
              onClick={handleClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              title={`Click to learn more about ${block.props.toolType}`}
            >
              <span>{block.props.toolType}</span>
            </span>
          </div>

          {/* Modal */}
          {isModalOpen && (
            <ToolDetailsComponent
              toolType={block.props.toolType}
              onClose={handleCloseModal}
            />
          )}
        </>
      );
    },
  }
);
