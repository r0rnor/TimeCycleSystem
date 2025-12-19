import { CommandDefinition } from "@rbxts/cmdr";

export = identity<CommandDefinition>({
	Name: "printLength",
	Aliases: ["print-length"],
	Description: "Increase the Players Currency",
	Group: "Admin",
	Args: [
		{
			Type: "dayPhase",
			Name: "Day Phase",
			Description: "Day Phase",
			Default: "day",
		},
		{
			Type: "number",
			Name: "Day",
			Description: "The day to get the length for",
			Optional: true,
		},
	],
});
