import React from 'react';
import { mount } from 'enzyme';
import RiverEditor from '../RiverEditor.jsx';

describe('<RiverEditor />', () => {
    it('should Full Render (mount) RiverEditor', () => {
        const renderedComponent = mount(
            <RiverEditor />
        );

        // // Выведем отрендеренный компонент
        // console.log(renderedComponent.debug());

        // Find RiverEditor
        expect(renderedComponent.find('div .RiverEditor').hasClass('RiverEditor')).toBe(true);
 
    });
});
