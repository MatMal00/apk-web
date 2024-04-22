import React, { ChangeEvent, FocusEvent, InputHTMLAttributes, forwardRef, useEffect, useRef } from "react";
import { useField } from "formik";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onBlur" | "onChange">;

export interface IInputProps extends HTMLInputProps {
    name: string;
    label?: string;
    onBlur?: (event: FocusEvent<HTMLInputElement>, fieldValue: string, fieldName: string) => void;
    onChange?: (event: ChangeEvent<HTMLInputElement>, fieldValue: string, fieldName: string) => void;
    ref?: React.Ref<HTMLInputElement>;
    disabled?: boolean;
    focusOnInit?: boolean;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
    (
        {
            label,
            onBlur,
            onChange,
            type = "text",
            disabled,
            focusOnInit, // It works only if a custom ref has not been passed
            ...props
        }: IInputProps,
        ref
    ) => {
        const inputRef = useRef<null | HTMLInputElement>(null);
        const [field, meta] = useField(props.name);
        const { value: fieldValue, name: fieldName } = field;
        const { error, touched } = meta;

        const handleOnBlurAction = (event: FocusEvent<HTMLInputElement>) => {
            field.onBlur(event);
            onBlur?.(event, fieldValue, fieldName);
        };

        const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
            field.onChange(event);
            onChange?.(event, fieldValue, fieldName);
        };

        useEffect(() => {
            if (focusOnInit) inputRef.current?.focus();
        }, [focusOnInit]);

        return (
            <div>
                <div>
                    <div className="space-y-2 pb-2">
                        <label
                            htmlFor={field.name}
                            className=" text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            {label}
                        </label>
                    </div>
                    <input
                        {...field}
                        {...props}
                        type={type}
                        onChange={handleOnChange}
                        onBlur={handleOnBlurAction}
                        disabled={disabled}
                        ref={ref ?? inputRef}
                        className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
                {touched && error ? <p className="mt-2 text-xs text-red-500">{error}</p> : null}
            </div>
        );
    }
);
