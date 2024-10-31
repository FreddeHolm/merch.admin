import { Description } from "@material-ui/icons";

export default {
  name: 'slovve',
  title: 'slovve',
  type: 'document',
  fields: [
    { //Todo algoritm för ovve
      name: 'id',
      title: 'ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
        
      initialValue: () => {
      // Generate a unique ID using the current timestamp
      return `slovve-${Date.now()}`;
      },
    },
    {
      name: 'ovveimage',
      title: 'Ovve Image',
      type: 'array',
      description: 'Optimerat för jpg, png och webp bilder',

      of: [{ type: 'image' }],
      options: {
        hotspot: true,
      },
    },

    {
      name: 'newbelongsto',
      title: 'Tillhör uni, kår, sektion eller förening',
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
      name: 'name',
      title: 'name',
      description: 'sektion/förening Tex Mytec',
      type: 'string',
    },

    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name', // Use the name field to generate the slug
        maxLength: 90,
      },
      //validation: Rule => Rule.required()
    },

    {
      name: 'utbildning',
      title: 'utbildning',
      description: 'Tex Naturvetare och teknologer',
      type: 'string',
    },

    {
      name: 'ovveskola',
      title: 'ovveskola',
      description: 'Tex Mittuniversitetet',
      type: 'string',
      hidden: true,
    },
 /* */  

    {
      name: 'belongstoschool',
      title: 'Tillhör skola',
      description: 'Belongsto School',

      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'sluniversities' }],
          options: {
            disableNew: true,
            filter: 'show == true',
          },
        },
      ],
    },

   

 
   {
      name: 'ovvecity',
      title: 'Stad - ovvecity',
      description: 'Tex Sundsvall',
      type: 'string',
      hidden: true
    },
    /* old  */
    {
      name: 'location',
      title: 'Location - stad',
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

    /*{
      name: 'ovvecolor',
      title: 'ovve huvudfärg',
      description: 'Tex lila',
      type: 'string',
    },*/

    {
      name: 'outdated',
      title: 'Outdated',
      type: 'boolean',
      options: {
        layout: 'checkbox',
      },
      initialValue: false,
    },

    {
      name: 'ovvecolor',
      title: 'ovve huvudfärg',
      type: 'array', // Change the type to array
      of: [
        {
          type: 'string',
        },
      ],
      options: {
        list: [
          { title: 'Svart', value: 'Svart' },
          { title: 'Vit', value: 'Vit' },
          { title: 'Lila', value: 'Lila' },
          { title: 'Rosa', value: 'Rosa' },
          { title: 'Röd', value: 'Röd' },
          { title: 'Blå', value: 'Blå' },
          { title: 'Ljusblå', value: 'Ljusblå' },
          { title: 'Grön', value: 'Grön' },
          { title: 'Gul', value: 'Gul' },
          { title: 'Orange', value: 'Orange' },
          { title: 'Grå', value: 'Grå' },
          { title: 'Brun', value: 'Brun' },
        ],
      },
    }, 




    {
      name: 'ovvetype',
      title: 'ovvetype',
      type: 'string',
      options: {
        list: [
          { title: 'Normal ovve', value: 'normal' },
          
          
          { title: 'Hängslen ovve', value: 'hangslen' },
          



          
          { title: 'College Jacka ', value: 'collegejacka' },

          { title: 'Väst ', value: 'vast' },

          { title: 'Frack ', value: 'frack' },
          { title: 'Rock ', value: 'rock' },
          { title: 'Tshirt ', value: 'tshirt' },

          { title: 'Skjorta + slips', value: 'skjortaslips' },
          { title: 'Arbetsbyxor ', value: 'byxor' },
          { title: 'Kavaj ', value: 'kavaj' },
          { title: 'Morgonrock ', value: 'morgonrock' },


          { title: 'Ovve, Väst och Tröja', value: 'ovvevasttroja' },
          { title: 'Väst och rock', value: 'vastrock' },

          { title: 'Ovve, Väst och Basker', value: 'ovvevastbasker' },



          // college jacka med logga/sponsring  //{ title: 'College Jacka ', value: 'collegejacka' },
          // väst med logga/sponsring  //{ title: 'Väst ', value: 'vast' },
          // frack med logga/sponsring  //{ title: 'Frack ', value: 'frack' },
          // Rock med logga/sponsring  //{ title: 'Rock ', value: 'rock' },
          // Tshirt med logga/sponsring //{ title: 'Tshirt ', value: 'tshirt' },

          // Hoodie //{ title: 'Hoodie ', value: 'hoodie' },
          // Hoodie med logga/sponsring //{ title: 'Hoodie ', value: 'hoodie' },
          
          // skjorta //{ title: 'shirt ', value: 'shirt' },
          // skjorta med logga/sponsring //{ title: 'shirt ', value: 'shirt' },  

           // reflexväst //{ title: 'shirt ', value: 'shirt' },
          // varselbyxor  //{ title: 'shirt ', value: 'shirt' },  

          /* OLD
          { title: 'Normal ovve med 1 Revär', value: 'normal1revar' },
          { title: 'Normal ovve med 3 Revär ', value: 'normal3revar' },

          { title: 'Delad ovve', value: 'delad' },
          { title: 'Delad ovve med 1 Revär', value: 'delad1revar' },
          { title: 'Delad ovve med 3 Revär ', value: 'delad3revar' },
          
          { title: 'Hängslen ovve', value: 'hangslen' },
          { title: 'Hängslen ovve med 1 Revär', value: 'hangslen1revar' },
          { title: 'Hängslen ovve med 3 Revär ', value: 'hangslen3revar' },

         
          { title: 'Text ovve', value: 'text' },
          { title: 'Text ovve med 1 Revär', value: 'text1revar' },
          { title: 'Text ovve med 3 Revär ', value: 'text3revar' },


          { title: 'Färgade knän ovve', value: 'coloredknees' },

          { title: 'Färgade Ben/ärmar', value: 'coloredbenarmar' },
          
          */

        ],
        default: 'normal' // Set the default value to 'normal'
      },
    },

    {
      name: 'ovveaddons',
      title: 'Tillägg till ovven',
      type: 'array', // Change the type to array
      of: [
        {
          type: 'string',
        },
      ],
      options: {
        list: [
          { title: '1 Revär', value: '1revar' },
          { title: '3 Revär', value: '3revar' },
          { title: 'Revär Vänster', value: 'revarleft' },

          { title: 'delad ovve', value: 'delad' },
          { title: 'Ovve Text', value: 'text' },
          { title: 'Färgade knän ovve', value: 'coloredknees' },
          { title: 'Färgade Ben', value: 'coloredlegs' },
          { title: 'Färgade Armar', value: 'coloredarms' },
          { title: 'Sträckade Armar', value: 'stripedarms' },
          
          { title: 'Revär på Armar', value: 'revararmar' },
          { title: 'Schackfärgade Armar', value: 'chessarms' },

          
          { title: 'Ovve Flammor', value: 'flames' },

        ],
      },

      hidden: ({ document }) => {
        const ovvetype = document.ovvetype;
        return !(ovvetype && ovvetype.includes('normal') || ovvetype && ovvetype.includes('hangslen'));
      },
    }, 



    {
      name: 'finisheddesignsname',
      title: 'Färdiga designers namn',
      description: 'Tex sexistenz (för ovvevasttroja_sexistenz)',
      type: 'string',
      hidden: ({ document }) => {
        const ovveaddons = document.ovveaddons;
        const ovvetype = document.ovvetype;
        return !(ovvetype && ovvetype.includes('ovvevastbasker') && ovvetype.includes('vastrock')&& ovvetype.includes('ovvevasttroja')
      );
      },
    },



    {
      name: 'clothesaddons',
      title: 'Kläder tillägg',
      type: 'array', // Change the type to array
      of: [
        {
          type: 'string',
        },
      ],
      options: {
        list: [
          { title: 'Secondary Color', value: 'secondarycolor' }, //2
          { title: 'Neck color', value: 'neck' }, //3
          { title: 'Right Top Pocket', value: 'righttoppocket' }, //4
          { title: 'Right Bottom Pocket', value: 'rightbottompocket' }, //5
          { title: 'Left Bottom Pocket', value: 'leftbottompocket' },//6
          { title: 'Tie Color', value: 'tie' }, //8
  
        ],
      },
  
      hidden: ({ document }) => {
        const ovvetype = document.ovvetype;
        return (ovvetype && ovvetype.includes('normal') || ovvetype && ovvetype.includes('hangslen'));
      },
    }, 
  


    
    {
      name: 'customimageoverall',
      title: 'Bildlänk till custom bild',
      description: ' skrib tex ovvevasttroja_sexistenz.png  (full länk: /assets/studentlivet/ickeovve/fullimages/ovvevasttroja_sexistenz.png)',
      type: 'string',
    },

    {
      name: 'color',
      title: 'Ovve färg/ color',
      description: 'Tex #800080',
      type: 'string',
    },

// #region 2 dealad ovve 
    { 
      name: 'deladleftarm',
      title: 'Delad färg vänster arm',
      description: 'Tex #800080',
      type: 'string',
      hidden: ({ document }) => {
        const ovveaddons = document.ovveaddons;
        const ovvetype = document.ovvetype;
        return !(ovveaddons && ovveaddons.includes('delad') &&
        ovvetype && ovvetype.includes('normal') 
      );
      },
      prepare: () => ({ color2: null }), // Set the value to null when hidden
    },
    { 
      name: 'deladleftleg',
      title: 'Delad färg vänster ben',
      description: 'Tex #800080',
      type: 'string',
      hidden: ({ document }) => {
        const ovveaddons = document.ovveaddons;
        const ovvetype = document.ovvetype;
        return !(ovveaddons && ovveaddons.includes('delad')&&
        (ovvetype && ovvetype.includes('normal') || ovvetype && ovvetype.includes('hangslen')));
      },
      prepare: () => ({ color2: null }), // Set the value to null when hidden
    },
    { 
      name: 'deladrightarm',
      title: 'Delad färg höger arm',
      description: 'Tex #800080',
      type: 'string',
      hidden: ({ document }) => {
        const ovveaddons = document.ovveaddons;
        const ovvetype = document.ovvetype;
        return !(ovveaddons && ovveaddons.includes('delad')&&
        ovvetype && ovvetype.includes('normal') );
      },
      prepare: () => ({ color2: null }), // Set the value to null when hidden
    },
    { 
      name: 'deladrightleg',
      title: 'Delad färg höger ben',
      description: 'Tex #800080',
      type: 'string',
      hidden: ({ document }) => {
        const ovveaddons = document.ovveaddons;
        const ovvetype = document.ovvetype;
        return !(ovveaddons && ovveaddons.includes('delad')&&
        (ovvetype && ovvetype.includes('normal') || ovvetype && ovvetype.includes('hangslen')));
      },
      prepare: () => ({ color2: null }), // Set the value to null when hidden
    },
// #endregion 2 dealad ovve





{ 
      name: 'revararmarleft',
      title: 'Revär armar vänster färg',
      description: 'Tex #800080',
      type: 'string',
      hidden: ({ document }) => {
        const ovveaddons = document.ovveaddons;
        const ovvetype = document.ovvetype;
        return !(ovveaddons && ovveaddons.includes('revararmar')&&
        ovvetype && ovvetype.includes('normal') );
      },
      prepare: () => ({ color2: null }), // Set the value to null when hidden
    },
    { 
      name: 'revararmarright',
      title: 'Revär armar höger färg',
      description: 'Tex #800080',
      type: 'string',
      hidden: ({ document }) => {
        const ovveaddons = document.ovveaddons;
        const ovvetype = document.ovvetype;
        return !(ovveaddons && ovveaddons.includes('revararmar')&&
        ovvetype && ovvetype.includes('normal') );
      },
      prepare: () => ({ color2: null }), // Set the value to null when hidden
    },





/* Chess armar // schackarmar*/

    { 
      name: 'chessarmleft',
      title: 'Schack armar vänster färg',
      description: 'Tex #800080',
      type: 'string',
      hidden: ({ document }) => {
        const ovveaddons = document.ovveaddons;
        const ovvetype = document.ovvetype;
        return !(ovveaddons && ovveaddons.includes('chessarms')&&
        ovvetype && ovvetype.includes('normal') );
      },
    },
    { 
      name: 'chessarmright',
      title: 'Schack armar höger färg',
      description: 'Tex #800080',
      type: 'string',
      hidden: ({ document }) => {
        const ovveaddons = document.ovveaddons;
        const ovvetype = document.ovvetype;
        return !(ovveaddons && ovveaddons.includes('chessarms')&&
        ovvetype && ovvetype.includes('normal') );
      },
    },
    
    { 
      name: 'chessarmleftbase',
      title: 'Schack armar vänster färg basfärg (färg 2)',
      description: 'Tex #800080',
      type: 'string',
      hidden: ({ document }) => {
        const ovveaddons = document.ovveaddons;
        const ovvetype = document.ovvetype;
        return !(ovveaddons && ovveaddons.includes('chessarms')&&
        ovvetype && ovvetype.includes('normal') );
      },
    },
    { 
      name: 'chessarmrightbase',
      title: 'Schack armar höger färg basfärg (färg 2)',
      description: 'Tex #800080',
      type: 'string',
      hidden: ({ document }) => {
        const ovveaddons = document.ovveaddons;
        const ovvetype = document.ovvetype;
        return !(ovveaddons && ovveaddons.includes('chessarms')&&
        ovvetype && ovvetype.includes('normal') );
      },
      prepare: () => ({ color2: null }), // Set the value to null when hidden
    },





// #region Text ovve 
{ // för { title: 'Normal ovve med 1 Revär', value: 'normal1revar' },
  name: 'ovvetextcolor',
  title: 'Ovve "Namn" Vänster',
  description: 'Tex #800080',
  type: 'string',
  hidden: ({ document }) => {
    const ovveaddons = document.ovveaddons;
    const ovvetype = document.ovvetype;
    return !(ovveaddons && ovveaddons.includes('text')&&
    (ovvetype && ovvetype.includes('normal') || ovvetype && ovvetype.includes('hangslen')));
  },
  prepare: () => ({ ovvetextcolor: null }), // Set the value to null when hidden
},
{ // för { title: 'Normal ovve med 1 Revär', value: 'normal1revar' },
  name: 'ovvetextcolorright',
  title: 'Ovve "Namn" Höger',
  description: 'Tex #800080',
  type: 'string',
  hidden: ({ document }) => {
    const ovveaddons = document.ovveaddons;
    const ovvetype = document.ovvetype;
    return !(ovveaddons && ovveaddons.includes('text')&&
    (ovvetype && ovvetype.includes('normal') || ovvetype && ovvetype.includes('hangslen')));
  },
  prepare: () => ({ ovvetextcolor: null }), // Set the value to null when hidden
},
{ // för { title: 'Normal ovve med 1 Revär', value: 'normal1revar' },
  name: 'ovvetextright',
  title: 'Ovve "Text" Höger',
  description: 'Tex #800080',
  type: 'string',
  hidden: ({ document }) => {
    const ovveaddons = document.ovveaddons;
    const ovvetype = document.ovvetype;
    return !(ovveaddons && ovveaddons.includes('text')&&
    (ovvetype && ovvetype.includes('normal') || ovvetype && ovvetype.includes('hangslen')));
  },
  prepare: () => ({ ovvetextcolor: null }), // Set the value to null when hidden
},
{ // för { title: 'Normal ovve med 1 Revär', value: 'normal1revar' },
  name: 'ovvetextleft',
  title: 'Ovve "Text" Vänster',
  description: 'Tex #800080',
  type: 'string',
  hidden: ({ document }) => {
    const ovveaddons = document.ovveaddons;
    const ovvetype = document.ovvetype;
    return !(ovveaddons && ovveaddons.includes('text')&&
    (ovvetype && ovvetype.includes('normal') || ovvetype && ovvetype.includes('hangslen')));
  },
  prepare: () => ({ ovvetextcolor: null }), // Set the value to null when hidden
},
// #endregion Text ovve

// #region colored knees
{ // för { title: 'Normal ovve med 1 Revär', value: 'normal1revar' },
  name: 'kneecolor',
  title: 'Knee color ',
  description: 'Tex #800080',
  type: 'string',
  hidden: ({ document }) => {
    const ovveaddons = document.ovveaddons;
    const ovvetype = document.ovvetype;
    return !(ovveaddons && ovveaddons.includes('coloredknees')&&
    (ovvetype && ovvetype.includes('normal') || ovvetype && ovvetype.includes('hangslen')));
  },
  prepare: () => ({ kneecolor: null }), // Set the value to null when hidden
},
// #endregion Text ovve



// #region colored legs

{ // för { title: 'Normal ovve med 1 Revär', value: 'normal1revar' },
  name: 'leftlegcolor1',
  title: 'left Legcolor 1 ',
  description: 'Tex #800080',
  type: 'string',
  hidden: ({ document }) => {
    const ovveaddons = document.ovveaddons;
    const ovvetype = document.ovvetype;
    return !(ovveaddons && ovveaddons.includes('coloredlegs')&&
    (ovvetype && ovvetype.includes('normal') || ovvetype && ovvetype.includes('hangslen')));
  },
  prepare: () => ({ leftlegcolor1: null }), // Set the value to null when hidden
},

{ // för { title: 'Normal ovve med 1 Revär', value: 'normal1revar' },
  name: 'leftlegcolor2',
  title: 'left Legcolor 2',
  description: 'Tex #800080, om Legcolor 2 blank, enfärgat ben annars tigerfärg ',
  type: 'string',
  hidden: ({ document }) => {
    const ovveaddons = document.ovveaddons;
    const ovvetype = document.ovvetype;
    return !(ovveaddons && ovveaddons.includes('coloredlegs')&&
    (ovvetype && ovvetype.includes('normal') || ovvetype && ovvetype.includes('hangslen')));
  },
  prepare: () => ({ leftlegcolor2: null }), // Set the value to null when hidden
},


{ // för { title: 'Normal ovve med 1 Revär', value: 'normal1revar' },
  name: 'rightlegcolor1',
  title: 'right Legcolor 1 ',
  description: 'Tex #800080',
  type: 'string',
  hidden: ({ document }) => {
    const ovveaddons = document.ovveaddons;
    const ovvetype = document.ovvetype;
    return !(ovveaddons && ovveaddons.includes('coloredlegs')&&
    (ovvetype && ovvetype.includes('normal') || ovvetype && ovvetype.includes('hangslen')));
  },
  prepare: () => ({ rightlegcolor1: null }), // Set the value to null when hidden
},


{ // för { title: 'Normal ovve med 1 Revär', value: 'normal1revar' },
  name: 'rightlegcolor2',
  title: 'right Legcolor 2',
  description: 'Tex #800080, om Legcolor 2 blank, enfärgat ben annars tigerfärg ',
  type: 'string',
  hidden: ({ document }) => {
    const ovveaddons = document.ovveaddons;
    const ovvetype = document.ovvetype;
    return !(ovveaddons && ovveaddons.includes('coloredlegs')&&
    (ovvetype && ovvetype.includes('normal') || ovvetype && ovvetype.includes('hangslen')));
  },
  prepare: () => ({ rightlegcolor2: null }), // Set the value to null when hidden
},
// #endregion Text ovve



// #region colored arms
{ // för { title: 'Normal ovve med 1 Revär', value: 'normal1revar' },
  name: 'coloredleftarmar1',
  title: 'Vänster Armcolor 1 ',
  description: 'Tex #800080',
  type: 'string',
  hidden: ({ document }) => {
    const ovveaddons = document.ovveaddons;
    const ovvetype = document.ovvetype;
    return !(ovveaddons && ovveaddons.includes('coloredarms')&&
    ovvetype && ovvetype.includes('normal') );
  },
  prepare: () => ({ coloredrightarmar1: null }), // Set the value to null when hidden
},
{ // för { title: 'Normal ovve med 1 Revär', value: 'normal1revar' },
  name: 'coloredleftarmar2',
  title: 'Vänster Armcolor 2',
  description: 'Tex #800080, om Armcolor 2 blank, enfärgat arm annars tigerfärg ',
  type: 'string',
  hidden: ({ document }) => {
    const ovveaddons = document.ovveaddons;
    const ovvetype = document.ovvetype;
    return !(ovveaddons && ovveaddons.includes('coloredarms')&&
    ovvetype && ovvetype.includes('normal'));
  },
  prepare: () => ({ coloredleftarmar2: null }), // Set the value to null when hidden
},
{ // för { title: 'Normal ovve med 1 Revär', value: 'normal1revar' },
  name: 'coloredrightarmar1',
  title: 'Höger Armcolor 1 ',
  description: 'Tex #800080',
  type: 'string',
  hidden: ({ document }) => {
    const ovveaddons = document.ovveaddons;
    const ovvetype = document.ovvetype;
    return !(ovveaddons && ovveaddons.includes('coloredarms')&&
    ovvetype && ovvetype.includes('normal'));
  },
  prepare: () => ({ coloredrightarmar1: null }), // Set the value to null when hidden
},
{ // för { title: 'Normal ovve med 1 Revär', value: 'normal1revar' },
  name: 'coloredrightarmar2',
  title: 'Höger Armcolor 2',
  description: 'Tex #800080, om Armcolor 2 blank, enfärgat arm annars tigerfärg ',
  type: 'string',
  hidden: ({ document }) => {
    const ovveaddons = document.ovveaddons;
    const ovvetype = document.ovvetype;
    return !(ovveaddons && ovveaddons.includes('coloredarms')&&
    ovvetype && ovvetype.includes('normal'));
  },
  prepare: () => ({ coloredrightarmar2: null }), // Set the value to null when hidden
},
// #endregion Text ovve



// #region colored arms
{ // för { title: 'Normal ovve med 1 Revär', value: 'normal1revar' },
  name: 'stripedleftarm',
  title: 'Vänster Arm sträck ',
  description: 'Tex #800080',
  type: 'string',
  hidden: ({ document }) => {
    const ovveaddons = document.ovveaddons;
    const ovvetype = document.ovvetype;
    return !(ovveaddons && ovveaddons.includes('stripedarms')&&
    ovvetype && ovvetype.includes('normal'));
  },
  prepare: () => ({ stripedleftarm: null }), // Set the value to null when hidden
},
{ // för { title: 'Normal ovve med 1 Revär', value: 'normal1revar' },
  name: 'stripedrightarm',
  title: 'Höger Arm sträck ',
  description: 'Tex #800080',
  type: 'string',
  hidden: ({ document }) => {
    const ovveaddons = document.ovveaddons;
    const ovvetype = document.ovvetype;
    return !(ovveaddons && ovveaddons.includes('stripedarms')&&
    ovvetype && ovvetype.includes('normal'));
  },
  prepare: () => ({ stripedrightarm: null }), // Set the value to null when hidden
},
// #endregion Text ovve





// #region ovve 1 Revär
    { // för { title: 'Normal ovve med 1 Revär', value: 'normal1revar' },
      name: 'ovve1revarcolor',
      title: 'Revärfärg, enfärgad',
      description: 'Tex #800080',
      type: 'string',
      hidden: ({ document }) => {
        const ovveaddons = document.ovveaddons;
        const ovvetype = document.ovvetype;
        return !(ovveaddons && ovveaddons.includes('1revar')&&
        (ovvetype && ovvetype.includes('normal') || ovvetype && ovvetype.includes('hangslen')));
      },
      prepare: () => ({ ovve1revarcolor: null }), // Set the value to null when hidden
    },
// #endregion  ovve med 1 Revär



// #region  ovve med 3 Revär
            { // för { title: 'Normal ovve med 3 Revär ', value: 'normal3revar' }
                  name: 'ovve3revarcolor1',
                  title: 'Revärfärg, 1(vänster)',
                  description: 'Tex #800080',
                  type: 'string',
                  hidden: ({ document }) => {
                    const ovveaddons = document.ovveaddons;
                    const ovvetype = document.ovvetype;
                    return !(ovveaddons && ovveaddons.includes('3revar')&&
                    (ovvetype && ovvetype.includes('normal') || ovvetype && ovvetype.includes('hangslen')));
                  },
                  prepare: () => ({ ovve3revarcolor1: null }), // Set the value to null when hidden
                },
                { // för { title: 'Normal ovve med 3 Revär ', value: 'normal3revar' }
                  name: 'ovve3revarcolor2',
                  title: 'Revärfärg, 2(center)',
                  description: 'Tex #800080',
                  type: 'string',
                  hidden: ({ document }) => {
                    const ovveaddons = document.ovveaddons;
                    const ovvetype = document.ovvetype;
                    return !(ovveaddons && ovveaddons.includes('3revar')&&
                    (ovvetype && ovvetype.includes('normal') || ovvetype && ovvetype.includes('hangslen')));
                  },
                  prepare: () => ({ ovve3revarcolor2: null }), 
                },
                { // för { title: 'Normal ovve med 3 Revär ', value: 'normal3revar' }
                  name: 'ovve3revarcolor3',
                  title: 'Revärfärg, 3(höger)',
                  description: 'Tex #800080',
                  type: 'string',
                  hidden: ({ document }) => {
                    const ovveaddons = document.ovveaddons;
                    const ovvetype = document.ovvetype;
                    return !(ovveaddons && ovveaddons.includes('3revar')&&
                    (ovvetype && ovvetype.includes('normal') || ovvetype && ovvetype.includes('hangslen')));
                  },
                  prepare: () => ({ ovve3revarcolor3: null }), // Set the value to null when hidden
            },



            //VÄNSTER REVÄR 
            {
              name: 'copyrevarfromright',
              title: 'copy colors from right revär to left ',
              type: 'boolean',
              initialValue: false, // Set the default value to false
              hidden: ({ document }) => {
                const ovveaddons = document?.ovveaddons;
                const ovvetype = document?.ovvetype;
                return !(
                  (ovveaddons?.includes('1revar') && ovveaddons?.includes('revarleft') || 
                   ovveaddons?.includes('3revar') && ovveaddons?.includes('revarleft')) &&
                  (ovvetype?.includes('normal') || ovvetype?.includes('hangslen'))
                );
              },
            },

            { // för { title: 'Normal ovve med 3 Revär ', value: 'normal3revar' }
              name: 'ovverevarleftcolor1',
              title: 'Revärfärg vänster, 1(vänster)',
              description: 'Tex #800080',
              type: 'string',
              hidden: ({ document }) => {
                const ovveaddons = document.ovveaddons;
                const ovvetype = document.ovvetype;
                return !(ovveaddons && ovveaddons.includes('revarleft')&&
                (ovvetype && ovvetype.includes('normal') || ovvetype && ovvetype.includes('hangslen')));
              },
              prepare: () => ({ ovverevarleftcolor1: null }), // Set the value to null when hidden
            },
            { // för { title: 'Normal ovve med 3 Revär ', value: 'normal3revar' }
              name: 'ovverevarleftcolor2',
              title: 'Revärfärg vänster, 2(center)',
              description: 'Tex #800080',
              type: 'string',
              hidden: ({ document }) => {
                const ovveaddons = document.ovveaddons;
                const ovvetype = document.ovvetype;
                return !(ovveaddons && ovveaddons.includes('revarleft')&&
                (ovvetype && ovvetype.includes('normal') || ovvetype && ovvetype.includes('hangslen')));
              },
              prepare: () => ({ ovverevarleftcolor2: null }), 
            },
            { // för { title: 'Normal ovve med 3 Revär ', value: 'normal3revar' }
              name: 'ovverevarleftcolor3',
              title: 'Revärfärg vänster, 3(höger)',
              description: 'Tex #800080',
              type: 'string',
              hidden: ({ document }) => {
                const ovveaddons = document.ovveaddons;
                const ovvetype = document.ovvetype;
                return !(ovveaddons && ovveaddons.includes('revarleft')&&
                (ovvetype && ovvetype.includes('normal') || ovvetype && ovvetype.includes('hangslen')));
              },
              prepare: () => ({ ovverevarleftcolor3: null }), // Set the value to null when hidden
        },
   // #endregion  ovve med 3 Revär













  

  { 
    name: 'clothescolor2',
    title: 'Secondary color',
    description: 'För College Jacka, Frack, Skjorta',
    type: 'string',
    hidden: ({ document }) => {
      const ovveaddons = document.clothesaddons;
      const ovvetype = document.ovvetype;
      return !(ovveaddons && ovveaddons.includes('secondarycolor')&&
      !(ovvetype && ovvetype.includes('normal') || ovvetype && ovvetype.includes('hangslen')));
    },
    prepare: () => ({ clothescolor2: null }), // Set the value to null when hidden
  },


  { 
    name: 'clothescolor3',
    title: 'Neck color',
    description: 'För Frack, Rock, Skjorta',
    type: 'string',
    hidden: ({ document }) => {
      const ovveaddons = document.clothesaddons;
      const ovvetype = document.ovvetype;
      return !(ovveaddons && ovveaddons.includes('neck')&&
      !(ovvetype && ovvetype.includes('normal') || ovvetype && ovvetype.includes('hangslen')));
    },
    prepare: () => ({ clothescolor3: null }), // Set the value to null when hidden
  },

  { 
    name: 'clothescolor4',
    title: 'Right Top Pocket color',
    description: 'För Rock, Tshirt(optional), Skjorta(optional)',
    type: 'string',
    hidden: ({ document }) => {
      const ovveaddons = document.clothesaddons;
      const ovvetype = document.ovvetype;
      return !(ovveaddons && ovveaddons.includes('righttoppocket')&&
      !(ovvetype && ovvetype.includes('normal') || ovvetype && ovvetype.includes('hangslen')));
    },
    prepare: () => ({ clothescolor4: null }), // Set the value to null when hidden
  },


  { 
    name: 'clothescolor5',
    title: 'Right bottom pocket color',
    description: 'För Väst, Rock ',
    type: 'string',
    hidden: ({ document }) => {
      const ovveaddons = document.clothesaddons;
      const ovvetype = document.ovvetype;
      return !(ovveaddons && ovveaddons.includes('rightbottompocket')&&
      !(ovvetype && ovvetype.includes('normal') || ovvetype && ovvetype.includes('hangslen')));
    },
    prepare: () => ({ clothescolor5: null }), // Set the value to null when hidden
  },

  { 
    name: 'clothescolor6',
    title: 'Left bottom pocket color',
    description: 'För Väst, Rock',
    type: 'string',
    hidden: ({ document }) => {
      const ovveaddons = document.clothesaddons;
      const ovvetype = document.ovvetype;
      return !(ovveaddons && ovveaddons.includes('leftbottompocket')&&
      !(ovvetype && ovvetype.includes('normal') || ovvetype && ovvetype.includes('hangslen')));
    },
    prepare: () => ({ clothescolor6: null }), // Set the value to null when hidden
  },

  { 
    name: 'clothescolor8',
    title: 'Tie color',
    description: 'För Frack, Skjorta ',
    type: 'string',
    hidden: ({ document }) => {
      const ovveaddons = document.clothesaddons;
      const ovvetype = document.ovvetype;
      return !(ovveaddons && ovveaddons.includes('tie')&&
      !(ovvetype && ovvetype.includes('normal') || ovvetype && ovvetype.includes('hangslen')));
    },
    prepare: () => ({ clothescolor8: null }), // Set the value to null when hidden
  },







































// #region  Slips färg
{ // för { title: 'Normal ovve med 3 Revär ', value: 'normal3revar' }
  name: 'slipscolor',
  title: 'Slipsfärg',
  description: 'Tex #800080, om egen färg skriv owncolor',
  type: 'string',
  hidden: ({ document }) => {
    const ovvetype = document.ovvetype;
    return !(ovvetype === 'skjortaslips' );
  },
  prepare: () => ({ slipscolor: null }), // Set the value to null when hidden
},
// #endregion  ovve med 3 Revär









// #region  Byxor färg
{ 
  name: 'pantsnameleft',
  title: 'Byxor NAMN vänster',
  description: 'Tex #800080',
  type: 'string',
  hidden: ({ document }) => {
    const ovvetype = document.ovvetype;
    return !(ovvetype && ovvetype.includes('byxor') );
  },
},
{ 
  name: 'pantsnameright',
  title: 'Byxor NAMN Höger',
  description: 'Tex #800080',
  type: 'string',
  hidden: ({ document }) => {
    const ovvetype = document.ovvetype;
    return !(ovvetype && ovvetype.includes('byxor') );
  },
},
{ 
  name: 'pantstextleft',
  title: 'Byxor TEXT vänster',
  description: 'Tex #800080',
  type: 'string',
  hidden: ({ document }) => {
    const ovvetype = document.ovvetype;
    return !(ovvetype && ovvetype.includes('byxor') );
  },
},
{ 
  name: 'pantstextright',
  title: 'Byxor TEXT Höger',
  description: 'Tex #800080',
  type: 'string',
  hidden: ({ document }) => {
    const ovvetype = document.ovvetype;
    return !(ovvetype && ovvetype.includes('byxor') );
  },
},

// #endregion  ovve med 3 Revär








/*
    Ovve variant: (normal, rand på sidan, 
      rand med rand i på sidan, ett ben, smäck,
       rock, väst, ovve med hängslen ist för överdel, 
       tuxedo rock etc) 
    */





    /*
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 90,
      },
    },
    /**/

    {
      name: 'ovveimportance',
      title: 'Importance (1 is most important)',
      type: 'number',
      validation: (Rule) => Rule.integer().min(1).max(1000), // Set validation rules if needed
    },

/*
    {
      name: 'showovve',
      title: 'Show ovve',
      type: 'boolean',
      initialValue: true, // Set the default value to true
    },
*/

    {
      name: 'show',
      title: 'Show ovve',
      type: 'boolean',
      initialValue: true, // Set the default value to true
    },


    {
      name: 'ovvedetails',
      title: 'Ovve Beskrivning',
      description: 'Tex: lila ovve med gul linje',
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