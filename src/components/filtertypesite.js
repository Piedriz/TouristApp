import React from "react";
import Select from "react-select";

export default function Filtertypesite({types, setFiltersitetype}) {
    const options = 
        types.map(type => {
            return({
                value: type._id,
                label: type.name
            })
        })

    function handleFilter(e){
        if(e === null){
            setFiltersitetype('')
        }else{
            setFiltersitetype(e.value)
        }   
    }

      console.log(options)
  return (
    <div className="input-field col s3">
      <Select
        isClearable
        options={options}
        closeMenuOnSelect={true}
        onChange = {handleFilter}
        placeholder= "Tipo de sítio"
      />
    </div>
  );
}
