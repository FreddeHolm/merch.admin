/* VIDEO: https://www.youtube.com/watch?v=4mOkFXyxfsU&t=6536s*/

/*
TODO i FRAMTIDEN
Recension ladda upp bild
Reor som kategori
Bättre koll analytics
Avisering vid köp
Use browser language automatic i18next
Nya banners istället för 
Sälj skapa scarfs
Instagram banner

inköpspris
Multiselect (tex storlek och färg)




TODO I FRAMTIDEN STUDENTLIVET: 


-Beskrivningsikon om beskrivning finns: 
Så att man vet om man kan läsa mer
Kanske ta med en extra detalj marker/ikon också som är i textform


- TRIVIA game: fyllespel med statistik från sveriges studentliv ( typ hur många ovvar finns de i sundsvall, )



-Separat login länk tex /login istället för att göra det som component under admin
-Immortalize your ovve

-Nattliv/krogar (sponsring?)
-Jobb/praktik (sponsring?)
-Studentboenden (sponsring?)
-(event (kopling t orbi?) (sponsring?))
-specifik studentkultur? 
-övrigt
-Sökfunktion inne på adminsidan
-Trädstruktur för varje skola/kår och dess undersektioner

-Bygg om databasen???
-trädstruktur över varje skola (automatisk utifrån databas)
-Ny student, se hit/guide (Studentkultur, roliga evenemang etc)
-börja studera? se hit/ guide (för de som vill plugga, söka utbildningar, söka städer etc)

*/


EXPORT SANITY DATASET

cd sanitystudentshoppen
ELLER
cd sanitystudentlivet

sanity dataset export production 
 C:\Users\Fredde\Desktop\react\V2newstudentstore\sanitystudentlivet\production.tar.gz
 ELLER
 C:\Users\Fredde\Downloads\production.tar.gz

//above exports the database

//sanity dataset import C:\Users\fredd\react\V3newstudentstore\sanitystudentshoppen\production.tar.gz production
//import data
Modern Full Stack ECommerce Application with Stripe & Sanity
![eCommerce](https://user-images.githubusercontent.com/70088342/160780701-7bb38a57-76bd-49a2-a4ec-49f89c50a7c7.png)


_________________________________________
how to sanity deploy on new download: 


cd sanitystudentlivet       ///       cd sanitystudentshoppen

npm install --legacy-peer-deps

        ERROR is givven (10 vulnerabilities (8 moderate, 1 high, 1 critical))

yarn install --legacy-peer-deps

        SUCCESS Saved lockfile.

npm install --legacy-peer-deps

        ERROR is givven (10 vulnerabilities (8 moderate, 1 high, 1 critical))

sanity deploy

        ERROR

npm install -g @sanity/cli

sanity deploy

sanity login

sanity deploy

        SUCCESS

_______________________________________________


Merge to main

# Ensure you are on the v2.5studentshoppen branch
git checkout v2.5studentshoppen

# Switch to the main branch
git checkout main

# Merge v2.5studentshoppen into main
git merge v2.5studentshoppen

# Resolve conflicts if any (edit conflicted files, then add them)
# git add <resolved-file>

# Commit the merge if there were conflicts
git commit

# Push the changes to the remote repository
git push origin main





Uppdate location like this: 
 {sluniversities && `(${sluniversities.filter(uni => uni.location && uni.location.some(loc => loc._ref === city._id)).length})`}



thanks for all the help, you are awesome!

however, now since i have uppdated 

some of my university location code from 

    {
      name: 'location',
      title: 'Location',
      type: 'string',  
    },


to 

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


some of my code has stopped working, .


for example, this piece of code stopped working



            {slcitySorting.map((city, index) => (
                <li key={city.name} onClick={() => handleCityClick(city)} style={{ padding: '10px', borderTop: index === 0 ? '1px solid var(--secondarycolor)' : '1px solid #ccc', display: 'flex', cursor: 'pointer', height: "40px", alignItems: 'center', justifyContent: 'space-between', backgroundColor: selectedCity && selectedCity.name === city.name ? 'var(--primarycolor)' : 'transparent' }}>
                  {city.name} {sluniversities && `(${sluniversities.filter(uni => uni.location.toLowerCase() === city.name.toLowerCase()).length})`}
                  <Link href={`/studentlivet/${city.slug.current}/skolor`}>
                    <div style={{ marginTop: "5px", padding: "7px" }}> <ArrowForwardIos fontSize="small" style={{ fontSize: '16px' }} /></div>
                  </Link>
                </li>
              ))}


i get the error: 

Unhandled Runtime Error
TypeError: uni.location.toLowerCase is not a function

Source
components\studentlivet\SLNavigation.js (316:95) @ eval

  314 | {slcitySorting.map((city, index) => (
  315 |   <li key={city.name} onClick={() => handleCityClick(city)} style={{ padding: '10px', borderTop: index === 0 ? '1px solid var(--secondarycolor)' : '1px solid #ccc', display: 'flex', cursor: 'pointer', height: "40px", alignItems: 'center', justifyContent: 'space-between', backgroundColor: selectedCity && selectedCity.name === city.name ? 'var(--primarycolor)' : 'transparent' }}>
> 316 |     {city.name} {sluniversities && `(${sluniversities.filter(uni => uni.location.toLowerCase() === city.name.toLowerCase()).length})`}
      |                                                                                 ^
  317 |     <Link href={`/studentlivet/${city.slug.current}/skolor`}>
  318 |       <div style={{ marginTop: "5px", padding: "7px" }}> <ArrowForwardIos fontSize="small" style={{ fontSize: '16px' }} /></div>
  319 |     </Link>



how do i uppdate my code so it would work with my current database loctaion setup? 
Also, i want to go from comparing the names of the locations which is very vurnable in case names change etc, i would rather like to link these types of objects som other way, for example using id or something. give exaple of what i could compare with and use that instead of names. 




