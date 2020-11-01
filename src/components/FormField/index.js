import React from "react";

function FormField({
  label,
  placeholder,
  name,
  onChange,
  type,
  value,
  maxLength,
  required,
}) {
  const styleDiv = {
    margin: "5px",
    padding: "5px",
  };

  const styleLabel = {
    padding: "3px",
  };
  const styleInput = {
    margin: "5px",
    alignSelf: "right",
    width: "98%",
  };
  if (value == null) {
    value = "";
  }
  if (maxLength === null || maxLength === undefined) {
    maxLength = 500;
  }
  return (
    <div style={styleDiv}>
      <label style={styleLabel}></label>
      {label}
      {type === "textarea" ? (
        <textarea
          style={styleInput}
          type={type}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          value={value}
          maxLength={maxLength}
          required={required}
        />
      ) : (
        <input
          style={styleInput}
          type={type}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
          value={value}
          maxLength={maxLength}
          required={required}
        />
      )}
      {/* </label> */}
    </div>
  );
}

export default FormField;
