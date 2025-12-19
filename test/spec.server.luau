--_G.NOCOLOR = true

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local ServerScriptService = game:GetService("ServerScriptService")

local Jest = require(ReplicatedStorage.rbxts_include.node_modules["@rbxts"].jest.src)

local setupScript = Instance.new("ModuleScript")
setupScript.Name = "setup"
setupScript.Source = [[
	for key in _G do
		if typeof(key) == "Instance" and key:IsA("ModuleScript") then
			_G[key] = nil
		end
	end

	return nil
]]

local status, result = Jest.runCLI(script, {
	verbose = true,
	ci = false,
	setupFiles = {setupScript},
}, {
	ServerScriptService.TS.__tests__,
}):awaitStatus()

if status == "Rejected" then
	print(result)
	error("Tests failed")
end