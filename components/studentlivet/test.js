const cities = [ 
  //Länkar
//TODO: Kolla kartan på denna: https://sv.wikipedia.org/wiki/H%C3%B6gskolor_och_universitet_i_Sverige

  //https://sv.wikipedia.org/wiki/Lista_%C3%B6ver_universitet_och_h%C3%B6gskolor_i_Sverige
  //https://sv.wikipedia.org/wiki/Sveriges_universitets-_och_h%C3%B6gskolef%C3%B6rbund
  
  /* Scoope:
  //Universitet, Större högskolor och ställen med overaller
  Inte vara komplett universitetshistoria och detaljerad info, snarare nav för att hitta universitet, studentverksamheter och kårhus

  */
  { name: 'Stockholm', coordinates: [18.0686, 59.3293], skoltyp: 'universitet', sponsring: [""], universitet: ["Kungliga Tekniska högskolan - KTH", "Stockholms universitet", "Karolinska Institutet", "Handelshögskolan"], högskola: ["Södertörns högskola"]},
    { name: 'Göteborg', coordinates: [11.9746, 57.7089], skoltyp: 'universitet', sponsring: [""], universitet: ["Chalmers tekniska högskola", "Göteborgs universitet"],  högskola: [""] },
    //{ name: 'Stockholmsheeskebabasdasdsadad', coordinates: [15.0686, 58.3293], skoltyp: 'universitet', sponsring: [""], universitet: ["KTH", "Teknikskolan"], högskola: [""]},
    { name: 'Uppsala', coordinates: [17.6389, 59.8586], skoltyp: 'universitet', sponsring: [""], universitet: ["Uppsala universitet", "Sveriges lantbruksuniversitet"], högskola: [""] },
    { name: 'Linköping', coordinates: [15.6180, 58.4108], skoltyp: 'universitet', sponsring: [""], universitet: ["Linköpings universitet", ], högskola: [""] },
    { name: 'Norrköping', coordinates: [16.1864, 58.5878], skoltyp: 'universitet', sponsring: [""], universitet: ["Linköpings universitet", ], högskola: [""] },
    { name: 'Umeå', coordinates: [20.0597, 63.8258], skoltyp: 'universitet', sponsring: [""], universitet: ["Umeå universitet", "Sveriges lantbruksuniversitet"], högskola: [""] },
    { name: 'Örnsköldsvik', coordinates: [18.7135, 63.2909], skoltyp: 'universitet', sponsring: [""], universitet: ["Umeå universitet",], högskola: [""] },

    
    { name: 'Växjö', coordinates: [14.8059, 56.8777], skoltyp: 'universitet', sponsring: [""], universitet: ["Linnéuniversitetet",], högskola: [""] },
    { name: 'Kalmar', coordinates: [15.9663, 56.6743], skoltyp: 'universitet', sponsring: [""], universitet: ["Linnéuniversitetet",], högskola: [""] },
    { name: 'Lund', coordinates: [13.2913, 55.9058], skoltyp: 'universitet', sponsring: [""], universitet: ["Lunds universitet"], högskola: [""] },
    { name: 'Helsingborg', coordinates: [12.6734, 56.2702], skoltyp: 'universitet', sponsring: [""], universitet: ["Lunds universitet"], högskola: [""] },
    //{ name: 'Ljungbyhed', coordinates: [13.3580, 56.1234], skoltyp: 'universitet', sponsring: [""], universitet: ["Lunds universitet"], högskola: [""] }, //https://www.lu.se/om-universitetet/universitetet-i-korthet/har-finns-vi

    { name: 'Malmö', coordinates: [13.0878, 55.6048], skoltyp: 'universitet', sponsring: [""], universitet: ["Malmö universitet", "Lunds universitet", "Sveriges lantbruksuniversitet"], högskola: [""] },
    { name: 'Karlstad', coordinates: [13.5036, 59.3798], skoltyp: 'universitet', sponsring: [""], universitet: ["Karlstads universitet",], högskola: [""] }, //Ovvefärger
    { name: 'Arvika', coordinates: [12.6044, 59.6557], skoltyp: 'universitet', sponsring: [""], universitet: ["Karlstads universitet",], högskola: [""] },


    { name: 'Sundsvall', coordinates: [17.3120, 62.3921], skoltyp: 'universitet', sponsring: [""], universitet: ["Mittuniversitetet",], högskola: [""] },
    { name: 'Östersund', coordinates: [14.6360, 63.1798], skoltyp: 'universitet', sponsring: [""], universitet: ["Mittuniversitetet",], högskola: [""] },
    { name: 'Luleå', coordinates: [22.0522, 65.6848], skoltyp: 'universitet', sponsring: [""], universitet: ["Luleå tekniska universitet",], högskola: [""] },//https://sv.wikipedia.org/wiki/Lule%C3%A5_tekniska_universitet
    { name: 'Piteå', coordinates: [21.4863, 65.3174], skoltyp: 'universitet', sponsring: [""], universitet: ["Luleå tekniska universitet",], högskola: [""] },
    { name: 'Kiruna', coordinates: [20.2257, 67.8557], skoltyp: 'universitet', sponsring: [""], universitet: ["Luleå tekniska universitet",], högskola: [""] },
    { name: 'Skellefteå', coordinates: [20.9522, 64.7507], skoltyp: 'universitet', sponsring: [""], universitet: ["Luleå tekniska universitet",], högskola: [""] },

    
    { name: 'Eskilstuna', coordinates: [16.5090, 59.3713], skoltyp: 'universitet', sponsring: [""], universitet: ["Mälardalens universitet",], högskola: [""] },
    { name: 'Västerås', coordinates: [16.5452, 59.6595], skoltyp: 'universitet', sponsring: [""], universitet: ["Mälardalens universitet", ], högskola: [""] },
    { name: 'Örebro', coordinates: [15.2020, 59.2753], skoltyp: 'universitet', sponsring: [""], universitet: ["Örebro universitet", ], högskola: [""] }, //https://sv.wikipedia.org/wiki/%C3%96rebro_universitet
    { name: 'Borås', coordinates: [12.9194, 57.7210], skoltyp: 'universitet', sponsring: [""], universitet: [""], högskola: ["Högskolan i Borås"] },
    { name: 'Jönköping', coordinates: [14.1690, 57.7826], skoltyp: 'universitet', sponsring: [""], universitet: [""], högskola: ["Högskolan i Jönköping"] },// ovve färger https://sv.wikipedia.org/wiki/H%C3%B6gskolan_i_J%C3%B6nk%C3%B6ping
    { name: 'Gävle', coordinates: [17.1410, 60.6745], skoltyp: 'universitet', sponsring: [""], universitet: [""], högskola: ["Högskolan i Gävle"] },
    { name: 'Falun', coordinates: [15.6236, 60.7065], skoltyp: 'universitet', sponsring: [""], universitet: [""], högskola: ["Högskolan Dalarna"] },
    { name: 'Borlänge', coordinates: [15.3223, 60.3840], skoltyp: 'universitet', sponsring: [""], universitet: [""], högskola: ["Högskolan Dalarna"] },

    { name: 'Halmstad', coordinates: [12.8557, 56.6745], skoltyp: 'universitet', sponsring: [""], universitet: [""], högskola: ["Högskolan i Halmstad"] },
    { name: 'Kristianstad', coordinates: [14.1572, 56.0312], skoltyp: 'universitet', sponsring: [""], universitet: [""], högskola: ["Högskolan Kristianstad"] },
    { name: 'Trollhättan', coordinates: [12.3082, 58.2829], skoltyp: 'universitet', sponsring: [""], universitet: [""], högskola: ["Högskolan Väst"] },
    { name: 'Skövde', coordinates: [13.8456, 58.3896], skoltyp: 'universitet', sponsring: [""], universitet: [""], högskola: ["Högskolan i Skövde"] },
    { name: 'Karlskrona', coordinates: [15.5853, 56.1614], skoltyp: 'universitet', sponsring: [""], universitet: [""], högskola: ["Blekinge tekniska högskola"] },
    { name: 'Karlshamn', coordinates: [14.8640, 56.1706], skoltyp: 'universitet', sponsring: [""], universitet: [""], högskola: ["Högskolan i Skövde"] },
    { name: 'Gotland', coordinates: [18.2952, 57.6404], skoltyp: 'universitet', sponsring: [""], universitet: ["Uppsala universitet"], högskola: [""] },
  
    // Add more cities here
  ];
  


