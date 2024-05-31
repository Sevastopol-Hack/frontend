import React, { FC } from "react";

interface TableProps {
  headers: string[];
  items: React.ReactNode[][];
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
        {items.map((row, index) => (
          <tr key={index} className={index % 2 ? "" : "bg-[#F2F2F2]"}>
            {row.map((col, index) => (
              <td key={index} className="px-2.5 py-1.5 text-center">
                <div className="inline-block">{col}</div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
