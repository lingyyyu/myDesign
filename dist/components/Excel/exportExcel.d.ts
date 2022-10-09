/// <reference types="react" />
interface JsonType {
    [key: string]: string;
}
interface exportJsonToExcelProps<T> {
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
 * 传入json，导出成excel表格, 可支持百万行导出
 * @param props
 * @returns
 */
export declare const ExportJsonToExcel: <T extends JsonType>(props: exportJsonToExcelProps<T>) => JSX.Element;
export {};
