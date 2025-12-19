import { Registry } from "@rbxts/cmdr";

export = function (registry: Registry) {
	registry.RegisterType("timeUnit", registry.Cmdr.Util.MakeEnumType("timeUnit", ["TimeOfDay", "Day", "Season", "Year"]));
};
