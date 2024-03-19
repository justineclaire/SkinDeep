import React from 'react'
import { TabPane, Tab } from 'semantic-ui-react'

const panes = [
  { menuItem: 'Moisturisers', render: () => <TabPane>Tab 1 Content</TabPane> },
  { menuItem: 'Toners', render: () => <TabPane>Tab 2 Content</TabPane> },
  { menuItem: 'Cleansers', render: () => <TabPane>Tab 3 Content</TabPane> },
]

const TabExampleBasic = () => <Tab panes={panes} />

export default Products;