function generateColor(num: number) {
	const maxColors = 20;
	const saturation = 90;
	const lightness = 50;
  
	// Calculate the hue based on the hashed number
	const hue = (hash(num, maxColors) * (360 / maxColors)) % 360;
  
	return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

// A simple hash function to shuffle the hue values
function hash(num : number, maxColors: number) {
	const prime = 31;
	return (num * prime) % maxColors;
}

export { generateColor, hash };