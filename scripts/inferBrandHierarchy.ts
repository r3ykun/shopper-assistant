import {BrandHierarchyCandidate,BrandHierarchyResult} from "./brandHierarchy.types";

interface HierarchyBrand{
	id:string;
	name:string;
	categories:string[];
	subcategories:string[];
	manufacturerId?:string;
}

const DESCRIPTOR_WORDS=new Set([
	"adult",
	"all",
	"barako",
	"black",
	"blue",
	"brown",
	"cheese",
	"classic",
	"condensada",
	"condensed",
	"cream",
	"creamy",
	"delicia",
	"delight",
	"diet",
	"evaporada",
	"evaporated",
	"extra",
	"family",
	"fortified",
	"fresh",
	"full",
	"gold",
	"granules",
	"green",
	"light",
	"lite",
	"low",
	"max",
	"milk",
	"minis",
	"original",
	"plus",
	"premium",
	"red",
	"regular",
	"skim",
	"sugar",
	"supreme",
	"tru",
	"wheat",
	"white",
	"zero",
]);

const GENERIC_PRODUCT_WORDS=new Set([
	"butter",
	"canton",
	"cereal",
	"cheese",
	"chips",
	"coffee",
	"cream",
	"drink",
	"juice",
	"margarine",
	"milk",
	"noodles",
	"oats",
	"oil",
	"pasta",
	"rice",
	"sauce",
	"tea",
	"tuna",
	"water",
	"yogurt",
]);

const PRODUCT_DESCRIPTORS=new Set([
    "lowfat",
    "nonfat",
    "skim",
    "whole",
    "fresh",
    "filled",
    "evaporated",
    "condensed",
    "powdered",
    "ready",
    "drink",
    "instant",
    "regular",
    "max",
    "mini",
    "mega",
    "jumbo",
    "family",
    "value",
    "originals",
    "ultimate",
    "supreme",
    "premium",
    "special",
    "double",
    "triple",
    "strong",
    "mild",
    "sweet",
    "salted",
    "unsweetened",
	"classic",
	"zero",
	"gold",
	"lite",
	"light",
	"fortified",
	"adult",
	"plus",
	"white",
	"original",
	"creamy",
	"coffee",
	"chicken",
	"beef",
	"bulalo",
	"chilimansi",
	"calamansi",
	"spicy",
	"supreme",
	"vanilla",
	"chocolate",
	"strawberry",
]);

function countDescriptors(
	name:string
){
	return tokenize(name)
		.filter(
			word=>
				PRODUCT_DESCRIPTORS.has(word)
		)
		.length;
}

