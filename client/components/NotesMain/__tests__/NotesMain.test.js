import React from 'react';
import { shallow, mount } from 'enzyme';
import NotesMain from '../NotesMain.jsx';
import NoteEditor from '../../NoteEditor/NoteEditor.jsx';
import NotesGrid from '../../NotesGrid/NotesGrid.jsx';

// Тестирование на рендеринг компонента
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


// import Home from './Home';
// import Wellcome from './Wellcome';

describe('<NotesMain />', () => {
    it('should fetch childComponents on mount', () => {
        // const fetchUsernameSpy = jest.fn(cb => 'Aliсe');
        // const renderedComponent = mount(
        //     <Home
        //         username={'Aliсe'}
        //         changeUsername={jest.fn()}
        //     />
        // );
        
        // // Выведем отрендеренный комонент
        // console.log(renderedComponent.debug());
        
        // expect(fetchUsernameSpy).toBeCalled();\
        const renderedComponent = mount(
            <NotesMain />
        );

        // // Выведем отрендеренный компонент
        // console.log(renderedComponent.debug());

        // Find NotesMain Page
        expect(renderedComponent.find('div .EddsData__NotesMain').hasClass('EddsData__NotesMain')).toBe(true);
        
    });
});
