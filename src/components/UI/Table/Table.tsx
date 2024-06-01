import React, { FC } from "react";

interface TableProps {
  headers: string[];
  items: {
    elements: React.ReactNode[];
    valid?: boolean;
  }[];
  className?: string;
}

export const Table: FC<TableProps> = ({ headers, items, className }) => {
  return (
    <table className={`${className} table-auto`}>
      <thead className="bg-[#05AAE6] text-white">
        <tr>
          {headers.map((header, index) => (
            <th className="font-normal px-2.5 py-1" key={index}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {items.map((row, index) => {
          console.log(row);
          const color = row.valid ? (index % 2 ? "" : "#F2F2F2") : "#FFE6E6";
          return (
            <tr
              key={index}
              style={{
                background: color,
              }}
            >
              {row.elements.map((col, index) => (
                <td key={index} className="px-2.5 py-1.5 text-center">
                  <div className="inline-block">{col}</div>
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
