
import { Button } from 'baseui/button';
import {
    ALIGN, HeaderNavigation, StyledNavigationItem as NavigationItem,
    StyledNavigationList as NavigationList
} from 'baseui/header-navigation';
import { StatefulSelect as Search, TYPE } from 'baseui/select';
import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import SuperLink from './components/SuperLink';
import AuthContext from './context/AuthContext';
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

    let { user, logoutUser } = useContext(AuthContext);

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
                    <NavigationItem >
                        <SuperLink to='/catalog'>Catalog</SuperLink>
                    </NavigationItem>
                    {
                        user ? null :
                            <>
                                <NavigationItem>
                                    <SuperLink to='/signin'>Login</SuperLink>
                                </NavigationItem>
                                <NavigationItem >
                                    <SuperLink to='/signup'>Register</SuperLink>
                                </NavigationItem>
                            </>
                    }
                </NavigationList>
                <NavigationList $align={ALIGN.center} />
                <NavigationList $align={ALIGN.right}>
                </NavigationList>
                <NavigationList $align={ALIGN.right}>
                    {
                        user ? <>
                            <NavigationItem>
                                Hello, {user.unique_name}
                            </NavigationItem>
                            <NavigationItem>
                                <Button onClick={logoutUser} size='compact'>Logout</Button>
                            </NavigationItem>
                        </> : null
                    }
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
