export interface Structure {
    id: number;
    name: string;
    contactName: string;
    contactNumber: string;
    adress: string;
    postalCode: string;
    city: string;
    identifier: string;
}

class baseStructure implements Structure {
    id : number;
    name : string;
    contactName : string;
    contactNumber : string;
    adress : string;
    postalCode : string;
    city : string;
    identifier : string;

    constructor(id: number, 
        name: string, 
        contactName: string,
        contactNumber: string, 
        adress: string, 
        postalCode: string, 
        city: string,
        identifier: string
        ) {
        this.id = id;
        this.name = name;
        this.contactName = contactName;
        this.contactNumber = contactNumber;
        this.adress = adress;
        this.postalCode = postalCode;
        this.city = city;
        this.identifier = identifier;
    }
}

export const DayCareIdentifier = "daycare"
export class DayCare extends baseStructure {
    constructor(id: number,
        name: string,
        contactName: string,
        contactNumber: string,
        adress: string,
        postalCode: string,
        city: string,
    ) {
        super(id, name, contactName, contactNumber, adress, postalCode, city, DayCareIdentifier)
    }
}

export const GeneralStructureIdentifier = "general"
export class GeneralStucture extends baseStructure {
    type : GeneralStructureType;

    constructor(id: number,
        name: string,
        contactName: string,
        contactNumber: string,
        adress: string,
        postalCode: string,
        city: string,
        type: GeneralStructureType
    ) {
        super(id, name, contactName, contactNumber, adress, postalCode, city, GeneralStructureIdentifier)
        this.type = type;
    }
}

export const RecreationCenterIdentifier = "recreationCenter"
export class RecreationCenter extends baseStructure {
    level : SchoolLevel;

    constructor(id: number, 
        name: string, 
        contactName: string,
        contactNumber: string, 
        adress: string, 
        postalCode: string, 
        city: string,
        level: SchoolLevel,
        identifier: string = RecreationCenterIdentifier) {
            super(id, name, contactName, contactNumber, adress, postalCode, city, identifier)
            this.level = level;
    }
}

export const SchoolIdentifier = "school"
export class School extends RecreationCenter {
    rep : boolean;
    constructor(id: number, 
        name: string, 
        contactName: string,
        contactNumber: string, 
        adress: string, 
        postalCode: string, 
        city: string,
        level: SchoolLevel,
        rep : boolean
    )
    {
            super(id, name, contactName, contactNumber, adress, postalCode, city, level, SchoolIdentifier)
            this.rep = rep;
    }

}


export enum SchoolLevel {
    Maternelle = 0,
    Primaire   = 1,
    College    = 2,
    Lycee      = 3,
    Superieur  = 4 
}

export enum GeneralStructureType {
    Association,
    CentreSocial,
    Autre
}

export enum Maternelle {
    Petite,
    Moyenne,
    Grande
}

export enum Primaire {
    CP,
    CE1,
    CE2,
    CM1,
    CM2
}

export enum College {
    Sixieme,
    Cinquieme,
    Quatrieme,
    Troisieme
}

export enum Lycee {
    Seconde,
    Premiere,
    Terminal
}

export enum Superieur {
    Premiere,
    Deuxieme,
    Troisieme,
    Quatrieme,
    Cinquieme,
    Sixieme,
    Septieme,
    Huitieme
}

export class Movie {
    id:string;
    title:string;

    constructor(id:string, title:string){
        this.id = id;
        this.title = title;
    }
}

export class Seance {
    id:string;
    hour:string;
    movie:Movie;

    constructor(id:string, hour:string, movieId:string, title:string){
        this.id = id;
        this.hour = hour;
        this.movie = new Movie(movieId, title);
    }
}

export class Reservation {
    id:number;
    seance:Seance;
    structure:Structure;
    nbrEntree:number;
    nbrExo:number;

    constructor(id:number, hour:string, movie:Movie){
        this.id = id;
        //A finir
    }
}
