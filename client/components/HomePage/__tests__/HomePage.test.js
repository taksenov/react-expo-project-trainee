import React from 'react';
import { shallow } from 'enzyme';
import HomePage from '../HomePage.jsx';

describe('<HomePage />', () => {
    it('should render HomePage', () => {
        const renderedComponent = shallow(
            <HomePage />
        );

        // // Выведем отрендеренный компонент
        // console.log(renderedComponent.debug());

        // Find HomePage
        expect(renderedComponent.find('div .EddsData__HomePage').hasClass('EddsData__HomePage')).toBe(true);

    });
});
