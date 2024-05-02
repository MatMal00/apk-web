import { Fragment, ReactNode } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useField } from "formik";
import cn from "classnames";

interface IDropdownProps<T extends { uid: string }> {
    name: string;
    items: T[] | string[];
    label: string;
    displayValue?: ReactNode;
    children?: (item: T) => ReactNode;
}

export const Dropdown = <T extends { uid: string }>({
    name,
    items,
    label,
    displayValue,
    children,
}: IDropdownProps<T>) => {
    const [field, , helpers] = useField(name);
    return (
        <div className="flex flex-col gap-1">
            <h6 className="text-sm font-semibold">{label}</h6>
            <div className="flex">
                <Menu as="div" className="relative inline-block basis-24 text-left">
                    <div>
                        <Menu.Button className="inline-flex w-full justify-start gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                            {displayValue ? displayValue : field.value}
                            <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                        </Menu.Button>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                                {items.map((item) => {
                                    const isString = typeof item === "string";
                                    return (
                                        <Menu.Item key={isString ? item : item.uid}>
                                            {({ active }) => (
                                                <button
                                                    type="button"
                                                    className={cn(
                                                        "block w-full px-4 py-2 text-left text-sm text-gray-700",
                                                        {
                                                            "bg-gray-100 text-gray-900": active,
                                                        }
                                                    )}
                                                    onClick={() =>
                                                        isString ? helpers.setValue(item) : helpers.setValue(item.uid)
                                                    }
                                                >
                                                    {isString ? item : children?.(item)}
                                                </button>
                                            )}
                                        </Menu.Item>
                                    );
                                })}
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
        </div>
    );
};
