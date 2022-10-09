import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import classNames from 'classnames';
import React, { createContext, useState, useContext, forwardRef, useRef, useReducer, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';
import Schema from 'async-validator';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

/**
 * Button组件，支持链接形按钮
 * @param props
 * @returns
 */
//storybook要获取到参数的话不仅需要默认导出，还要一个普通的导出
var Button = function (props) {
    var _a;
    var btnType = props.btnType, className = props.className, //取出用户传进来的自定义className
    disabled = props.disabled, size = props.size, children = props.children, href = props.href, restProps = __rest(props
    //使用classnames这个工具包来动态引入css类名
    , ["btnType", "className", "disabled", "size", "children", "href"]);
    //使用classnames这个工具包来动态引入css类名
    var classes = classNames('btn', className, (_a = {},
        _a["btn-".concat(btnType)] = btnType,
        _a["btn-".concat(size)] = size,
        _a['disabled'] = (btnType === 'link') && disabled //当是link或者disable时不显示样式
    ,
        _a));
    if (btnType === 'link' && href) {
        return (jsx("a", __assign({ className: classes, href: href }, restProps, { children: children })));
    }
    else {
        return (jsx("button", __assign({ className: classes, disabled: disabled }, restProps, { children: children })));
    }
};
//默认参数
Button.defaultProps = {
    disabled: false,
    btnType: 'default'
};

//创造纪录当前menu的index的context
var MenuContext = createContext({ index: '0' });
var Menu = function (props) {
    var className = props.className, mode = props.mode, style = props.style, children = props.children, defaultIndex = props.defaultIndex, onSelect = props.onSelect, defaultOpenSubMenus = props.defaultOpenSubMenus;
    var _a = useState(defaultIndex), currentActive = _a[0], setActive = _a[1];
    var classes = classNames('my-menu', className, {
        //当mode是vertical时添加垂直的样式类menu-vertical,否则添加menu-horizontal
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical',
    });
    var handleClick = function (index) {
        setActive(index);
        //当onSelect存在时处理对应索引项
        if (onSelect) {
            onSelect(index);
        }
    };
    //context传递的数据
    var passedContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode: mode,
        defaultOpenSubMenus: defaultOpenSubMenus,
    };
    //渲染是menuItem的子组件
    var renderChildren = function () {
        //使用React.Children.map可以安全的map不透明属性children。遇到无法使用map的children，这个函数会自动跳过
        return React.Children.map(children, function (child, index) {
            //menuItem实际上就是React.FC,这里作为html元素就是React.FunctionComponentElement,后面加上它的参数类型的泛型Props
            var childElement = child;
            //用来判断是不是MenuItem,注意要在menuItem中自己添加displayName
            var displayName = childElement.type.displayName;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                //将index自动添加到子元素当中，这样就不用用户手动传入index了
                //React.cloneElement复制一个子元素（chilElement），并将第二个参数添加进复制后的元素
                return React.cloneElement(childElement, { index: index.toString() });
            }
            else {
                console.error('Warning: Menu has a child which is not a MenuItem component');
            }
        });
    };
    return (jsx("ul", __assign({ className: classes, style: style }, { children: jsx(MenuContext.Provider, __assign({ value: passedContext }, { children: renderChildren() })) })));
};
Menu.defaultProps = {
    defaultIndex: '0',
    mode: 'horizontal',
    defaultOpenSubMenus: [],
};

var Transition = function (props) {
    var children = props.children, classNames = props.classNames, animation = props.animation, wrapper = props.wrapper, restProps = __rest(props, ["children", "classNames", "animation", "wrapper"]);
    return (jsx(CSSTransition, __assign({ classNames: classNames ? classNames : animation }, restProps, { children: wrapper ? jsx("div", { children: children }) : children })));
};
Transition.defaultProps = {
    unmountOnExit: true,
    appear: true,
};

