export default {
  name: 'showcasepatches',
  title: 'Showcasepatches (patchswipe)',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        isHighlighted: true, // Highlight the field in the Studio UI
      },
      initialValue: () => {
        // Generate a unique ID using the current timestamp
        return `showcasepatches-${Date.now()}`;
      },
    },


    {
      name: 'image',
      title: 'Image',
      type: 'array',
      description: 'Optimerat för jpg, png och webp bilder',

      of: [{ type: 'image' }],
      options: {
        hotspot: true,
      },
    },
    {
      name: 'name',
      title: 'Patch name',
      type: 'string',
      
    },

    {
      name: 'link',
      title: 'Product link (paste slug link)',
      type: 'string',
      //hidden: true, // This hides the field in the Sanity Studio
    },
    
    {
      name: 'sizewidth',
      title: 'Patch width size (i cm)',
      type: 'string',  
    },    
    {
      name: 'sizeheigth',
      title: 'Patch heigth size (i cm)',
      type: 'string',  
    },
    {
      name: 'edge',
      title: 'Patch edge (Vanlig, Tunn)',
      type: 'string',  
    },
    {
      name: 'edgeeng',
      title: 'ENGLISH Patch edge (Normal, Thin)',
      type: 'string',  
    },
     // Add tags field
     {
      name: 'tags',
      title: 'Tags (Vävt, Broderat, Tryckt)',
      description: 'Kom ihåg att klicka enter efter varje tag och använd ej åäö.',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },




        // Add importance field
        {
          name: 'importance',
          title: 'Importance (1 is most important)',
          type: 'number',
          validation: (Rule) => Rule.integer().min(1).max(1000), // Set validation rules if needed
        },

        {
          name: 'showproduct',
          title: 'Show Product',
          type: 'boolean',
          initialValue: true, // Set the default value to true
        },



     // Add variations field
     /*{
      name: 'variations',
      title: 'Variations',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
              description: "must be unique (the same product cant have 2 items with same variation name) "
            },
            {
              name: 'price',
              title: 'Price',
              type: 'number',
            },
            {
              name: 'previousprice',
              title: 'Previous Price',
              type: 'number',
            },
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              description: "Select an existing image, do not upload a new image here",
              options: {
                hotspot: true,
              },
            },
            {
              name: 'expressfraktvariation',
              title: 'Express Frakt',
              type: 'boolean',
              initialValue: false, // Set the default value to true
            },
            // Add other fields specific to variations
          ],
        },
      ],
    },

    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'previousprice',
      title: 'Previos price',
      type: 'number',
    },
    



    {
      name: 'expressfrakt',
      title: 'Express Frakt',
      type: 'boolean',
      initialValue: false, // Set the default value to true
    },
    
    {
      name: 'details',
      title: 'Details',
      type: 'array', 
      of: [
        {
          type: 'block',
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'}
          ], // yes please, both bullet and numbered
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'H5', value: 'h5'},
            {title: 'H6', value: 'h6'},
            {title: 'Quote', value: 'blockquote'},
            { title: 'Hidden', value: 'blockComment' },
          ],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'}
            ]
          }
        }
      ]
    },

    */
  ],
  initialValue: () => ({
    id: String(Date.now()),
  }),
};