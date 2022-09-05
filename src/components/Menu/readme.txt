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