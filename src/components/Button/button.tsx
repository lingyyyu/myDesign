import React from 'react'
import classNames from 'classnames'

// export enum ButtonSize{
//     Large = 'lg',
//     Small = 'sm',
// }

// export enum ButtonType {
//     Primary = 'primary',
//     Default = 'default',
//     Danger = 'danger',
//     Link = 'link'
// }
export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'

interface BaseButtonProps {
    className?: string;
    disabled?: boolean;
    size?: ButtonSize;
    btnType?: ButtonType;
    //假如你使用的是 React18， React18 修改了 FC 的类型定义，现在FC 默认并不会包含 children 属性了，所有的 children 属性需要自己进行定义。后面的组件请大家都要特别注意。
    children: React.ReactNode;
    href?: string;
}

//React.ButtonHTMLAttributes<HTMLElement>  获得button组件原有的prop参数并和BaseButtonProps组成交叉类型。NativeButtonProps是非链接类型的button的props
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>
//a标签类型的button的props
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>

/**
 * Button组件，支持链接形按钮
 * @param props 
 * @returns 
 */
//storybook要获取到参数的话不仅需要默认导出，还要一个普通的导出
export const Button: React.FC<ButtonProps> = (props) => {
    const {
        btnType,
        className, //取出用户传进来的自定义className
        disabled,
        size,
        children,
        href,
        ...restProps
    } = props
    //使用classnames这个工具包来动态引入css类名
    const classes = classNames('btn', className, {
        [`btn-${btnType}`]: btnType,
        [`btn-${size}`]: size,
        'disabled': (btnType === 'link') && disabled  //当是link或者disable时不显示样式
    })
    if(btnType === 'link' && href){
        return (
            <a className={classes} href={href} {...restProps}>{children}</a>
        )
    }else{
        return (
            <button className={classes} disabled={disabled} {...restProps}>{children}</button>
        )
    }
}

//默认参数
Button.defaultProps = {
    disabled: false,
    btnType: 'default'
}

export default Button