function SubMenu(props) {
    var index = props.index, title = props.title, className = props.className, children = props.children;
    var context = useContext(MenuContext);
    //设置默认打开的下拉框
    var openedSubMenus = context.defaultOpenSubMenus;
    var isOpend = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false;
    var _a = useState(isOpend), menuOpen = _a[0], setOpen = _a[1];
    var classes = classNames('menu-item', 'submenu-item', className, {
        'is-active': context.index === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical',
    });
    //判断是否显示下拉菜单(如果是纵向菜单则响应点击事件，横向菜单则响应hover事件)
    var handleClick = function (e) {
        e.preventDefault();
        setOpen(!menuOpen);
    };
    var timer;
    var handleMouse = function (e, toggle) {
        clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(function () {
            setOpen(toggle);
        }, 300);
    };
    var clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {};
    var hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: function (e) { handleMouse(e, true); },
        onMouseLeave: function (e) { handleMouse(e, false); },
    } : {};
    var renderChildren = function () {
        var subMenuClasses = classNames('my-submenu', {
            'menu-opened': menuOpen
        });
        var childrenComponent = React.Children.map(children, function (child, i) {
            var childElement = child;
            if (childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    //次级标题的index用x-x表示（如：3-1）
                    index: "".concat(index, "-").concat(i)
                });
            }
            else {
                console.error("Warning: SubMenu has a child which is not a MenuItem component");
            }
        });
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
        jsx(Transition, __assign({ in: menuOpen, timeout: 300, animation: "zoom-in-top" }, { children: jsx("ul", __assign({ className: subMenuClasses }, { children: childrenComponent })) })));
    };
    return (jsxs("li", __assign({ className: classes }, hoverEvents, { children: [jsxs("div", __assign({ className: 'submenu-title' }, clickEvents, { children: [title, jsx("svg", __assign({ 
                        //@ts-ignore
                        t: "1662429560943", className: "arrow-icon", viewBox: "0 0 1024 1024", version: "1.1", xmlns: "http://www.w3.org/2000/svg", "p-id": "2354", width: "10", height: "10" }, { children: jsx("path", { d: "M520.4992 797.696l467.456-459.776c7.2704-7.168 7.3728-18.8416 0.2048-26.0096-7.168-7.2704-18.8416-7.3728-26.0096-0.2048L507.6992 758.6816 54.8864 305.8688c-7.168-7.168-18.8416-7.168-26.0096 0-3.584 3.584-5.4272 8.2944-5.4272 13.0048 0 4.7104 1.8432 9.4208 5.4272 13.0048L494.592 797.5936C501.6576 804.7616 513.2288 804.7616 520.4992 797.696z", "p-id": "2355" }) }))] })), renderChildren()] }), index));
}
SubMenu.displayName = 'SubMenu';

var MenuItem = function (props) {
    var index = props.index, disabled = props.disabled, className = props.className, style = props.style, children = props.children;
    //从provider中拿到Menu中的Context
    var context = useContext(MenuContext);
    var classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index, //当context中的索引===当前项索引时激活
    });
    var handleClick = function () {
        if (context.onSelect && !disabled && (typeof index === 'string')) {
            context.onSelect(index);
        }
    };
    return (jsx("li", __assign({ className: classes, style: style, onClick: handleClick }, { children: children })));
};
//添加用于判断是不是MenuItem的标志属性。childElement.type.displayName
MenuItem.displayName = 'MenuItem';

var TransMenu = Menu;
TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;

/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 *
 * ~~~js
 * // 这样引用
 * import { Input } from 'myDesign'
 * ~~~
 *
 * 支持 HTMLInput 的所有基本属性
 */
var Input = forwardRef(function (props, ref) {
    var _a;
    var disabled = props.disabled, size = props.size, prepend = props.prepend, append = props.append, style = props.style, restProps = __rest(props, ["disabled", "size", "prepend", "append", "style"]);
    var cnames = classNames('viking-input-wrapper', (_a = {},
        _a["input-size-".concat(size)] = size,
        _a['is-disabled'] = disabled,
        _a['input-group'] = prepend || append,
        _a['input-group-append'] = !!append,
        _a['input-group-prepend'] = !!prepend,
        _a));
    var fixControlledValue = function (value) {
        if (typeof value === 'undefined' || value === null) {
            return '';
        }
        return value;
    };
    if ('value' in props) {
        delete restProps.defaultValue;
        restProps.value = fixControlledValue(props.value);
    }
    return (jsxs("div", __assign({ className: cnames, style: style }, { children: [prepend && jsx("div", __assign({ className: "viking-input-group-prepend" }, { children: prepend })), jsx("input", __assign({ ref: ref, className: "viking-input-inner", disabled: disabled }, restProps)), append && jsx("div", __assign({ className: "viking-input-group-append" }, { children: append }))] })));
});

