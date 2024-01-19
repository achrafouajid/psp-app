import React from "react";
import { Field, useFormikContext } from "formik";

export interface Criteria {
  label: string;
  name: string;
}

interface CriteriaCheckboxesProps {
  criteriaType: string;
  criteriaList: Criteria[];
}

const CriteriaCheckboxes: React.FC<CriteriaCheckboxesProps> = ({
  criteriaType,
  criteriaList,
}) => {
  const { values, setFieldValue } = useFormikContext<{
    [key: string]: boolean;
  }>();

  const handleCheckboxChange = (index: number) => {
    const criteriaName = criteriaList[index].name;
    setFieldValue(criteriaName, !values[criteriaName]);
  };

  return (
    <div className="flex flex-col">
      <p className="font-bold mb-2 text-[#396EA5]">{`Critères ${criteriaType}`}</p>
      {criteriaList.map((criteria, index) => (
        <div key={index} className="flex items-center mb-2">
          <Field
            type="checkbox"
            id={`${criteriaType}_${index}`}
            name={criteria.name}
            checked={values[criteria.name]}
            onChange={() => handleCheckboxChange(index)}
            className="mr-2"
          />
          <label htmlFor={`${criteriaType}_${index}`}>{criteria.label}</label>
        </div>
      ))}
    </div>
  );
};

export default CriteriaCheckboxes;
