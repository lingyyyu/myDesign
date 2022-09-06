import classNames from 'classnames';
import React, { FunctionComponentElement, useContext, useState } from 'react'
import { MenuContext } from './menu';
import { MenuItemProps } from './menuItem';
//动画组件
import { CSSTransition } from 'react-transition-group'
import Transition from '../Transition/transition';


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
        'is-active': context.index === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical',
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
            //使用CSSTransition时样式会自动在classNames-enter至classNames-exit中过渡，具体可看官方文档
            // <CSSTransition
            //     in={menuOpen}
            //     timeout={300}
            //     classNames="zoom-in-top"
            //     appear
            //     //unmountOnExit，动画样式状态达到exit时会自动卸载样式，不用再手动display:none
            //     unmountOnExit
            // >
            //     <ul className={subMenuClasses}>
            //         {childrenComponent}
            //     </ul>
            // </CSSTransition>
            <Transition in={menuOpen} timeout={300} animation="zoom-in-top">
                <ul className={subMenuClasses}>
                    {childrenComponent}
                </ul>
            </Transition>
        )
    }

    return (
        <li key={index} className={classes} {...hoverEvents}>
            <div className='submenu-title' {...clickEvents}>
                {title}
                <svg 
                    //@ts-ignore
                    t="1662429560943" className="arrow-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2354" width="10" height="10"><path d="M520.4992 797.696l467.456-459.776c7.2704-7.168 7.3728-18.8416 0.2048-26.0096-7.168-7.2704-18.8416-7.3728-26.0096-0.2048L507.6992 758.6816 54.8864 305.8688c-7.168-7.168-18.8416-7.168-26.0096 0-3.584 3.584-5.4272 8.2944-5.4272 13.0048 0 4.7104 1.8432 9.4208 5.4272 13.0048L494.592 797.5936C501.6576 804.7616 513.2288 804.7616 520.4992 797.696z" p-id="2355">
                    </path>
                </svg>
            </div>
            {renderChildren()}
        </li>
    )
}

SubMenu.displayName = 'SubMenu'
