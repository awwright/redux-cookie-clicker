
if(typeof exports=='object'){
	var Immutable = require('immutable');
	var React = require('react');
}else if(typeof document=='object'){
	var exports = {};
	document.addEventListener("DOMContentLoaded", onLoad);
}else{
	//throw new Error('Unknown platform');
}
// Section 1. Static game data
var buildingTypeList = [
	{label:'Cursor', name:'cursor', baseCost:15, baseClicks:0.1},
	{label:'Grandma', name:'grandma', baseCost:100, baseClicks:1},
	{label:'Farm', name:'farm', baseCost:1100, baseClicks:8},
	{label:'Mine', name:'mine', baseCost:12000, baseClicks:47},
	{label:'Factory', name:'factory', baseCost:130000, baseClicks:260},
	{label:'Bank', name:'bank', baseCost:1.4e6, baseClicks:1400},
	{label:'Temple', name:'temple', baseCost:20e6, baseClicks:7800},
	{label:'Wizard Tower', name:'wizardtower', baseCost:330e6, baseClicks:44000},
	{label:'Shipment', name:'shipment', baseCost:5100e6, baseClicks:260000},
	{label:'Alchemy Lab', name:'alchemylab', baseCost:75000e6, baseClicks:1.6e6},
	{label:'Portal', name:'portal', baseCost:1e12, baseClicks:10e6},
	{label:'Time Machine', name:'timemachine', baseCost:14e12, baseClicks:65e6},
	{label:'Antimatter Condenser', name:'antimattercondenser', baseCost:170e12, baseClicks:430e6},
	{label:'Prism', name:'prism', baseCost:2100e12, baseClicks:2900e6},
];
var buildingTypes = {};
buildingTypeList.forEach(function(v){ buildingTypes[v.name] = v; });

function upgraderBuildingMinimum(buildingType, buildingCount){
	return function(state){
		return state.get('buildingCount').get(buildingType) >= buildingCount;
	}
}
function upgraderBuildingMinimumGrandma(buildingType, buildingCount){
	return function(state){
		return (state.get('buildingCount').get(buildingType) >= 15) && (state.get('buildingCount').get('grandma') >= 1);
	}
}

function tierUpgrade(building, level, label){
	var levels = tierUpgrade.levels;
	// [building minimum, base cost factor]
	return {label:label, unlocked:upgraderBuildingMinimum(building, levels[level][0]), cost:buildingTypes[building].baseCost*levels[level][1], descriptionHtml:''};
}
tierUpgrade.levels = [
	[0,0], // shrug
	[1, 10],
	[5, 50],
	[25, 500],
	[50, 50000],
	[100, 5000000],
	[150, 500000000],
	[200, 500000000000],
	[250, 500000000000000],
];

