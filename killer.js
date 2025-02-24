function findChar(string, char) {
	let bounds = []
	for (let i = 0; i < string.length; i++) {
		if (string[i] == char) {
			bounds.push(i)
		}
	}
	return bounds
}

function manageChildren(children, hide) {
	for (let i = 0; i < children.length; i++) {
		if (hide) {
			children[i].style.display = "none"	
		}
		else {
			children[i].style.display = "grid"	
		}
		
	}
}

function addRandomOnInit() {
	document.querySelector(".perk-holder").innerHTML = ''
	for (let i = 0; i < 4; i++) {
		let temp = document.getElementsByTagName("template")[0];
		let c = temp.content.cloneNode(true);
		
		c.getElementById("image").src = "images/chaos_shuffle.webp"

		c.getElementById("name").innerHTML = "Random Perk"

		document.querySelector(".perk-holder").appendChild(c)			
	}
}

function randomize() {
	let rand;
	Perk.count = 1
	document.querySelector(".perk-holder").innerHTML = ''

	all_perks = []

	common_perks.forEach((e) => {
		e.used = false;
		all_perks.push(e)
	})

	Killer.all_killers.forEach((e) => {
		if (e.enabled) {
			e.perks.forEach((p) => {
				p.used = false;
				all_perks.push(p)
			})
		}
	})

	all_perks.forEach((e) => {
		e.used = false;
	});

	if (all_perks.length < 4) {
		for (let i = 0; i < all_perks.length;) {
			rand = Math.floor(Math.random() * all_perks.length);
			if (!all_perks[rand].used && all_perks[rand].enabled) {
				all_perks[rand].add()
				all_perks[rand].used = true;
				i++
			}
		}
	}
	else {
		for (let i = 0; i < 4;) {
			rand = Math.floor(Math.random() * all_perks.length);
			if (!all_perks[rand].used && all_perks[rand].enabled) {
				all_perks[rand].add()
				all_perks[rand].used = true;
				i++
			}
		}
	}
}

class Perk {
	static count = 1;
	constructor(name, desc, killer) {
		this.name = name.toLowerCase().replace(/ /g, '_') 
		this.desc = desc
		this.display_name = name
		this.killer = killer
		this.used = false
		this.enabled = true
		this.element = null
	}

	add() {
		let bounds = findChar(this.desc, '|')
		let main = this.desc.slice(0, bounds[0])
		let bullets = this.desc.slice(bounds[0] + 2, bounds[1]).split(/(?=-)/)
		let quote = this.desc.slice(bounds[1] + 2)

		let temp = document.getElementsByTagName("template")[0];
		let c = temp.content.cloneNode(true);
		
		c.getElementById("image").src = "images/killer_perk_images/" + this.name + ".webp"

		c.getElementById("name").innerHTML = this.display_name.toUpperCase()

		if (this.killer != "") {
			c.getElementById("killer").innerHTML = this.killer.toUpperCase() + " PERK"
		}

		let t = Perk.count;
		Perk.count++;

		c.querySelector(".perk").style.gridColumn = t;

		document.querySelector(".perk-holder").appendChild(c)
	}
}

class Killer {
	static all_killers = []
	constructor(name) {
		this.name = name
		this.display_name = "The " + name[0].toUpperCase() + name.slice(1)
		this.perks = []
		this.enabled = true
		Killer.all_killers.push(this)
	}

	newPerk(name, desc) {
		let p = new Perk(name, desc, this.display_name)
		this.perks.push(p)
		return p
	}
}

// Open Killer Menu
document.querySelectorAll(".header-item")[0].addEventListener("click", () => {
	document.querySelector("#k").style.width = "50%"
	manageChildren(document.querySelector("#k").children, false)
})

// Close Killer Menu
document.querySelectorAll("#close")[0].addEventListener("click", () => {
	document.querySelector("#k").style.width = "0%"
	manageChildren(document.querySelector("#k").children, true)
})


// Open Perk Menu
document.querySelectorAll(".header-item")[1].addEventListener("click", () => {
	document.querySelector("#p").style.width = "50%"
	manageChildren(document.querySelector("#p").children, false)
})

// Close Perk Menu
document.querySelectorAll("#close")[1].addEventListener("click", () => {
	document.querySelector("#p").style.width = "0%"
	manageChildren(document.querySelector("#p").children, true)
})


