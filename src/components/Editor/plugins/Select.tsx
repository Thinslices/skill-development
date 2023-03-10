import type { ChangeEvent } from "react";

export type SelectProps = {
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    className: string;
    options: string[];
    value: string;
};
export const Select = ({
    onChange,
    className,
    options,
    value,
}: SelectProps) => {
    return (
        <select
            className={className}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e)}
            value={value}
        >
            <option hidden={true} value="" />
            {options.map(option => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};