var upgradeList = [
	// Cursor upgrades
	{label:'Reinforced index finger', unlocked:upgraderBuildingMinimum('cursor', 1), cost:100, descriptionHtml:'The mouse and cursors are twice as efficient. "prod prod"'},
	{label:'Carpal tunnel prevention cream', unlocked:upgraderBuildingMinimum('cursor', 1), cost:500, descriptionHtml:'The mouse and cursors are twice as efficient. "it... it hurts to click..."'},
	{label:'Ambidextrous', unlocked:upgraderBuildingMinimum('cursor', 10), cost:10000, descriptionHtml:'The mouse and cursors are twice as efficient. "prod prod"'},
	{label:'Thousand fingers', unlocked:upgraderBuildingMinimum('cursor', 20), cost:100000, descriptionHtml:'The mouse and cursors gain +0.1 cookies for each non-cursor object owned.'},
	{label:'Million fingers', unlocked:upgraderBuildingMinimum('cursor', 40), cost:10e6, descriptionHtml:''},
	{label:'Billion fingers', unlocked:upgraderBuildingMinimum('cursor', 80), cost:100e6, descriptionHtml:''},
	{label:'Trillion fingers', unlocked:upgraderBuildingMinimum('cursor', 120), cost:1e9, descriptionHtml:''},
	{label:'Quadrillion fingers', unlocked:upgraderBuildingMinimum('cursor', 160), cost:10e12, descriptionHtml:''},
	{label:'Quintillion fingers', unlocked:upgraderBuildingMinimum('cursor', 200), cost:100e6, descriptionHtml:''},
	{label:'Sextillion fingers', unlocked:upgraderBuildingMinimum('cursor', 240), cost:100e6, descriptionHtml:''},
	{label:'Septillion fingers', unlocked:upgraderBuildingMinimum('cursor', 280), cost:100e6, descriptionHtml:''},
	{label:'Octillion fingers', unlocked:upgraderBuildingMinimum('cursor', 320), cost:100e6, descriptionHtml:''},
	// Grandma upgrades
	tierUpgrade('grandma', 1, 'Forwards from grandma'),
	tierUpgrade('grandma', 2, 'Steel-plated rolling pins'),
	tierUpgrade('grandma', 3, 'Lubricated dentures'),
	tierUpgrade('grandma', 4, 'Prune juice'),
	tierUpgrade('grandma', 5, 'Double-thick glasses'),
	tierUpgrade('grandma', 6, 'Aging agents'),
	tierUpgrade('grandma', 7, 'Xtreme walkers'),
	tierUpgrade('grandma', 8, 'The Unbridling'),
	// The Grandma-x-Grandma upgrades
	{label:'Farmer grandmas', unlocked:upgraderBuildingMinimumGrandma('farm'), cost:55000, descriptionHtml:'Grandmas are twice as efficient. Farms gain +1% CpS per grandma.'},
	{label:'Miner grandmas', unlocked:upgraderBuildingMinimumGrandma('mine'), cost:600000, descriptionHtml:'Grandmas are twice as efficient. Mines gain +1% CpS per 2 grandmas.'},
	{label:'Worker grandmas', unlocked:upgraderBuildingMinimumGrandma('factory'), cost:6.5e6, descriptionHtml:'Grandmas are twice as efficient. Factories gain +1% CpS per 3 grandmas.'},
	{label:'Banker grandmas', unlocked:upgraderBuildingMinimumGrandma('bank'), cost:70e6, descriptionHtml:'Grandmas are twice as efficient. Banks gain +1% CpS per 4 grandmas'},
	{label:'Priestess grandmas', unlocked:upgraderBuildingMinimumGrandma('temple'), cost:1e9, descriptionHtml:'Grandmas are twice as efficient. Temples gain +1% CpS per 5 grandmas.'},
	{label:'Witch grandmas', unlocked:upgraderBuildingMinimumGrandma('wizardtower'), cost:16.5e9, descriptionHtml:'Grandmas are twice as efficient. Wizard towers gain +1% CpS per 6 grandmas.'},
	{label:'Cosmic grandmas', unlocked:upgraderBuildingMinimumGrandma('shipment'), cost:255e9, descriptionHtml:'Grandmas are twice as efficient. Shipments gain +1% CpS per 7 grandmas.'},
	{label:'Transmuted grandmas', unlocked:upgraderBuildingMinimumGrandma('alchemylab'), cost:3.75e12, descriptionHtml:'Grandmas are twice as efficient. Alchemy labs gain +1% CpS per 8 grandmas.'},
	{label:'Altered grandmas', unlocked:upgraderBuildingMinimumGrandma('portal'), cost:50e12, descriptionHtml:'Grandmas are twice as efficient. Portals gain +1% CpS per 9 grandmas.'},
	{label:'Grandmas\' grandmas', unlocked:upgraderBuildingMinimumGrandma('timemachine'), cost:700e12, descriptionHtml:'Grandmas are twice as efficient. Time machines gain +1% CpS per 10 grandmas.'},
	{label:'Antigrandmas grandmas', unlocked:upgraderBuildingMinimumGrandma('antimattercondenser'), cost:8.5e15, descriptionHtml:'Grandmas are twice as efficient. Antimatter condensers gain +1% CpS per 11 grandmas.'},
	{label:'Rainbow grandmas', unlocked:upgraderBuildingMinimumGrandma('prism'), cost:105e15, descriptionHtml:'Grandmas are twice as efficient. Prisms gain +1% CpS per 12 grandmas.'},
	// Farm upgrades
	tierUpgrade('farm', 1, 'Cheap hoes'),
	tierUpgrade('farm', 2, 'Fertilizer'),
	tierUpgrade('farm', 3, 'Cookie trees'),
	tierUpgrade('farm', 4, 'Genetically-modified cookies'),
	tierUpgrade('farm', 5, 'Gingerbread scarecrows'),
	tierUpgrade('farm', 6, 'Pulsar sprinklers'),
	tierUpgrade('farm', 7, 'Fudge fungus'),
	tierUpgrade('farm', 8, 'Wheat triffids'),
	// Mine upgrades
	tierUpgrade('mine', 1, 'Sugar gas'),
	tierUpgrade('mine', 2, 'Megadrill'),
	tierUpgrade('mine', 3, 'Ultradrill'),
	tierUpgrade('mine', 4, 'Ultimadrill'),
	tierUpgrade('mine', 5, 'H-bomb mining'),
	tierUpgrade('mine', 6, 'Coreforge'),
	tierUpgrade('mine', 7, 'Planetsplitters'),
	tierUpgrade('mine', 8, 'Canola oil wells'),
	// Factory upgrades
	tierUpgrade('factory', 1, 'Sturdier conveyor belts'),
	tierUpgrade('factory', 2, 'Child labor'),
	tierUpgrade('factory', 3, 'Sweatshop'),
	tierUpgrade('factory', 4, 'Radium reactors'),
	tierUpgrade('factory', 5, 'Recombobulators'),
	tierUpgrade('factory', 6, 'Deep-bake process'),
	tierUpgrade('factory', 7, 'Cyborg workforce'),
	tierUpgrade('factory', 8, '78-hour days'),
	// Bank upgrades
	tierUpgrade('bank', 1, 'Taller tellers'),
	tierUpgrade('bank', 2, 'Scissor-resistant credit cards'),
	tierUpgrade('bank', 3, 'Acid-proof vaults'),
	tierUpgrade('bank', 4, 'Chocolate coins'),
	tierUpgrade('bank', 5, 'Exponential interest rates'),
	tierUpgrade('bank', 6, 'Financial zen'),
	tierUpgrade('bank', 7, 'Way of the wallet'),
	tierUpgrade('bank', 8, 'The stuff rationale'),
	// Temple upgrades
	tierUpgrade('temple', 1, 'Golden idols'),
	tierUpgrade('temple', 2, 'Sacrifices'),
	tierUpgrade('temple', 3, 'Delicious blessing'),
	tierUpgrade('temple', 4, 'Sun festival'),
	tierUpgrade('temple', 5, 'Enlarged pantheon'),
	tierUpgrade('temple', 6, 'Great Baker in the sky'),
	tierUpgrade('temple', 7, 'Creation myth'),
	tierUpgrade('temple', 8, 'Theocracy'),
	// Wizard tower upgrades
	tierUpgrade('wizardtower', 1, 'Pointier hats'),
	tierUpgrade('wizardtower', 2, 'Beardlier beards'),
	tierUpgrade('wizardtower', 3, 'Ancient grimoires'),
	tierUpgrade('wizardtower', 4, 'Kitchen curses'),
	tierUpgrade('wizardtower', 5, 'School of sorcery'),
	tierUpgrade('wizardtower', 6, 'Dark formulas'),
	tierUpgrade('wizardtower', 7, 'Cookiemancy'),
	tierUpgrade('wizardtower', 8, 'Rabbit trick'),
	// Shipment upgrades
	tierUpgrade('shipment', 1, 'Vanilla nebulae'),
	tierUpgrade('shipment', 2, 'Wormholes'),
	tierUpgrade('shipment', 3, 'Frequent flyer'),
	tierUpgrade('shipment', 4, 'Warp drive'),
	tierUpgrade('shipment', 5, 'Chocolate monoliths'),
	tierUpgrade('shipment', 6, 'Generation ship'),
	tierUpgrade('shipment', 7, 'Dyson sphere'),
	tierUpgrade('shipment', 8, 'The final frontier'),
	// Alchemy Lab upgrades
	tierUpgrade('alchemylab', 1, 'Antimony'),
	tierUpgrade('alchemylab', 2, 'Essence of dough'),
	tierUpgrade('alchemylab', 3, 'True chocolate'),
	tierUpgrade('alchemylab', 4, 'Ambrosia'),
	tierUpgrade('alchemylab', 5, 'Aqua crustulae'),
	tierUpgrade('alchemylab', 6, 'Origin crucible'),
	tierUpgrade('alchemylab', 7, 'Theory of atomic fluidity'),
	tierUpgrade('alchemylab', 8, 'Beige goo'),
	// Portal upgrades
	tierUpgrade('portal', 1, 'Ancient tablet'),
	tierUpgrade('portal', 2, 'Insane oatling workers'),
	tierUpgrade('portal', 3, 'Soul bond'),
	tierUpgrade('portal', 4, 'Sanity dance'),
	tierUpgrade('portal', 5, 'Brane transplant'),
	tierUpgrade('portal', 6, 'Deity-sized portals'),
	tierUpgrade('portal', 7, 'End of times back-up plan'),
	tierUpgrade('portal', 8, 'Maddening chants'),
	// Time Machine upgrades
	tierUpgrade('timemachine', 1, 'Flux capacitors'),
	tierUpgrade('timemachine', 2, 'Time paradox resolver'),
	tierUpgrade('timemachine', 3, 'Quantum conundrum'),
	tierUpgrade('timemachine', 4, 'Causality enforcer'),
	tierUpgrade('timemachine', 5, 'Yestermorrow comparators'),
	tierUpgrade('timemachine', 6, 'Far future enactment'),
	tierUpgrade('timemachine', 7, 'Great loop hypothesis'),
	tierUpgrade('timemachine', 8, 'Cookietopian moments of maybe'),
	// Antimatter Condenser upgrades
	tierUpgrade('antimattercondenser', 1, 'Sugar bosons'),
	tierUpgrade('antimattercondenser', 2, 'String theory'),
	tierUpgrade('antimattercondenser', 3, 'Large macaron collider'),
	tierUpgrade('antimattercondenser', 4, 'Big bang bake'),
	tierUpgrade('antimattercondenser', 5, 'Reverse cyclotrons'),
	tierUpgrade('antimattercondenser', 6, 'Nanocosmics'),
	tierUpgrade('antimattercondenser', 7, 'The Pulse'),
	tierUpgrade('antimattercondenser', 8, 'Some other super-tiny fundamental particle? Probably?'),
	// Prism upgrades
	tierUpgrade('prism', 1, 'Gem polish'),
	tierUpgrade('prism', 2, '9th color'),
	tierUpgrade('prism', 3, 'Chocolate light'),
	tierUpgrade('prism', 4, 'Grainbow'),
	tierUpgrade('prism', 5, 'Pure cosmic light'),
	tierUpgrade('prism', 6, 'Glow-in-the-dark'),
	tierUpgrade('prism', 7, 'Lux sanctorum'),
	tierUpgrade('prism', 8, 'Reverse shadows'),
];
var upgradeTypes = {};
upgradeList.forEach(function(v){ upgradeTypes[v.label] = v; });