const bitter_murmur = new Perk("Bitter Murmur", "Unlocks potential in your Aura-reading ability: | -Each time a Generator is completed, the Auras of all Survivors within 16 metres of that Generator are revealed to you for 5 seconds. -Once the last Generator is completed, the Auras of all Survivors are revealed to you for 5/7/10 seconds.", "")
const deerstalker = new Perk("Deerstalker", "Unlocks potential in your Aura-reading ability: | -The Auras of all Survivors in the Dying State within 20/28/36 metres of your location are revealed to you.", "")
const distressing = new Perk("Distressing", "Your horrifying emanation strikes at a supernaturally long distance. | -Increases your Terror Radius by 22/24/26 % -Grants 100 % bonus Bloodpoints for all actions in the Deviousness Category.", "")
const noed = new Perk("No One Escapes Death", "A Hex rooting its power on hope. You are animated by the power of your Hex Totem when the Survivors are on the verge of escaping. Once the Exit Gates are powered, if there is still a Dull Totem remaining in the environment, Hex: No One Escapes Death activates and lights it: | -Grants a 2/3/4 % Haste Status Effect. -Causes all Survivors to suffer permanently from the Exposed Status Effect. Hex: No One Escapes Death remains inactive if no Dull Totems are available. Once the Status Effect is revealed to Survivors, Hex: No One Escapes Death reveals the Aura of its Hex Totem to all Survivors within 4 metres and gradually expands that range to 24 metres over the course of 30 seconds. All effects of the Hex Perk persist until its Hex Totem is cleansed or blessed. | `And the beast became faster and more powerful as if The Entity's shadowy whips were lashing at its back.`", "")
const thrill_of_hunt = new Perk("Thrill Of The Hunt", "A Hex rooting its power on hope. The false hope of Survivors fills you with excitement and strengthens your Totems. For each Totem remaining in the environment, Hex: Thrill of the Hunt is granted 1 Token. | -For each Token, all Survivors suffer from a stack-able 8/9/10 % Action Speed penalty to Cleansing and Blessing Totems, up to a maximum of 40/45/50 %. -Grants a stackable 10 % bonus Bloodpoints for actions in the Hunter Category per Token, up to a maximum of 50 %. | All effects of the Hex Perk persist until its Hex Totem is cleansed or blessed.", "")
const insidious = new Perk("Insidious", "Unlocks the stealth ability. | -Grants the Undetectable Status Effect after standing still for 4/3/2 seconds. -This effect lasts until you start moving again.", "")
const iron_grasp = new Perk("Iron Grasp", "Your powerful grasp on Survivors causes escapes to be nearly impossible. Whenever you are carrying a Survivor, the following effects apply: | -Reduces the strength of the Wiggle effects, causing involuntary strafing, by 75 %. -Increases the maximum Wiggle duration by 4/8/12 %.", "")
const monstrous_shrine = new Perk("Monstrous Shrine", "Your fervent care of the Hooks found in the Basement has aroused The Entity's interest. At the start of the Trial, 4 random Hooks, as well as the 4 Basement Hooks, are changed into Scourge Hooks: |-The Auras of Scourge Hooks are revealed to you in white. -Accelerates the Sacrifice Process by 10/15/20 %. | 'Then you will know that there is no escape. When hanging in the depths, you face the dark one.'", "")
const shattered_hope = new Perk("Shattered Hope", "To capture your prey, you must first extinguish their hope. | -Instead of snuffing Boon Totems you destroy them. -Destroying a Boon Totem this way reveals the Auras of all Survivors that were within its range at that moment for 6/7/8 seconds. | 'Nothing is permanent here. Nothing except our endless perdition.' — Unknown, Notebook ", "")
const sloppy_butcher = new Perk("Sloppy Butcher", "You know where to hit to make them bleed. | -Wounds inflicted by Basic Attacks cause Survivors to suffer from the Haemorrhage and Mangled Status Effects for 70/80/90 seconds. -Increases the Bleeding frequency of injured Survivors by 50/75/100 % for the same duration. -Increases the Regression rate at which partial Healing Progression is lost because of Haemorrhage by +25 %. | 'It is in its sadistic nature. There is no swift kill as it delights in the obscene spectacle of our agonising suffering.'", "")
const spies = new Perk("Spies from the Shadows", "Allows the Crows found in the environment to directly communicate with you. | -Whenever you are within 20/28/36 metres of a Crow that was startled by a nearby Survivor, you are alerted with a Loud Noise Notification. | Spies from the Shadows has a cool-down of 5 seconds between alerts. 'In the shadows they torment, scarring our minds with each scream.'", "")
const unrelenting = new Perk("Unrelenting", "You recuperate faster from missed attacks made with your main weapon. | -Reduces the Cooldown of missed Basic Attacks by 20/25/30 %.", "")
const whispers = new Perk("Whispers", "You have a rudimentary understanding of The Entity's voice. | Whenever at least one Survivor is within 48/40/32 metres of your location, you hear the sporadic whispers of the Entity. | `It is unclear as to the motivations of The Fog, but it is undeniable that it often takes the beast's side.` — Unknown, Notebook ", "")

