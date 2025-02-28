
// variables for settings and if they're active or not
let s_active = false;
let s_randChar = false

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
    let split_keywords = ["boon", "teamwork", "invocation"]
    
    if (split_keywords.includes(split_name[0])) {
        split_name[0] += ":"
    }

    return split_name.join(" ").toUpperCase();
    console.log(perk_name.split("_"))
}

// survivor search function
function search(query) {
	document.getElementById("k").querySelector(".char-box").innerHTML = ""

    Survivor.all_survivors.forEach((s) => {
        if (s.display_name.includes(query.toUpperCase())) s.addToSidebar();
    })
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
		if(Array.isArray(name)) {
			name.forEach((n) => {
				let p = new Perk(n, this.display_name, desc);
				this.perks.push(p);
			})
		}
		else {
			let p = new Perk(name, this.display_name, desc);
			this.perks.push(p);
		}

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

        if (!this.enabled) clone.querySelector(".item").style.background = "#ff000042";

		document.getElementById("k").querySelector(".char-box").appendChild(clone)
	}
}

function randomChar() {
	let all_sur = [];

	Survivor.all_survivors.forEach((e) => {
		if (e.enabled) all_sur.push(e);
	})

	let char = all_sur[Math.floor(Math.random() * all_sur.length)]
	
	parent = document.getElementsByClassName("char-holder")[0];

	parent.querySelector("img").src = "images/survivor_icons/" + char.name + ".webp"
	parent.querySelector("p").innerHTML = char.display_name;
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

	if (s_randChar) {
		randomChar();
	}

}

// Open Survivor Menu
document.querySelectorAll(".header-item")[0].addEventListener("click", () => {
	document.querySelector("#k").style.width = "50%"
	manageChildren(document.querySelector("#k").children, false)
})

// Close Survivor Menu
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
dwight.perk(["bond", "leader", "prove_thyself"])

const meg = new Survivor("meg_thomas")
meg.perk(["adrenaline", "quick_&_quiet", "sprint_burst"])

const claudette = new Survivor("claudette_morel")
claudette.perk(["botany_knowledge", "empathy", "self_care"])

const jake = new Survivor("jake_park")
jake.perk(["calm_spirit", "iron_will", "saboteur"])

const nea = new Survivor("nea_karlsson")
nea.perk(["balanced_landing", "streetwise", "urban_evasion"])

const laurie = new Survivor("laurie_strode")
laurie.perk(["decisive_strike", "object_of_obsession", "sole_survivor"])

const ace = new Survivor("ace_visconti")
ace.perk(["ace_in_the_hole", "open_handed", "up_the_ante"])

const bill = new Survivor("bill_overbeck")
bill.perk(["borrowed_time", "left_behind", "unbreakable"])

const feng = new Survivor("feng_min")
feng.perk(["alert", "lithe", "technician"])

const david_k = new Survivor("david_king")
david_k.perk(["dead_hard", "were_gonna_live_forever", "no_mither"])

const quentin = new Survivor("quentin_smith")
quentin.perk(["pharmacy", "vigil", "wake_up"])

const david_t = new Survivor("david_tapp")
david_t.perk(["detectives_hunch", "stake_out", "tenacity"])

const kate = new Survivor("kate_denson")
kate.perk(["boil_over", "windows_of_opportunity", "dance_with_me"])

const adam = new Survivor("adam_francis")
adam.perk(["autodidact", "deliverance", "diversion"])

const jeff = new Survivor("jeff_johansen")
jeff.perk(["aftercare", "breakdown", "distortion"])

const jane = new Survivor("jane_romero")
jane.perk(["head_on", "poised", "solidarity"])

const ash = new Survivor("ash_williams")
ash.perk(["buckle_up", "flip_flop", "mettle_of_man"])

const nancy = new Survivor("nancy_wheeler")
nancy.perk(["better_together", "fixated", "inner_strength"])

const steve = new Survivor("steve_harrington")
steve.perk(["babysitter", "camaraderie", "second_wind"])

const yui = new Survivor("yui_kimura")
yui.perk(["any_means_necessary", "breakout", "lucky_break"])

