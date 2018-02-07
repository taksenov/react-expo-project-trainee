import React from 'react';
import ReactDOM from 'react-dom';
import { Line } from 'react-chartjs-2';
import numbers from 'numbers';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';
import moment from 'moment';

import MathAnalytics from '../non-react/MathAnalytics';
import AppConstants from '../../data/constants/AppConstants';
import DataFromRiver from '../non-react/DataFromRiver';
import {
    fetchChartsRequest,
    fetchChartsSuccess,
    fetchChartsFailure
} from '../../data/actions/RiversCharts';
import {
    getChartsData,
    getIsChartsFetching
} from '../../data/reducers/RiversCharts';

import MessageForForm from '../MessageForForm';

import './RiversReport.style.less';
import 'react-select/dist/react-select.css';
import 'react-datepicker/dist/react-datepicker.css';

import api from '../../api';

class RiversReport extends React.Component {
    componentDidMount() {
        const { fetchChartsRequest } = this.props;
        let date = new Date();
        let year = date.getFullYear();

        fetchChartsRequest(year - 1, 'river_01');
    } //componentDidMount

    render() {
        return <div className="EddsData__RiversReport">Отчет. Тест стейта</div>;
    }
} //RiversReport

const mapStateToProps = state => ({
    // isChartsFetching: getIsChartsFetching(state),
    chartData: getChartsData(state)
});

const mapDispatchToProps = {
    fetchChartsRequest,
    fetchChartsSuccess,
    fetchChartsFailure
};

export default connect(mapStateToProps, mapDispatchToProps)(RiversReport);