// let common_perks = [bitter_murmur, deerstalker, distressing, noed, thrill_of_hunt, insidious, iron_grasp, monstrous_shrine, shattered_hope, sloppy_butcher, spies, unrelenting, whispers]
let common_perks = []

let all_perks = []
 	

const trapper = new Killer("trapper")
trapper.newPerk("Unnerving Presence", "Your presence alone instils great fear. Survivors repairing or healing within your Terror Radius suffer from the following effects: | -Increases the Trigger odds of Skill Check by 10 %. -Decreases the Success zone of Skill Checks by 40/50/60 %. | 'Its presence befalls us.'")
trapper.newPerk("Brutal Strength", "Your great strength allows you to shred through your prey's defences. | -Increases the Action speeds for breaking Breakable Walls and dropped Pallets, and damaging Generators by 10/15/20 %. | 'It is more than muscles. A dark power motivates the beast.'")
trapper.newPerk("Agitation", "You get excited in anticipation of hooking your prey. When carrying a Survivor, you benefit from the following effects: | -Increases your Movement speed by 6/12/18 %. -Increases your Terror Radius by +12 metres. | 'At some point, the excitement of hooking one of us becomes more important than the desire to kill us.'")

const wraith = new Killer("wraith")
wraith.newPerk("Bloodhound", "Like a hunting scent hound, you smell traces of blood at a great distance. | -Pools of Blood are shown in bright red and can be tracked for 2/3/4 seconds longer than normal. | 'Pebbles shimmering in the moonlight; my life drips down in a trail so easy to follow.'")
wraith.newPerk("Predator", "Your acute tracking ability allows you to find lost prey more easily. | -When a Survivor loses you in a chase, their Aura is revealed to you for 4 seconds. Predator has a cool-down of 60/50/40 seconds. | `Never stop moving and hope you're always two steps ahead of the beast.` — Unknown, Notebook")
wraith.newPerk("Shadowborn", "You have a keen vision in the darkness of the night. | -When blinded by any means, you are granted a 6/8/10 % Haste Status Effect for 10 seconds. | 'Shining in the darkest dark, his eyes pierce the night and sting your soul.'")

const hillbilly = new Killer("hillbilly")
hillbilly.newPerk("Enduring", "You are resilient to pain. | -Reduces the duration of Pallet Stuns by 40/45/50 %. Enduring has no effect while carrying a Survivor. | 'He stops at nothing.'")
hillbilly.newPerk("Lightborn", "Unlike other beasts of The Fog, you have adapted to light. | -The Auras of Survivors attempting to blind you by any means are revealed to you for 6/8/10 seconds. -Grants immunity from being blinded from Flashlights, Firecrackers, Flash Grenades, and Blast Mine. | 'These monsters... they adapt! They emerge with strange new abilities.' — Vigo, Vigo's Journal")
hillbilly.newPerk("Tinkerer", "Whenever a Generator is repaired to 70 %, you benefit from the following effects: | -Triggers a Loud Noise Notification for that Generator, revealing its location. -Grants the Undetectable Status Effect for the next 12/14/16 seconds. Tinkerer can only trigger once per Generator per Trial. | 'The Hillbilly makes impressive tools out of scraps. Tools aimed at maiming us in creative ways.' — Notebook ")

