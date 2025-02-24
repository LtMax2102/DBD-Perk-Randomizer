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

function replace_underscore_on_perk(perk_name) {
    let split_name = perk_name.split("_")
    let split_keywords = ["boon", "teamwork"]
    
    if (split_keywords.includes(split_name[0])) {
        split_name[0] += ":"
    }

    return split_name.join(" ").toUpperCase();
    console.log(perk_name.split("_"))
}

class Perk {
	static count = 1;

	constructor(name, survivor = "", desc) {
		this.name = name;
		this.desc = desc;
		this.survivor = survivor;
		this.used = false;
		this.enabled = true;
	}

	add() {
		let temp = document.getElementsByTagName("template")[0];
		let clone = temp.content.cloneNode(true);

		clone.getElementById("image").src = "images/survivor_perk_icons/" + this.name + ".webp";
		clone.getElementById("name").innerHTML = replace_underscore_on_perk(this.name)

		if (this.survivor != "") {
			clone.getElementById("survivor").innerHTML = this.survivor.toUpperCase() + " PERK";
		}

		let t = Perk.count;
		Perk.count++;

		clone.querySelector(".perk").style.gridColumn = t;

		document.querySelector(".perk-holder").appendChild(clone)
	}
}

class Survivor {
	static all_survivors = [];

	constructor(name) {
		this.name = name;
		this.display_name = name.replaceAll("_", " ").toUpperCase();
		this.perks = []
		this.enabled = true;
		Survivor.all_survivors.push(this)
	}

	perk(name, desc) {
		let p = new Perk(name, this.display_name, desc);
		this.perks.push(p);
	}

