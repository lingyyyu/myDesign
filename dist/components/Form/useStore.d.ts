/// <reference types="react" />
import { RuleItem, ValidateError } from 'async-validator';
export interface FieldDetail {
    name: string;
    value: string;
    rules: RuleItem[];
    isValid: boolean;
    errors: ValidateError[];
}
export interface FieldsState {
    [key: string]: FieldDetail;
}
export interface FormState {
    isValid: boolean;
}
export interface FieldsAction {
    type: 'addField' | 'updateValue' | 'updateValidateResult';
    name: string;
    value: any;
}
declare function useStore(): {
    fields: FieldsState;
    dispatch: import("react").Dispatch<FieldsAction>;
    form: FormState;
    validateField: (name: string) => Promise<void>;
};
export default useStore;
