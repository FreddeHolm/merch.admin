import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {RobotIcon, RocketIcon} from '@sanity/icons'

import {visionTool} from '@sanity/vision'
import {schemaTypesStudentlivet} from './schemas'

export default defineConfig([
  {
  name: 'default',
  title: 'sanity_studentlivet',
  basePath: '/'+"production",
  projectId: "801rdb6i",
  dataset: "production",
  icon: RobotIcon,

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypesStudentlivet,
  },

},
/*{
  name: 'default2',
  title: 'sanity_test_studentstore',
  basePath: '/test',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID2,
  dataset: 'test_dataset',
  icon: RocketIcon,

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

},*/
])



