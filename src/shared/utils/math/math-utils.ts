export function mapRange(value: number, inMin = 0, inMax = 1, outMin = 0, outMax = 1) {
	return outMin + ((value - inMin) * (outMax - outMin)) / (inMax - inMin);
}
