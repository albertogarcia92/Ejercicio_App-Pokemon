export interface RespuestaTypes {
    count:    number;
    next:     string;
    previous: null;
    results:  Types[];
}

export interface Types {
    name: string;
    url:  string;
}