var Upload = function (props) {
    var action = props.action, beforeUpload = props.beforeUpload, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, onChange = props.onChange;
    var fileInput = useRef(null);
    //使用state记录文件上传过程中各个状态
    var _a = useState([]), fileList = _a[0], setFileList = _a[1];
    //更新上传状态的方法
    var updateFileList = function (updataFile, updateObj) {
        //使用setState的箭头函数写法，获取之前的state状态
        setFileList(function (preList) {
            return preList.map(function (file) {
                //如果找到了目标文件，则更新文件后返回
                if (file.uid === updataFile.uid)
                    return __assign(__assign({}, file), updateObj);
                else {
                    return file;
                }
            });
        });
    };
    var handleClick = function () {
        //fileInput.current存在时，响应点击事件
        if (fileInput.current) {
            fileInput.current.click();
        }
    };
    //响应上传文件事件
    var handleFileChange = function (e) {
        var files = e.target.files;
        if (!files) {
            return;
        }
        uploadFiles(files);
        if (fileInput.current) {
            fileInput.current.value = '';
        }
    };
    //单个文件上传过程
    var post = function (file) {
        var _file = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        };
        setFileList(__spreadArray([_file], fileList, true));
        var formData = new FormData();
        formData.append(file.name, file);
        axios.post(action, formData, {
            headers: {
                //二进制post表单
                'Content-Type': 'multipart/form-data'
            },
            //axios提供的显示上传进度的接口
            onUploadProgress: function (e) {
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    //更新上传状态
                    updateFileList(_file, { percent: percentage, status: 'uploading' });
                    if (onProgress) {
                        onProgress(percentage, file);
                    }
                }
            }
        }).then(function (res) {
            console.log(res);
            updateFileList(_file, { status: 'success', response: res.data });
            if (onSuccess) {
                onSuccess(res.data, file);
            }
            if (onChange) {
                onChange(file);
            }
        }).catch(function (err) {
            console.log(err);
            updateFileList(_file, { status: 'error', error: err });
            if (onError) {
                onError(err, file);
            }
            if (onChange) {
                onChange(file);
            }
        });
    };
    //上传文件
    var uploadFiles = function (files) {
        var postFiles = Array.from(files);
        postFiles.forEach(function (file) {
            //没有传入上传文件前需要调用的方法时就直接上传文件到接口
            if (!beforeUpload)
                post(file);
            else {
                var result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    result.then(function (processedFile) {
                        post(processedFile);
                    });
                }
                else if (result !== false) {
                    post(file);
                }
            }
        });
    };
    console.log(fileList);
    return (jsxs("div", __assign({ className: 'my-upload-component' }, { children: [jsx(Button, __assign({ btnType: 'primary', onClick: handleClick }, { children: "Upload File" })), jsx("input", { className: 'my-file-input', style: { display: 'none' }, ref: fileInput, type: 'file', onChange: handleFileChange })] })));
};

