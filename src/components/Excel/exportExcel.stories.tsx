import {ComponentMeta, ComponentStory} from '@storybook/react'
import { ExportJsonToExcel } from './exportExcel'


const ExcelMeta: ComponentMeta<typeof ExportJsonToExcel> = {
    title: '导出Excel 组件',
    component: ExportJsonToExcel
}

export default ExcelMeta


const Data:any = []
var i = 1
for(i;i< 10000;i++)
{
    Data.push({orderTime: 'xxx', p1: 'yyy', userName: 'lily', recMobile: '1333333333', productName: 'zxczxc', orderStatusc: '0'})
}

export const Default: ComponentStory<typeof ExportJsonToExcel> = (args) => (
    <ExportJsonToExcel {...args} JSONData={Data} buttonName='导出excel测试'/>
)
Default.storyName = 'json导出excel'

