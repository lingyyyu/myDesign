import React from 'react'
import { ComponentMeta } from '@storybook/react'
import Form from './form'
import Item from './formItem'
import Input from '../Input'
import Button from '../Button/button'

const meta: ComponentMeta<typeof Form> ={ 
  title: 'Form 组件',
  id: 'Form',
  component: Form,
  subcomponents: { 'Item': Item },  //子组件
  //表单样式
  decorators: [
    (Story) => (
      <div style={{ width: '550px' }}>
        <Story />
      </div>
    ),
  ],
}
export default meta

export const BasicForm = () => {
  return (
    <Form initialValues={{ username: 'ling', agreement: true }}>
      <Item label='用户名' name='username' rules={[{ type: 'email', required: true }]}>
        <Input/>
      </Item>
      <Item label='密码' name='password' rules={[{type: 'string', required: true, min: 3, max: 8 }]}>
        <Input type='password'/>
      </Item>
      <div className='agreement-section' style={{ 'display': 'flex', 'justifyContent': 'center'}}>
        <Item name='agreement' valuePropName='checked' getValueFromEvent={(e) => e.target.checked}>
          <input type="checkbox"/>
        </Item>
        <span className="agree-text">注册即代表你同意<a href='#'>用户协议</a></span>
      </div>
      <div className='my-form-submit-area'>
        <Button type="submit" btnType='primary'>登陆</Button>
      </div>
    </Form>
  )
}