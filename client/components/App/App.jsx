import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ToastrContainerBasic from 'react-toastr-basic';

import NavBar from '../NavBar';
import HomePage from '../HomePage';
import NotesMain from '../NotesMain/NotesMain.jsx';
import RiversMain from '../RiversMain';
import RiversInputForm from '../RiversInputForm';
import RiversArchive from '../RiversArchive';
import FiresMain from '../FiresMain/FiresMain.jsx';

class App extends React.Component {
    render() {
        return (
            <div className="EddsData">
                <NavBar />

                <ToastrContainerBasic />

                {/* Main container */}
                <div className="container">
                    {/* Workaround for NavBar height */}
                    <div className="page-header" />
                    {/* Workaround for NavBar height */}

                    <div className="EddsData__content">
                        <Switch>
                            <Route exact path="/" component={HomePage} />
                            <Route path="/notes" component={NotesMain} />
                            <Route path="/rivers" component={RiversMain} />
                            <Route path="/riversForm" component={RiversMain} />
                            <Route
                                path="/riversArchive"
                                component={RiversMain}
                            />
                            <Route
                                path="/riversCharts"
                                component={RiversMain}
                            />
                            <Route
                                path="/riversReport"
                                component={RiversMain}
                            />
                            <Route path="/fires" component={FiresMain} />
                        </Switch>
                    </div>
                </div>
                {/* Main container */}
            </div>
        );
    }
} //App

export default App;
