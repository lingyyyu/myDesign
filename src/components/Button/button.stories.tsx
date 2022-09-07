import React from 'react'
import Button from './button'

import {ComponentMeta, ComponentStory} from '@storybook/react'

//必须要把组件的样式文件导入到preview.js中
//storybook要获取到参数的话Button不仅需要默认导出，还要一个普通的导出


const buttonMeta: ComponentMeta<typeof Button> = {
    title: 'Button 组件',
    component: Button
}

export default buttonMeta

//模板写法
// const Template: ComponentStory<typeof Button> = (args) => (
//     <Button {...args}></Button>
// )
// export const Default = Template.bind({})
// Default.args = {
//     children: 'Default Button'
// }

//加入args能自动获取参数，但Button除了默认导出外还必须要有一个普通导出
export const Default: ComponentStory<typeof Button> = (args) => (
    <Button {...args}>Default Button</Button>
)
Default.storyName = '默认按钮样式'

export const ButtonWithSize: ComponentStory<typeof Button> = (args) => (
    <>
        <Button size='lg' {...args}>large button</Button>
        <Button size='sm' {...args}>small button</Button>
    </>
)
ButtonWithSize.storyName = '不同尺寸的按钮'

export const ButtonWithType: ComponentStory<typeof Button> = () => (
    <>
      <Button btnType="primary"> primary button </Button>
      <Button btnType="danger"> danger button </Button>
      <Button btnType="link" href="https://google.com"> link button </Button>
    </>
)
ButtonWithType.storyName = '不同类型的按钮'