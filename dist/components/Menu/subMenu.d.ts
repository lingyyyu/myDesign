import React from 'react';
export interface SubMenuProps {
    index?: string;
    title: string;
    className?: string;
    children?: React.ReactNode;
}
export declare function SubMenu(props: SubMenuProps): JSX.Element;
export declare namespace SubMenu {
    var displayName: string;
}
export default SubMenu;