function normalize(value:string):string{
	return value
		.toLowerCase()
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g,"")
		.replace(/&/g," and ")
		.replace(/['’`]/g,"")
		.replace(/[^a-z0-9]+/g," ")
		.replace(/\s+/g," ")
		.trim();
}

function tokenize(value:string):string[]{
	return normalize(value)
		.split(" ")
		.filter(Boolean);
}

function getFamilyKeys(name:string):string[]{
	const words=tokenize(name)
		.filter(
			word=>
				word.length>=3&&
				!PRODUCT_DESCRIPTORS.has(word)
		);

	if(words.length===0){
		return[];
	}

	const keys=new Set<string>();

	keys.add(
		`root:${words[0]}`
	);

	if(words.length>=2){
		keys.add(
			`pair:${words[0]} ${words[1]}`
		);
	}

	return[...keys];
}

function getFamilyRoot(name:string):string{
    const words=tokenize(name)
        .filter(
            word=>
                word.length>=3&&
                !PRODUCT_DESCRIPTORS.has(word)
        );

    if(words.length===0){
        return"";
    }

    const canonicalRoots:Record<string,string>={
        coke:"coca-cola",
        coca:"coca-cola",
        cocacola:"coca-cola",
        nescafe:"nestle",
        bear:"nestle",
        chuckie:"nestle",
        milo:"nestle",
        kitkat:"nestle",
        maggi:"nestle",
    };

    const root=words[0];

    if(canonicalRoots[root]){
        return canonicalRoots[root];
    }

    return words[0];
}

function hasCompatibleFamilyRoot(
	parentName:string,
	childName:string
){
    const parent=getFamilyRoot(parentName);
    const child=getFamilyRoot(childName);

    if(!parent||!child){
        return false;
    }

    if(parent===child){
        return true;
    }

    if(
        parent.startsWith(child)||
        child.startsWith(parent)
    ){
        return true;
    }

    if(
        parent.includes(child)||
        child.includes(parent)
    ){
        return true;
    }

    return similarity(
        parent,
        child
    )>=0.90;
}

function buildFamilyIndex(
	brands:HierarchyBrand[]
):Map<string,HierarchyBrand[]>{
	const index=new Map<string,HierarchyBrand[]>();

	for(const brand of brands){
		const keys=[
			...getFamilyKeys(brand.name),
			`root:${getFamilyRoot(brand.name)}`,
		];

		for(const key of keys){
			const bucket=index.get(key)??[];

			if(!bucket.some(
				item=>item.id===brand.id
			)){
				bucket.push(brand);
			}

			index.set(key,bucket);
		}
	}

	return index;
}

function getPossibleParents(
	child:HierarchyBrand,
	familyIndex:Map<string,HierarchyBrand[]>
):HierarchyBrand[]{
	const parents=new Map<string,HierarchyBrand>();

	const keys=[
		...getFamilyKeys(child.name),
		`root:${getFamilyRoot(child.name)}`,
	];

	for(const key of keys){
		for(const parent of familyIndex.get(key)??[]){
			if(parent.id===child.id)continue;

			const directPrefix=removeDirectPrefix(
				parent.name,
				child.name
			);

			const compatibleRoot=
				hasCompatibleFamilyRoot(
					parent.name,
					child.name
				);

			if(!directPrefix&&!compatibleRoot){
				continue;
			}

			parents.set(parent.id,parent);
		}
	}

	return[...parents.values()];
}

function levenshtein(a:string,b:string):number{
	const rows=a.length+1;
	const columns=b.length+1;
	const matrix=Array.from(
		{length:rows},
		()=>Array(columns).fill(0)
	);

	for(let row=0;row<rows;row++){
		matrix[row][0]=row;
	}

	for(let column=0;column<columns;column++){
		matrix[0][column]=column;
	}

	for(let row=1;row<rows;row++){
		for(let column=1;column<columns;column++){
			const cost=
				a[row-1]===b[column-1]
					?0
					:1;

			matrix[row][column]=Math.min(
				matrix[row-1][column]+1,
				matrix[row][column-1]+1,
				matrix[row-1][column-1]+cost
			);
		}
	}

	return matrix[a.length][b.length];
}

function similarity(a:string,b:string):number{
	if(a===b)return 1;

	const maximum=Math.max(
		a.length,
		b.length
	);

	if(maximum===0)return 1;

	return 1-
		levenshtein(a,b)/
		maximum;
}

function categoryOverlap(
	parent:HierarchyBrand,
	child:HierarchyBrand
):number{
	const parentCategories=new Set(
		parent.categories.map(normalize)
	);

	return child.categories.filter(
		category=>parentCategories.has(
			normalize(category)
		)
	).length;
}

function subcategoryOverlap(
	parent:HierarchyBrand,
	child:HierarchyBrand
):number{
	const parentSubcategories=new Set(
		parent.subcategories.map(normalize)
	);

	return child.subcategories.filter(
		subcategory=>parentSubcategories.has(
			normalize(subcategory)
		)
	).length;
}

function removeDirectPrefix(
	parentName:string,
	childName:string
):string|undefined{
	const normalizedParent=normalize(
		parentName
	);

	const normalizedChild=normalize(
		childName
	);

	if(
		!normalizedChild.startsWith(
			normalizedParent+" "
		)
	){
		return;
	}

	const parentWords=tokenize(parentName);
	const childWords=childName
		.trim()
		.split(/\s+/);

	return childWords
		.slice(parentWords.length)
		.join(" ")
		.trim();
}

function getFamilyStemScore(
	parentName:string,
	childName:string
):number{
	const parentRoot=getFamilyRoot(parentName);
	const childRoot=getFamilyRoot(childName);

	if(!parentRoot||!childRoot)return 0;
	if(parentRoot===childRoot)return 1;

	return similarity(
		parentRoot,
		childRoot
	);
}

function getDescriptorScore(
	childName:string
):number{
	const words=tokenize(childName);

	if(words.length<2)return 0;

	const descriptorCount=words
		.slice(1)
		.filter(word=>
			DESCRIPTOR_WORDS.has(word)||
			GENERIC_PRODUCT_WORDS.has(word)
		)
		.length;

	return descriptorCount/
		Math.max(words.length-1,1);
}

function getSharedTokenScore(
	parentName:string,
	childName:string
):number{
	const parentWords=new Set(
		tokenize(parentName)
	);

	const childWords=tokenize(
		childName
	);

	const shared=childWords.filter(
		word=>
			word.length>=3&&
			parentWords.has(word)
	).length;

	return shared/
		Math.max(
			parentWords.size,
			childWords.length,
			1
		);
}

function getProductLineName(
	parent:HierarchyBrand,
	child:HierarchyBrand,
	directRemainder:string|undefined,
	familyStemScore:number
):string|undefined{
	if(directRemainder){
		return directRemainder;
	}

	if(familyStemScore>=0.78){
		return child.name;
	}

	return;
}

function scoreCandidate(
	parent:HierarchyBrand,
	child:HierarchyBrand
):BrandHierarchyCandidate|undefined{
	if(parent.id===child.id)return;

	const parentName=normalize(
		parent.name
	);

	const childName=normalize(
		child.name
	);

	if(
		!parentName||
		!childName||
		parentName===childName
	){
		return;
	}

	const reasons:BrandHierarchyCandidate["reasons"]=[];
	let confidence=0;

	const directRemainder=removeDirectPrefix(
		parent.name,
		child.name
	);

	if(directRemainder){
		reasons.push("prefix");
		confidence+=0.78;
	}

	const familyStemScore=getFamilyStemScore(
		parent.name,
		child.name
	);

    if(
        familyStemScore===1
    ){
        confidence+=0.08;
    }

    if(
        !directRemainder&&
        familyStemScore>=0.78
    ){
        reasons.push("family-stem");
        confidence+=
            0.64+
            (familyStemScore-0.78)*0.5;
    }

	const sharedTokenScore=getSharedTokenScore(
		parent.name,
		child.name
	);

	if(
		!directRemainder&&
		sharedTokenScore>=0.4
	){
		reasons.push("normalized-prefix");
		confidence+=sharedTokenScore*0.25;
	}

	const descriptorScore=getDescriptorScore(
		child.name
	);

	if(descriptorScore>0){
		reasons.push("descriptor-child");
		confidence+=descriptorScore*0.18;
	}

	const categories=categoryOverlap(
		parent,
		child
	);

	if(categories>0){
		reasons.push("category-context");
		confidence+=Math.min(
			0.12,
			categories*0.06
		);
	}

	const subcategories=subcategoryOverlap(
		parent,
		child
	);

	if(subcategories>0){
		confidence+=Math.min(
			0.15,
			subcategories*0.08
		);
	}

	if(
		parent.manufacturerId&&
		child.manufacturerId&&
		parent.manufacturerId===
			child.manufacturerId
	){
		confidence+=0.2;
	}

	const productLineName=getProductLineName(
		parent,
		child,
		directRemainder,
		familyStemScore
	);

    const descriptorCount=
        countDescriptors(child.name);

    if(descriptorCount>0){
        reasons.push(
            "descriptor-child"
        );

        confidence+=Math.min(
            0.16,
            descriptorCount*0.06
        );
    }

    if(
        descriptorCount>=2
    ){
        confidence+=0.04;
    }

    if(descriptorCount>0){
        reasons.push(
            "descriptor-child"
        );

        confidence+=Math.min(
            0.10,
            descriptorCount*0.04
        );
    }

	if(!productLineName)return;

	if(confidence<0.7)return;

    confidence=Math.min(
        1,
        confidence
    );

    if(confidence<0.55){
        return;
    }

    if(
        confidence>=0.82&&
        reasons.includes("prefix")
    ){
        confidence+=0.04;
    }

    if(
        reasons.includes("family-stem")&&
        reasons.includes("descriptor-child")
    ){
        confidence+=0.03;
    }

    confidence=Math.min(
        1,
        confidence
    );

    if(confidence<0.60){
        return;
    }

    if(
        parent.name.length>=
        child.name.length
    ){
        return;
    }

    const parentWords=
        tokenize(parent.name);

    const childWords=
        tokenize(child.name);

    if(
        childWords.length<
        parentWords.length
    ){
        return;
    }

	return{
		parentId:parent.id,
		parentName:parent.name,
		childId:child.id,
		childName:child.name,
		productLineName,
		confidence:Number(
			Math.min(
				confidence,
				1
			).toFixed(3)
		),
		reasons,
	};
}

export function inferBrandHierarchy(
	brands:HierarchyBrand[]
):BrandHierarchyResult{
	const candidates:BrandHierarchyCandidate[]=[];
	const categoryBuckets=new Map<
		string,
		HierarchyBrand[]
	>();

	for(const brand of brands){
		for(const category of brand.categories){
			const key=normalize(category);
			const bucket=categoryBuckets.get(key)??[];
			bucket.push(brand);
			categoryBuckets.set(key,bucket);
		}
	}

	const familyIndex=buildFamilyIndex(brands);

    console.log(
        `Brand family buckets: ${familyIndex.size}`
    );

	for(const child of brands){
		const possibleParents=getPossibleParents(
			child,
			familyIndex
		);

		for(const parent of possibleParents){
			const candidate=scoreCandidate(
				parent,
				child
			);

			if(candidate){
				candidates.push(candidate);
			}
		}
	}

	const grouped=new Map<
		string,
		BrandHierarchyCandidate[]
	>();

	for(const candidate of candidates){
		const group=grouped.get(
			candidate.childId
		)??[];

		group.push(candidate);
		grouped.set(
			candidate.childId,
			group
		);
	}

    const confirmed:BrandHierarchyCandidate[]=[];
    const ambiguous:BrandHierarchyCandidate[]=[];
    const confirmedChildren=new Set<string>();

	for(const childCandidates of grouped.values()){
		childCandidates.sort((a,b)=>{
			if(b.confidence!==a.confidence){
				return b.confidence-a.confidence;
			}

			const aPrefix=a.reasons.includes("prefix");
			const bPrefix=b.reasons.includes("prefix");

			if(aPrefix!==bPrefix){
				return Number(bPrefix)-Number(aPrefix);
			}

			return b.parentName.length-a.parentName.length;
		});

		const best=childCandidates[0];
		const second=childCandidates[1];

		const margin=second
			?best.confidence-second.confidence
			:1;

		const directPrefix=
			best.reasons.includes("prefix");

		const strongFamily=
			best.reasons.includes("family-stem")&&
			best.reasons.includes("descriptor-child")&&
			best.reasons.includes("category-context");

        const safe=
            best.confidence>=0.76&&(
                directPrefix||
                best.reasons.includes("family-stem")||
                margin>=0.04
            );

        if(
            safe&&
            !confirmedChildren.has(best.childId)&&
            best.childName.length>=3
        ){
            if(
                best.childName.length<
                best.parentName.length
            ){
                continue;
            }
            const childWords=
                tokenize(best.childName);

            if(
                childWords.length===1&&
                childWords[0].length<5
            ){
                continue;
            }

            if(
                best.childName
                    .toLowerCase()===
                best.parentName
                    .toLowerCase()
            ){
                continue;
            }
                confirmed.push(best);
                confirmedChildren.add(best.childId);
                continue;
        }

		ambiguous.push(
			...childCandidates.slice(0,3)
		);
	}

	return{
		confirmed,
		ambiguous,
	};
}