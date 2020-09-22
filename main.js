"use strict";

/*
 * Created with @iobroker/create-adapter v1.28.0
 */

// The adapter-core module gives you access to the core ioBroker functions
// you need to create an adapter
const utils = require("@iobroker/adapter-core");
const { stat } = require("fs");
let ids_shorts_input = [];

let shorts_in;
let thisval;
let nachricht;

// Load your modules here, e.g.:
// const fs = require("fs");

class Meldungsliste extends utils.Adapter {

	/**
	 * @param {Partial<utils.AdapterOptions>} [options={}]
	 */
	constructor(options) {
		super({
			...options,
			name: "meldungsliste",
		});
		this.on("ready", this.onReady.bind(this));
		this.on("stateChange", this.onStateChange.bind(this));
		// this.on("objectChange", this.onObjectChange.bind(this));
		// this.on("message", this.onMessage.bind(this));
		this.on("unload", this.onUnload.bind(this));
		this.stateValues = {};
	}

	/**
	 * Is called when databases are connected and adapter received configuration.
	 */
	async onReady() {
		// Initialize your adapter here
		shorts_in = this.config.shorts_in;
		// Reset the connection indicator during startup
		//this.setState("info.connection", false, true);

		// The adapters config (in the instance object everything under the attribute "native") is accessible via
		// this.config:
		/*this.log.info("Test: " + JSON.stringify(this.config.shorts_in))
		this.log.info("Länge: " + JSON.stringify(this.config.shorts_in.length))
		this.log.info("Intervall: " + JSON.stringify(this.config.interval))
		this.log.info("Date: " + JSON.stringify(this.config.Date))
		this.log.info("Time: " + JSON.stringify(this.config.time));
		this.log.info("Wert 1 name: " + JSON.stringify(this.config.shorts_in[0].name));
		this.log.info("Wert 1 if anweisung: " + JSON.stringify(this.config.shorts_in[0].if));
		this.log.info("Wert 1 meldetext: " + JSON.stringify(this.config.shorts_in[0].room))  */


		for  (const device in shorts_in){

			this.subscribeForeignStates(shorts_in[device].name_id);
			this.log.info(`Alarmeldungen für state ${shorts_in[device].name_id} aktiviert`);
			const value = await this.getForeignStateAsync(shorts_in[device].name_id);
			if (!value) {
				continue;
			}
			this.log.info("value liste:"+ JSON.stringify(value.val));

			thisval = shorts_in[device].if;   //if wandung in bool
			this.log.info("vor wandlung:" +JSON.stringify(thisval));
			if (thisval == "true"){
				thisval = true;
			} else if (thisval == "false"){
				thisval = false;
			} else if (thisval == "0"){
				thisval = 0;
			}else if (thisval == "1"){
				thisval = 1;
			}
			this.log.info("nach wandlung:" +JSON.stringify(thisval));
			try {
				this.stateValues[shorts_in[device].name_id] = {
					id : shorts_in[device].name_id,
					trigger :   thisval,                         //shorts_in[device].if,
					value : value.val,
					text : shorts_in[device].room
				};

			} catch (error) {
				this.log.error(`Something went wrong ${error}`);
			}

		}

		this.log.info(JSON.stringify(this.stateValues));   //beschriebenes neues arry
		/*
		For every state in the system there has to be also an object of type state
		Here a simple template for a boolean variable named "testVariable"
		Because every adapter instance uses its own unique namespace variable names can't collide with other adapters variables
		*/


		// In order to get state updates, you need to subscribe to them. The following line adds a subscription for our variable we have created above.

		// You can also add a subscription for multiple states. The following line watches all states starting with "lights."
		// this.subscribeStates("lights.*");
		// Or, if you really must, you can also watch all states. Don't do this if you don't need to. Otherwise this will cause a lot of unnecessary load on the system:
		// this.subscribeStates("*");

		/*
			setState examples
			you will notice that each setState will cause the stateChange event to fire (because of above subscribeStates cmd)
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
		// the variable testVariable is set to true as command (ack=false)
		//await this.setStateAsync("testVariable", true);

		// same thing, but the value is flagged "ack"
		// ack should be always set to true if the value is received from or acknowledged from the target system
		//await this.setStateAsync("Meldungen", { val: true, ack: true });

		// same thing, but the state is deleted after 30s (getState will return null afterwards)
		//await this.setStateAsync("testVariable", { val: true, ack: true, expire: 30 });

		// examples for the checkPassword/checkGroup functions
		//let result = await this.checkPasswordAsync("admin", "iobroker");
		//this.log.info("check user admin pw iobroker: " + result);

		//result = await this.checkGroupAsync("admin", "admin");
		//this.log.info("check group user admin group admin: " + result);
	}

	/**
	 * Is called when adapter shuts down - callback has to be called under any circumstances!
	 * @param {() => void} callback
	 */
	onUnload(callback) {
		try {
			// Here you must clear all timeouts or intervals that may still be active
			// clearTimeout(timeout1);
			// clearTimeout(timeout2);
			// ...
			// clearInterval(interval1);

			callback();
		} catch (e) {
			callback();
		}
	}

	// If you need to react to object changes, uncomment the following block and the corresponding line in the constructor.
	// You also need to subscribe to the objects with `this.subscribeObjects`, similar to `this.subscribeStates`.
	// /**
	//  * Is called if a subscribed object changes
	//  * @param {string} id
	//  * @param {ioBroker.Object | null | undefined} obj
	//  */
	// onObjectChange(id, obj) {
	// 	if (obj) {
	// 		// The object was changed
	// 		this.log.info(`object ${id} changed: ${JSON.stringify(obj)}`);
	// 	} else {
	// 		// The object was deleted
	// 		this.log.info(`object ${id} deleted`);
	// 	}
	// }

	/**
	 * Is called if a subscribed state changes
	 * @param {string} id
	 * @param {ioBroker.State | null | undefined} state
	 */

	// state ausgeben wenn geändert wurde
	async onStateChange(id, state, help) {

		//		ids_shorts_input = get_short_ids(shorts_in);
		if (state) {
			// The state was changed

			if (this.stateValues[id].value !==  state.val) {
				this.log.info(`state ${id} changed: ${state.val} (ack = ${state.ack})`);
				this.stateValues[id].value = state.val;
				if  (this.stateValues[id].trigger==this.stateValues[id].value){
					this.log.info(`wert ist nicht gleich und das selbe wie der trigger`);
					if (nachricht == undefined){
						nachricht="";
					}
					nachricht = nachricht + this.stateValues[id].text +  "<br>";
					this.log.info(nachricht);
				} else {
					if (nachricht == undefined){
						nachricht="";
					}
					if (nachricht!=""){
						help=this.stateValues[id].text +  "<br>";
						nachricht = nachricht.replace(help,"");
						this.log.info(nachricht);
					}
				}
				if (nachricht!=""){
					//await this.setStateAsync("nachricht", { val: true, ack: true });
				}

			} else {
				this.log.info(`state ${id} updated: ${state.val} (ack = ${state.ack})`);
				this.log.info(`trigger:${this.stateValues[id].trigger}`);
				this.log.info(`value:${this.stateValues[id].value}`);

			}

		} else {
			// The state was deleted
			this.log.info(`state ${id} deleted`);
		}
		await this.setStateAsync("Meldungen", nachricht);
	}

	// If you need to accept messages in your adapter, uncomment the following block and the corresponding line in the constructor.
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

// @ts-ignore parent is a valid property on module
if (module.parent) {
	// Export the constructor in compact mode
	/**
	 * @param {Partial<utils.AdapterOptions>} [options={}]
	 */
	module.exports = (options) => new Meldungsliste(options);
} else {
	// otherwise start the instance directly
	new Meldungsliste();
}