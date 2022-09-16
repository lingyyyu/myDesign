import React from 'react'
import Button from '../Button/button'

interface JsonType{
    [key: string] : string
}

interface exportJsonToExcelProps<T>{
    /**
     * 传入的json对象
     */
    JSONData: Array<T>
    /**
     * 按钮名字
     */
    buttonName?: string
}

/**
 * 传入json，导出成excel表格, 可支持百万行导出
 * @param props
 * @returns 
 */
//<T,>这里泛型必须加一个逗号，不然tsx会识别成html标签
export const ExportJsonToExcel = <T extends JsonType,>(props:exportJsonToExcelProps<T>) => {
    const {JSONData, buttonName} = props

    const headArr = Object.keys(JSONData[0])

    //json数据转excel
    const jsonToExcelConvertor = () => {
        var str = '序号,';
        headArr.forEach((temp) => {
            str += `${temp},`
        })
        str = str.substring(0,str.length-1) + '\n'

        for (let i = 0; i < JSONData.length; i++) {
            str += (i+1).toString() + ','
            // eslint-disable-next-line no-loop-func
            headArr.forEach( (item: string) => {
                str += JSONData[i][item] + '\t,'
            } )
            str += '\n'
        }
        var blob = new Blob([str], { type: "text/plain;charset=utf-8" });
        //UTF有一个BOM（Byte Order Mark）的问题。在Unicode编码中有一个叫做"zero-width no-break space (ZWNBSP)"的字符，它的编码是0xFEFF。而0xFEFF在是一个实际中不存在的字符，所以不应该出现在实际传输中。UCSUCS (Unicode Character Set) 规范建议我们在传输字节流前，先传输字符"ZWNBSP"。这样如果接收者收到FEFF，就表明这个字节流是Big-Endian的；如果收到FFFE，就表明这个字节流是Little- Endian的。因此字符"ZWNBSP"又被称作BOM。
        //解决中文乱码问题。0xFEFF标注使用unicode编码
        blob = new Blob([String.fromCharCode(0xFEFF), blob], { type: blob.type });
        //创建一个新的对象URL,该对象URL可以代表某一个指定的file对象或者bold对象
        const object_url = window.URL.createObjectURL(blob);
        var link = document.createElement("a");
        link.href = object_url;
        link.download = "导出excel.xls";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
  return (
    <Button onClick={ jsonToExcelConvertor }>{buttonName}</Button>
  )
}
