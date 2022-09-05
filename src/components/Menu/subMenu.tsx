import classNames from 'classnames';
import React, { FunctionComponentElement, useContext, useState } from 'react'
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';

export interface SubMenuProps {
    index?: string;
    title: string;
    className?: string;
    children?: React.ReactNode;
}

export default function SubMenu(props: SubMenuProps) {
    const {index, title, className, children} = props
    const context = useContext(MenuContext)
    //设置默认打开的下拉框
    const openedSubMenus = context.defaultOpenSubMenus as Array<string>
    const isOpend = (index && context.mode === 'vertical' ) ? openedSubMenus.includes(index) : false
    const [menuOpen, setOpen] = useState(isOpend)
    const classes = classNames('menu-item', 'submenu-item', className, {
        'is-active': context.index === index
    })

    //判断是否显示下拉菜单(如果是纵向菜单则响应点击事件，横向菜单则响应hover事件)
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault()
        setOpen(!menuOpen)
    }
    let timer: any
    const handleMouse = (e:React.MouseEvent, toggle: boolean) => {
        clearTimeout(timer)
        e.preventDefault()
        timer = setTimeout(() => {
            setOpen(toggle)
        }, 300)
    }
    const clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {}
    const hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: (e: React.MouseEvent) => { handleMouse(e,true) },
        onMouseLeave: (e: React.MouseEvent) => { handleMouse(e,false) },
    } : {}

    const renderChildren = () => {
        const subMenuClasses = classNames('my-submenu', {
            'menu-opened': menuOpen
        })
        const childrenComponent = React.Children.map(children, (child,i)=>{
            const childElement = child as FunctionComponentElement<MenuItemProps>
            if(childElement.type.displayName === 'MenuItem'){
                return React.cloneElement(childElement, {
                    //次级标题的index用x-x表示（如：3-1）
                    index: `${index}-${i}`
                })
            } else {
                console.error("Warning: SubMenu has a child which is not a MenuItem component")
            }
        })
        return (
            <ul className={subMenuClasses}>
                {childrenComponent}
            </ul>
        )
    }

    return (
        <li key={index} className={classes} {...hoverEvents}>
            <div className='submenu-title' {...clickEvents}>
                {title}
            </div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = 'SubMenu'
