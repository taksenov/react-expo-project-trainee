import React from 'react';
import { shallow } from 'enzyme';
import FiresMain from '../FiresMain.jsx';

describe('<FiresMain />', () => {
    it('should render FiresMain', () => {
        const renderedComponent = shallow(
            <FiresMain />
        );

        // // Выведем отрендеренный компонент
        // console.log(renderedComponent.debug());

        // Find FiresMain Page
        expect(renderedComponent.find('div .EddsData__FiresMain').hasClass('EddsData__FiresMain')).toBe(true);

    });
});
