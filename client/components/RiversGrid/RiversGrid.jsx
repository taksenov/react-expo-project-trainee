import React from 'react';

import River from '../River';

import './RiversGrid.style.less';

class RiversGrid extends React.Component {
    render() {
        return (
            <div className="RiversGrid">
                <table className="table table-striped table-hover table-responsive">
                    <thead>
                        <tr>
                            <th>Дата</th>
                            <th>Река</th>
                            <th>Гидропост</th>
                            <th>Уровень</th>
                            <th>Динамика</th>
                            <th>АППГ</th>
                            <th>Примечание</th>
                            <th>Действие</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.props.rivers.map(river => (
                            <River
                                key={river.id}
                                name={river.name}
                                scalingDate={river.scalingDate}
                                hydroPost={river.hydroPost}
                                levelToday={river.levelToday}
                                levelDelta={river.levelDelta}
                                levelAPPG={river.levelAPPG}
                                comment={river.comment}
                                onDelete={this.props.onRiverDelete.bind(
                                    null,
                                    river
                                )}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
} //RiversGrid

export default RiversGrid;
