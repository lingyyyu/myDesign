import React, { FC, ReactNode, useContext, useEffect } from 'react'
import classNames from 'classnames'
import { FormContext } from './form';
import { RuleItem } from 'async-validator';

//设置必选类型，这样就不用在代码里头重复判断是否为空了，如const value = getValueFromEvent && getValueFromEvent(e)
export type SomeRequired<T, K extends keyof T> = Required<Pick<T, K>> & Omit<T, K>

export interface FormItemProps {
  name: string;
  label?: string;
  children?: ReactNode;
  //下面3个属性用于适配不同的子节点情况，如input和checkbox，input用的是event.target.value，checkbox用的是event.target.checked
  valuePropName?: string;  //默认value
  trigger?: string;   //默认onChange
  getValueFromEvent?: (event: any) => any;  //默认(e) => e.target.value
  rules?: RuleItem[];
  validateTrigger?: string;
}

const FormItem: FC<FormItemProps> = (props) => {
  const {     
    label,
    children,
    name,
    valuePropName,
    trigger,
    getValueFromEvent,
    rules,
    validateTrigger
  } = props as SomeRequired<FormItemProps, 'getValueFromEvent' | 'trigger' | 'valuePropName' | 'validateTrigger'>  //将'getValueFromEvent'，'trigger'，'valuePropName'标记为一定存在
  const { dispatch, fields, initialValues, validateField } = useContext(FormContext)
  const rowClass = classNames('my-row', {
    'my-row-no-label': !label
  })

  useEffect(() => {
    const value = (initialValues && initialValues[name]) || ''
    dispatch({ type: 'addField', name, value: { label, name, value, rules, isValid: true }})
  }, [dispatch, initialValues, label, name, rules])

  // 获取store 对应的 value
  const fieldState = fields[name]
  const value = fieldState?.value
  const onValueUpdate = (e:any) => {
    //const value = getValueFromEvent && getValueFromEvent(e)
    //使用了SomeRequired后不再需要判断是否为空了
    const value = getValueFromEvent(e)
    console.log('new value', value)
    dispatch({ type: 'updateValue', name, value })
  }
  const onValueValidate = async () => {
    await validateField(name)
  }
  // 1 手动的创建一个属性列表，需要有 value 以及 onChange 属性
  //利用Input的onChange属性，输入时自动获取value并dispatch
  const controlProps: Record<string, any> = {}

  // 适应不同的事件以及 value 属性名称
  // TS中的!    用在赋值的内容后时，使null和undefined类型可以赋值给其他类型并通过编译，表示该变量值可空
  //controlProps.value = value
  //controlProps.onChange = onValueUpdate
  //controlProps[valuePropName!] = value
  //controlProps[trigger!] = onValueUpdate
  //使用了SomeRequired后不再需要判断是否为空了
  controlProps[valuePropName] = value
  controlProps[trigger] = onValueUpdate
  //如果传入了规则，则将规则作为受控属性传入子组件
  if (rules) {
    controlProps[validateTrigger] = onValueValidate
  }


  // 2 获取 children 数组的第一个元素(只操作Item中的第一个子元素)
  const childList = React.Children.toArray(children)
  // 判断 children 的类型，显示警告
  // 没有子组件
  if (childList.length === 0) {
    console.error('No child element found in Form.Item, please provide one form component')
  }
  // 子组件大于一个
  if (childList.length > 1) {
    console.warn('Only support one child element in Form.Item, others will be omitted')
  }
  // 不是 ReactElement 的子组件
  if (!React.isValidElement(childList[0])) {
    console.error('Child component is not a valid React Element')
  }

  const child = childList[0] as React.ReactElement
  // 3 cloneElement，混合这个child 以及 手动的属性列表
  const returnChildNode = React.cloneElement(
    child,
    { ...child.props, ...controlProps }
  )

  return (
    <div className={rowClass}>
      { label &&
        <div className='my-form-item-label'>
          <label title={label}>
            {label}
          </label>
        </div>
      }
      <div className='my-form-item'>
        {returnChildNode}
      </div>
    </div>
  )
}

FormItem.defaultProps = {
  valuePropName: 'value',
  trigger: 'onChange',
  validateTrigger: 'onBlur',
  getValueFromEvent: (e) => e.target.value
}

export default FormItem