/// <reference types="react" />
interface JsonType {
    [key: string]: string;
}
interface exportJsonToImgExcelProps<T> {
    /**
     * 传入的json对象
     */
    JSONData: Array<T>;
    /**
     * 按钮名字
     */
    buttonName?: string;
}
/**
 * 传入json，导出成excel表格, 可支持图片导出
 * @param props
 * @returns
 */
export declare const ExportJsonToImgExcel: <T extends JsonType>(props: exportJsonToImgExcelProps<T>) => JSX.Element;
export {};
