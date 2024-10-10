export interface Structure {
    id: number;
    name: string;
    contactName: string;
    contactNumber: string;
    adress: string;
    postalCode: string;
    city: string;
}

class baseStructure implements Structure {
    id : number;
    name : string;
    contactName : string;
    contactNumber : string;
    adress : string;
    postalCode : string;
    city : string;

    constructor(id: number, 
        name: string, 
        contactName: string,
        contactNumber: string, 
        adress: string, 
        postalCode: string, 
        city: string,
        ) {
        this.id = id;
        this.name = name;
        this.contactName = contactName;
        this.contactNumber = contactNumber;
        this.adress = adress;
        this.postalCode = postalCode;
        this.city = city;
    }
}

export class DayCare extends baseStructure {
    constructor(id: number,
        name: string,
        contactName: string,
        contactNumber: string,
        adress: string,
        postalCode: string,
        city: string,
    ) {
        super(id, name, contactName, contactNumber, adress, postalCode, city)
    }
}

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
        super(id, name, contactName, contactNumber, adress, postalCode, city)
        this.type = type;
    }
}

export class RecreationCenter extends baseStructure {
    level : SchoolLevel;

    constructor(id: number, 
        name: string, 
        contactName: string,
        contactNumber: string, 
        adress: string, 
        postalCode: string, 
        city: string,
        level: SchoolLevel) {
            super(id, name, contactName, contactNumber, adress, postalCode, city)
            this.level = level;
    }
}

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
            super(id, name, contactName, contactNumber, adress, postalCode, city, level)
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
    id:number;
    title:string;

    constructor(id:number, title:string){
        this.id = id;
        this.title = title;
    }
}

export class Seance {
    id:number;
    hour:string;
    movie:Movie;

    constructor(id:number, hour:string, movieId:number, title:string){
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