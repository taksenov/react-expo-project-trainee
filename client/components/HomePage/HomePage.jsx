import React from 'react';

class HomePage extends React.Component {
    render() {
        return (
            <div className='EddsData__HomePage'>

                {/* Header */}
                <div className='row'>
                    <div className='col-lg-12 text-center'>
                        <h2 className='App__header'> Home </h2>
                    </div>
                </div>

                <div>
                    Приложение EDDS Data разработано для автоматизации учета данных в МКУ "ЕДДС Белоярского района".
                </div>
        
            </div>
        );
    }

} //HomePage

export default HomePage;
