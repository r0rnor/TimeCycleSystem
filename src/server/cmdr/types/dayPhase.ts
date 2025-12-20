import { Registry } from "@rbxts/cmdr";

export = function (registry: Registry) {
	registry.RegisterType("dayPhase", registry.Cmdr.Util.MakeEnumType("dayPhase", ["day", "night"]));
};
