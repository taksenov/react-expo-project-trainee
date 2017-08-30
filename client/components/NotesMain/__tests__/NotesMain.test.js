import React from 'react';
import { shallow } from 'enzyme';
import NotesMain from '../NotesMain.jsx';

describe('<NotesMain />', () => {
    it('should render NotesMain', () => {
        const renderedComponent = shallow(
            <NotesMain />
        );

        // // Выведем отрендеренный компонент
        // console.log(renderedComponent.debug());

        // Find NotesMain Page
        expect(renderedComponent.find('div .EddsData__NotesMain').hasClass('EddsData__NotesMain')).toBe(true);

    });
});
