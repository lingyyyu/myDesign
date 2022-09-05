import React from 'react';
import Button, { ButtonSize, ButtonType } from './components/Button/button';
import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Menu mode='vertical' defaultIndex={'0'} onSelect={(index) => {alert(index)}} defaultOpenSubMenus={['3']}>
          <MenuItem>
            cool link
          </MenuItem>
          <MenuItem disabled>
            cool link 2
          </MenuItem>
          <MenuItem>
            cool link 3
          </MenuItem>
          <SubMenu title='dropdown'>
            <MenuItem>dropdown 1</MenuItem>
            <MenuItem>2</MenuItem>
          </SubMenu>
        </Menu>
        <Button autoFocus> Hello </Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}> hello </Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com" disabled> Baidu Link </Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Small}> Small Danger </Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com" target="_blank"> Baidu Link </Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com" disabled> Disabled Link </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