var priceIncrease = 1.15;


// Section 2. Utility functions

function ts(){
	return new Date().getTime();
}

function buildingCost(state, name){
	var building = buildingTypes[name];
	var buildingCount = state.get('buildingCount').get(name, 0);
	var cost = Math.floor(building.baseCost * Math.pow(priceIncrease, buildingCount));
	return cost;
}

function CpSTotal(state){
	var buildingsTotal = buildingTypeList.reduce(function(sum, v){
			return sum + CpSBuilding(state, v.name);
	}, 0);
	return buildingsTotal * state.get('debugMultiplier', 1);
}

function CpSBuilding(state, name){
	var building = buildingTypes[name];
	var buildingCount = state.get('buildingCount').get(name);
	var rate = building.baseClicks * buildingCount;
	switch(name){
		case 'cursor':
			if(state.get('upgradesPurchased').has('Reinforced index finger')) rate *= 2;
			if(state.get('upgradesPurchased').has('Carpal tunnel prevention cream')) rate *= 2;
			if(state.get('upgradesPurchased').has('Ambidextrous')) rate *= 2;
			break;
		case 'grandma':
			if(state.get('upgradesPurchased').has('Forwards from grandma')) rate*=2;
			if(state.get('upgradesPurchased').has('Steel-plated rolling pins')) rate*=2;
			if(state.get('upgradesPurchased').has('Lubricated dentures')) rate*=2;
			if(state.get('upgradesPurchased').has('Prune juice')) rate*=2;
			if(state.get('upgradesPurchased').has('Double-thick glasses')) rate*=2;
			if(state.get('upgradesPurchased').has('Aging agents')) rate*=2;
			if(state.get('upgradesPurchased').has('Xtreme walkers')) rate*=2;
			if(state.get('upgradesPurchased').has('The Unbridling')) rate*=2;
			if(state.get('upgradesPurchased').has('Farmer grandmas')) rate*=2;
			if(state.get('upgradesPurchased').has('Miner grandmas')) rate*=2;
			if(state.get('upgradesPurchased').has('Worker grandmas')) rate*=2;
			if(state.get('upgradesPurchased').has('Banker grandmas')) rate*=2;
			if(state.get('upgradesPurchased').has('Priestess grandmas')) rate*=2;
			if(state.get('upgradesPurchased').has('Witch grandmas')) rate*=2;
			if(state.get('upgradesPurchased').has('Cosmic grandmas')) rate*=2;
			if(state.get('upgradesPurchased').has('Transmuted grandmas')) rate*=2;
			if(state.get('upgradesPurchased').has('Altered grandmas')) rate*=2;
			if(state.get('upgradesPurchased').has('Grandmas\' grandmas')) rate*=2;
			if(state.get('upgradesPurchased').has('Antigrandmas grandmas')) rate*=2;
			if(state.get('upgradesPurchased').has('Rainbow grandmas')) rate*=2;
			break;
	}
	return rate;
}

