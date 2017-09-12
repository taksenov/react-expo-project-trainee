import React from 'react';
import ReactToastr from 'react-toastr';
import {ToastContainer,ToastMessage,} from 'react-toastr';

//Styles
import './animate.min.css';
import './toastr.min.css';

let ToastMessageFactory = React.createFactory(ToastMessage.animation);

class Toastr extends React.Component {

    componentDidMount() {
        // this.refs.toastrContainer.success(
        //     'XXX --- Welcome welcome welcome!!',
        //     'XXX --- You are now home my friend. Welcome home my friend.', 
        //     {
        //         closeButton:true,
        //         newestOnTop: true,
        //         timeOut: 5000,
        //         extendedTimeOut: 3000
        //     }
        // );
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
