import React from 'react';

import ReactToastrBasic from 'react-toastr-basic';
import {Toast,ToastSuccess,ToastDanger} from 'react-toastr-basic';

import ReactToastr from 'react-toastr';
import {ToastContainer,ToastMessage,} from 'react-toastr';
import ToastrContainer from 'react-toastr-basic';



//Styles
import './animate.min.css';
// import './toastr.min.css';

let ToastMessageFactory = React.createFactory(ToastMessage.animation);

class Toastr extends React.Component {

    componentDidMount() {
        ToastSuccess('SUCCESS','my successful toast');
        Toast('DEFAULT','my default toast');
        ToastDanger('DANGER','my danger toast!');
    }

    addRiverSuccess() {
        this.refs.toastrContainer.success(
            'Welcome welcome welcome!!',
            'You are now home my friend. Welcome home my friend.', 
            {
                closeButton:true,
                newestOnTop: true,
                timeOut: 5000,
                extendedTimeOut: 3000
            }
        );
    } // addRiverSuccess

    render() {
        return (
            <div>
                <ToastContainer
                    toastMessageFactory={ToastMessageFactory}
                    ref='toastrContainer'
                    className='toast-top-right'
                />
            </div>
        );
    }

} //Toastr

export default Toastr;
