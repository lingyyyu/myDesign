import React, { useContext } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu';

export interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, disabled, className, style, children } = props
  //从provider中拿到Menu中的Context
  const context = useContext(MenuContext)
  const classes = classNames('menu-item', className, {
    'is-disabled': disabled,
    'is-active': context.index===index,  //当context中的索引===当前项索引时激活
  })
  const handleClick = () => {
    if(context.onSelect && !disabled && (typeof index === 'string')){
      context.onSelect(index)
    }
  }
  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  )
}

//添加用于判断是不是MenuItem的标志属性。childElement.type.displayName
MenuItem.displayName = 'MenuItem'

export default MenuItem