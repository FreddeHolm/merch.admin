export default {
  name: 'banner',
  title: 'Banner',
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
        return `banner-${Date.now()}`;
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'buttonText1',
      title: 'ButtonText1',
      type: 'string',
    },
    {
      name: 'buttonText1eng',
      title: 'ENGLISH ButtonText1',
      type: 'string',
    },
    {
      name: 'buttonText2',
      title: 'ButtonText2',
      type: 'string',
    },
    {
      name: 'buttonText2eng',
      title: 'ENGLISHButtonText2',
      type: 'string',
    },
    {
      name: 'product1',
      title: 'ProductLink1',
      type: 'string',
    },
    {
      name: 'product2',
      title: 'ProductLink2',
      type: 'string',
    },
    {
      name: 'topText',
      title: 'TopText',
      type: 'string',
    },
    {
      name: 'topTexteng',
      title: 'ENGLISH TopText',
      type: 'string',
    },
    {
      name: 'midLargeText',
      title: 'MidLargeText',
      type: 'string',
    },
    {
      name: 'midLargeTexteng',
      title: 'ENGLISH MidLargeText',
      type: 'string',
    },
    {
      name: 'bottomText',
      title: 'BottomText',
      type: 'string',
    },
    {
      name: 'bottomTexteng',
      title: 'ENGLISH BottomText',
      type: 'string',
    },
    {
      name: 'desc',
      title: 'Desc',
      type: 'string',
      description: "bottom right",
    },
    {
      name: 'desceng',
      title: 'ENGLISH Desc',
      type: 'string',
      description: "bottom right",
    },
    {
      name: 'backgroundcolor',
      title: 'backgroundcolor',
      type: 'string',
    },
    {
      name: 'buttonColor1',
      title: 'ButtonColor1',
      type: 'string',
    },
    {
      name: 'buttonColor2',
      title: 'ButtonColor2',
      type: 'string',
    },

  ],
};