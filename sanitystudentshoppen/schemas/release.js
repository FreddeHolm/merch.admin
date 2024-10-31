export default {
  name: 'release',
  title: 'Release ',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
      
      initialValue: () => {
      // Generate a unique ID using the current timestamp
      return `release-${Date.now()}`;
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
      title: 'Rubrik',
      type: 'string',
      
    },
    {
      name: 'formurl',
      title: 'Form url - dela länken (ta bort /viewform?usp=sf_link )',
      description: 'länken given i google form (ta bort /viewform?usp=sf_link )',
      type: 'string',

    },


    {
      name: 'formheight',
      title: 'Height - Formulärets höjd, vid embedded ',
      description: 'höjden som står vid embedded länken',
      type: 'number',
      //hidden: true, // This hides the field in the Sanity Studio
    },

    {
      name: 'formclosedate',
      title: 'Close Date',
      type: 'datetime',
      options: {
        dateFormat: 'DD-MM-YYYY', // Date and time format
        calendarTodayLabel: 'Today',
      },
    },


    {
      name: 'showform',
      title: 'Show Form',
      type: 'boolean',
      initialValue: false, // Set the default value to true
    },



    
   
  ],
  initialValue: () => ({
    id: String(Date.now()),
  }),
};