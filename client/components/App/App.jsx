import React from 'react';
import { Switch, Route } from 'react-router-dom';

import NavBar from '../NavBar/NavBar.jsx';
import HomePage from '../HomePage/HomePage.jsx';
import NotesMain from '../NotesMain/NotesMain.jsx';
import RiversMain from '../RiversMain/RiversMain.jsx';
import FiresMain from '../FiresMain/FiresMain.jsx';

class App extends React.Component {
    render() {
        return (
            <div className='EddsData'>

                <NavBar />

                {/* Main container */}
                <div className='container'>

                    {/* Workaround for NavBar height */}
                    <div className='page-header'></div>
                    {/* Workaround for NavBar height */}

                    <div className='EddsData__content'>
                        <Switch>
                            <Route exact path='/' component={HomePage} />
                            <Route path='/notes' component={NotesMain} />
                            <Route path='/rivers' component={RiversMain} />
                            <Route path='/fires' component={FiresMain} />
                        </Switch>
                    </div>

                </div>
                {/* Main container */}

            </div>
        );
    }

} //App 
 
export default App;
