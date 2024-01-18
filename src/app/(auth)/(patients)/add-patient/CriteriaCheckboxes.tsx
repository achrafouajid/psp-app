// components/CriteriaCheckboxes.tsx

import React from "react";

export interface Criteria {
  label: string;
  isChecked: boolean;
}

interface CriteriaCheckboxesProps {
  criteriaType: string;
  criteriaList: Criteria[];
  handleCheckboxChange: (index: number, criteriaType: string) => void;
}

const CriteriaCheckboxes: React.FC<CriteriaCheckboxesProps> = ({
  criteriaType,
  criteriaList,
  handleCheckboxChange,
}) => {
  return (
    <div className="flex flex-col">
      <p className="font-bold mb-2">{`Critères ${criteriaType}`}</p>
      {criteriaList.map((criteria, index) => (
        <div key={index} className="flex items-center mb-2">
          <input
            type="checkbox"
            id={`${criteriaType}_${index}`}
            checked={criteria.isChecked}
            onChange={() => handleCheckboxChange(index, criteriaType)}
            className="mr-2"
          />
          <label htmlFor={`${criteriaType}_${index}`}>{criteria.label}</label>
        </div>
      ))}
    </div>
  );
};

export default CriteriaCheckboxes;
