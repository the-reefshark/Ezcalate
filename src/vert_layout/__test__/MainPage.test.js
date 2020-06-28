import React from 'react'
import Header from '../../Header'

import renderer from 'react-test-renderer'

it("Header matches snapshot", () => {
    const tree = renderer.create(<Header></Header>).toJSON()
    expect(tree).toMatchSnapshot()
})