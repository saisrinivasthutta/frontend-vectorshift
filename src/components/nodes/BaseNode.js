import React from "react";
import { Handle } from "reactflow";
import styles from "./BaseNode.module.css";

const BaseNode = ({ id, data, handles, content, style }) => {
  const sourceHandles = handles.filter((handle) => handle.type === "source");
  const targetHandles = handles.filter((handle) => handle.type === "target");

  return (
    <div className={styles.container} style={{ ...style }}>
      <div className={styles.handleContainer}>
        {targetHandles.map((handle, index) => (
          <Handle
            key={index}
            type="target"
            position="left"
            id={`${id}-${handle.id}`}
            className={styles.handle}
            style={{
              top: `${(index + 1) * (100 / (targetHandles.length + 1))}%`,
              transform: "translateY(-50%)",
            }}
            aria-label={`Target handle ${handle.id}`}
          />
        ))}

        {sourceHandles.map((handle, index) => (
          <Handle
            key={index}
            type="source"
            position="right"
            id={`${id}-${handle.id}`}
            className={styles.handle}
            style={{
              top: `${(index + 1) * (100 / (sourceHandles.length + 1))}%`,
              transform: "translateY(-50%)",
            }}
            aria-label={`Source handle ${handle.id}`}
          />
        ))}
      </div>

      <div className={styles.content}>
        <span>{content.title}</span>
      </div>

      <div className={styles.fields}>
        {content.fields.map((field, index) => (
          <label key={index} className={styles.fieldLabel}>
            {field.label}:
            {field.type === "select" ? (
              <select
                value={data[field.key] || field.defaultValue}
                onChange={field.onChange}
              >
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                value={data[field.key] || field.defaultValue}
                onChange={field.onChange}
              />
            )}
          </label>
        ))}
      </div>
    </div>
  );
};

export default BaseNode;