function bigCookieClickCookies(state){
	var rate = 1;
	// These upgrades also affect big cookie clicks (it's supposed to be the same thing)
	if(state.get('upgradesPurchased').has('Reinforced index finger')) rate *= 2;
	if(state.get('upgradesPurchased').has('Carpal tunnel prevention cream')) rate *= 2;
	if(state.get('upgradesPurchased').has('Ambidextrous')) rate *= 2;
	return rate;
}

function CookiesNow(state, now){
	if(!now) now = ts();
	return state.get('cookies') + (now-state.get('ts'))/1000*CpSTotal(state);
}

exports.serializeState = serializeState;
function serializeState(state){
	return JSON.stringify(state);
}

exports.restoreState = restoreState;
function restoreState(json){
	var obj = JSON.parse(json);
	return Immutable.fromJS(obj).merge({
		upgradesPurchased: Immutable.Set.of.apply(Immutable.Set, obj.upgradesPurchased),
	});
}


// Section 3. State machine
exports.arccReducer = arccReducer;
function arccReducer(state, action) {
	if (typeof state != 'object') {
		throw new Error('Missing application state');
	}
	//if(typeof action.type != 'string') return state;
	switch (action.type) {
		case '@@redux/INIT':
			return state;
		case 'fixState':
			// Saves the current number of cookies to "cookies" and maybe anything else needed to ensure the state is in a good place for saving
			var cookiesNow = CookiesNow(state, action.ts);
			return state.merge({
				ts: action.ts,
				cookies: cookiesNow,
				cookiesEarned: cookiesNow - state.get('cookies') + state.get('cookiesEarned'),
			});
		case 'setState':
			// Merely load a given state
			// If you want to continue as if cookies were being generated in the background, after being saved, use this
			return action.state;
		case 'resume':
			// Continue as if the save state was saved right just now
			return action.state.set('ts', action.ts);
		case 'bigCookieClick':
			var cookiesNow = CookiesNow(state, action.ts);
			var cookiesEarned = bigCookieClickCookies(state);
			return state.merge({
				ts: action.ts,
				cookies: cookiesNow + cookiesEarned,
				// Count the cookie click and any cookies generated by buildings since the last action towards cookiesEarned
				cookiesEarned: cookiesNow - state.get('cookies') + state.get('cookiesEarned') + cookiesEarned,
			});
		case 'upgradePurchase':
			var cookiesNow = CookiesNow(state, action.ts);
			var hasUpgrade = state.get('upgradesPurchased').has(action.upgradeName);
			var cost = upgradeTypes[action.upgradeName].cost;
			// TODO: Upgrades can be made cheaper with a number of other upgrades
			if(cookiesNow<cost) throw new Error('Insufficent funds!');
			return state.merge({
				ts: action.ts,
				cookies: cookiesNow-cost,
				cookiesEarned: cookiesNow - state.get('cookies') + state.get('cookiesEarned'),
				upgradesPurchased: state.get('upgradesPurchased').add(action.upgradeName),
			});
		case 'buildingPurchase':
			var cookiesNow = CookiesNow(state, action.ts);
			var buildingCount = state.get('buildingCount').get(action.buildingName);
			var cost = buildingCost(state, action.buildingName);
			if(cookiesNow<cost) throw new Error('Insufficent funds!');
			return state.mergeDeep({
				ts: action.ts,
				cookies: cookiesNow-cost,
				cookiesEarned: cookiesNow - state.get('cookies') + state.get('cookiesEarned'),
				buildingCount: new Immutable.Map([[action.buildingName, buildingCount+1]]),
			});
		default:
			throw new Error('Unknown action type '+JSON.stringify(action.type));
	}
}

