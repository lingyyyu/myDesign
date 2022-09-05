import React, { createContext, useState } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem';

type MenuMode = 'horizontal' | 'vertical'
export interface MenuProps {
  defaultIndex?: string;
  className?: string;
  mode?: MenuMode;  //菜单是横向还是纵向
  style?: React.CSSProperties;  //可以添加自定义的style
  onSelect?: (selectedIndex: string) => void;
  defaultOpenSubMenus?: string[];
  children?: React.ReactNode;
}

interface IMenuContext {
    index: string,
    onSelect?: (selectedIndex: string) => void,
    mode?: MenuMode,
    defaultOpenSubMenus?: string[],
}

//创造纪录当前menu的index的context
export const MenuContext = createContext<IMenuContext>({index: '0'})

const Menu = (props: MenuProps) => {
  const { className, mode, style, children, defaultIndex, onSelect, defaultOpenSubMenus } = props

  const [currentActive, setActive] = useState(defaultIndex)

  const classes = classNames('my-menu', className, {
    //当mode是vertical时添加垂直的样式类menu-vertical,否则添加menu-horizontal
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical',
  })

  const handleClick = (index: string) => {
    setActive(index)
    //当onSelect存在时处理对应索引项
    if(onSelect){
        onSelect(index)
    }
  }
  
  //context传递的数据
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : '0',
    onSelect: handleClick,
    mode: mode,
    defaultOpenSubMenus,
  }

  //渲染是menuItem的子组件
  const renderChildren = () => {
    //使用React.Children.map可以安全的map不透明属性children。遇到无法使用map的children，这个函数会自动跳过
    return React.Children.map(children, (child, index) => {
      //menuItem实际上就是React.FC,这里作为html元素就是React.FunctionComponentElement,后面加上它的参数类型的泛型Props
      const childElement = child as React.FunctionComponentElement<MenuItemProps>
      //用来判断是不是MenuItem,注意要在menuItem中自己添加displayName
      const {displayName} = childElement.type
      if( displayName === 'MenuItem' || displayName === 'SubMenu'){
        //将index自动添加到子元素当中，这样就不用用户手动传入index了
        //React.cloneElement复制一个子元素（chilElement），并将第二个参数添加进复制后的元素
        return React.cloneElement(childElement, { index: index.toString() })
      }else{
        console.error('Warning: Menu has a child which is not a MenuItem component')
      }
    })
  }

  return (
    <ul className={classes} style={style}>
        <MenuContext.Provider value={passedContext}>
            {renderChildren()}
        </MenuContext.Provider>
    </ul>
  )
}
Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenSubMenus: [],
}

export default Menu