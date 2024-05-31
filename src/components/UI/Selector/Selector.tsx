import { Button } from "@material-tailwind/react";
import { FC, useEffect, useRef, useState } from "react";
import Select, { MultiValue, MultiValueGenericProps } from "react-select";
import StackService from "../../../API/StackService";

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

interface Props {
  onOptionsChanged?: (options: string[]) => void;
  value?: string[];
  className?: string;
}

const Selector: FC<Props> = ({ onOptionsChanged, value, className }) => {
  const [stacks, setStacks] = useState<string[]>([]);

  useEffect(() => {
    StackService.get().then(setStacks);
  }, []);

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

  const handleAdd = (option: string) => {
    StackService.create(option);
    const options = optsRef.current.concat({
      value: option,
      remove: () => handleRemove(option),
    });

    optsRef.current = options;
    setSelectedOptions(options);
    setStacks(stacks.concat(option));
    setQuery("");
  };

  const [query, setQuery] = useState<string>("");

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
      noOptionsMessage={() => (
        <div className="flex flex-col">
          <span>Технология не найдена</span>
          {query && (
            <Button
              className="bg-[#A5B4C4] self-center py-2"
              onClick={() => handleAdd(query)}
            >
              Добавить
            </Button>
          )}
        </div>
      )}
      onInputChange={(value) => {
        setQuery(value);
      }}
      inputValue={query}
      options={stacks.map((option) => ({
        value: option,
        label: option,
        remove: handleRemove,
      }))}
    />
  );
};

export default Selector;
