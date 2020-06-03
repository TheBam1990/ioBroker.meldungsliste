"use strict";

/*
 * Created with @iobroker/create-adapter v1.23.0
 */

// Über das Adapter-Core-Modul haben Sie Zugriff auf die ioBroker-Kernfunktionen
// you need to create an adapter
const utils = require("@iobroker/adapter-core");

// Load your modules here, e.g.:
// const fs = require("fs");
//setInterval(function(){
	//	class Meldungsliste extends utils.Adapter

//}, 3000);

class Meldungsliste extends utils.Adapter {




	/* *
	 * @param {Partial<ioBroker.AdapterOptions>} [options={}]
	 */
	constructor(options) {
		super({
			...options,
			name: "meldungsliste",
		});
		this.on("ready", this.onReady.bind(this));
		this.on("objectChange", this.onObjectChange.bind(this));
		this.on("stateChange", this.onStateChange.bind(this));
		// this.on("message", this.onMessage.bind(this));
		this.on("unload", this.onUnload.bind(this));
		
		this.i = 1;
	}

	/**
	 * Is called when databases are connected and adapter received configuration.
	 */
	
	async onReady() {
		// Initialize your adapter here
		
//var test1= this.getState("ping.0.iobroker-ODROID-H2.192_168_2_171");
//var test1= this.getState("ping.0.iobroker-ODROID-H2.192_168_2_171").val;
		// Auf die Adapterkonfiguration (im Instanzobjekt alles unter dem Attribut "native") kann über zugegriffen werden
		// this.config:
		//this.log.info("Test log: " + this.config.devices.length);
		this.log.info("Test: " + JSON.stringify(this.config))
		this.log.info("Länge: " + JSON.stringify(this.config.devices.length))
		this.log.info("Intervall: " + JSON.stringify(this.config.interval))
		this.log.info("Wert 1 name: " + JSON.stringify(this.config.devices[0].name))
		this.log.info("Wert 1 if anweisung: " + JSON.stringify(this.config.devices[0].if))
		this.log.info("Wert 1 meldetext: " + JSON.stringify(this.config.devices[0].room))
		//this.log.info("Abfrage von systemadapter ping: " + JSON.stringify(this.getObjectAsync("ping.0.iobroker-ODROID-H2.192_168_2_171")))
		//var linkedObjState = await this.getForeignStateAsync("ping.0.iobroker-ODROID-H2.192_168_2_171");

		//	this.log.info("Abfrage von systemadapter ping: " + JSON.stringify(linkedObjState.val))
		//this.log.info("Abfrage von systemadapter ping: " + JSON.stringify(this.getForeignObjectAsync("ping.0.iobroker-ODROID-H2.192_168_2_171")))
		//this.log.info("Wert 1: " + this.getState("ping.0.iobroker-ODROID-H2.192_168_2_171", val))
		//this.log.info("Wert 1: " + JSON.stringify(zw))
		//this.log.info("Abfrage von ping.ip: " + JSON.stringify(this.getState("ping.0.iobroker-ODROID-H2.192_168_2_171")))
	//this.log.info("Test länge: " + this.config.devices.length);
	//this.log.info("Test interval: " + this.adapter.config.interval);


    

		
		/*
		Für jeden Zustand im System muss es auch ein Objekt vom Typ Zustand geben
		Hier eine einfache Vorlage für eine boolesche Variable namens "testVariable"
		Da jede Adapterinstanz ihre eigenen eindeutigen Namespace-Variablennamen verwendet, können diese nicht mit anderen Adaptervariablen kollidieren
		*/
		
		await this.setObjectAsync("Meldungen", {
			type: "state",
			common: {
				name: "Meldungen",
				type: "string",
				role: "state",
				def: 0,
				read: true,
				write: true
			},
			native: {},
		});

		// In dieser Vorlage werden alle Statusänderungen im Adapter-Namespace abonniert
		this.subscribeStates("*");

		/*
		setState Beispiele
		Sie werden feststellen, dass jeder setState das stateChange-Ereignis auslöst (aufgrund des obigen subscribeStates-cmd).
		*/
		//Die Variable testVariable wird als Befehl auf true gesetzt (ack = false).
		//await this.setStateAsync("Meldungen", adapter.config.devices.length);
//setInterval(function() { 
     

		// das Gleiche, aber der Wert ist mit "ack" gekennzeichnet.
		// ack sollte immer auf true gesetzt werden, wenn der Wert vom Zielsystem empfangen oder bestätigt wird
		//await this.setStateAsync("Meldungen", { val: adapter.config.data-index, ack: true });
		//await this.setStateAsync("Meldungen", { val: this.config.devices.length, ack: true });
		//await this.setState("Meldungen", { val: "test", ack: true });
		//await this.setStateAsync("Meldungen", { val: true, ack: true });
		//await this.setStateAsync("Meldungen", true);
		//await this.setStateAsync("Meldungen", { val: true, ack: true });
		//await this.setState("Meldungen", { val: "test", ack: true });
		 //this.setStateAsync("Meldungen", { val: this.config.devices.length, ack: true });
		 //await this.setStateAsync("Meldungen", { val: this.config.devices.length, ack: true });
		  //this.setState("Meldungen", { val: this.config.devices.length, ack: true });
		  //await this.setStateAsync("Meldungen", this.config.devices.length);   		//hier klappt es
		  //await this.setStateAsync("Meldungen", { val: this.config.devices[0].room, ack: true });
		  await this.setStateAsync("Meldungen", this.config.devices[0].room); 
		  	
	

		// das gleiche, aber der Status wird nach 30s gelöscht (getState gibt danach null zurück)
		//await this.setStateAsync("testVariable", { val: true, ack: true, expire: 30 });

		// Beispiele für die Funktionen checkPassword / checkGroup
		/*let result = await this.checkPasswordAsync("admin", "iobroker");
		this.log.info("check user admin pw iobroker: " + result);

		result = await this.checkGroupAsync("admin", "admin");
		this.log.info("check group user admin group admin: " + result);
	this.setStateAsync("Meldungen", true);
	//await this.setState("Meldungen", { val: this.adapter.config.devices.length, ack: true });*/
	//await this.setState("Meldungen", { val: this.config.devices.length, ack: true });
	const callback = (i) => {
	this.log.info('interval run ' + i);
	//this.on("ready", this.onReady.bind(this));
	//this.setState("Meldungen", { val: this.config.devices[0].room});
	
	/*
				var linkedObjState = await this.getForeignStateAsync(this.config.devices[0].name);
			var abfrage=this.config.devices[0].if;	
			var boolValue = (/true/i).test(abfrage)
	 //Ab hier eigentlicher Code
	//var linkedObjState = await this.getForeignStateAsync(this.config.devices[0].name);
	if(linkedObjState.val == boolValue){
	this.setState("Meldungen", { val: this.config.devices[0].room});
	this.log.info("Wert 1 meldetext: " + JSON.stringify(this.config.devices[0].room));
	} else {
	this.setState("Meldungen", { val: "0"});
	this.log.info("Wert 1 meldetext test " + linkedObjState.val);
	this.log.info("Wert 1 if anweisung: " + JSON.stringify(boolValue))
	}   */
}

setInterval(() => {
callback(this.i); 
this.i++;
}, this.config.interval);
	


	/**
	 * Wird aufgerufen, wenn der Adapter heruntergefahren wird - Rückruf muss unter keinen Umständen aufgerufen werden!
	 * @param {() => void} callback
	 */
	 }
	 

	 
	onUnload(callback) {
		try {
			this.log.info("cleaned everything up...");
			callback();
		} catch (e) {
			callback();
		}
	}

