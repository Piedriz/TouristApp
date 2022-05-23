import React from "react";
import Select from "react-select";

export default function Filtercity({ sites }) {
  const options = [
    { value: "Santa Marta", label: "Santa Marta" },
    { value: "Barranquilla", label: "Barranquilla" },
  ];
  return (
    <div className="input-field col s3">
      <Select isClearable options={options} closeMenuOnSelect={false} placeholder="Ciudad" />
    </div>
  );
}
