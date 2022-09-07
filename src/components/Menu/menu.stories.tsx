import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import Menu from './menu'
import MenuItem from './menuItem'
import SubMenu from './subMenu'

const menuMeta: ComponentMeta<typeof Menu> = {
    title: 'Menu 组件',
    id: 'Menu',
    component: Menu,
    subcomponents: {'MenuItem': MenuItem, 'SubMenu': SubMenu},  //附属组件
    // argTypes:{
    //     defaultIndex:{
    //         control: 'color'
    //     }
    // }
}

export default menuMeta

//要自动获得参数，必须args并且...args
//组件不仅得有default export，还必须有普通export
const Template: ComponentStory<typeof Menu> = (args) => (
    <Menu {...args}>
        <MenuItem>
            cool link
        </MenuItem>
        <MenuItem disabled>
            cool link 2
        </MenuItem>
        <MenuItem>
            cool link 3
        </MenuItem>
        <SubMenu title='dropdown'>
            <MenuItem>dropdown 1</MenuItem>
            <MenuItem>dropdown 2</MenuItem>
        </SubMenu>
    </Menu>
)

export const Default = Template.bind({})
Default.args = {
    defaultIndex: '0',
    onSelect: (index) => {alert(index)},
}
Default.storyName = '默认Menu'
Default.decorators = [
    (Story) => (
        <div style={{marginBottom: '150px'}}><Story/></div>
    )
]

export const ClickMenu = Template.bind({})
ClickMenu.args = {
    defaultIndex: '0',
    mode: 'vertical',
    onSelect: (index) => {alert(index)},
    defaultOpenSubMenus: ['3']
}
ClickMenu.storyName = '纵向Menu'