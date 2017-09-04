import React from 'react';
import { mount } from 'enzyme';
import NoteEditor from '../NoteEditor.jsx';

describe('<NoteEditor />', () => {
    it('should Full Render (mount) NoteEditor', () => {
        const renderedComponent = mount(
            <NoteEditor />
        );

        // // Выведем отрендеренный компонент
        // console.log(renderedComponent.debug());

        // Find NoteEditor
        expect(renderedComponent.find('div .NoteEditor').hasClass('NoteEditor')).toBe(true);

    });
});
