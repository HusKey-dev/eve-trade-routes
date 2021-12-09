export const empireRegions = [
    {
        name: "Aridia",
        id: 10000054,
    },
    {
        name: "Black Rise",
        id: 10000069,
    },
    {
        name: "The Bleak Lands",
        id: 10000038,
    },
    {
        name: "The Citadel",
        id: 10000033,
    },
    {
        name: "Derelik",
        id: 10000001,
    },
    {
        name: "Devoid",
        id: 10000036,
    },
    {
        name: "Domain",
        id: 10000043,
    },
    {
        name: "Essence",
        id: 10000064,
    },
    {
        name: "Everyshore",
        id: 10000037,
    },
    {
        name: "The Forge",
        id: 10000002,
    },
    {
        name: "Genesis",
        id: 10000067,
    },
    {
        name: "Heimatar",
        id: 10000030,
    },
    {
        name: "Kador",
        id: 10000052,
    },
    {
        name: "Khanid",
        id: 10000049,
    },
    {
        name: "Kor-Azor",
        id: 10000065,
    },
    {
        name: "Lonetrek",
        id: 10000016,
    },
    {
        name: "Metropolis",
        id: 10000042,
    },
    {
        name: "Molden Heath",
        id: 10000028,
    },
    {
        name: "Placid",
        id: 10000048,
    },
    {
        name: "Sinq Laison",
        id: 10000032,
    },
    {
        name: "Solitude",
        id: 10000044,
    },
    {
        name: "Tash-Murkon",
        id: 10000020,
    },
    {
        name: "Verge Vendor",
        id: 10000068,
    },
];

export const outlawRegions = [
    {
        name: "Curse",
        id: 10000012,
    },
    {
        name: "Delve",
        id: 10000060,
    },
    {
        name: "Geminate",
        id: 10000029,
    },
    {
        name: "Great Wildlands",
        id: 10000011,
    },
    {
        name: "Outer Ring",
        id: 10000057,
    },
    {
        name: "Stain",
        id: 10000022,
    },
    {
        name: "Syndicate",
        id: 10000041,
    },
    {
        name: "Venal",
        id: 10000015,
    },
];

export const hubs = [
    {
        name: "Jita",
        id: 30000142,
    },
    {
        name: "Amarr",
        id: 30002187,
    },
    {
        name: "Rens",
        id: 30002510,
    },
    {
        name: "Dodixie",
        id: 30002659,
    },
    {
        name: "Hek",
        id: 30002053,
    },
];

export const hubIds = hubs.map((el) => el.id);

export const regions = [...empireRegions, ...outlawRegions];

export const goodRegionIds = regions.map((el) => el.id);
