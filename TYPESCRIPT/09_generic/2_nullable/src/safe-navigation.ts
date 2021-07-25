export type ICoordinates = { longitude: number };
export type ILocation = { country: string; coords?: ICoordinates };
export type IPerson = { name: string; location?: ILocation };

let person: IPerson = { name: 'Leonardo' };
let longitude = person?.location?.coords?.longitude; // safe navigation
console.log(longitude);
if (person && person.location && person.location.coords) {
    longitude = person.location.coords.longitude;
} // 6행과 같음