const nurse = new Killer("nurse")
nurse.newPerk("A Nurses Calling", "Unlocks potential in your Aura-reading ability.| -The Auras of Survivors who are healing or being healed are revealed to you within 20/24/28 metres. | 'Still attached to the fragments of her past life, she is drawn to those in need of help.'")
nurse.newPerk("Stridor", "You are acutely sensitive to the breathing of your prey. | -Increases the volume of Grunts of Pain of injured Survivors by 30/40/50 %. -Increases the volume of regular breathing of Survivors by 15/20/25 %. | 'If you do not stop and catch your breath... she will.'")
nurse.newPerk("Thanatophobia", "Their courage fades in the face of their undeniable mortality. | -Each injured, dying, or hooked Survivor afflicts Survivors with a stack-able 1/1.5/2 % Action Speed penalty to Repairing, Sabotaging, and Cleansing, up to a maximum of 4/6/8 %. -Increases the Action Speed penalty by a further 12 %, if there are 4 Survivors, who are either injured, dying, or hooked at the same time. | 'She plays with us and revels in our pain.'")

function addToSidebar(items, perk = false) {
	let image_path;
	let append_location;
	if (perk) {
		image_path = "images/killer_perk_images/";
		append_location = ".perk-box"
	}
	else {
		image_path = "images/killer_icons/";
		append_location = ".char-box"
	}

	console.log(items)

	let temp = document.getElementsByTagName("template")[1];

	items.forEach((e) => {
		console.log(e)
		if (!perk) {
			addToSidebar(e.perks, true)
		}
		
		let c = temp.content.cloneNode(true);

		console.log(c)

		c.querySelector("img").src = image_path + e.name + ".webp";
		c.querySelector("h3").innerHTML = e.display_name;
		c.querySelector("#state").innerHTML = "Enabled: " + e.enabled;
		c.querySelector("button").addEventListener("click", () => {
			e.enabled = !e.enabled;

			c.querySelector("#state").innerHTML = "Enabled: " + e.enabled;
		})

		document.querySelector(append_location).appendChild(c);
	})

}

function addPerk(e) {
	console.log(e)
}

window.onload = () => {
	addToSidebar(Killer.all_killers)
	// let tracker = 0
	// Killer.all_killers.forEach((e) => {
	// 	let temp = document.getElementsByTagName("template")[1];
	// 	let c = temp.content.cloneNode(true);
	// 	let h = tracker;

	// 	c.querySelector("img").src = "images/killer_icons/" + e.name + ".webp"
	// 	c.querySelector("h3").innerHTML = e.display_name
	// 	c.querySelector("#state").innerHTML = "Enabled: " + e.enabled
	// 	c.querySelector("button").addEventListener("click", () => {
	// 		if (e.enabled) e.enabled = false
	// 		else e.enabled = true
			
	// 		document.getElementsByClassName("character-holder")[h].querySelector("#state").innerHTML = "Enabled: " + e.enabled
	// 	})

	// 	document.querySelector(".char-box").appendChild(c);
	// 	tracker++;
	// })


	// // make it so that when you disable a killer it updates the disabled in the perk list, then they can change that if they want manaually
	// tracker = 0
	// Killer.all_killers.forEach((e) => {
	// 	e.perks.forEach((p) => {
	// 		let temp = document.getElementsByTagName("template")[2];
	// 		let c = temp.content.cloneNode(true);
	// 		let h = tracker;

	// 		c.querySelector("img").src = "images/killer_perk_images/" + p.name + ".webp"
	// 		c.querySelector("h3").innerHTML = p.display_name
	// 		c.querySelector("#state").innerHTML = "Enabled: " + p.enabled
	// 		c.querySelector("button").addEventListener("click", () => {
	// 			if (p.enabled) p.enabled = false
	// 			else p.enabled = true
				
	// 			document.getElementsByClassName("perks")[h].querySelector("#state").innerHTML = "Enabled: " + p.enabled
	// 		})

	// 		document.querySelector(".perk-box").appendChild(c);
	// 		tracker++;			
	// 	})
	// })





	addRandomOnInit()
}


/*

go through each killer and add then, create a function to do that
then go through adding their perks to menu with another function but hopefully the same one
make it so that when the killer is disabled all perks for that killer are automatically set to disabled which I think already happens then update on perk menu



*/
