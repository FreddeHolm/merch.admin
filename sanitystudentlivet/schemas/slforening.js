export default {
  name: 'slforening',
  title: 'slforening',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
        
      initialValue: () => {
      // Generate a unique ID using the current timestamp
      return `sluniversities-${Date.now()}`;
      },
    },
    {
      name: 'usefacebookprofilepicture',
      title: 'Use Facebook profile picture as profile pic',
      type: 'boolean',
      initialValue: true, // Set the default value to true
    },    
    {
      name: 'facebookprofilelink',
      title: 'Link to facebook profile',
      description: 'Example: Either https://www.facebook.com/studentshoppen or studentshoppen',
      type: 'string',  
      hidden: ({ parent }) => !parent.usefacebookprofilepicture,
    },
    {
      name: 'profileimagelink',
      title: 'Bildlänk profilbild',
      description: 'Klistra in bildadress eller ladda upp logga nedan',
      type: 'string',  
      hidden: ({ parent }) => parent.usefacebookprofilepicture,
    },
    {
      name: 'logo',
      title: 'Profile Image',
      type: 'array',
      description: 'Optimerat för jpg, png och webp bilder',

      of: [{ type: 'image' }],
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => parent.usefacebookprofilepicture,
    },
    {
      name: 'bgimage',
      title: 'Uni bg Image',
      type: 'array',
      description: 'Optimerat för jpg, png och webp bilder',

      of: [{ type: 'image' }],
      options: {
        hotspot: true,
      },
    },
    {
      name: 'coverimage',
      title: 'Uni cover Image',
      type: 'array',
      description: 'Optimerat för jpg, png och webp bilder',

      of: [{ type: 'image' }],
      options: {
        hotspot: true,
      },
    },
    {
      name: 'contentmanager',
      title: 'Contentmanager (epost adressen till hanteraren) ',
      description: 'Kom ihåg att klicka enter efter varje tag och använd ej åäö.',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },

    {
      name: 'belongsto',
      title: 'Tillhörande till vilket kårhus/till vilken skola',
      type: 'string',
    },

    {
      name: 'newbelongsto',
      title: 'New Belongsto',
      description: "newbelongsto",
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'sluniversities' }, { type: 'slkarhus' }, { type: 'slsektioner' }, { type: 'slforening' }],
          options: {
            disableNew: true,
            filter: 'show == true',
          },
        },
      ],
    },

    {
      name: 'name',
      title: 'Uni Name/Underrubrik',
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
      name: 'subname',
      title: 'Underrubrik',
      type: 'string',  
    },

    {
      name: 'location',
      title: 'Location',
      type: 'array',
      of: [{
        type: 'reference',
        to: [{ type: 'slcity' }],
        options: {
          disableNew: true,
          filter: 'show == true',
        },
      }],
    },

 //Helsingborg
 
    /*{
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Universitet', value: 'university' },
          { title: 'Högskola', value: 'highschool' },
        ],
      },
    },*/

    {
      name: 'contactinfo',
      title: 'Contact Information',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'service',
              title: 'Service',
              type: 'string',
              options: {
                list: [
                  { title: 'Telefon', value: 'Telefon' },
                  { title: 'Mail', value: 'Mail' },
                  { title: 'Adress', value: 'Adress' },
                  { title: 'Hemsida', value: 'Hemsida' },
                  { title: 'Twitter/X', value: 'Twitter' },
                  { title: 'Instagram', value: 'Instagram' },
                  { title: 'YouTube', value: 'Youtube' },
                  { title: 'Facebook', value: 'Facebook' },
                  { title: 'Linkedin', value: 'Linkedin' },
                  { title: 'TikTok', value: 'TikTok' },
                  { title: 'Other', value: 'Other' },
                  // Add more predefined services as needed
                ],
              },
            },
            {
              name: 'link',
              title: 'Link',
              type: 'string',
              hidden: ({ parent }) => parent.service === 'Adress',
              description: 'This is the link to the service.'
            },
            {
              name: 'customLinkName',
              title: 'Custom Link Name (optional)',
              type: 'string',
              description: 'Hur ska länken se ut? , tex @minovve (endast visuellt)',
              hidden: ({ parent }) => parent.service === 'Adress',
              default: ({ parent }) => {
                if (parent.service !== 'Other') {
                  // Set the default value to the title when service is not "Other"
                  return parent.service;
                }
                return ''; // Default to an empty string when "Other" is selected
              },
            },
            {
              name: 'adressrad',
              title: 'Adress rad',
              type: 'string',
              description: 'Tex Kungsgatan 1',
              hidden: ({ parent }) => parent.service !== 'Adress',
              default: ({ parent }) => {
                if (parent.service !== 'Adress') {
                  // Set the default value to the title when service is not "Other"
                  return parent.service;
                }
                return ''; // Default to an empty string when "Other" is selected
              },
            },
            {
              name: 'ortrad',
              title: 'Ort rad',
              type: 'string',
              description: 'Tex 12345 Stockholm',
              hidden: ({ parent }) => parent.service !== 'Adress',
              default: ({ parent }) => {
                if (parent.service !== 'Adress') {
                  // Set the default value to the title when service is not "Other"
                  return parent.service;
                }
                return ''; // Default to an empty string when "Other" is selected
              },
            },
            /*{
              name: 'customLinkName',
              title: 'Custom Link Name',
              type: 'string',
              description: 'Enter a custom name for the link if you selected "Other" as the service.',
              hidden: ({ parent }) => parent.service !== 'Other',
              default: ({ parent }) => {
                if (parent.service !== 'Other') {
                  // Set the default value to the title when service is not "Other"
                  return parent.service;
                }
                return ''; // Default to an empty string when "Other" is selected
              },
            },*/
            // Add other fields specific to contact information
          ],
        },
      ],
    },


    {
      name: 'mapsurl',
      title: 'Google maps embedded url',
      description: 'I maps: dela>Embedded>kopiera html - Ta hela länkenfiltrerar automatiskt',
      type: 'string',
      
    },


    {
      name: 'importance',
      title: 'Importance (1 is most important)',
      type: 'number',
      validation: (Rule) => Rule.integer().min(1).max(1000), // Set validation rules if needed
    },


    {
      name: 'reviewed',
      title: 'reviewed and approved entry',
      type: 'boolean',
      initialValue: false, // Set the default value to true
    },

    {
      name: 'exportedtoproduction',
      title: 'exported to production (do not change manualy)',
      type: 'boolean',
      initialValue: false, // Set the default value to true
    },

    {
      name: 'show',
      title: 'Show',
      type: 'boolean',
      initialValue: true, // Set the default value to true
    },


    {
      name: 'description',
      title: 'Description',
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



/* TODO in admin center

ENDAST VISA
//location
//belongsto

Förening: 
//usefacebookprofilepicture
//profileimagelink
//facebookprofilelink
//logo
------bgimage
//coverimage
//name
//subname
//contactinfo
//mapsurl
description


Kårhus: ÄVEN
//issektion 
belongsto -även till förening? 

_________________________
For the ovve:
utbildning
name
?????ovveforening
?????ovveskola
ovvecolor
ovvetype
ovveaddons - även för alla dessa
color
ovvedetails


universitet: 
category
*/