	/**
	 * Wird aufgerufen, wenn sich ein abonniertes Objekt ändert
	 * @param {string} id
	 * @param {ioBroker.Object | null | undefined} obj
	 */
	onObjectChange(id, obj) {
		if (obj) {
			// The object was changed
			this.log.info(`object ${id} changed: ${JSON.stringify(obj)}`);
		} else {
			// The object was deleted
			this.log.info(`object ${id} deleted`);
		}
	}

	/**
	 * Wird aufgerufen, wenn sich ein abonnierter Status ändert
	 * @param {string} id
	 * @param {ioBroker.State | null | undefined} state
	 */
	onStateChange(id, state) {
		if (state) {
			// The state was changed
			//this.log.info(`state ${id} changed: ${state.val} (ack = ${state.ack})`);		//Schreibt änderung vom Objekt ins LOG
		} else {
			// The state was deleted
			this.log.info(`state ${id} deleted`);
		}
	}

	// /**
	//  * Some message was sent to this instance over message box. Used by email, pushover, text2speech, ...
	//  * Using this method requires "common.message" property to be set to true in io-package.json
	//  * @param {ioBroker.Message} obj
	//  */
	// onMessage(obj) {
	// 	if (typeof obj === "object" && obj.message) {
	// 		if (obj.command === "send") {
	// 			// e.g. send email or pushover or whatever
	// 			this.log.info("send command");

	// 			// Send response in callback if required
	// 			if (obj.callback) this.sendTo(obj.from, obj.command, "Message received", obj.callback);
	// 		}
	// 	}
	// }

}

// @ts-ignore parent ist eine gültige Eigenschaft für das Modul
if (module.parent) {
	// Exportieren Sie den Konstruktor im kompakten Modus
	/**
	 * @param {Partial<ioBroker.AdapterOptions>} [options={}]
	 */
	module.exports = (options) => new Meldungsliste(options);
} else {
	// Andernfalls starten Sie die Instanz direkt
	new Meldungsliste();
}


function auslesen (){
var linkedObjState = await this.getForeignStateAsync(this.config.devices[0].name);
			var abfrage=this.config.devices[0].if;	
			var boolValue = getBoolean(abfrage); //returns true
function getBoolean(value){
   switch(value){
        case true:
        case "true":
        case 1:
        case "1":
        case "on":
        case "yes":
            return true;
        default: 
            return false;
    }
}
	 //Ab hier eigentlicher Code
	//var linkedObjState = await this.getForeignStateAsync(this.config.devices[0].name);
	if(linkedObjState.val == boolValue){
	this.setState("Meldungen", { val: this.config.devices[0].room});
	this.log.info("Wert 1 meldetext: " + JSON.stringify(this.config.devices[0].room));
	} else {
	this.setState("Meldungen", { val: "0"});
	this.log.info("Wert 1 meldetext test " + linkedObjState.val);
	this.log.info("Wert 1 if anweisung: " + JSON.stringify(boolValue))
	}
}

