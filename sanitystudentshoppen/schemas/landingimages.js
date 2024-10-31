export default {
  name: 'landingimages',
  title: 'Landingimages',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
      
      initialValue: () => {
      // Generate a unique ID using the current timestamp
      return `landing-${Date.now()}`;
    },
    },
    {
      name: 'imagelink',
      title: 'Landing image link',
      type: 'string',
      description: "public>assets>landingimages tex Landing page 2 studentshoppen.jpg",
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      description: "optimerat för aspect ratio 1:2.18 (tex 4032x1851), ändras under global.css .success-imgdiv-settings > div {",

      options: {
        hotspot: true,
      },
    },
    {
      name: 'imageeng',
      title: 'ENGLISH Image',
      type: 'image',
      description: "optimerat för aspect ratio 1:2.18 (tex 4032x1851), ändras under global.css .success-imgdiv-settings > div {",

      options: {
        hotspot: true,
      },
    },
    /*{
      name: 'name',
      title: 'Name',
      type: 'string',
    },*/


        // Add importance field
        {
          name: 'imageimportance',
          title: 'Importance',
          type: 'number',
          description: "(1 is most important and shows first)",
          validation: (Rule) => Rule.integer().min(1).max(1000), // Set validation rules if needed
        },



        {
          name: 'buttontext',
          title: 'ButtonText1',
          type: 'string',
          description: "knappen är gömd om ButtonText eller Button URL är tom",
        },
        {
          name: 'buttontexteng',
          title: 'ENGLISH ButtonText1',
          type: 'string',
          description: "knappen är gömd om ButtonText eller Button URL är tom",
        },


    {
      name: 'buttonurl',
      title: 'Button URL',
      type: 'string',
      description: "knappen är gömd om ButtonText eller Button URL är tom",

      //hidden: true, // This hides the field in the Sanity Studio
    },



    {
      name: 'showcaruselimage',
      title: 'Show Image',
      type: 'boolean',
      initialValue: true, // Set the default value to true
    },

    {
      name: 'minovve',
      title: 'Minovve',
      type: 'boolean',
      initialValue: false, // Set the default value to true
    },


    
    
  ],
  initialValue: () => ({
    id: String(Date.now()),
  }),
};