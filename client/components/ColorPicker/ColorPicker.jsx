import React from 'react';
import cx from 'classnames';

import './ColorPicker.style.less';

const COLORS = ['#FFFFFF', '#80D8FF', '#FFFF8D', '#FF8A80', '#CCFF90', '#CFD8DC', '#FFD180'];

class ColorPicker extends React.Component {
    render() {
        return (
            <div className='ColorPicker'>
                {
                    COLORS.map(color =>
                        <div
                            key={color}
                            className={cx('ColorPicker__swatch', { selected: this.props.value === color })}
                            style={{ backgroundColor: color }}
                            onClick={this.props.onChange.bind(null, color)}
                        />
                    )
                }
            </div>
        );
    }
} // ColorPicker

export default ColorPicker;
