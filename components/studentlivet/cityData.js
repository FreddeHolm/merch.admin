const cities = [
  { name: 'Stockholm', coordinates: [18.0686, 59.3293], skoltyp: 'universitet', sponsring: [""], universitet: ["KTH", "Stockholms Universitet, Södertörns högskola, Karolinska Institutet, Handelshögskolan"], högskola: [""]},
  { name: 'Göteborg', coordinates: [11.9746, 57.7089], skoltyp: 'universitet', sponsring: [""], universitet: ["Chalmers", "Göteborgs universitet"],  högskola: [""] },
  { name: 'Uppsala', coordinates: [17.6389, 59.8586], skoltyp: 'universitet', sponsring: [""], universitet: ["KTH", "Stockholms Universitet, Södertörns högskola, Karolinska Institutet, Handelshögskolan"], högskola: [""] },
  { name: 'Linköping', coordinates: [15.6180, 58.4108], skoltyp: 'universitet', sponsring: [""], universitet: ["KTH", "Stockholms Universitet, Södertörns högskola, Karolinska Institutet, Handelshögskolan"], högskola: [""] },
  { name: 'Norrköping', coordinates: [16.1864, 58.5878], skoltyp: 'universitet', sponsring: [""], universitet: ["KTH", "Stockholms Universitet, Södertörns högskola, Karolinska Institutet, Handelshögskolan"], högskola: [""] },
  { name: 'Umeå', coordinates: [20.0597, 63.8258], skoltyp: 'universitet', sponsring: [""], universitet: ["KTH", "Stockholms Universitet, Södertörns högskola, Karolinska Institutet, Handelshögskolan"], högskola: [""] },
  { name: 'Växjö', coordinates: [14.8059, 56.8777], skoltyp: 'universitet', sponsring: [""], universitet: ["KTH", "Stockholms Universitet, Södertörns högskola, Karolinska Institutet, Handelshögskolan"], högskola: [""] },
  { name: 'Kalmar', coordinates: [15.9663, 56.6743], skoltyp: 'universitet', sponsring: [""], universitet: ["KTH", "Stockholms Universitet, Södertörns högskola, Karolinska Institutet, Handelshögskolan"], högskola: [""] },
  { name: 'Lund', coordinates: [13.2913, 55.7058], skoltyp: 'universitet', sponsring: [""], universitet: ["Lunds universitet"], högskola: [""] },
  { name: 'Malmö', coordinates: [13.0878, 55.6048], skoltyp: 'universitet', sponsring: [""], universitet: ["Malmö universitet"], högskola: [""] },
  { name: 'Karlstad', coordinates: [13.5036, 59.3798], skoltyp: 'universitet', sponsring: [""], universitet: ["Karlstads universitet"], högskola: [""] },
  { name: 'Sundsvall', coordinates: [17.3120, 62.3921], skoltyp: 'universitet', sponsring: [""], universitet: ["Mittuniversitetet"], högskola: [""] },
  { name: 'Östersund', coordinates: [14.6360, 63.1798], skoltyp: 'universitet', sponsring: [""], universitet: ["Mittuniversitetet"], högskola: [""] },
  { name: 'Luleå', coordinates: [22.0522, 65.5848], skoltyp: 'universitet', sponsring: [""], universitet: ["Luleå tekniska universitet"], högskola: [""] },
  { name: 'Eskilstuna', coordinates: [16.5090, 59.3713], skoltyp: 'universitet', sponsring: [""], universitet: ["Mälardalens universitet"], högskola: [""] },
  { name: 'Västerås', coordinates: [16.5452, 59.6595], skoltyp: 'universitet', sponsring: [""], universitet: ["Mälardalens universitet"], högskola: [""] },
  { name: 'Örebro', coordinates: [15.2020, 59.2753], skoltyp: 'universitet', sponsring: [""], universitet: ["Örebro universitet"], högskola: [""] },
  { name: 'Borås', coordinates: [12.9194, 57.7210], skoltyp: 'universitet', sponsring: [""], universitet: ["Högskolan i Borås"], högskola: [""] },
  { name: 'Jönköping', coordinates: [14.1690, 57.7826], skoltyp: 'universitet', sponsring: [""], universitet: ["Jönköping University"], högskola: [""] },
  { name: 'Gävle', coordinates: [17.1410, 60.6745], skoltyp: 'universitet', sponsring: [""], universitet: ["Högskolan i Gävle"], högskola: [""] },
  { name: 'Falun', coordinates: [15.6236, 60.6065], skoltyp: 'universitet', sponsring: [""], universitet: ["Högskolan Dalarna"], högskola: [""] },
  { name: 'Borlänge', coordinates: [15.3223, 60.3840], skoltyp: 'universitet', sponsring: [""], universitet: ["Högskolan Dalarna"], högskola: [""] },
  { name: 'Halmstad', coordinates: [12.8557, 56.6745], skoltyp: 'universitet', sponsring: [""], universitet: ["Högskolan i Halmstad"], högskola: [""] },
  { name: 'Kristianstad', coordinates: [14.1572, 56.0312], skoltyp: 'universitet', sponsring: [""], universitet: ["Högskolan Kristianstad"], högskola: [""] },
  { name: 'Trollhättan', coordinates: [12.3082, 58.2829], skoltyp: 'universitet', sponsring: [""], universitet: ["Högskolan Väst"], högskola: [""] },
  { name: 'Skövde', coordinates: [13.8456, 58.3896], skoltyp: 'universitet', sponsring: [""], universitet: ["Högskolan i Skövde"], högskola: [""] },
  { name: 'Karlskrona', coordinates: [15.5853, 56.1614], skoltyp: 'universitet', sponsring: [""], universitet: ["Blekinge tekniska högskola"], högskola: [""] },
  { name: 'Karlshamn', coordinates: [14.8640, 56.1706], skoltyp: 'universitet', sponsring: [""], universitet: ["Blekinge tekniska högskola"], högskola: [""] },
  { name: 'Gotland', coordinates: [18.2952, 57.6404], skoltyp: 'universitet', sponsring: [""], universitet: ["Uppsala universitet Campus Gotland"], högskola: [""] },
  { name: 'Varberg', coordinates: [12.2508, 57.1056], skoltyp: 'universitet', sponsring: [""], universitet: [""], högskola: ["Campus Varberg"] },
  // Add more cities here
  ];
  
  export default cities;