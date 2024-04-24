import React, {
    ChangeEvent,
    FocusEvent,
    HTMLProps,
    TextareaHTMLAttributes,
    forwardRef,
    useEffect,
    useRef,
} from "react";
import { twMerge } from "tailwind-merge";
import { useField } from "formik";

type HTMLTextAreaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "onBlur" | "onChange">;

export interface ITextAreaProps extends HTMLTextAreaProps {
    name: string;
    label?: string;
    onBlur?: (event: FocusEvent<HTMLTextAreaElement>, fieldValue: string, fieldName: string) => void;
    onChange?: (event: ChangeEvent<HTMLTextAreaElement>, fieldValue: string, fieldName: string) => void;
    ref?: React.Ref<HTMLTextAreaElement>;
    disabled?: boolean;
    focusOnInit?: boolean;
    containerClassName?: HTMLProps<HTMLElement>["className"];
}

export const TextArea = forwardRef<HTMLTextAreaElement, ITextAreaProps>(
    (
        {
            label,
            onBlur,
            onChange,
            disabled,
            focusOnInit, // It works only if a custom ref has not been passed
            containerClassName,
            className,
            ...props
        }: ITextAreaProps,
        ref
    ) => {
        const textAreaRef = useRef<null | HTMLTextAreaElement>(null);
        const [field, meta] = useField(props.name);
        const { value: fieldValue, name: fieldName } = field;
        const { error, touched } = meta;

        const handleOnBlurAction = (event: FocusEvent<HTMLTextAreaElement>) => {
            field.onBlur(event);
            onBlur?.(event, fieldValue, fieldName);
        };

        const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
            field.onChange(event);
            onChange?.(event, fieldValue, fieldName);
        };

        useEffect(() => {
            if (focusOnInit) textAreaRef.current?.focus();
        }, [focusOnInit]);

        return (
            <div className={containerClassName}>
                <div>
                    {!!label?.length && (
                        <div className="space-y-2 pb-2">
                            <label
                                htmlFor={field.name}
                                className=" text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {label}
                            </label>
                        </div>
                    )}
                    <textarea
                        {...field}
                        {...props}
                        onChange={handleOnChange}
                        onBlur={handleOnBlurAction}
                        disabled={disabled}
                        ref={ref ?? textAreaRef}
                        className={twMerge(
                            "border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
                            className
                        )}
                    />
                </div>
                {touched && error ? <p className="mt-2 text-xs text-red-500">{error}</p> : null}
            </div>
        );
    }
);
