import React from 'react';
declare type MenuMode = 'horizontal' | 'vertical';
export interface MenuProps {
    defaultIndex?: string;
    className?: string;
    mode?: MenuMode;
    style?: React.CSSProperties;
    onSelect?: (selectedIndex: string) => void;
    defaultOpenSubMenus?: string[];
    children?: React.ReactNode;
}
interface IMenuContext {
    index: string;
    onSelect?: (selectedIndex: string) => void;
    mode?: MenuMode;
    defaultOpenSubMenus?: string[];
}
export declare const MenuContext: React.Context<IMenuContext>;
export declare const Menu: {
    (props: MenuProps): JSX.Element;
    defaultProps: {
        defaultIndex: string;
        mode: string;
        defaultOpenSubMenus: never[];
    };
};
export default Menu;