const zarina = new Survivor("zarina_kassir")
zarina.perk(["for_the_people", "off_the_record", "red_herring"])

const cheryl = new Survivor("cheryl_mason")
cheryl.perk(["blood_pact", "repressed_alliance", "soul_guard"])

const felix = new Survivor("felix_richter")
felix.perk(["built_to_last", "desperate_measures", "visionary"])

const elodie = new Survivor("elodie_rakoto")
elodie.perk(["appraisal", "deception", "power_struggle"])

const yun = new Survivor("yun_jin_lee")
yun.perk(["fast_track", "self_preservation", "smash_hit"])

const jill = new Survivor("jill_valentine")
jill.perk(["blast_mine", "counterforce", "resurgence"])

const leon = new Survivor("leon_scott_kennedy")
leon.perk(["bite_the_bullet", "flashbang", "rookie_spirit"])

const mikaela = new Survivor("mikaela_reid")
mikaela.perk(["boon_circle_of_healing", "boon_shadow_step", "clairvoyance"])

const jonah = new Survivor("jonah_vasquez")
jonah.perk(["boon_exponential", "corrective_action", "overcome"])

const yoichi = new Survivor("yoichi_asakawa")
yoichi.perk(["boon_dark_theory", "empathic_connection", "parental_guidance"])

const haddie = new Survivor("haddie_kaur")
haddie.perk(["inner_focus", "overzealous", "residual_manifest"])

const ada = new Survivor("ada_wong")
ada.perk(["low_profile", "reactive_healing", "wiretap"])

const rebecca = new Survivor("rebecca_chambers")
rebecca.perk(["better_than_new","hyperfocus", "reassurance"])

const vittorio = new Survivor("vittorio_toscano")
vittorio.perk(["fogwise", "potential_energy", "quick_gambit"])

const thalita = new Survivor("thalita_lyra")
thalita.perk(["cut_loose", "friendly_competition", "teamwork_power_of_two"])

const renato = new Survivor("renato_lyra")
renato.perk(["background_player", "blood_rush", "teamwork_collective_stealth"])

const gabriel = new Survivor("gabriel_soma")
gabriel.perk(["made_for_this", "scavenger", "troubleshooter"])

const nicolas = new Survivor("nicolas_cage")
nicolas.perk(["dramaturgy", "plot_twist", "scene_partner"])

const ellen = new Survivor("ellen_ripley")
ellen.perk(["chemical_trap", "light_footed", "lucky_star"])

const alan = new Survivor("alan_wake")
alan.perk(["boon_illumination", "champion_of_light", "deadline"])

const sable = new Survivor("sable_ward")
sable.perk(["invocation_weaving_spiders", "strength_in_shadows", "wicked"])

const troupe = new Survivor("the_troupe")
troupe.perk(["bardic_inspiration", "mirrored_illusion", "still_sight"])

const lara = new Survivor("lara_croft")
lara.perk(["finesse", "hardened", "specialist"])

const trevor = new Survivor("trevor_belmont")
trevor.perk(["exultation", "eyes_of_belmont", "moment_of_glory"])

const taurie = new Survivor("taurie_cain")
taurie.perk(["clean_break", "invocation_treacherous_crows", "shoulder_the_burden"])

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



document.getElementsByClassName("bottom")[0].querySelector("span").addEventListener("click", (e) => {
	parent = document.getElementsByClassName("bottom")[0]

	if (s_active) {
		parent.querySelector("img").style.transform = "rotate(0deg)";
		parent.style.height = "auto";
		parent.querySelector("main").style.display = "none";	
	}
	else {
		parent.querySelector("img").style.transform = "rotate(180deg)"
		parent.style.height = "50vh"
		parent.querySelector("main").style.display = "block";	
	}

	s_active = !s_active;
})

function randomCharToggle(element) {

	if(!s_randChar) {
		document.getElementsByClassName("char-holder")[0].style.display = "flex";
	}
	else {
		document.getElementsByClassName("char-holder")[0].style.display = "none";
	}

	s_randChar = !s_randChar;
	element.nextElementSibling.innerHTML = s_randChar;
}