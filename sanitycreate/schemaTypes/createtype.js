// schemas/type.js
export default {
    name: 'createtypes',
    title: 'Product Type',
    type: 'document',
    fields: [
      // Basic Information
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
        title: 'Type Name',
        type: 'string',
      },
      {
        name: 'engname',
        title: 'ENG Type Name',
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
        title: 'ENG Description',
        type: 'text',
      },

      // Price Matrix

      {
        name: 'neededInformation',
        title: 'Needed Information',
        type: 'array',
        of: [
          {
            type: 'object',
            title: 'Needed Information Entry',
            fields: [
              {
                name: 'id',
                title: 'ID',
                type: 'string',
                readOnly: true,
                initialValue: () => `${Date.now()}`, // Generates a unique ID
              },
              {
                name: 'name',
                title: 'Name',
                type: 'string',
              },
              {
                name: 'engname',
                title: 'ENG Name',
                type: 'string',
              },
              {
                name: 'description',
                title: 'Description',
                type: 'text',
              },
              {
                name: 'engdescription',
                title: 'ENG Description',
                type: 'text',
              },
              {
                name: 'answerType',
                title: 'Type of Answer',
                type: 'string',
                options: {
                  list: [
                    { title: 'Boolean', value: 'boolean' },
                    { title: 'Number', value: 'number' },
                    { title: 'String', value: 'string' },
                    { title: 'Multi-Choice', value: 'multiChoice' },
                  ],
                  layout: 'radio', // Optional: radio buttons for better UX
                },
              },
              // **Conditional Fields Based on answerType**
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
                      { name: 'engOptionName', title: 'ENG Option Name', type: 'string' },
                      { name: 'description', title: 'Description', type: 'text' },
                      { name: 'engDescription', title: 'ENG Description', type: 'text' },
                      { name: 'werecommend', title: 'recommended', type: 'boolean', initialValue: false, },

                      {
                        name: 'image',
                        title: 'Option Image',
                        type: 'image',
                        options: { hotspot: true },
                      },
                    ],
                  },
                ],
                hidden: ({ parent }) => parent?.answerType !== 'multiChoice',
              },
              {
                name: 'required',
                title: 'Is Required',
                type: 'boolean',
                initialValue: true,
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
                initialValue: true,
              },
              {
                name: 'show',
                title: 'Show Field',
                type: 'boolean',
                initialValue: true,
              },
              // **Additional Fields (Optional)**
              {
                name: 'validation',
                title: 'Validation Rules',
                type: 'string',
                description: 'Specify any validation rules (e.g., min, max, regex).',
                hidden: ({ parent }) => parent?.answerType === 'multiChoice',
              },
            ],
          },
        ],
      },




      {
        name: 'priceMatrixMeasurementUnit',
        title: 'Measurment unit (mm, cm etc)',
        type: 'string',
      },

      {
        name: 'priceMatrix',
        title: 'Price Matrix',
        type: 'array',
        of: [
          {
            type: 'object',
            title: 'Price Entry',
            fields: [
              { name: 'name', title: 'Name', type: 'string' },
              { name: 'size', title: 'Size', type: 'number' },
              { name: 'quantity', title: 'Quantity', type: 'number' },
              { name: 'price', title: 'Price', type: 'number' },
              {
                name: 'show',
                title: 'Show alternative',
                type: 'boolean',
                initialValue: true, // Set the default value to true
              },
            ],
          },
        ],
      },
  
      // Delivery Prices

      {
        name: 'minimumdeliverytime',
        title: 'minimum delivery time',
        type: 'number',
      },

      {
        name: 'deliveryPrices',
        title: 'Delivery Prices',
        type: 'array',
        of: [
          {
            type: 'object',
            title: 'Delivery Price',
            fields: [
              { name: 'deliveryDays', title: 'Delivery Days', type: 'number' },
              { name: 'extraPrice', title: 'Extra Price', type: 'number' },
              {
                name: 'show',
                title: 'Show delivery',
                type: 'boolean',
                initialValue: true, // Set the default value to true
              },
            ],
          },
        ],
      },
  
      // Add-On Services
      {
        name: 'addOnServices',
        title: 'Add-On Services',
        type: 'array',
        of: [
          {
            type: 'reference',
            to: [{ type: 'addOnService' }],
          },
        ],
      },
  
      // Testimonials
      {
        name: 'testimonials',
        title: 'Testimonials',
        type: 'array',
        of: [
          {
            type: 'object',
            title: 'Testimonial',
            fields: [
              {
                name: 'id',
                title: 'ID',
                type: 'string',
                readOnly: true,
                initialValue: () => `${Date.now()}`,
              },
              {
                name: 'name',
                title: 'Name',
                type: 'string',
              },
              {
                name: 'engname',
                title: 'Eng Name',
                type: 'string',
              },
              {
                name: 'image',
                title: 'Image',
                type: 'image',
                options: { hotspot: true },
              },
              {
                name: 'text',
                title: 'Text',
                type: 'text',
              },
              {
                name: 'engtext',
                title: 'Eng Text',
                type: 'text',
              },

              {
                name: 'importance',
                title: 'Importance (lower number = more important)',
                type: 'number',
        
              },
              {
                name: 'show',
                title: 'Show testamonials',
                type: 'boolean',
                initialValue: true, // Set the default value to true
              },
            ],
          },
        ],
      },





      {
        name: 'delivery',
        title: 'Delivery',
        type: 'array',
        of: [
          {
            type: 'object',
            title: 'Delivery',
            fields: [
              {
                name: 'id',
                title: 'ID',
                type: 'string',
                readOnly: true,
                initialValue: () => `${Date.now()}`,
              },
              {
                name: 'name',
                title: 'Name',
                type: 'string',
              },
              {
                name: 'engname',
                title: 'Eng Name',
                type: 'string',
              },
          
            
              
              {
                name: 'text',
                title: 'Text',
                type: 'text',
              },
              {
                name: 'engtext',
                title: 'Eng Text',
                type: 'text',
              },



              {
                name: 'preselected',
                title: 'Is the option preselected',
                type: 'boolean',
                initialValue: true,
              },
              {
                name: 'needdeliveryinfo',
                title: 'Needs delivery info',
                type: 'boolean',
                initialValue: true,
              },

              {
                name: 'importance',
                title: 'Importance (lower number = more important)',
                type: 'number',
        
              },

              {
                name: 'show',
                title: 'Show testamonials',
                type: 'boolean',
                initialValue: true, // Set the default value to true
              },
            ],
          },
        ],
      },


      //delivery prices


      {
        name: 'importance',
        title: 'Importance (lower number = more important)',
        type: 'number',

      },

      {
        name: 'popular',
        title: 'Is it a popular option',
        type: 'boolean',
        initialValue: false, // Set the default value to true
      },

      {
        name: 'show',
        title: 'Show Type',
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