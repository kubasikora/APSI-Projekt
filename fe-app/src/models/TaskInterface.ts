export interface Boomer {
    name: string;
    residence: {
        street: string;
        homeNumber: number;
        aptNumber?: number;
    };
    phoneNumber: string;
    due: string;
    listID: number;
}

const ExampleTasksData = [
    {
        name: "Robert Wojtas",
        residence: {
            street: "Ułańska",
            homeNumber: 12
        },
        phoneNumber: "606115394",
        due: "15-04-2020",
        listID: 1
    },
    {
        name: "Paweł Żakieta",
        residence: {
            street: "Kartuzy",
            homeNumber: 69,
            aptNumber: 69
        },
        phoneNumber: "696969696",
        due: "19-04-2020",
        listID: 2
    },
    {
        name: "Jakub Sikora",
        residence: {
            street: "Arka Gdynia",
            homeNumber: 10
        },
        phoneNumber: "111115394",
        due: "15-07-2020",
        listID: 3
    },
    {
        name: "Krzysiu Bednarski",
        residence: {
            street: "Warszawa",
            homeNumber: 420,
            aptNumber: 69
        },
        phoneNumber: "696969696",
        due: "01-11-2020",
        listID: 4
    }
];

export default ExampleTasksData;