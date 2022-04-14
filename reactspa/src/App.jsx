import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider, styled } from 'baseui';
import { StatefulInput } from 'baseui/input';
import {
    HeaderNavigation,
    ALIGN,
    StyledNavigationItem as NavigationItem,
    StyledNavigationList as NavigationList,
} from 'baseui/header-navigation';
import { StatefulSelect as Search, TYPE } from 'baseui/select';
import React, { useState } from 'react';
import { headerLinks } from './constants';
import { Link, Outlet } from 'react-router-dom';
import SuperLink from './components/SuperLink';
import { Centered } from './styles';

const options = {
    options: [
    ],
    labelKey: 'id',
    valueKey: 'color',
    placeholder: 'Search colors',
    maxDropdownHeight: '300px',
};

const engine = new Styletron();

function App() {

    return (
        <div className="App">
            <StyletronProvider value={engine}>
                <BaseProvider theme={LightTheme}>

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
                </BaseProvider>
            </StyletronProvider>
        </div >
    );
}

export default App;
