import React from 'react'
import Button from '../Button/button'

interface JsonType{
    [key: string] : string
}

interface exportJsonToImgExcelProps<T>{
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
 * 传入json，导出成excel表格, 可支持图片导出
 * @param props
 * @returns 
 */
//<T,>这里泛型必须加一个逗号，不然tsx会识别成html标签
export const ExportJsonToImgExcel = <T extends JsonType,>(props:exportJsonToImgExcelProps<T>) => {
    const {JSONData, buttonName} = props

    const headArr = Object.keys(JSONData[0])

    //json数据转excel
    const jsonToExcelImgConvertor = async () => {
        var str = '<table border="1">';
        str += '<tr><th>序号</th>';
        headArr.forEach((temp) => {
            str += `<th>${temp}</th>`
        })
        str += '</tr>'

        //匹配网址的正则(认为一切网址都是图片)
        const name = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;

        for (let i = 0; i < JSONData.length; i++) {
            str += `<tr><td>${(i+1).toString()}</td>`
            //这里不能用headArr.forEach, forEach无法控制内层的await，应该改用for循环，for...of，或者Promise.all(headArr.map)
            // eslint-disable-next-line no-loop-func
            await Promise.all( headArr.map( async (item: string, index: number) => {
                //不是图片则直接拼接
                if( !(name.test(JSONData[i][item])) ){
                    str += `<td>${JSONData[i][item]}</td>`
                }
                else{
                    const image = new Image();
                    image.src= JSONData[i].img
                    // 解决跨域 Canvas 污染问题
                    image.setAttribute('crossOrigin', 'anonymous');
                    //图片加载完毕后执行函数
                    await new Promise<void>((resolve, reject) => {
                        image.onload = function () {
                            const canvas = document.createElement('canvas');
                            canvas.width = image.width;
                            canvas.height = image.height;
                            const context = canvas.getContext('2d');
                            context?.drawImage(image, 0, 0, image.width, image.height);
                            const imgurl = canvas.toDataURL('image/png'); // 得到图片的base64编码数据
                            str += `<td style="width: 200px; height: 200px; text-align: center; vertical-align: middle"><img src="${imgurl}" width=100 height=100></td>`
                            resolve()
                        };
                        image.onerror = reject
                    })
                }
            } )
            )
            str += '</tr>'
        }
        str += '</table>'
        var blob = new Blob([str], { type: "application/vnd.ms-excel" });
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
    <Button onClick={ jsonToExcelImgConvertor }>{buttonName}</Button>
  )
}
