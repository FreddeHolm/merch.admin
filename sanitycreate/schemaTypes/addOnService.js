export default {
    name: 'addOnService',
    title: 'Add-On Service',
    type: 'document',
    fields: [
      { name: 'name', title: 'Service Name', type: 'string' },
      { name: 'engname', title: 'ENG Service Name', type: 'string' },
      {
        name: 'type',
        title: 'Service Type',
        type: 'string',
        options: {
          list: [
            { title: 'Single Choice', value: 'singleChoice' },
            { title: 'Boolean', value: 'boolean' },
          ],
        },
      },
      {
        name: 'options',
        title: 'Options',
        type: 'array',
        of: [
          {
            type: 'object',
            title: 'Option',
            fields: [
              { name: 'optionName', title: 'Option Name', type: 'string' },
              { name: 'engoptionName', title: 'ENG Option Name', type: 'string' },
              { name: 'price', title: 'Price', type: 'number' },
              { name: 'englishprice', title: 'English Price', type: 'number' },
              {
                name: 'handlesshipping',
                title: 'Handles shipping',
                type: 'boolean',
                initialValue: false,
              },
              { name: 'description', title: 'Description', type: 'text' },
              { name: 'engdescription', title: 'ENG Description', type: 'text' },
            ],
          },
        ],
        hidden: ({ parent }) => parent?.type !== 'singleChoice',
      },
      {
        name: 'price',
        title: 'Price',
        type: 'number',
        hidden: ({ parent }) => parent?.type !== 'boolean',
      },
      {
        name: 'englishprice',
        title: 'English Price',
        type: 'number',
        hidden: ({ parent }) => parent?.type !== 'boolean',
      },



      {
        name: 'importance',
        title: 'Importance (lower number = more important)',
        type: 'number',

      },

      {
        name: 'preselected',
        title: 'Is the option preselected',
        type: 'boolean',
        initialValue: false,
      },

      {
        name: 'show',
        title: 'Show Service',
        type: 'boolean',
        initialValue: true,
      },
    ],
  };