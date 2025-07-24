import type {Meta, StoryObj} from '@storybook/react';
import {useArgs} from 'storybook/preview-api';
import {fn} from 'storybook/test';

import Toggle from '.';
import {StoryBlock, UseCase, StoryScreen} from '../../../.rnstorybook/views';

const meta = {
  title: 'Toggle',
  component: Toggle,
  decorators: [
    Story => (
      <StoryScreen>
        <Story />
      </StoryScreen>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    checked: {control: 'boolean'},
    disabled: {control: 'boolean'},
  },
  args: {
    checked: false,
    disabled: false,
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: function Render(args) {
    const [{checked, disabled}, updateArgs] = useArgs();

    const handleToggle = () => {
      updateArgs({checked: !checked});
    };

    return (
      <StoryBlock>
        <UseCase text="Playground">
          <Toggle {...args} checked={checked} disabled={disabled} onPress={handleToggle} />
        </UseCase>
      </StoryBlock>
    );
  },
};

export const AllStates: Story = {
  render: () => (
    <StoryBlock>
      <UseCase text="Unchecked">
        <Toggle checked={false} onPress={() => {}} />
      </UseCase>
      <UseCase text="Checked">
        <Toggle checked onPress={() => {}} />
      </UseCase>
      <UseCase text="Disabled">
        <Toggle checked={false} disabled onPress={() => {}} />
      </UseCase>
    </StoryBlock>
  ),
};
