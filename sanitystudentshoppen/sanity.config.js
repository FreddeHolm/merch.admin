import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {RobotIcon, RocketIcon} from '@sanity/icons'

import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig([
  {
  name: 'default',
  title: 'sanity_studentstore',
  basePath: '/'+"production",
  projectId: "b6p59wq7",
  dataset: "production",
  icon: RobotIcon,

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

},
/*{
  name: 'default2',
  title: 'sanity_test_studentstore',
  basePath: '/test',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'test_dataset',
  icon: RocketIcon,

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

},*/
])



