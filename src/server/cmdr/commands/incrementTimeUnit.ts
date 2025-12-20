import { CommandDefinition } from "@rbxts/cmdr";

export = identity<CommandDefinition>({
	Name: "increment-time-unit",
	Aliases: ["incr"],
	Description: "Increments the specified time unit by the given value",
	Group: "Default",
	Args: [
		{
			Type: "timeUnit",
			Name: "Time Unit",
			Description: "Time Unit",
			Default: "Day",
		},
		{
			Type: "number",
			Name: "value",
			Description: "The value to increment by",
			Optional: true,
		},
	],
});
