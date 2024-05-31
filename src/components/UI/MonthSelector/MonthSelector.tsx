import { FC, useState } from "react";
//@ts-ignore
import { MonthPicker, MonthInput } from "react-lite-month-picker";
import "./MonthSelector.css";

interface Month {
  month: number;
  year: number;
  monthName: string;
}

export const MonthSelector: FC<{
  time?: number;
  onChange?: (time: number) => void;
}> = ({ time, onChange }) => {
  const dateFormatter = Intl.DateTimeFormat("ru", {
    month: "long",
  });

  time ??= Date.now() / 1000;

  const date = new Date(time * 1000);

  const [selectedMonthData, setSelectedMonthData] = useState<Month>({
    month: date.getMonth() + 1,
    year: date.getFullYear(),
    monthName: dateFormatter.format(time * 1000),
  });
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  return (
    <div className="picker">
      <MonthInput
        selected={selectedMonthData}
        setShowMonthPicker={setIsPickerOpen}
        showMonthPicker={isPickerOpen}
        lang="ru"
        monthInputField="bg-red"
      />
      {isPickerOpen ? (
        <MonthPicker
          setIsOpen={setIsPickerOpen}
          selected={selectedMonthData}
          onChange={(e: Month) => {
            setSelectedMonthData(e);
            onChange &&
              onChange(new Date(e.year, e.month - 1).valueOf() / 1000);
          }}
          lang="ru"
          bgColorMonthActive="#05AAE6AA"
        />
      ) : null}
    </div>
  );
};