// Section 4. User Interface

exports.CookieClickerMain = CookieClickerMain;
function CookieClickerMain(props) {
	var state = props.state;
	var cookiesNow = CookiesNow(state, ts());
	var cookiesEarnedNow = cookiesNow - state.get('cookies') + state.get('cookiesEarned');
	return React.createElement("div", {}, [
		React.createElement(HelloMessage, {name:state.get('bakeryName')}),
		React.createElement('h1', {}, 'Big Cookie'),
		React.createElement('div', {}, Math.floor(CookiesNow(props.state, ts())) + ' Cookies'),
		React.createElement('div', {}, CpSTotal(props.state) + ' Cookies per Second'),
		React.createElement(BigCookieButton, props),
		React.createElement('h1', {}, 'Store'),
		React.createElement('h2', {}, 'Upgrades'),
		React.createElement('ul', {}, upgradeList.map(function(v){
			if(state.get('upgradesPurchased').has(v.label)) return null;
			if(!upgradeTypes[v.label].unlocked(props.state)) return null;
			return React.createElement('li', {}, React.createElement(UpgradePurchaseButton, {
				label: v.label,
				price: v.cost,
				onClick: function(){ props.onUpgradePurchase({name:v.label}); },
			}));
		})),
		React.createElement('h2', {}, 'Buildings'),
		React.createElement('ul', {}, buildingTypeList.map(function(v){
			if(cookiesEarnedNow+15<v.baseCost) return null;
			return React.createElement('li', {}, React.createElement(StorePurchaseButton, {
				label: v.label,
				price: buildingCost(props.state, v.name),
				inventory: state.get('buildingCount').get(v.name, 0),
				onClick: function(){ props.onPurchase({name:v.name}); },
			}));
		})),
		React.createElement('h1', {}, 'Options'),
		React.createElement('button', {type:'button', onClick:props.onSaveGame}, "Save Game"),
		React.createElement('button', {type:'button', onClick:props.onLoadGame}, "Load Game"),
		React.createElement('h1', {}, 'Stats'),
		React.createElement('pre', {}, JSON.stringify(props.state,null,'\t')),
		React.createElement('h1', {}, 'Info'),
		React.createElement('p', {}, 'See the README'),
    ]);
}

