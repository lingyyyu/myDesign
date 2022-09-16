import {ComponentMeta, ComponentStory} from '@storybook/react'
import { ExportJsonToImgExcel } from './exportImgExcel'

const ExcelMeta: ComponentMeta<typeof ExportJsonToImgExcel> = {
    title: '导出Excel 组件',
    component: ExportJsonToImgExcel
}

export default ExcelMeta

//跨域请求图片还要在index.html的head中加上下面一行
//<meta name="referrer" content="no-referrer">

const Data2:any = []
var i = 1
for(i;i< 5;i++)
{
    Data2.push({orderTime: 'xxx', p1: 'yyy', userName: 'lily', recMobile: '1333333333', productName: 'zxczxc', orderStatusc: '0', img: 'http://localhost:6006/imgExcel/forum/pic/item/85b7110b19d8bc3eeb98a614c78ba61ea9d34510.jpg?tbpicau=2022-09-15-05_d2759ac1576209a5bc3cd87a3fd766ae'})
}

export const DefaultImg: ComponentStory<typeof ExportJsonToImgExcel> = (args) => (
    <ExportJsonToImgExcel {...args} JSONData={Data2} buttonName='导出Imgexcel测试'/>
)
DefaultImg.storyName = '带图片URL的json导出excel'