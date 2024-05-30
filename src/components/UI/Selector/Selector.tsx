import { FC, useEffect, useRef, useState } from "react";
import Select, { MultiValue, MultiValueGenericProps } from "react-select";

type OptionType = {
  value: string;
  remove: (option: string) => void;
};

const MultiValueContainer = ({
  data: { value, remove },
}: MultiValueGenericProps<OptionType>) => {
  return (
    <div className="rounded-md px-2 bg-[#05AAE6] text-white">
      <span>{value}</span>
      <span
        className="ml-2"
        onClick={(e) => {
          e.stopPropagation();
          remove(value);
        }}
      >
        X
      </span>
    </div>
  );
};

const Stacks = [
  "HTML5",
  "CSS3",
  "JS",
  "JavaScript/JQuery",
  "адаптивная вёрстка",
  "создание HTML-страницы сайта на основе дизайн-макетов",
  "вёрстка сайтов и шаблонов для CMS",
  "привязка к пользовательскому интерфейсу скриптов, которые обеспечивают визуализацию и анимацию страниц сайта",
  "обеспечение необходимого уровня пользовательского интерфейса (UI — User Interface) и опыта взаимодействия (UX — User Experience)",
  "CSS-фреймворки",
  "кросс-браузерная вёрстка",
];

interface Props {
  onOptionsChanged?: (options: string[]) => void;
  value?: string[];
  className?: string;
}

const Selector: FC<Props> = ({ onOptionsChanged, value, className }) => {
  const defaultOpts = (value || []).map((v) => ({
    value: v,
    remove: () => handleRemove(v),
  }));

  const optsRef = useRef<OptionType[]>(defaultOpts);

  const [selectedOptions, setSelectedOptions] =
    useState<OptionType[]>(defaultOpts);

  useEffect(() => {
    onOptionsChanged &&
      onOptionsChanged(selectedOptions.map((option) => option.value));
  }, [selectedOptions]);

  const handleChange = (newValue: MultiValue<OptionType>) => {
    let options = newValue.flat();

    optsRef.current = options;
    setSelectedOptions(options);
  };

  const handleRemove = (option: string) => {
    const options = optsRef.current.filter((opt) => opt.value !== option);
    optsRef.current = options;
    setSelectedOptions(options);
  };

  return (
    <Select
      className={className}
      closeMenuOnSelect={false}
      components={{ MultiValueContainer }}
      value={selectedOptions}
      onChange={handleChange}
      styles={{
        multiValue: (base) => ({
          ...base,
        }),
      }}
      isMulti
      classNames={{
        valueContainer: () => "flex gap-1",
        indicatorsContainer: () => "!items-baseline",
      }}
      placeholder="Выберите технологии..."
      isSearchable
      options={Stacks.map((option) => ({
        value: option,
        label: option,
        remove: handleRemove,
      }))}
    />
  );
};

export default Selector;