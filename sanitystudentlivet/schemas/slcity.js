export default {
  name: 'slcity',
  title: 'slcity',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
        
      initialValue: () => {
      // Generate a unique ID using the current timestamp
      return `slcity-${Date.now()}`;
      },
    },
    {
      name: 'image',
      title: 'City Image',
      type: 'array',
      description: 'Optimerat för jpg, png och webp bilder',

      of: [{ type: 'image' }],
      options: {
        hotspot: true,
      },
    },
    {
      name: 'name',
      title: 'City Name',
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

    {
      name: 'long',
      title: 'Coordinates - longitude, ',
      description: '[XX.XX, xx.xx]',
      type: 'number',
    },

    {
      name: 'lat',
      title: 'Coordinates - latitude, ',
      description: '[xx.xx, XX.XX]',
      type: 'number',
    },

    {
      name: 'importance',
      title: 'Importance (1 is most important)',
      type: 'number',
      validation: (Rule) => Rule.integer().min(1).max(1000), // Set validation rules if needed
    },


    {
      name: 'show',
      title: 'Show City',
      type: 'boolean',
      initialValue: true, // Set the default value to true
    },

  ],
  initialValue: () => ({
    id: String(Date.now()),
  }),
};