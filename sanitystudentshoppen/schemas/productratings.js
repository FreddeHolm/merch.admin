export default {
    name: 'productratings',
    title: 'Product Ratings',
    type: 'document',
    fields: [
      {
        name: 'id',
        title: 'ID',
        type: 'string',
        validation: (Rule) => Rule.required(),
        
        initialValue: () => {
        // Generate a unique ID using the current timestamp
        return `rating-${Date.now()}`;
      },
      },
      
      {
        name: 'date',
        title: 'Date',
        type: 'date',
        options: {
          dateFormat: 'DD-MM-YYYY',  // Update the dateFormat option
          calendarTodayLabel: 'Today',
        },
        validation: (Rule) => Rule.required(),
        initialValue: () => new Date().toISOString().split('T')[0],
      },

      {
        name: 'productId',
        title: 'Product ID',
        type: 'string',
        options: {
          isHighlighted: true, // Highlight the field in the Studio UI
        },
      },
      {
        name: 'productImage',
        title: 'prodoct Image',
        type: 'array',
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
        name: 'age',
        title: 'Age',
        type: 'number',
      //validation: (Rule) => Rule.positive(), //.integer()
    },
      {
        name: 'email',
        title: 'Email',
        type: 'string',
      },
      {
        name: 'subscribeToNewsletter',
        title: 'Subscribe to Newsletter',
        type: 'boolean',
        options: {
    layout: 'checkbox',
  },
        initialValue: false,
      },
      {
        name: 'heading',
        title: 'Heading',
        type: 'string',
      },
      {
        name: 'details',
        title: 'Details',
        type: 'string',
      },
      {
        name: 'rating',
        title: 'Rating',
        type: 'number',
        validation: (Rule) => Rule.min(1).max(5),
      },
    ],

  };