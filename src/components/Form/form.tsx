import React, { createContext, FC, ReactNode } from 'react'
import useStore from './useStore';

export interface FormProps {
  name?: string;
  initialValues?: Record<string, any>;
  children?: ReactNode;
}

//提取useStore中dispatch的类型，建立Context来传递dispatch
export type IFormContext = Pick<ReturnType<typeof useStore>, 'dispatch' | 'fields' | 'validateField'> & Pick<FormProps, 'initialValues'>
export const FormContext = createContext<IFormContext>({} as IFormContext)

export const Form: FC<FormProps> = (props) => {
  const { name, children, initialValues } = props
  const { form, fields, dispatch, validateField } = useStore()
  const passedContext: IFormContext = {
    dispatch,
    fields,
    initialValues,
    validateField
  }
  return (
    <>
      <form name={name} className="my-form">
        <FormContext.Provider value={passedContext}>
          {children}
        </FormContext.Provider>
      </form>
      <div>
        <pre style={{whiteSpace: 'pre-wrap'}}>{JSON.stringify(fields)}</pre>
        <pre style={{whiteSpace: 'pre-wrap'}}>{JSON.stringify(form)}</pre>
      </div>
    </>
  )
}
Form.defaultProps = {
  name: 'my_form'
}

export default Form