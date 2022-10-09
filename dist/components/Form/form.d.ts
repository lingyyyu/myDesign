import React, { FC, ReactNode } from 'react';
import useStore from './useStore';
export interface FormProps {
    name?: string;
    initialValues?: Record<string, any>;
    children?: ReactNode;
}
export declare type IFormContext = Pick<ReturnType<typeof useStore>, 'dispatch' | 'fields' | 'validateField'> & Pick<FormProps, 'initialValues'>;
export declare const FormContext: React.Context<IFormContext>;
export declare const Form: FC<FormProps>;
export default Form;
