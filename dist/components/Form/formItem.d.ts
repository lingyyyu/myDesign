import { FC, ReactNode } from 'react';
import { RuleItem } from 'async-validator';
export declare type SomeRequired<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>;
export interface FormItemProps {
    name: string;
    label?: string;
    children?: ReactNode;
    valuePropName?: string;
    trigger?: string;
    getValueFromEvent?: (event: any) => any;
    rules?: RuleItem[];
    validateTrigger?: string;
}
declare const FormItem: FC<FormItemProps>;
export default FormItem;
