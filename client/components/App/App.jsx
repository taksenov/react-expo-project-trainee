import React from 'react';
import { Route } from 'react-router-dom';

import NavBar from '../NavBar/NavBar.jsx';
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
                        <Route path='/notes' component={NotesMain} />
                        <Route path='/fires' component={FiresMain} />
                    </div>
                    
                </div>
                {/* Main container */}
        
            </div>
        );
    }

} //App

export default App;