	addToSidebar() {
		let temp = document.getElementsByTagName("template")[1];
		let clone = temp.content.cloneNode(true);

		clone.querySelector("img").src = "images/survivor_icons/" + this.name + ".webp";
		clone.querySelector("h3").innerHTML = this.display_name;
		clone.querySelector("#state").innerHTML = "Enabled: " + this.enabled;
		clone.querySelector("button").addEventListener("click", (obj) => {
			this.enabled = !this.enabled;
			parent = obj.originalTarget.parentElement;

			if (this.enabled) {
				parent.style.background = "transparent";
			}
			else {
				parent.style.background = "#ff000042";
			}

			parent.querySelector("#state").innerHTML = "Enabled: " + this.enabled;

		})

		document.getElementById("k").querySelector(".char-box").appendChild(clone)
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

	Survivor.all_survivors.forEach((e) => {
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


const dark_sense = new Perk("dark_sense");
const deja_vu = new Perk("deja_vu");
const hope = new Perk("hope");
const kindred = new Perk("kindred");
const lightweight = new Perk("lightweight");
const no_one_left_behind = new Perk("no_one_left_behind");
const plunderers_instinct = new Perk("plunderers_instinct");
const premonition = new Perk("premonition");
const resilience = new Perk("resilience");
const slippery_meat = new Perk("slippery_meat");
const small_game = new Perk("small_game");
const spine_chill = new Perk("spine_chill");
const this_is_not_happening = new Perk("this_is_not_happening");
const well_make_it = new Perk("well_make_it");

const common_perks = [dark_sense, deja_vu, hope, kindred, lightweight, no_one_left_behind, plunderers_instinct, premonition, resilience, slippery_meat, small_game, spine_chill, this_is_not_happening, well_make_it]

let all_perks = []


// All Survivors 
const dwight = new Survivor("dwight_fairfield")
dwight.perk("bond")
dwight.perk("leader")
dwight.perk("prove_thyself")

const meg = new Survivor("meg_thomas")
meg.perk("adrenaline")
meg.perk("quick_&_quiet")
meg.perk("sprint_burst")

const claudette = new Survivor("claudette_morel")
claudette.perk("botany_knowledge")
claudette.perk("empathy")
claudette.perk("self_care")

const jake = new Survivor("jake_park")
jake.perk("calm_spirit")
jake.perk("iron_will")
jake.perk("saboteur")

const nea = new Survivor("nea_karlsson")
nea.perk("balanced_landing")
nea.perk("streetwise")
nea.perk("urban_evasion")

const laurie = new Survivor("laurie_strode")
laurie.perk("decisive_strike")
laurie.perk("object_of_obsession")
laurie.perk("sole_survivor")

const ace = new Survivor("ace_visconti")
ace.perk("ace_in_the_hole")
ace.perk("open_handed")
ace.perk("up_the_ante")

const bill = new Survivor("bill_overbeck")
bill.perk("borrowed_time")
bill.perk("left_behind")
bill.perk("unbreakable")

const feng = new Survivor("feng_min")
feng.perk("alert")
feng.perk("lithe")
feng.perk("technician")

const david_k = new Survivor("david_king")
david_k.perk("dead_hard")
david_k.perk("were_gonna_live_forever")
david_k.perk("no_mither")

const quentin = new Survivor("quentin_smith")
quentin.perk("pharmacy")
quentin.perk("vigil")
quentin.perk("wake_up")

const david_t = new Survivor("david_tapp")
david_t.perk("detectives_hunch")
david_t.perk("stake_out")
david_t.perk("tenacity")

const kate = new Survivor("kate_denson")
kate.perk("boil_over")
kate.perk("windows_of_opportunity")
kate.perk("dance_with_me")

const adam = new Survivor("adam_francis")
adam.perk("autodidact")
adam.perk("deliverance")
adam.perk("diversion")

const jeff = new Survivor("jeff_johansen")
jeff.perk("aftercare")
jeff.perk("breakdown")
jeff.perk("distortion")

const jane = new Survivor("jane_romero")
jane.perk("head_on")
jane.perk("poised")
jane.perk("solidarity")

const ash = new Survivor("ash_williams")
ash.perk("buckle_up")
ash.perk("flip_flop")
ash.perk("mettle_of_man")

const nancy = new Survivor("nancy_wheeler")
nancy.perk("better_together")
nancy.perk("fixated")
nancy.perk("inner_strength")

const steve = new Survivor("steve_harrington")
steve.perk("babysitter")
steve.perk("camaraderie")
steve.perk("second_wind")

const yui = new Survivor("yui_kimura")
yui.perk("any_means_necessary")
yui.perk("breakout")
yui.perk("lucky_break")

const zarina = new Survivor("zarina_kassir")
zarina.perk("for_the_people")
zarina.perk("off_the_record")
zarina.perk("red_herring")

const cheryl = new Survivor("cheryl_mason")
cheryl.perk("blood_pact")
cheryl.perk("repressed_alliance")
cheryl.perk("soul_guard")

const felix = new Survivor("felix_richter")
felix.perk("built_to_last")
felix.perk("desperate_measures")
felix.perk("visionary")

const elodie = new Survivor("elodie_rakoto")
elodie.perk("appraisal")
elodie.perk("deception")
elodie.perk("power_struggle")

const yun = new Survivor("yun_jin_lee")
yun.perk("fast_track")
yun.perk("self_preservation")
yun.perk("smash_hit")

const jill = new Survivor("jill_valentine")
jill.perk("blast_mine")
jill.perk("counterforce")
jill.perk("resurgence")

const leon = new Survivor("leon_scott_kennedy")
leon.perk("bite_the_bullet")
leon.perk("flashbang")
leon.perk("rookie_spirit")

const mikaela = new Survivor("mikaela_reid")
mikaela.perk("boon_circle_of_healing")
mikaela.perk("boon_shadow_step")
mikaela.perk("clairvoyance")

const jonah = new Survivor("jonah_vasquez")
jonah.perk("boon_exponential")
jonah.perk("corrective_action")
jonah.perk("overcome")

const yoichi = new Survivor("yoichi_asakawa")
yoichi.perk("boon_dark_theory")
yoichi.perk("empathic_connection")
yoichi.perk("parental_guidance")

const haddie = new Survivor("haddie_kaur")
haddie.perk("inner_focus")
haddie.perk("overzealous")
haddie.perk("residual_manifest")

const ada = new Survivor("ada_wong")
ada.perk("low_profile")
ada.perk("reactive_healing")
ada.perk("wiretap")


const rebecca = new Survivor("rebecca_chambers")
rebecca.perk("better_than_new")
rebecca.perk("hyperfocus")
rebecca.perk("reassurance")

const vittorio = new Survivor("vittorio_toscano")
vittorio.perk("fogwise")
vittorio.perk("potential_energy")
vittorio.perk("quick_gambit")

const thalita = new Survivor("thalita_lyra")
thalita.perk("cut_loose")
thalita.perk("friendly_competition")
thalita.perk("teamwork_power_of_two")

const renato = new Survivor("renato_lyra")
renato.perk("background_player")
renato.perk("blood_rush")
renato.perk("teamwork_collective_stealth")




// template for characters 
// const adam = new Survivor("adam_francis")
// adam.perk("")
// adam.perk("")
// adam.perk("")

window.onload = () => {
	addRandomOnInit();
	


	Survivor.all_survivors.forEach((e) => {
		e.addToSidebar()
	})
}
