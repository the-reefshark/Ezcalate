import React from 'react'
import ReactDOM from 'react-dom'
import TodoList from '../TodoList'
import LeftPanel from '../LeftPanel'

import renderer from 'react-test-renderer'

it("TodoList renders without crashing", () => {
    const div = document.createElement("div")
    ReactDOM.render(<TodoList></TodoList>, div)
})

it('Retrieves TodoList from database', () => {
    // Checks if function call proceeds without errors
    let component = renderer.create(<TodoList></TodoList>).getInstance()
    let tree = component.getTodoList()
})

it('TodoList matches snapshot', () => {
    // Update snapshot each time TodoList data is editted to ensure uniform testing
    const tree = renderer.create(<TodoList></TodoList>).toJSON()
    expect(tree).toMatchSnapshot()
})

it("LeftPanel matches snapshot", () => {
    const tree = renderer.create(<LeftPanel></LeftPanel>).toJSON()
    expect(tree).toMatchSnapshot()
})