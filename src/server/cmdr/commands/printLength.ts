import { CommandDefinition } from "@rbxts/cmdr";

export = identity<CommandDefinition>({
	Name: "print-length",
	Aliases: ["pl"],
	Description: "Prints the length in minutes of the specified day phase (day or night)",
	Group: "Default",
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
