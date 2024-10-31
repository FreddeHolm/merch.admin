export default {
  name: 'announcements',
  title: 'Announcements',
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
        return `announcements-${Date.now()}`;
      },
    },
    {
      name: 'text1',
      title: 'Text row 1',
      type: 'string',
    },
    {
      name: 'text1eng',
      title: 'ENGLISH Text row 1',
      type: 'string',
    },

    {
      name: 'text2',
      title: 'Text row 2',
      type: 'string',
    },
    {
      name: 'text2eng',
      title: 'ENGLISH Text row 2',
      type: 'string',
    },

    {
      name: 'bgcolor',
      title: 'Background Color',
      type: 'string',
      description: 'Enter a color code (Default-red: #ce2e33 ) #e0962a (black: #000000)',
      
    },

    {
      name: 'textcolor',
      title: 'Text Color',
      type: 'string',
      description: 'Enter a color code or name,  #282828 (Default-white: #FFFFFF )  (black: #000000)',
      
    },

    {
      name: 'showannouncement',
      title: 'Show Announcement',
      type: 'boolean',
      initialValue: true, // Set the default value to true
    },
    
  ],
};