function UpgradePurchaseButton(props) {
	return React.createElement("button", {type:'button', onClick:props.onClick}, props.label+': '+props.price);
}

function StorePurchaseButton(props) {
	return React.createElement("button", {type:'button', onClick:props.onClick}, props.label+': '+props.price+' ('+props.inventory+')');
}

function HelloMessage(props) {
	return React.createElement("div", null, ""+props.name+"'s Bakery");
}

function BigCookieButton(props) {
	return React.createElement("div", null, [
       React.createElement('button', {type:'button', onClick:props.onBigCookieClick}, "Cookie")
   ]);
}

// Section 5. Document initialization

exports.initialState = initialState;
function initialState(){
	var startDate = ts();
	var initialState = {
		arccStateVersion: 1,
		startDate: startDate,
		ts: startDate,
		playMode: 'full',
		bakeryName: 'Snazzy Kitten',
		cookies: 0,
		cookiesEarned: 0,
		handmadeCookies: 0,
		buildingCount: new Immutable.Map(buildingTypeList.map(function(v){ return [v.name, 0]; })),
		upgradesPurchased: new Immutable.Set,
	};
	return new Immutable.Map(initialState);
}

function onLoad(){
	var e = document.getElementById('state');
	var state = e ? restoreState(e.innerText) : initialState() ;
	var store = Redux.createStore(arccReducer, state);
	window.Game = {store:store};
	store.subscribe(render);
	window.setInterval(render, 100);
	render();
	function render(){
		var props = {
			state: store.getState(),
			onLoadGame: function(){ var state=restoreState(window.localStorage.getItem("saved")); store.dispatch({type:'resume', state:state, ts:ts()}); },
			onSaveGame: function(){ store.dispatch({type:'fixState', ts:ts()}); window.localStorage.setItem("saved", serializeState(store.getState())); },
			onBigCookieClick: function(){ store.dispatch({type:'bigCookieClick', ts:ts()}); },
			onUpgradePurchase: function(e){ store.dispatch({type:'upgradePurchase', ts:ts(), upgradeName:e.name}); },
			onPurchase: function(e){ store.dispatch({type:'buildingPurchase', ts:ts(), buildingName:e.name}); },
		};
		ReactDOM.render(React.createElement(CookieClickerMain, props), document.getElementById('main'));
	}
}
