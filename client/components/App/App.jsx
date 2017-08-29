import React from 'react';
import { Switch, Route } from 'react-router-dom';
// TODO: изучить инструкцию по react-router 4 до конца и использовать в полном объеме https://habrahabr.ru/post/329996/

import NavBar from '../NavBar/NavBar.jsx';
import HomePage from '../HomePage/HomePage.jsx';
import NotesMain from '../NotesMain/NotesMain.jsx';
import FiresMain from '../FiresMain/FiresMain.jsx';

class App extends React.Component {
    render() {
        return (
            <div className='EddsData'>

                <NavBar/>

                {/* Main container */}
                <div className='container'>

                    {/* Workaround for NavBar height */}
                    <div className='page-header'></div>
                    {/* Workaround for NavBar height */}

                    <div className='EddsData__content'>
                        <Switch>
                            <Route exact path='/' component={HomePage}/>
                            <Route path='/notes' component={NotesMain} />
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
