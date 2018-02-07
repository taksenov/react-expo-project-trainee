import api from '../../../api';
import AppConstants from '../../../data/constants/AppConstants';

class DataFromRiver {
    handlePreparationForChart(chartData) {
        if (arguments.length === 0) return;

        let firstDate = chartData[0].scalingDate;
        let lastDate = chartData[chartData.length - 1].scalingDate;
        let dataYear = firstDate.substr(0, 4);
        let scalingRangeStart =
            dataYear + AppConstants.CHARTS_SCALING_RANGE_START;
        let scalingRangeEnd = dataYear + AppConstants.CHARTS_SCALING_RANGE_END;
        let scalingDaysBefore =
            (Date.parse(firstDate) - Date.parse(scalingRangeStart)) /
            AppConstants.ONE_DAY_MS;
        let scalingDaysAfter =
            (Date.parse(scalingRangeEnd) - Date.parse(lastDate)) /
            AppConstants.ONE_DAY_MS;
        let levelBefore = [];
        let levelRealScalling = [];
        let levelAfter = [];
        let workingLevelArrayForCharts = [];

        levelBefore.length = scalingDaysBefore;
        levelAfter.length = scalingDaysAfter;
        for (let i of chartData) {
            levelRealScalling.push(i.levelToday);
        }
        workingLevelArrayForCharts = workingLevelArrayForCharts.concat(
            levelBefore,
            levelRealScalling,
            levelAfter
        );

        return workingLevelArrayForCharts;
    } //handlePreparationForChart

    async getRiverData(year, river) {
        if (arguments.length === 0) return;

        try {
            let riverDataFromAPI = await api.getRiverData(year, river);
            let riverDataForChart = await this.handlePreparationForChart(
                riverDataFromAPI.data
            );

            return riverDataForChart;
        } catch (error) {
            throw new Error(
                `Не удалось получить данные по реке ${river} за ${year} год'`
            );
        }
    } //getRiverData
} //DataFromRiver

export default DataFromRiver;
