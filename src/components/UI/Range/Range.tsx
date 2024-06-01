import { CSSProperties, useEffect, useState } from "react";
import "./Range.css";
import { ageStringify } from "../../../utils/ageStringify";

declare module "react" {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

const Range: React.FC<{
  onChange?: (min: number, max: number) => void;
  max: number;
  min: number;
  step: number;
  from?: number;
  to?: number;
  style?: CSSProperties;
  className?: string;
}> = ({ onChange, max, from, to, min, step, style, className }) => {
  const [a, setA] = useState(min);
  const [b, setB] = useState(max);

  useEffect(() => {
    setA(from || min);
    setB(to || max);
  }, [from, to, max, min]);

  const onAInput = (e: React.FormEvent<HTMLInputElement> | undefined) => {
    const element = e?.target as HTMLInputElement;
    const value = parseInt(element.value);
    if (value >= scrollB) e?.preventDefault();
    else {
      setA(value);
      setB(scrollB);
    }
  };

  const onBInput = (e: React.FormEvent<HTMLInputElement> | undefined) => {
    const element = e?.target as HTMLInputElement;
    const value = parseInt(element.value);
    if (value <= scrollA) e?.preventDefault();
    else {
      setB(value);
      setA(scrollA);
    }
  };

  var temp = Math.round((a || min) / step) * step;
  const scrollA = temp > b ? min : temp;

  temp = Math.round((b || max) / step) * step;
  const scrollB = temp < a ? max : temp;

  useEffect(() => {
    if (onChange && min <= scrollA && scrollA < scrollB && scrollB <= max)
      onChange(scrollA, scrollB);
  }, [scrollA, scrollB]);

  return (
    <div style={style} className={className}>
      <div className="inputs">
        <span>От {ageStringify(a, true)}</span>
        <span>До {ageStringify(b, true)}</span>
      </div>
      <div
        className="wrap"
        style={{
          "--a": scrollA,
          "--b": scrollB,
          "--min": min,
          "--max": max,
        }}
      >
        <input
          onInput={onAInput}
          type="range"
          min={min}
          value={scrollA}
          max={max}
          step={step}
        />
        <input
          onInput={onBInput}
          type="range"
          min={min}
          value={scrollB}
          max={max}
          step={step}
        />
      </div>
    </div>
  );
};

export default Range;
