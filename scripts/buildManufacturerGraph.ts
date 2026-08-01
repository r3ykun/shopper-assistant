export interface ManufacturerRelation{
	manufacturer:string;
	brands:string[];
}

const MANUFACTURERS:ManufacturerRelation[]=[
	{
		manufacturer:"Nestlé",
		brands:[
			"Nescafé",
			"Bear Brand",
			"Chuckie",
			"Coffee Mate",
			"Milo",
			"KitKat",
			"Maggi",
		],
	},
	{
		manufacturer:"Coca-Cola",
		brands:[
			"Coke",
			"Sprite",
			"Royal",
			"Minute Maid",
			"Wilkins",
		],
	},
	{
		manufacturer:"Monde Nissin",
		brands:[
			"Lucky Me!",
			"SkyFlakes",
			"Fita",
			"Mamon",
		],
	},
    {
        manufacturer:"Unilever",
        brands:[
            "Closeup",
            "Sunsilk",
            "Surf",
            "Rexona",
            "Cream Silk",
            "Dove",
            "Knorr",
        ],
    },
    {
        manufacturer:"Procter & Gamble",
        brands:[
            "Ariel",
            "Safeguard",
            "Head & Shoulders",
            "Pantene",
            "Downy",
            "Joy",
            "Pampers",
        ],
    },
    {
        manufacturer:"Colgate-Palmolive",
        brands:[
            "Colgate",
            "Palmolive",
            "Ajax",
            "Protex",
        ],
    },

];

export function buildManufacturerGraph(){
	return MANUFACTURERS;
}