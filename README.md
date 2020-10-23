This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:
### `npm install`
To install npm and be able to run the backend

### `npm start`

#### Projekt-Frontend

Det självklara valet för byggandet av denna applikation var en front-end baserad på React. React är ett komponent-drivet bibliotek/ramverk som tillåter användaren en stor portion flexibilitet. Komponenterna som tillsammans bygger upp User Interfacet kan återanvändas flera gånger och på ett smidigt sätt samarbeta med varandra. React är ett av de större biblioteken för Javascript och är frekvent använt.
Det finns många olika verktyg att koppla på till React och för att på ett smidigt sätt kunna visa grafer har jag valt att inkorporera ChartJs i projektet, vilket är ett praktiskt verktyg för att kunna skapa grafer av den data som ges. Valet föll på ChartJs då alternativet Rickshaw inte verkade leva upp till förväntningarna enligt hörsägen. Dessutom har ChartJs en bra dokumentation vilket gjorde den förhållandevis enkel att inkludera i React.
För att routeingen ska fungera som tänkt har jag använt mig att React Router. Utöver detta har jag även valt att använda ikoner från Material Icons, vilket fungerar väl för oss eftersom vår budget är begränsad (och dessa är gratis).

Sidan har, á la react, en rätt enkel uppbyggnad och baserar sig på att man som användare loggar in för att kunna använda sidan till fullo. Inloggnings- och registreringsfunktionerna pratar med det API och dess databas som skapades som del ett i detta projekt, projekt-apiet. Väl inloggad kan användaren få en överblick över de produkter som erbjuds att handla med på Marknads-sidan, där man även får en realtidsuppdatering, vilken hämtas med hjälp av microservicen. Om man är köpsugen trycker man direkt på knappen för att handla, annars kan man få mer information genom att trycka sig vidare in till produktsidan. Produktsidan ger dig allt du behöver veta inför din trade och du får dessutom en realtidsuppdaterad graf (skapad med ChartsJs) som visar dig prisutvecklingen för produkten.
På din profilsida går det att hitta all information om ditt konto, bland annat hur mycket du har kvar att handla för, vilka sticklingar du har köpt och till vilket pris. Om du känner för att göra dig av med de produkter du införskaffat är det enkelt att sälja dem genom att trycka på sälj-knappen.

Sidan är en prototyp och saknar vissa mindre delar för att göra användbarheten riktigt bra, något som skulle få ett fokus vid fortsatt samarbete. 
