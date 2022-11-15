# PE02 Slot Machine
PE02-slotMachine 

## Werking van het programma
Maak een applicatie die de werking van een slotmachine simuleert. Wanneer een gebruiker op **Roll** klikt worden de afbeeldingen op `casino-slot-machine.png` geplaatst.     
Klikt de gebruiker op **Stop** ,dan wordt random een combinatie van fruitsoorten getoond en dan wordt de score als volgt berekend:
* geen gelijke soorten = 0 punten
* 2 gelijke soorten = 200 punten
* 3 gelijke soorten = 300 punten

### Weergave score in GUI
* De Score per Roll wordt bijgehouden in het vak Score. 
* De historiek van de spelletjes wordt bijgehouden in het vak Score Historiek. 
* Het aantal gespeelde spelletjes wordt bijgehouden in Aantal Rolls.

### Functionaliteiten (must-have)
* De gebruiker kan 3 (drie) keer een Roll uitvoeren. 
* De knop **Replay** zorgt ervoor dat alles gereset wordt en dat de gebruiker opnieuw kan beginnen spelen.(alle punten worden leeggemaakt). 
Zorg er ook voor dat de knoppen geactiveerd en gedeactiveerd worden zoals in het filmpje.

## Aandachtspunten:
*	Maak gebruik van arrays.
*	Verdeel je code zo veel mogelijk in logische functies
*	Focus op het bepalen van de random getallen voor de fruitsoorten, en de algemene werking van het programma. 
*	Gebruik de mappenstructuur die tijdens de lessen gebruikt wordt
*  Schrijf je code waarbij de toepassing gemakkelijk uitbreidbaar wordt, naar fruitsoorten toe

## Voorbeeldfilmpje werking:

![example](img/PE02.gif)

## Extra

Bij een Slotmachine 'flippen' de afbeeldingen over het scherm.
Het flippen van het fruit levert extra punten op. 
Zoek daarbij online naar een manier (functie) om functies vertraagd uit te voeren(om de zoveel milliseconden)


