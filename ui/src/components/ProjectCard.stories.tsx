import { ComponentStory } from '@storybook/react'
import data from 'data/Projects'
import React from 'react'
import { ProjectCard as Component } from './ProjectCard'

export default {
  title: 'Components/Project Card',
  component: Component,
}

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />

export const ProjectCard = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args
ProjectCard.args = data.projects[0]