function fieldsReducer(state, action) {
    var _a, _b, _c;
    switch (action.type) {
        //添加标签含义
        case 'addField':
            return __assign(__assign({}, state), (_a = {}, _a[action.name] = __assign({}, action.value), _a));
        //更新value
        case 'updateValue':
            return __assign(__assign({}, state), (_b = {}, _b[action.name] = __assign(__assign({}, state[action.name]), { value: action.value }), _b));
        case 'updateValidateResult':
            var _d = action.value, isValid = _d.isValid, errors = _d.errors;
            return __assign(__assign({}, state), (_c = {}, _c[action.name] = __assign(__assign({}, state[action.name]), { isValid: isValid, errors: errors }), _c));
        default:
            return state;
    }
}
// * react hooks
// * class - ant design
function useStore() {
    var _this = this;
    // form state
    var _a = useState({ isValid: true }), form = _a[0]; _a[1];
    var _b = useReducer(fieldsReducer, {}), fields = _b[0], dispatch = _b[1];
    //异步验证表单 async-validator
    var validateField = function (name) { return __awaiter(_this, void 0, void 0, function () {
        var _a, value, rules, descriptor, valueMap, validator, isValid, errors, e_1, err;
        var _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    _a = fields[name], value = _a.value, rules = _a.rules;
                    descriptor = (_b = {},
                        _b[name] = rules,
                        _b);
                    valueMap = (_c = {},
                        _c[name] = value,
                        _c);
                    validator = new Schema(descriptor);
                    isValid = true;
                    errors = [];
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, validator.validate(valueMap)];
                case 2:
                    _d.sent();
                    return [3 /*break*/, 5];
                case 3:
                    e_1 = _d.sent();
                    isValid = false;
                    err = e_1;
                    console.log('e', err.errors);
                    console.log('fields', err.fields);
                    errors = err.errors;
                    return [3 /*break*/, 5];
                case 4:
                    console.log('errors', isValid);
                    dispatch({ type: 'updateValidateResult', name: name, value: { isValid: isValid, errors: errors } });
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return {
        fields: fields,
        dispatch: dispatch,
        form: form,
        validateField: validateField
    };
}

var FormContext = createContext({});
var Form = function (props) {
    var name = props.name, children = props.children, initialValues = props.initialValues;
    var _a = useStore(), form = _a.form, fields = _a.fields, dispatch = _a.dispatch, validateField = _a.validateField;
    var passedContext = {
        dispatch: dispatch,
        fields: fields,
        initialValues: initialValues,
        validateField: validateField
    };
    return (jsxs(Fragment, { children: [jsx("form", __assign({ name: name, className: "my-form" }, { children: jsx(FormContext.Provider, __assign({ value: passedContext }, { children: children })) })), jsxs("div", { children: [jsx("pre", __assign({ style: { whiteSpace: 'pre-wrap' } }, { children: JSON.stringify(fields) })), jsx("pre", __assign({ style: { whiteSpace: 'pre-wrap' } }, { children: JSON.stringify(form) }))] })] }));
};
Form.defaultProps = {
    name: 'my_form'
};

var FormItem = function (props) {
    var _a = props, label = _a.label, children = _a.children, name = _a.name, valuePropName = _a.valuePropName, trigger = _a.trigger, getValueFromEvent = _a.getValueFromEvent, rules = _a.rules, validateTrigger = _a.validateTrigger; //将'getValueFromEvent'，'trigger'，'valuePropName'标记为一定存在
    var _b = useContext(FormContext), dispatch = _b.dispatch, fields = _b.fields, initialValues = _b.initialValues, validateField = _b.validateField;
    var rowClass = classNames('my-row', {
        'my-row-no-label': !label
    });
    useEffect(function () {
        var value = (initialValues && initialValues[name]) || '';
        dispatch({ type: 'addField', name: name, value: { label: label, name: name, value: value, rules: rules, isValid: true } });
    }, [dispatch, initialValues, label, name, rules]);
    // 获取store 对应的 value
    var fieldState = fields[name];
    var value = fieldState === null || fieldState === void 0 ? void 0 : fieldState.value;
    var onValueUpdate = function (e) {
        //const value = getValueFromEvent && getValueFromEvent(e)
        //使用了SomeRequired后不再需要判断是否为空了
        var value = getValueFromEvent(e);
        console.log('new value', value);
        dispatch({ type: 'updateValue', name: name, value: value });
    };
    var onValueValidate = function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, validateField(name)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    // 1 手动的创建一个属性列表，需要有 value 以及 onChange 属性
    //利用Input的onChange属性，输入时自动获取value并dispatch
    var controlProps = {};
    // 适应不同的事件以及 value 属性名称
    // TS中的!    用在赋值的内容后时，使null和undefined类型可以赋值给其他类型并通过编译，表示该变量值可空
    //controlProps.value = value
    //controlProps.onChange = onValueUpdate
    //controlProps[valuePropName!] = value
    //controlProps[trigger!] = onValueUpdate
    //使用了SomeRequired后不再需要判断是否为空了
    controlProps[valuePropName] = value;
    controlProps[trigger] = onValueUpdate;
    //如果传入了规则，则将规则作为受控属性传入子组件
    if (rules) {
        controlProps[validateTrigger] = onValueValidate;
    }
    // 2 获取 children 数组的第一个元素(只操作Item中的第一个子元素)
    var childList = React.Children.toArray(children);
    // 判断 children 的类型，显示警告
    // 没有子组件
    if (childList.length === 0) {
        console.error('No child element found in Form.Item, please provide one form component');
    }
    // 子组件大于一个
    if (childList.length > 1) {
        console.warn('Only support one child element in Form.Item, others will be omitted');
    }
    // 不是 ReactElement 的子组件
    if (!React.isValidElement(childList[0])) {
        console.error('Child component is not a valid React Element');
    }
    var child = childList[0];
    // 3 cloneElement，混合这个child 以及 手动的属性列表
    var returnChildNode = React.cloneElement(child, __assign(__assign({}, child.props), controlProps));
    return (jsxs("div", __assign({ className: rowClass }, { children: [label &&
                jsx("div", __assign({ className: 'my-form-item-label' }, { children: jsx("label", __assign({ title: label }, { children: label })) })), jsx("div", __assign({ className: 'my-form-item' }, { children: returnChildNode }))] })));
};
FormItem.defaultProps = {
    valuePropName: 'value',
    trigger: 'onChange',
    validateTrigger: 'onBlur',
    getValueFromEvent: function (e) { return e.target.value; }
};

var TransForm = Form;
TransForm.Item = FormItem;

/**
 * 传入json，导出成excel表格, 可支持百万行导出
 * @param props
 * @returns
 */
//<T,>这里泛型必须加一个逗号，不然tsx会识别成html标签
var ExportJsonToExcel = function (props) {
    var JSONData = props.JSONData, buttonName = props.buttonName;
    var headArr = Object.keys(JSONData[0]);
    //json数据转excel
    var jsonToExcelConvertor = function () {
        var str = '序号,';
        headArr.forEach(function (temp) {
            str += "".concat(temp, ",");
        });
        str = str.substring(0, str.length - 1) + '\n';
        var _loop_1 = function (i) {
            str += (i + 1).toString() + ',';
            // eslint-disable-next-line no-loop-func
            headArr.forEach(function (item) {
                str += JSONData[i][item] + '\t,';
            });
            str += '\n';
        };
        for (var i = 0; i < JSONData.length; i++) {
            _loop_1(i);
        }
        var blob = new Blob([str], { type: "text/plain;charset=utf-8" });
        //UTF有一个BOM（Byte Order Mark）的问题。在Unicode编码中有一个叫做"zero-width no-break space (ZWNBSP)"的字符，它的编码是0xFEFF。而0xFEFF在是一个实际中不存在的字符，所以不应该出现在实际传输中。UCSUCS (Unicode Character Set) 规范建议我们在传输字节流前，先传输字符"ZWNBSP"。这样如果接收者收到FEFF，就表明这个字节流是Big-Endian的；如果收到FFFE，就表明这个字节流是Little- Endian的。因此字符"ZWNBSP"又被称作BOM。
        //解决中文乱码问题。0xFEFF标注使用unicode编码
        blob = new Blob([String.fromCharCode(0xFEFF), blob], { type: blob.type });
        //创建一个新的对象URL,该对象URL可以代表某一个指定的file对象或者bold对象
        var object_url = window.URL.createObjectURL(blob);
        var link = document.createElement("a");
        link.href = object_url;
        link.download = "导出excel.xls";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (jsx(Button, __assign({ onClick: jsonToExcelConvertor }, { children: buttonName })));
};

/**
 * 传入json，导出成excel表格, 可支持图片导出
 * @param props
 * @returns
 */
//<T,>这里泛型必须加一个逗号，不然tsx会识别成html标签
var ExportJsonToImgExcel = function (props) {
    var JSONData = props.JSONData, buttonName = props.buttonName;
    var headArr = Object.keys(JSONData[0]);
    //json数据转excel
    var jsonToExcelImgConvertor = function () { return __awaiter(void 0, void 0, void 0, function () {
        var str, name, _loop_1, i, blob, object_url, link;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    str = '<table border="1">';
                    str += '<tr><th>序号</th>';
                    headArr.forEach(function (temp) {
                        str += "<th>".concat(temp, "</th>");
                    });
                    str += '</tr>';
                    name = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
                    _loop_1 = function (i) {
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    str += "<tr><td>".concat((i + 1).toString(), "</td>");
                                    //这里不能用headArr.forEach, forEach无法控制内层的await，应该改用for循环，for...of，或者Promise.all(headArr.map)
                                    // eslint-disable-next-line no-loop-func
                                    return [4 /*yield*/, Promise.all(headArr.map(function (item, index) { return __awaiter(void 0, void 0, void 0, function () {
                                            var image_1;
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0:
                                                        if (!!(name.test(JSONData[i][item]))) return [3 /*break*/, 1];
                                                        str += "<td>".concat(JSONData[i][item], "</td>");
                                                        return [3 /*break*/, 3];
                                                    case 1:
                                                        image_1 = new Image();
                                                        image_1.src = JSONData[i].img;
                                                        // 解决跨域 Canvas 污染问题
                                                        image_1.setAttribute('crossOrigin', 'anonymous');
                                                        //图片加载完毕后执行函数
                                                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                                                image_1.onload = function () {
                                                                    var canvas = document.createElement('canvas');
                                                                    canvas.width = image_1.width;
                                                                    canvas.height = image_1.height;
                                                                    var context = canvas.getContext('2d');
                                                                    context === null || context === void 0 ? void 0 : context.drawImage(image_1, 0, 0, image_1.width, image_1.height);
                                                                    var imgurl = canvas.toDataURL('image/png'); // 得到图片的base64编码数据
                                                                    str += "<td style=\"width: 200px; height: 200px; text-align: center; vertical-align: middle\"><img src=\"".concat(imgurl, "\" width=100 height=100></td>");
                                                                    resolve();
                                                                };
                                                                image_1.onerror = reject;
                                                            })];
                                                    case 2:
                                                        //图片加载完毕后执行函数
                                                        _a.sent();
                                                        _a.label = 3;
                                                    case 3: return [2 /*return*/];
                                                }
                                            });
                                        }); }))];
                                case 1:
                                    //这里不能用headArr.forEach, forEach无法控制内层的await，应该改用for循环，for...of，或者Promise.all(headArr.map)
                                    // eslint-disable-next-line no-loop-func
                                    _b.sent();
                                    str += '</tr>';
                                    return [2 /*return*/];
                            }
                        });
                    };
                    i = 0;
                    _a.label = 1;
                case 1:
                    if (!(i < JSONData.length)) return [3 /*break*/, 4];
                    return [5 /*yield**/, _loop_1(i)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    i++;
                    return [3 /*break*/, 1];
                case 4:
                    str += '</table>';
                    blob = new Blob([str], { type: "application/vnd.ms-excel" });
                    //UTF有一个BOM（Byte Order Mark）的问题。在Unicode编码中有一个叫做"zero-width no-break space (ZWNBSP)"的字符，它的编码是0xFEFF。而0xFEFF在是一个实际中不存在的字符，所以不应该出现在实际传输中。UCSUCS (Unicode Character Set) 规范建议我们在传输字节流前，先传输字符"ZWNBSP"。这样如果接收者收到FEFF，就表明这个字节流是Big-Endian的；如果收到FFFE，就表明这个字节流是Little- Endian的。因此字符"ZWNBSP"又被称作BOM。
                    //解决中文乱码问题。0xFEFF标注使用unicode编码
                    blob = new Blob([String.fromCharCode(0xFEFF), blob], { type: blob.type });
                    object_url = window.URL.createObjectURL(blob);
                    link = document.createElement("a");
                    link.href = object_url;
                    link.download = "导出excel.xls";
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    return [2 /*return*/];
            }
        });
    }); };
    return (jsx(Button, __assign({ onClick: jsonToExcelImgConvertor }, { children: buttonName })));
};

export { Button, ExportJsonToExcel, ExportJsonToImgExcel, TransForm as Form, Input, TransMenu as Menu, Transition, Upload };
