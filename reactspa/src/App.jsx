
import {
    ALIGN, HeaderNavigation, StyledNavigationItem as NavigationItem,
    StyledNavigationList as NavigationList
} from 'baseui/header-navigation';
import { StatefulSelect as Search, TYPE } from 'baseui/select';
import React from 'react';
import { Outlet } from 'react-router-dom';
import SuperLink from './components/SuperLink';
import { headerLinks } from './constants';
import { Centered } from './styles';

const options = {
    options: [
    ],
    labelKey: 'id',
    valueKey: 'color',
    placeholder: 'Search colors',
    maxDropdownHeight: '300px',
};

function App() {

    return (
        <div className="App">
            <HeaderNavigation overrides={{
                Root: {
                    style: {
                        margin: "0 20px 0 20px"
                    }
                }
            }} >
                <NavigationList $align={ALIGN.left}>
                    <NavigationItem>historypaper</NavigationItem>

                    {headerLinks.map((l, i) => (<NavigationItem key={i}>
                        <SuperLink to={l.link}>{l.label}</SuperLink>
                    </NavigationItem>))}
                </NavigationList>
                <NavigationList $align={ALIGN.center} />
                <NavigationList $align={ALIGN.right}>
                </NavigationList>
                <NavigationList $align={ALIGN.right}>
                    <NavigationItem style={{ width: '200px' }}>
                        <Search
                            {...options}
                            type={TYPE.search}

                            onChange={() => { }}
                        />
                    </NavigationItem>
                </NavigationList>
            </HeaderNavigation>
            <Centered>
                <Outlet />
            </Centered>
        </div >
    );
}

export default App;
