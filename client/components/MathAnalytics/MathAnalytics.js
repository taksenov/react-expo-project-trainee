import numbers from 'numbers';

class MathAnalytics {

    /**
    * Calculate the linear regression incline coefficient of a dataset.
    *
    * @param {Array} X array.
    * @param {Array} Y array.
    * @return {number} linear regression incline coefficient: Y = a+bX 
    */
    linearRegressionInclineCoefficient(arrX, arrY) {
        let n = arrX.length;
        let xSum = numbers.basic.sum(arrX);
        let ySum = numbers.basic.sum(arrY);
        let xySum = numbers.basic.sum(arrX.map(function (d, i) {
            return d * arrY[i];
        }));
        let xSquaredSum = numbers.basic.sum(arrX.map(function (d) {
            return d * d;
        }));
        // наклон линии тренда. Разница в измерениях за один день.
        let b = (xySum - 1 / n * xSum * ySum) / (xSquaredSum - 1 / n * (xSum * xSum));
        return b;
    } //linearRegressionInclineCoefficient

} //MathAnalytics

export default MathAnalytics;