/*Ej inkluderade från: https://sv.wikipedia.org/wiki/Lista_%C3%B6ver_universitet_och_h%C3%B6gskolor_i_Sverige


Privata högskolor med rätt att utfärda examina på grund- och avancerad nivå
Beckmans designhögskola (BDH)
Gammelkroppa skogsskola (GSS)
Johannelunds teologiska högskola (JTH)
Newmaninstitutet (NI)
Röda korsets högskola (RKH)
Sophiahemmet Högskola (SHH)
Stockholms Musikpedagogiska Institut (SMI)
Enskilda Högskolan Stockholm (EHS)
Örebro teologiska högskola (ÖTH)
Privata högskolor med enbart examensrätt för psykoterapeututbildning
Svenska Institutet för kognitiv psykoterapi
Högskolan Evidens
Ericastiftelsen
Förbundet S:t Lukas utbildningsinstitut (luk)
Skandinaviens akademi för psykoterapiutbildning (sapu)
Lärosäten med mellanstatlig huvudman
Nordiska högskolan för folkhälsovetenskap (NHV)
World Maritime University (WMU)


*/


  /* Ej inkluderade från: https://sv.wikipedia.org/wiki/Sveriges_universitets-_och_h%C3%B6gskolef%C3%B6rbund

https://sv.wikipedia.org/wiki/Enskilda_h%C3%B6gskolan_Stockholm
https://sv.wikipedia.org/wiki/F%C3%B6rsvarsh%C3%B6gskolan,_Sverige
https://sv.wikipedia.org/wiki/Gymnastik-_och_idrottsh%C3%B6gskolan
https://sv.wikipedia.org/wiki/Konstfack
https://sv.wikipedia.org/wiki/Kungliga_Konsth%C3%B6gskolan
https://sv.wikipedia.org/wiki/Kungliga_Musikh%C3%B6gskolan_i_Stockholm
https://sv.wikipedia.org/wiki/Marie_Cederschi%C3%B6ld_h%C3%B6gskola
https://sv.wikipedia.org/wiki/R%C3%B6da_Korsets_H%C3%B6gskola
https://sv.wikipedia.org/wiki/Sophiahemmet_h%C3%B6gskola
https://sv.wikipedia.org/wiki/Stockholms_konstn%C3%A4rliga_h%C3%B6gskola

  */