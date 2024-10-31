export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
      title: 'Name',
      type: 'string',
      
    },
    {
      name: 'nameeng',
      title: 'ENGLISH Name',
      type: 'string',
      
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 90,
      },
    },
     // Add tags field
     {
      name: 'tags',
      title: 'Tags (ovven, festen, featured, bra att ha, patches, premium)',
      description: 'Kom ihåg att klicka enter efter varje tag och använd ej åäö.',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },

    {
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        layout: 'radio', // This specifies that you want to use radio buttons
        direction: 'horizontal', // You can choose 'vertical' or 'horizontal' layout
        list: [
          { title: 'Universal', value: 'universal', default: true},
          { title: 'English', value: 'en' },
          { title: 'Swedish', value: 'sv' },
          { title: 'Finnish', value: 'fi' },
        ],
      },
      initialValue: 'universal',
    },

        // Add importance field
        {
          name: 'importance',
          title: 'Importance (1 is most important)',
          type: 'number',
          validation: (Rule) => Rule.integer().min(1).max(1000), // Set validation rules if needed
        },

        {
          name: 'hiddenLink',
          title: 'Hidden Link',
          type: 'url',
          // other field properties...
          access: {
            read: ({ existingData, session }) => {
              // Check if the user has the necessary role to read the hiddenLink field
              return session?.roles.includes('admin');
            },
          },
        },

     // Add variations field
     {
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
              name: 'nameeng',
              title: 'ENGLISH Name',
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
              name: 'shippingsize',
              title: 'Product shipping size ',
              type: 'string',
              description: "Ungefär storlek på produkten, går den ner i ett brev, postpåse eller större låda. är det lika för alla görs detta ej i varianter utan under vanliga shipping size och vikt ",
              options: {
                layout: 'radio', // This specifies that you want to use radio buttons
                direction: 'horizontal', // You can choose 'vertical' or 'horizontal' layout
                list: [
                  { title: 'lika för alla varianter', value: 'sameforall', default: true},
                  { title: 'Går ner i brev', value: 'brev'},
                  { title: 'Går enkelt ner i postpåse', value: 'postpase' },
                  { title: 'Större låda', value: 'storlada' },
                ],
              },
              initialValue: 'sameforall',
            },
            {
              name: 'vikt',
              title: 'Vikt (i gram) ',
              description: "Är det lika för alla görs detta ej i varianter utan under vanliga shipping size och vikt",
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
              name: 'showVariant',
              title: 'Show variant',
              type: 'boolean',
              initialValue: true,
            },

            {
              name: 'outOfStock',
              title: 'Temporarily Out of Stock',
              type: 'boolean',
              initialValue: false,
            },
            // Add 'expectedRestockDate' to variations
            {
              name: 'expectedRestockDate',
              title: 'Expected Restock Date',
              type: 'date',
              options: {
                dateFormat: 'YYYY-MM-DD',
                calendarTodayLabel: 'Today',
              },
              hidden: ({ parent }) => !parent.outOfStock,
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
      name: 'shippingsize',
      title: 'Product shipping size ',
      type: 'string',
      description: "Ungefär storlek på produkten, går den ner i ett brev, postpåse eller större låda.",
      options: {
        layout: 'radio', // This specifies that you want to use radio buttons
        direction: 'horizontal', // You can choose 'vertical' or 'horizontal' layout
        list: [
          { title: 'Går ner i brev', value: 'brev', default: true},
          { title: 'Går enkelt ner i postpåse', value: 'postpase' },
          { title: 'Större låda', value: 'storlada' },
        ],
      },
      initialValue: 'brev',
    },
    {
      name: 'vikt',
      title: 'Vikt (i gram) ',
      description: "",
      type: 'number',
    },


    {
      name: 'showproduct',
      title: 'Show Product',
      type: 'boolean',
      initialValue: true, // Set the default value to true
    },

    {
      name: 'newproduct',
      title: 'New Product',
      type: 'boolean',
      initialValue: false, // Set the default value to true
    },
    {
      name: 'backInStock',
      title: 'Back in stock? ',
      type: 'boolean',
      initialValue: false, // Set the default value to true
    },
    {
      name: 'fewleft',
      title: 'Få produkter kvar',
      type: 'boolean',
      initialValue: false, // Set the default value to true
    },

    {
      name: 'outOfStock',
      title: 'Out of Stock?',
      type: 'boolean',
      initialValue: false,
    },

    // Add the 'expectedRestockDate' field
    {
      name: 'expectedRestockDate',
      title: 'Expected Restock Date?',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
        calendarTodayLabel: 'Today',
      },
      hidden: ({ parent }) => !parent.outOfStock, // Only show if 'outOfStock' is true
    },


    {
      name: 'expressfrakt',
      title: 'Express Frakt',
      type: 'boolean',
      initialValue: false, // Set the default value to true
    },
    {
      name: 'minovve',
      title: 'minovve produkt',
      type: 'boolean',
      initialValue: false, // Set the default value to true
    },
    

    {
      name: 'hiddenimages',
      title: 'Hidden Images, to save product images for later',
      type: 'array',
      description: '(tex finns inte mer) Optimerat för jpg, png och webp bilder',

      of: [{ type: 'image' }],
      options: {
        hotspot: true,
      },
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

    {
      name: 'detailseng',
      title: 'ENGLISH Details',
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

  ],
  initialValue: () => ({
    id: String(Date.now()),
  }),
};