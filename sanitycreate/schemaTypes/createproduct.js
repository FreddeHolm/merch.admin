export default {
    name: 'createproduct',
    title: 'Product',
    type: 'document',
    fields: [
      {
        name: 'id',
        title: 'ID',
        type: 'string',
        readOnly: true,
        initialValue: () => `${Date.now()}`, // Generates a unique ID
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: { source: 'name', maxLength: 96 },
      },
      {
        name: 'name',
        title: 'Product Name',
        type: 'string',
      },
      {
        name: 'engname',
        title: 'Eng Product Name',
        type: 'string',
      },
      {
        name: 'image',
        title: 'Product Image',
        type: 'image',
        options: { hotspot: true },
      },
      {
        name: 'description',
        title: 'Description',
        type: 'text',
      },
      {
        name: 'engdescription',
        title: 'Eng Description',
        type: 'text',
      },
      {
        name: 'contentTypes',
        title: 'Content Types',
        type: 'array',
        of: [{ type: 'reference', to: { type: 'createtypes' } }],
        description: 'Select the types available for this product.',
      },

      {
        name: 'popular',
        title: 'Is it a popular option',
        type: 'boolean',
        initialValue: false, // Set the default value to true
      },


      {
        name: 'importance',
        title: 'Importance (lower number = more important)',
        type: 'number',
        //initialValue: true, // Set the default value to true
      },
      {
        name: 'show',
        title: 'Show Product',
        type: 'boolean',
        initialValue: true, // Set the default value to true
      },

      {
        name: 'backupimage',
        title: 'backup Images',
        type: 'image',
        options: { hotspot: true },
      },

      {
        name: 'backuptexts',
        title: 'backup text',
        type: 'text',
      },
    ],
  };